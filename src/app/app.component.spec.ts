import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CourseOverviewCardComponent } from './course-overview-card/course-overview-card.component';
import { PracticeStatusCardComponent } from './practice-status-card/practice-status-card.component';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [CourseOverviewCardComponent, PracticeStatusCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the standalone lab heading', () => {
    expect(host.querySelector('h1')?.textContent?.trim()).toBe('Standalone Components Lab');
  });

  it('should keep both child components standalone', () => {
    expect((CourseOverviewCardComponent as any).ɵcmp?.standalone).toBe(true);
    expect((PracticeStatusCardComponent as any).ɵcmp?.standalone).toBe(true);
  });

  it('should render the course overview card', () => {
    expect(host.querySelector('[data-testid="course-overview-card"]')).toBeTruthy();
  });

  it('should render the practice status card', () => {
    expect(host.querySelector('[data-testid="practice-status-card"]')).toBeTruthy();
  });

  it('should show two standalone cards on the page', () => {
    expect(host.querySelectorAll('[data-testid$="card"]').length).toBe(2);
  });

  it('should import both standalone cards into AppModule', () => {
    const imports = (AppModule as any).ɵmod?.imports ?? [];
    const importedTypes = imports.map((item: any) => item?.type ?? item);

    expect(importedTypes).toContain(CourseOverviewCardComponent);
    expect(importedTypes).toContain(PracticeStatusCardComponent);
  });
});
