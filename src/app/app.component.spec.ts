import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FileSizePipe } from './file-size.pipe';
import { TruncatePipe } from './truncate.pipe';

describe('file list integration', () => {
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AppComponent] }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });
  afterEach(() => jest.restoreAllMocks());
  const text = (f: ComponentFixture<AppComponent>, selector: string) =>
    (f.nativeElement as HTMLElement).querySelector(selector)?.textContent?.trim();
  it('renders all source rows', () => {
    expect((fixture.nativeElement as HTMLElement).querySelectorAll('article')).toHaveLength(4);
  });
  it('formats file sizes and descriptions in the actual template', () => {
    expect(text(fixture, '[data-testid="file-guide"] [data-testid="file-size"]')).toBe('2.3 MB');
    expect(text(fixture, '[data-testid="file-guide"] [data-testid="file-description"]')).toBe('A detailed guide f...');
    expect(text(fixture, '[data-testid="file-empty"] [data-testid="file-size"]')).toBe('0 B');
    expect(text(fixture, '[data-testid="file-pending"] [data-testid="file-description"]')).toBe('');
  });
  it('reformats changed inputs instead of hard-coding the initial display', () => {
    fixture.componentInstance.files = [{ id: 'new', name: 'new.txt', bytes: 1536, description: 'hello world' }];
    fixture.componentInstance.precision = 2;
    fixture.componentInstance.descriptionLimit = 5;
    fixture.detectChanges();
    expect(text(fixture, '[data-testid="file-size"]')).toBe('1.50 KB');
    expect(text(fixture, '[data-testid="file-description"]')).toBe('hello...');
  });
  it('does not rerun pure transforms when their inputs stay unchanged', () => {
    const size = jest.spyOn(FileSizePipe.prototype, 'transform');
    const truncate = jest.spyOn(TruncatePipe.prototype, 'transform');
    fixture.detectChanges();
    expect(size).not.toHaveBeenCalled();
    expect(truncate).not.toHaveBeenCalled();
    fixture.componentInstance.files = [{ id: 'changed', name: 'new.txt', bytes: 2048, description: 'updated' }];
    fixture.detectChanges();
    expect(size).toHaveBeenCalled();
    expect(truncate).toHaveBeenCalled();
  });
});
