import { HighlightPipe } from './highlight.pipe';

describe('HighlightPipe', () => {
  const pipe = new HighlightPipe();

  it('should keep original value when query is empty', () => {
    expect(pipe.transform('Angular Signals', '')).toBe('Angular Signals');
  });

  it('should wrap query matches with mark tag', () => {
    const result = pipe.transform('Angular and RxJS', 'an');

    expect(result).toContain('<mark>an</mark>');
  });

  it('should match query in case-insensitive mode', () => {
    const result = pipe.transform('Standalone', 'STAN');

    expect(result.toLowerCase()).toContain('<mark>stan</mark>');
  });
});
