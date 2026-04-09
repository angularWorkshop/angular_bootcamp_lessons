import fs from 'node:fs';
import path from 'node:path';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TelemetryService } from './telemetry.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;
  let telemetry: TelemetryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [TelemetryService],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    telemetry = TestBed.inject(TelemetryService);
    fixture.detectChanges();
  });

  it('should guard browser-only access with an SSR-safe check', () => {
    const sourcePath = path.join('D:/Workspace/workshop/angular_bootcamp_lessons', 'src/app/app.component.ts');
    const source = fs.readFileSync(sourcePath, 'utf8');
    expect(source).toContain("typeof window !== 'undefined'");
  });

  it('should update the live message when accessibility becomes ready', () => {
    click('mark-a11y');
    expect(getText('live-message')).toBe('Accessibility checks are ready.');
  });

  it('should expose the extended performance budget state', () => {
    click('show-secondary');
    expect(getText('budget-status')).toBe('extended');
  });

  it('should unlock the release checklist after telemetry becomes ready', () => {
    click('mark-a11y');
    click('connect-telemetry');
    expect(telemetry.events[0]?.name).toBe('release_hardening_ready');
    expect(getText('release-status')).toBe('ready');
  });

  function click(testId: string): void {
    const element = host.querySelector(`[data-testid="${testId}"]`) as HTMLButtonElement | null;
    expect(element).toBeTruthy();
    element?.click();
    fixture.detectChanges();
  }

  function getText(testId: string): string {
    const element = host.querySelector(`[data-testid="${testId}"]`);
    expect(element).toBeTruthy();
    return element?.textContent?.trim() ?? '';
  }
});
