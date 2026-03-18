import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;
  const storageKey = 'preferences-sync';

  beforeEach(async () => {
    localStorage.removeItem(storageKey);
    document.title = '';

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the heading', () => {
    const heading = host.querySelector('h1');

    expect(heading?.textContent?.trim()).toBe('Preferences Sync');
  });

  it('should render the initial signal values', () => {
    expect(getText('theme-label')).toBe('Light mode');
    expect(getText('compact-mode-label')).toBe('Compact mode: Off');
  });

  it('should sync the initial snapshot through effect', () => {
    expect(document.title).toBe('Light mode - Comfortable');
    expect(readStoredPreferences()).toEqual({
      theme: 'light',
      compactMode: false,
    });
  });

  it('should update document.title when the theme changes', () => {
    click('toggle-theme');

    expect(getText('theme-label')).toBe('Dark mode');
    expect(document.title).toBe('Dark mode - Comfortable');
  });

  it('should persist the latest snapshot when compact mode changes', () => {
    click('toggle-compact-mode');

    expect(getText('compact-mode-label')).toBe('Compact mode: On');
    expect(readStoredPreferences()).toEqual({
      theme: 'light',
      compactMode: true,
    });
  });

  it('should keep both preferences in sync after multiple updates', () => {
    click('toggle-theme');
    click('toggle-compact-mode');

    expect(document.title).toBe('Dark mode - Compact');
    expect(readStoredPreferences()).toEqual({
      theme: 'dark',
      compactMode: true,
    });
  });

  function click(testId: string): void {
    const button = host.querySelector(`[data-testid="${testId}"]`) as HTMLButtonElement | null;

    expect(button).toBeTruthy();
    button?.click();
    fixture.detectChanges();
  }

  function getText(testId: string): string {
    const element = host.querySelector(`[data-testid="${testId}"]`);

    expect(element).toBeTruthy();
    return element?.textContent?.trim() ?? '';
  }

  function readStoredPreferences(): { compactMode: boolean; theme: string } | null {
    const rawValue = localStorage.getItem(storageKey);

    return rawValue ? JSON.parse(rawValue) : null;
  }
});
