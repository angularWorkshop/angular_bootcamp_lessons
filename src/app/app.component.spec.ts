import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
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

    expect(heading?.textContent?.trim()).toBe('User Profile Card');
  });

  it('should render the basic user model', () => {
    expect(getText('user-name')).toBe('Annie Case');
    expect(getText('user-role')).toBe('Angular Student');
    expect(getText('user-city')).toBe('Minsk');
  });

  it('should bind avatar properties from the user model', () => {
    const avatar = host.querySelector('[data-testid="user-avatar"]') as HTMLImageElement | null;

    expect(avatar).toBeTruthy();
    expect(avatar?.getAttribute('src')).toBe('https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80');
    expect(avatar?.getAttribute('alt')).toBe('Annie Case');
    expect(avatar?.getAttribute('title')).toBe('Annie Case');
  });

  it('should render the current online state', () => {
    expect(getText('user-status')).toBe('Online');
  });

  it('should apply the online status class through binding', () => {
    const status = host.querySelector('[data-testid="user-status"]');

    expect(status?.classList.contains('profile-card__status--online')).toBe(true);
  });

  it('should bind the contact link to the user email', () => {
    const contactLink = host.querySelector('[data-testid="contact-link"]') as HTMLAnchorElement | null;

    expect(contactLink).toBeTruthy();
    expect(contactLink?.getAttribute('href')).toBe('mailto:annie.case@example.com');
  });

  function getText(testId: string): string {
    const element = host.querySelector(`[data-testid="${testId}"]`);

    expect(element).toBeTruthy();
    return element?.textContent?.trim() ?? '';
  }
});
