import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { AuthService } from './auth.service';
import { PublicComponent } from './public.component';
import { AdminComponent } from './admin.component';
import { EditorComponent } from './editor.component';
import { LoginComponent } from './login.component';

describe('AppComponent – route guards', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;
  let router: Router;
  let auth: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        RouterOutlet, RouterLink, RouterLinkActive,
        PublicComponent, AdminComponent, EditorComponent, LoginComponent,
      ],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    router = TestBed.inject(Router);
    auth = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create the app component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the heading', () => {
    expect(host.querySelector('h1')?.textContent?.trim()).toBe('Route Guards');
  });

  it('should navigate to /public without restrictions', fakeAsync(() => {
    router.navigateByUrl('/public');
    tick();
    fixture.detectChanges();

    expect(host.querySelector('[data-testid="public-title"]')).toBeTruthy();
  }));

  // --- canActivate: authGuard ---

  it('should redirect to /login when navigating to /admin while not logged in', fakeAsync(() => {
    auth.logout();
    router.navigateByUrl('/admin');
    tick();
    fixture.detectChanges();

    expect(router.url).toBe('/login');
    expect(host.querySelector('[data-testid="login-title"]')).toBeTruthy();
  }));

  it('should allow navigation to /admin when logged in', fakeAsync(() => {
    auth.login();
    router.navigateByUrl('/admin');
    tick();
    fixture.detectChanges();

    expect(router.url).toBe('/admin');
    expect(host.querySelector('[data-testid="admin-title"]')).toBeTruthy();
  }));

  it('should block /admin and show login page, not admin content', fakeAsync(() => {
    auth.logout();
    router.navigateByUrl('/admin');
    tick();
    fixture.detectChanges();

    expect(host.querySelector('[data-testid="admin-title"]')).toBeNull();
    expect(host.querySelector('[data-testid="login-title"]')).toBeTruthy();
  }));

  // --- canDeactivate: unsavedChangesGuard ---

  it('should allow leaving /editor when there are no unsaved changes', fakeAsync(() => {
    router.navigateByUrl('/editor');
    tick();
    fixture.detectChanges();

    expect(host.querySelector('[data-testid="editor-title"]')).toBeTruthy();

    router.navigateByUrl('/public');
    tick();
    fixture.detectChanges();

    expect(router.url).toBe('/public');
  }));

  it('should block leaving /editor when there are unsaved changes and user cancels', fakeAsync(() => {
    router.navigateByUrl('/editor');
    tick();
    fixture.detectChanges();

    // Simulate typing to create unsaved changes
    const textarea = host.querySelector('[data-testid="editor-textarea"]') as HTMLTextAreaElement;
    textarea.value = 'some text';
    textarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(host.querySelector('[data-testid="unsaved-indicator"]')?.textContent?.trim()).toBe('Unsaved changes');

    // User cancels the confirm dialog
    jest.spyOn(window, 'confirm').mockReturnValue(false);

    router.navigateByUrl('/public');
    tick();
    fixture.detectChanges();

    expect(router.url).toBe('/editor');
    expect(window.confirm).toHaveBeenCalled();
  }));

  it('should allow leaving /editor when there are unsaved changes and user confirms', fakeAsync(() => {
    router.navigateByUrl('/editor');
    tick();
    fixture.detectChanges();

    const textarea = host.querySelector('[data-testid="editor-textarea"]') as HTMLTextAreaElement;
    textarea.value = 'some text';
    textarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // User confirms the dialog
    jest.spyOn(window, 'confirm').mockReturnValue(true);

    router.navigateByUrl('/public');
    tick();
    fixture.detectChanges();

    expect(router.url).toBe('/public');
  }));

  it('should allow leaving /editor after saving', fakeAsync(() => {
    router.navigateByUrl('/editor');
    tick();
    fixture.detectChanges();

    const textarea = host.querySelector('[data-testid="editor-textarea"]') as HTMLTextAreaElement;
    textarea.value = 'some text';
    textarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Save the changes
    const saveBtn = host.querySelector('[data-testid="save-button"]') as HTMLButtonElement;
    saveBtn.click();
    fixture.detectChanges();

    expect(host.querySelector('[data-testid="unsaved-indicator"]')?.textContent?.trim()).toBe('No changes');

    const confirmSpy = jest.spyOn(window, 'confirm');

    router.navigateByUrl('/public');
    tick();
    fixture.detectChanges();

    expect(router.url).toBe('/public');
    expect(confirmSpy).not.toHaveBeenCalled();
  }));
});
