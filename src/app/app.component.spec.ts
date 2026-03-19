import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LessonPreviewCardComponent } from './lesson-preview-card/lesson-preview-card.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [LessonPreviewCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the page heading', () => {
    expect(host.querySelector('h1')?.textContent?.trim()).toBe('Input Binding Lab');
  });

  it('should keep the preview card standalone', () => {
    expect((LessonPreviewCardComponent as any).ɵcmp?.standalone).toBe(true);
  });

  it('should render two lesson preview cards', () => {
    expect(host.querySelectorAll('[data-testid="lesson-card"]').length).toBe(2);
  });

  it('should render the first lesson title from the parent input', () => {
    const cards = host.querySelectorAll<HTMLElement>('[data-testid="lesson-card"]');

    expect(cards[0]?.textContent).toContain('Standalone Basics');
  });

  it('should render the second lesson title from the second input object', () => {
    const cards = host.querySelectorAll<HTMLElement>('[data-testid="lesson-card"]');

    expect(cards[1]?.textContent).toContain('Template Inputs Practice');
  });

  it('should show lesson durations from the typed input model', () => {
    expect(host.textContent).toContain('12 min');
    expect(host.textContent).toContain('27 min');
  });

  it('should show lesson levels from the typed input model', () => {
    expect(host.textContent).toContain('Beginner');
    expect(host.textContent).toContain('Practice');
  });
});
