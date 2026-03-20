import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { DashboardComponent } from './dashboard.component';
import { SettingsComponent } from './settings.component';
import { ProfileComponent } from './profile.component';

describe('AppComponent – active routes', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        RouterOutlet, RouterLink, RouterLinkActive,
        DashboardComponent, SettingsComponent, ProfileComponent,
      ],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the heading', () => {
    const heading = host.querySelector('h1');
    expect(heading?.textContent?.trim()).toBe('Active Routes');
  });

  it('should have three navigation links', () => {
    const links = host.querySelectorAll('[data-testid="nav"] a');
    expect(links.length).toBe(3);
  });

  it('should render DashboardComponent on "/"', fakeAsync(() => {
    router.navigateByUrl('/');
    tick();
    fixture.detectChanges();

    expect(host.querySelector('[data-testid="dashboard-title"]')).toBeTruthy();
  }));

  it('should add "active" class to the Dashboard link on "/"', fakeAsync(() => {
    router.navigateByUrl('/');
    tick();
    fixture.detectChanges();

    const dashboardLink = host.querySelector('[data-testid="nav-dashboard"]');
    expect(dashboardLink?.classList.contains('active')).toBe(true);
  }));

  it('should add "active" class to the Settings link on "/settings"', fakeAsync(() => {
    router.navigateByUrl('/settings');
    tick();
    fixture.detectChanges();

    const settingsLink = host.querySelector('[data-testid="nav-settings"]');
    expect(settingsLink?.classList.contains('active')).toBe(true);
  }));

  it('should add "active" class to the Profile link on "/profile"', fakeAsync(() => {
    router.navigateByUrl('/profile');
    tick();
    fixture.detectChanges();

    const profileLink = host.querySelector('[data-testid="nav-profile"]');
    expect(profileLink?.classList.contains('active')).toBe(true);
  }));

  it('should NOT have "active" class on Dashboard when on "/settings"', fakeAsync(() => {
    router.navigateByUrl('/settings');
    tick();
    fixture.detectChanges();

    const dashboardLink = host.querySelector('[data-testid="nav-dashboard"]');
    expect(dashboardLink?.classList.contains('active')).toBe(false);
  }));

  it('should NOT have "active" class on Settings when on "/profile"', fakeAsync(() => {
    router.navigateByUrl('/profile');
    tick();
    fixture.detectChanges();

    const settingsLink = host.querySelector('[data-testid="nav-settings"]');
    expect(settingsLink?.classList.contains('active')).toBe(false);
  }));

  it('should only have one active link at a time on "/settings"', fakeAsync(() => {
    router.navigateByUrl('/settings');
    tick();
    fixture.detectChanges();

    const activeLinks = host.querySelectorAll('[data-testid="nav"] a.active');
    expect(activeLinks.length).toBe(1);
    expect(activeLinks[0].textContent?.trim()).toBe('Settings');
  }));

  it('should only have one active link at a time on "/"', fakeAsync(() => {
    router.navigateByUrl('/');
    tick();
    fixture.detectChanges();

    const activeLinks = host.querySelectorAll('[data-testid="nav"] a.active');
    expect(activeLinks.length).toBe(1);
    expect(activeLinks[0].textContent?.trim()).toBe('Dashboard');
  }));
});
