import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { LegacyActivityWidgetComponent } from './legacy-activity-widget.component';
import { LegacyActivityModule } from './legacy-activity.module';

describe('AppComponent – legacy standalone integration', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [DashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the heading', () => {
    expect(host.querySelector('h1')?.textContent?.trim()).toBe('Legacy Standalone Integration');
  });

  it('should render the standalone dashboard host', () => {
    expect(host.querySelector('[data-testid="dashboard-title"]')?.textContent?.trim()).toBe('Dashboard');
    expect(host.querySelector('[data-testid="integration-status"]')?.textContent?.trim()).toBe(
      'Legacy widget not connected yet',
    );
  });

  it('should export the legacy widget from LegacyActivityModule', () => {
    const exportsList = getNgModuleExports(LegacyActivityModule);

    expect(exportsList).toContain(LegacyActivityWidgetComponent);
  });

  it('should render the legacy widget inside the dashboard', () => {
    expect(host.querySelector('[data-testid="legacy-widget-title"]')?.textContent?.trim()).toBe('Legacy Activity');
  });

  it('should render all activity items from the legacy widget', () => {
    const items = host.querySelectorAll('[data-testid="activity-list"] li');

    expect(items).toHaveLength(3);
    expect(items[1]?.textContent?.replace(/\s+/g, ' ').trim()).toContain('NgModule boundary');
  });

  it('should render the sync action button from the legacy widget', () => {
    expect(host.querySelector('[data-testid="sync-button"]')?.textContent?.trim()).toBe('Sync status');
  });
});

function getNgModuleExports(moduleType: unknown): unknown[] {
  const definition = (moduleType as { ɵmod?: { exports?: unknown[] } }).ɵmod;

  return definition?.exports ?? [];
}
