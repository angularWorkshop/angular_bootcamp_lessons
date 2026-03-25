import { readFileSync } from 'fs';
import { join } from 'path';

describe('Exercise 31.1 — @defer for heavy component', () => {
  const templatePath = join(__dirname, 'app.component.html');
  const template = readFileSync(templatePath, 'utf8');

  it('should contain @defer block', () => {
    expect(template).toContain('@defer (on viewport) {');
  });

  it('should include @placeholder block', () => {
    expect(template).toContain('@placeholder {');
  });

  it('should include @loading block', () => {
    expect(template).toContain('@loading {');
  });

  it('should render heavy component inside @defer section', () => {
    expect(template).toMatch(/@defer\s*\(on viewport\)\s*\{[\s\S]*<app-heavy-table>/);
  });
});
