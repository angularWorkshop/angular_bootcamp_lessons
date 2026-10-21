# Standalone File Size and Truncate Pipes

Reference solution. The exact same tests are used in the starter.

## Task

Implement both pure standalone pipes and connect them to the file list template. Keep the input data and test IDs.

fileSize uses base 1024, B/KB/MB/GB/TB, precision 1 by default. Zero, null, undefined, negative and non-finite bytes yield "0 B". Precision is an integer 0..20; invalid precision uses 1. truncate keeps short text, takes up to maxLength content characters (default 50), trims the cut ending and appends suffix (default "...") only for long text. Null/empty text yields ""; a negative limit is zero.

## Files to edit

src/app/file-size.pipe.ts, src/app/truncate.pipe.ts, src/app/app.component.html

## Checks

```bash
npm install
npm test -- --runInBand
npm run build
```

StackBlitz installs dependencies and starts the status runner automatically. Changes trigger another check. The starter reports NOT COMPLETED until the task is solved; the answer reports COMPLETED.

Do not edit tests to complete the exercise.
