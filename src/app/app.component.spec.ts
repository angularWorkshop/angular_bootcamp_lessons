import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { JobsStreamService } from './jobs-stream.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;
  let jobsStream: JobsStreamService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [JobsStreamService],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    jobsStream = TestBed.inject(JobsStreamService);
    fixture.detectChanges();
  });

  it('should filter the table rows by the search query', () => {
    click('search-fraud');
    expect(queryAllByPrefix('row-').length).toBe(1);
  });

  it('should open the drawer for the selected row', () => {
    click('row-ord-1');
    expect(getText('drawer-open')).toBe('open');
    expect(getText('drawer-title')).toBe('Fraud review');
  });

  it('should queue an upload for the selected row', () => {
    click('row-ord-1');
    click('queue-upload');
    expect(getText('upload-count')).toBe('1');
  });

  it('should append realtime jobs after the connection starts', () => {
    click('connect-jobs');
    jobsStream.emit('Manual job event');
    fixture.detectChanges();
    expect(queryAll('job-event').map(item => item.textContent?.trim())).toContain('Manual job event');
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

  function queryAll(testId: string): HTMLElement[] {
    return Array.from(host.querySelectorAll(`[data-testid="${testId}"]`));
  }

  function queryAllByPrefix(prefix: string): HTMLElement[] {
    return Array.from(host.querySelectorAll('[data-testid]')).filter(item =>
      item.getAttribute('data-testid')?.startsWith(prefix),
    ) as HTMLElement[];
  }
});
