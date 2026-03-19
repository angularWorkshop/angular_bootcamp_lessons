import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LearningPlanCardComponent } from './learning-plan-card/learning-plan-card.component';
import { PracticeReminderCardComponent } from './practice-reminder-card/practice-reminder-card.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [LearningPlanCardComponent, PracticeReminderCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the page heading', () => {
    expect(host.querySelector('h1')?.textContent?.trim()).toBe('Component Composition Lab');
  });

  it('should render both standalone feature components', () => {
    expect(host.querySelector('[data-testid="learning-plan-card"]')).toBeTruthy();
    expect(host.querySelector('[data-testid="practice-reminder-card"]')).toBeTruthy();
  });

  it('should keep both feature cards standalone', () => {
    expect((LearningPlanCardComponent as any).ɵcmp?.standalone).toBe(true);
    expect((PracticeReminderCardComponent as any).ɵcmp?.standalone).toBe(true);
  });

  it('should compose the learning plan through the reusable card shell', () => {
    const learningCard = host.querySelector('[data-testid="learning-plan-card"]');

    expect(learningCard?.querySelector('.ui-card')).toBeTruthy();
  });

  it('should compose the practice reminder through the reusable card shell', () => {
    const reminderCard = host.querySelector('[data-testid="practice-reminder-card"]');

    expect(reminderCard?.querySelector('.ui-card')).toBeTruthy();
  });

  it('should render two reusable ui-card shells on the page', () => {
    expect(host.querySelectorAll('[data-testid="ui-card"]').length).toBe(2);
  });

  it('should keep the page focused on composition and reuse', () => {
    expect(host.textContent).toContain('Build a reusable card shell');
  });
});
