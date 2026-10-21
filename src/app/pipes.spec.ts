import { FileSizePipe } from './file-size.pipe';
import { TruncatePipe } from './truncate.pipe';

describe('FileSizePipe', () => {
  const pipe = new FileSizePipe();
  it.each([[0, '0 B'], [null, '0 B'], [undefined, '0 B'], [-1, '0 B'], [NaN, '0 B'], [Infinity, '0 B']])
    ('handles empty or invalid bytes %s', (bytes, expected) => expect(pipe.transform(bytes)).toBe(expected));
  it.each([[512, '512.0 B'], [1024, '1.0 KB'], [1536, '1.5 KB'], [2411724, '2.3 MB'], [1024 ** 3, '1.0 GB'], [1024 ** 4, '1.0 TB']])
    ('formats %s bytes', (bytes, expected) => expect(pipe.transform(bytes)).toBe(expected));
  it('supports explicit precision, including zero', () => {
    expect(pipe.transform(1536, 0)).toBe('2 KB');
    expect(pipe.transform(1536, 2)).toBe('1.50 KB');
  });
  it('uses the default precision for invalid precision values', () => {
    expect(pipe.transform(1536, -1)).toBe('1.5 KB');
    expect(pipe.transform(1536, NaN)).toBe('1.5 KB');
  });
});

describe('TruncatePipe', () => {
  const pipe = new TruncatePipe();
  it.each([null, undefined, ''])('handles empty text %s', value => expect(pipe.transform(value)).toBe(''));
  it('keeps short and exactly matching text intact', () => {
    expect(pipe.transform('hello', 10)).toBe('hello');
    expect(pipe.transform('hello', 5)).toBe('hello');
  });
  it('truncates long text and trims the cut ending', () => {
    expect(pipe.transform('hello world', 5)).toBe('hello...');
    expect(pipe.transform('hello world', 6)).toBe('hello...');
  });
  it('supports a custom suffix and default length', () => {
    expect(pipe.transform('hello world', 5, ' [more]')).toBe('hello [more]');
    expect(pipe.transform('a'.repeat(60))).toBe('a'.repeat(50) + '...');
  });
  it('handles a zero or negative limit', () => {
    expect(pipe.transform('hello', 0)).toBe('...');
    expect(pipe.transform('hello', -1)).toBe('...');
  });
});
