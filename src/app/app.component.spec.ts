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

    expect(heading?.textContent?.trim()).toBe('Team Members');
  });

  it('should render exactly 4 user cards', () => {
    const cards = host.querySelectorAll('[data-testid="user-card"]');

    expect(cards.length).toBe(4);
  });

  it('should render all user names in correct order', () => {
    const names = getAll('user-name');

    expect(names).toEqual(['Annie Case', 'Mark Stone', 'Lily Chen', 'Tom Walker']);
  });

  it('should render all user roles in correct order', () => {
    const roles = getAll('user-role');

    expect(roles).toEqual(['Frontend Developer', 'Backend Developer', 'Designer', 'QA Engineer']);
  });

  it('should render each card with both a name and a role', () => {
    const cards = host.querySelectorAll('[data-testid="user-card"]');

    cards.forEach(card => {
      const name = card.querySelector('[data-testid="user-name"]');
      const role = card.querySelector('[data-testid="user-role"]');

      expect(name).toBeTruthy();
      expect(role).toBeTruthy();
      expect(name?.textContent?.trim().length).toBeGreaterThan(0);
      expect(role?.textContent?.trim().length).toBeGreaterThan(0);
    });
  });

  function getAll(testId: string): string[] {
    return Array.from(host.querySelectorAll(`[data-testid="${testId}"]`)).map(
      el => el.textContent?.trim() ?? '',
    );
  }
});
