import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the heading', () => {
    const heading = host.querySelector('h1');

    expect(heading?.textContent?.trim()).toBe('User Profile');
  });

  it('should render the initial user data', () => {
    expect(getText('user-name')).toBe('Annie Case');
    expect(getText('user-role')).toBe('Junior Developer');
    expect(getText('user-city')).toBe('Minsk');
  });

  it('should show Offline status initially', () => {
    expect(getText('user-status')).toBe('Offline');
  });

  it('should show "Go Online" on the toggle button when user is offline', () => {
    const btn = host.querySelector('[data-testid="toggle-btn"]');

    expect(btn?.textContent?.trim()).toBe('Go Online');
  });

  it('should switch to Online after clicking the toggle button', () => {
    clickButton('toggle-btn');

    expect(getText('user-status')).toBe('Online');
  });

  it('should update toggle button label after going online', () => {
    clickButton('toggle-btn');

    const btn = host.querySelector('[data-testid="toggle-btn"]');
    expect(btn?.textContent?.trim()).toBe('Go Offline');
  });

  it('should toggle back to Offline after clicking the toggle button twice', () => {
    clickButton('toggle-btn');
    clickButton('toggle-btn');

    expect(getText('user-status')).toBe('Offline');
  });

  it('should promote user from Junior Developer to Middle Developer', () => {
    clickButton('promote-btn');

    expect(getText('user-role')).toBe('Middle Developer');
  });

  it('should promote user to Senior Developer on the second promote click', () => {
    clickButton('promote-btn');
    clickButton('promote-btn');

    expect(getText('user-role')).toBe('Senior Developer');
  });

  it('should not promote beyond Senior Developer', () => {
    clickButton('promote-btn');
    clickButton('promote-btn');
    clickButton('promote-btn');

    expect(getText('user-role')).toBe('Senior Developer');
  });

  function clickButton(testId: string): void {
    const btn = host.querySelector(`[data-testid="${testId}"]`) as HTMLButtonElement | null;

    expect(btn).toBeTruthy();
    btn?.click();
    fixture.detectChanges();
  }

  function getText(testId: string): string {
    const element = host.querySelector(`[data-testid="${testId}"]`);

    expect(element).toBeTruthy();
    return element?.textContent?.trim() ?? '';
  }
});
