import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RuntimeConfigService } from './runtime-config.service';
import { TelemetryService } from './telemetry.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;
  let runtime: RuntimeConfigService;
  let telemetry: TelemetryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [RuntimeConfigService, TelemetryService],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    runtime = TestBed.inject(RuntimeConfigService);
    telemetry = TestBed.inject(TelemetryService);
    fixture.detectChanges();
  });

  it('should hide the action when the feature flag is disabled', () => {
    runtime.featureFlags.experimentalAction = false;
    fixture.detectChanges();
    expect(query('primary-action')).toBeNull();
  });

  it('should capture the action event', () => {
    click('primary-action');
    expect(telemetry.events[0]?.name).toBe('experimental_action_clicked');
  });

  it('should capture the failure event', () => {
    click('error-action');
    expect(telemetry.events[0]?.name).toBe('experimental_action_failed');
    expect(getText('error-message')).toBe('The feature action failed.');
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
