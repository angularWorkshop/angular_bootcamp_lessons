import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { JobsStreamService } from './jobs/jobs-stream.service';
import { JobsMonitorFacadeService } from './jobs/jobs-monitor-facade.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [JobsStreamService, JobsMonitorFacadeService],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should avoid duplicate listeners on repeated start', () => {
    click('start-monitoring');
    click('start-monitoring');
    expect(getText('listener-count')).toBe('1');
  });

  it('should stop receiving events after stop', () => {
    click('start-monitoring');
    click('stop-monitoring');
    click('emit-job');
    expect(queryAll('job-event').length).toBe(0);
  });

  it('should rebuild exactly one listener on reconnect', () => {
    click('start-monitoring');
    click('reconnect-monitoring');
    expect(getText('listener-count')).toBe('1');
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
});
