import { readFileSync } from 'fs';
import { join } from 'path';

describe('Exercise 31.2 — @defer with multiple triggers', () => {
  const templatePath = join(__dirname, 'app.component.html');
  const template = readFileSync(templatePath, 'utf8');

  it('should include interaction trigger with prefetch on idle', () => {
    expect(template).toContain('@defer (on interaction(interactionTrigger); prefetch on idle) {');
  });

  it('should include timer trigger with 3 seconds', () => {
    expect(template).toContain('@defer (on timer(3s)) {');
  });

  it('should include when trigger block', () => {
    expect(template).toContain('@defer (when isReady()) {');
  });

  it('should include @error block for deferred loading failures', () => {
    const errorBlocksCount = (template.match(/@error\s*\{/g) || []).length;
    expect(errorBlocksCount).toBeGreaterThanOrEqual(1);
  });

  it('should include all three content blocks for trigger scenarios', () => {
    expect(template).toContain('data-testid="interaction-block"');
    expect(template).toContain('data-testid="timer-block"');
    expect(template).toContain('data-testid="when-block"');
  });
});
