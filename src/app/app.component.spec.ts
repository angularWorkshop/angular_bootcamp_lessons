import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UploadApiService } from './upload/upload-api.service';
import { UploadFacadeService } from './upload/upload-facade.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;
  let uploadApi: UploadApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [UploadApiService, UploadFacadeService],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    uploadApi = TestBed.inject(UploadApiService);
    fixture.detectChanges();
  });

  it('should render the queue after the simulated drop', () => {
    click('simulate-drop');
    expect(query('file-hero.png')).toBeTruthy();
    expect(query('file-team.webp')).toBeTruthy();
  });

  it('should move files into uploading state before they complete', () => {
    click('simulate-drop');
    click('start-uploads');
    expect(getText('status-hero.png')).toBe('uploading');
    expect(getText('progress-hero.png')).toBe('10');
  });

  it('should finish the file after the API flush', () => {
    click('simulate-drop');
    click('start-uploads');
    uploadApi.flushUpload('hero.png');
    fixture.detectChanges();
    expect(getText('status-hero.png')).toBe('done');
    expect(getText('progress-hero.png')).toBe('100');
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
