import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UserService } from './user.service';

function getText(el: HTMLElement, testId: string): string {
  const target = el.querySelector(`[data-testid="${testId}"]`);
  return target ? target.textContent!.trim() : '';
}

describe('Exercise 29.1 — toSignal: Observable to Signal', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [UserService],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  // --- Basic rendering ---

  it('should create the app component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the title "User Directory"', () => {
    expect(getText(fixture.nativeElement, 'title')).toBe('User Directory');
  });

  // --- toSignal usage ---

  it('should render 5 user cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.user-card');
    expect(cards.length).toBe(5);
  });

  it('should show user name in each card', () => {
    const user1 = fixture.nativeElement.querySelector('[data-testid="user-1"]');
    expect(user1).toBeTruthy();
    expect(user1.querySelector('[data-testid="user-name"]')?.textContent?.trim()).toBe('Anna Petrova');
  });

  it('should show user email in each card', () => {
    const user2 = fixture.nativeElement.querySelector('[data-testid="user-2"]');
    expect(user2).toBeTruthy();
    expect(user2.querySelector('[data-testid="user-email"]')?.textContent?.trim()).toBe('boris@example.com');
  });

  // --- Computed signals ---

  it('should show total user count', () => {
    expect(getText(fixture.nativeElement, 'total-count')).toBe('Total: 5 users');
  });

  it('should show admin count', () => {
    expect(getText(fixture.nativeElement, 'admin-count')).toBe('Admins: 2');
  });

  // --- No async pipe ---

  it('should NOT use async pipe in template', () => {
    const html = fixture.nativeElement.innerHTML;
    expect(html).not.toContain('| async');
  });

  it('should render all 5 users with correct data', () => {
    const expectedNames = ['Anna Petrova', 'Boris Ivanov', 'Clara Sidorova', 'Denis Kuznetsov', 'Elena Volkova'];
    for (let i = 1; i <= 5; i++) {
      const card = fixture.nativeElement.querySelector(`[data-testid="user-${i}"]`);
      expect(card).toBeTruthy();
      const name = card.querySelector('[data-testid="user-name"]')?.textContent?.trim();
      expect(name).toBe(expectedNames[i - 1]);
    }
  });

  it('should render all 5 users with correct emails', () => {
    const expectedEmails = ['anna@example.com', 'boris@example.com', 'clara@example.com', 'denis@example.com', 'elena@example.com'];
    for (let i = 1; i <= 5; i++) {
      const card = fixture.nativeElement.querySelector(`[data-testid="user-${i}"]`);
      const email = card.querySelector('[data-testid="user-email"]')?.textContent?.trim();
      expect(email).toBe(expectedEmails[i - 1]);
    }
  });
});
