import { spawn } from 'node:child_process';
import { readdir, stat } from 'node:fs/promises';
import process from 'node:process';

const COLORS = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
};

const WATCH_ROOTS = ['src'];
const WATCH_FILES = ['angular.json', 'package.json', 'jest.config.js', 'tsconfig.json', 'tsconfig.spec.json'];
const POLL_INTERVAL_MS = 1500;

let runNumber = 0;
let isRunning = false;
let rerunRequested = false;
let lastSignature = '';

function createColoredEnv(extra = {}) {
  const env = {
    ...process.env,
    ...extra,
    FORCE_COLOR: '1',
  };

  delete env.NO_COLOR;

  return env;
}

function colorize(color, text) {
  return `${COLORS[color]}${text}${COLORS.reset}`;
}

function printDivider() {
  console.log(colorize('dim', '------------------------------------------------------------'));
}

function printHeading(text, color) {
  printDivider();
  console.log(colorize(color, text));
  printDivider();
}

async function collectFiles(root) {
  const entries = await readdir(root, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = `${root}/${entry.name}`;

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(path)));
      continue;
    }

    if (entry.isFile()) {
      files.push(path);
    }
  }

  return files;
}

async function buildSignature() {
  const paths = [...WATCH_FILES];

  for (const root of WATCH_ROOTS) {
    try {
      paths.push(...(await collectFiles(root)));
    } catch {
      // Ignore absent optional roots.
    }
  }

  const records = await Promise.all(
    paths.map(async path => {
      try {
        const fileStat = await stat(path);
        return `${path}:${fileStat.size}:${fileStat.mtimeMs}`;
      } catch {
        return `${path}:missing`;
      }
    })
  );

  return records.sort().join('|');
}

function runCommand(label, command, args) {
  return new Promise(resolve => {
    const child = spawn(command, args, {
      stdio: ['ignore', 'pipe', 'pipe'],
      env: createColoredEnv({ CI: 'true' }),
    });

    let output = '';

    child.stdout.on('data', chunk => {
      output += chunk.toString();
    });

    child.stderr.on('data', chunk => {
      output += chunk.toString();
    });

    child.on('close', code => {
      resolve({
        label,
        code: code ?? 1,
        output: output.trim(),
      });
    });
  });
}

function startPreviewServer() {
  const child = spawn('npm', ['run', 'start', '--', '--host', '0.0.0.0'], {
    stdio: ['ignore', 'pipe', 'pipe'],
    env: createColoredEnv(),
  });

  child.stdout.on('data', chunk => {
    process.stdout.write(colorize('cyan', `[ng] ${chunk.toString()}`));
  });

  child.stderr.on('data', chunk => {
    process.stderr.write(colorize('red', `[ng] ${chunk.toString()}`));
  });

  child.on('close', code => {
    console.log(colorize(code === 0 ? 'yellow' : 'red', `[ng] preview server stopped with code ${code ?? 1}`));
  });
}

async function executeChecks(reason) {
  if (isRunning) {
    rerunRequested = true;
    return;
  }

  isRunning = true;
  runNumber += 1;

  printHeading(`Checking assignment status (#${runNumber})`, 'cyan');
  console.log(colorize('dim', `Reason: ${reason}`));

  const tests = await runCommand('Jest', 'npm', ['run', 'test', '--', '--runInBand', '--watchAll=false', '--colors']);

  if (tests.code !== 0) {
    printHeading('TEST FAILURES', 'red');
    console.log(tests.output || colorize('red', 'Jest failed without output.'));
    printHeading('ASSIGNMENT STATUS: NOT COMPLETED', 'red');
    console.log(colorize('yellow', 'Fix the errors above and save the file to run checks again.'));
  } else {
    console.log(colorize('green', 'Jest: OK'));
    printHeading('ASSIGNMENT STATUS: COMPLETED', 'green');
    console.log(colorize('green', 'All tests passed. The current solution is valid.'));
  }

  isRunning = false;

  if (rerunRequested) {
    rerunRequested = false;
    await executeChecks('queued file change');
  }
}

async function pollFiles() {
  try {
    const nextSignature = await buildSignature();

    if (lastSignature && nextSignature !== lastSignature) {
      await executeChecks('file change');
    }

    lastSignature = nextSignature;
  } catch (error) {
    console.error(colorize('red', `[watch] ${error instanceof Error ? error.message : String(error)}`));
  }
}

console.log(colorize('cyan', 'Angular StackBlitz status runner started.'));
console.log(colorize('dim', 'Preview uses ng serve. Assignment status is based on Jest results.'));

startPreviewServer();
lastSignature = await buildSignature();
await executeChecks('initial run');
setInterval(() => {
  void pollFiles();
}, POLL_INTERVAL_MS);
