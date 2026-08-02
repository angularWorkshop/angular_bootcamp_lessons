import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UploadRetryApiService } from './upload-retry/upload-retry-api.service';
import { UploadRetryFacadeService } from './upload-retry/upload-retry-facade.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;
  let api: UploadRetryApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [UploadRetryApiService, UploadRetryFacadeService],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    api = TestBed.inject(UploadRetryApiService);
    fixture.detectChanges();
  });

  it('should reject invalid files before upload', () => {
    click('load-input-files');
    expect(getText('rejected-list')).toContain('huge.mov');
    expect(query('retry-file-poster.png')).toBeTruthy();
  });

  it('should mark a file as canceled', () => {
    click('load-input-files');
    click('cancel-poster.png');
    expect(getText('retry-status-poster.png')).toBe('canceled');
  });

  it('should retry a failed file and then finish it', () => {
    click('load-input-files');
    api.setOutcome('poster.png', 'error');
    click('start-poster.png');
    api.flush('poster.png');
    fixture.detectChanges();
    expect(getText('retry-status-poster.png')).toBe('failed');
    click('retry-poster.png');
    api.flush('poster.png');
    fixture.detectChanges();
    expect(getText('retry-status-poster.png')).toBe('done');
  });

  function click(testId: string): void {
    const element = query(testId) as HTMLButtonElement | null;
    expect(element).toBeTruthy();
    element?.click();
    fixture.detectChanges();
  }

  function getText(testId: string): string {
    const element = query(testId);
    expect(element).toBeTruthy();
    return element?.textContent?.trim() ?? '';
  }

  function query(testId: string): HTMLElement | null {
    return host.querySelector(`[data-testid="${testId}"]`);
  }
});
