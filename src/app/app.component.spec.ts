import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject, throwError } from 'rxjs';
import { AppComponent } from './app.component';
import { DashboardLessonsService } from './dashboard/dashboard-lessons.service';
import { DashboardLesson } from './dashboard/dashboard.models';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;
  let dashboardLessonsService: { loadLessons: jest.Mock };

  const sampleLessons: DashboardLesson[] = [
    {
      id: 'lesson-1',
      title: 'Signals Progress Snapshot',
      owner: 'Mia',
      track: 'Angular Core',
      status: 'Live',
      durationMinutes: 32,
      learners: 148,
      summary: 'Review screen state, computed totals, and practical signal boundaries.',
    },
    {
      id: 'lesson-2',
      title: 'Template Control Flow Clinic',
      owner: 'Noah',
      track: 'Template UI',
      status: 'Draft',
      durationMinutes: 27,
      learners: 86,
      summary: 'Compare idle, loading, empty, and success states inside one feature screen.',
    },
    {
      id: 'lesson-3',
      title: 'HTTP Dashboard Review',
      owner: 'Zoe',
      track: 'Data Access',
      status: 'Archived',
      durationMinutes: 41,
      learners: 203,
      summary: 'Inspect a service-driven dashboard and explain why the UI states stay honest.',
    },
  ];

  beforeEach(async () => {
    dashboardLessonsService = {
      loadLessons: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: DashboardLessonsService, useValue: dashboardLessonsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should render the dashboard title and the load action', () => {
    expect(getText('dashboard-title')).toBe('Feature Dashboard Foundations');
    expect(getText('load-dashboard-btn')).toBe('Load dashboard');
  });

  it('should start from the idle state', () => {
    expectOnlyState('idle-state');
  });

  it('should show loading while the service response is still pending', () => {
    const pendingResponse = new Subject<DashboardLesson[]>();
    dashboardLessonsService.loadLessons.mockReturnValue(pendingResponse.asObservable());

    click('load-dashboard-btn');

    expect(dashboardLessonsService.loadLessons).toHaveBeenCalledTimes(1);
    expectOnlyState('loading-state');
  });

  it('should render the dashboard list and default details after a successful load', () => {
    dashboardLessonsService.loadLessons.mockReturnValue(of(sampleLessons));

    click('load-dashboard-btn');

    expectOnlyState('success-state');
    expect(host.querySelectorAll('[data-testid^="lesson-card-"]').length).toBe(3);
    expect(getText('summary-total')).toBe('Loaded 3 learning cards');
    expect(getText('detail-title')).toBe('Signals Progress Snapshot');
    expect(getText('detail-status')).toBe('Live');
  });

  it('should update the details panel when another lesson card is selected', () => {
    dashboardLessonsService.loadLessons.mockReturnValue(of(sampleLessons));

    click('load-dashboard-btn');
    click('lesson-card-lesson-2');

    expect(getText('detail-title')).toBe('Template Control Flow Clinic');
    expect(getText('detail-owner')).toBe('Noah');
    expect(getText('detail-status')).toBe('Draft');
  });

  it('should show the empty state when the dashboard has no lessons', () => {
    dashboardLessonsService.loadLessons.mockReturnValue(of([]));

    click('load-dashboard-btn');

    expectOnlyState('empty-state');
  });

  it('should show the error state when the dashboard request fails', () => {
    dashboardLessonsService.loadLessons.mockReturnValue(throwError(() => new Error('Dashboard sync failed')));

    click('load-dashboard-btn');

    expectOnlyState('error-state');
  });

  function click(testId: string): void {
    const element = host.querySelector(`[data-testid="${testId}"]`) as HTMLButtonElement | null;

    expect(element).toBeTruthy();
    element?.click();
    fixture.detectChanges();
  }

  function getText(testId: string): string {
    const element = host.querySelector(`[data-testid="${testId}"]`);

    expect(element).toBeTruthy();
    return element?.textContent?.trim() ?? '';
  }

  function expectOnlyState(activeTestId: string): void {
    const allStates = ['idle-state', 'loading-state', 'empty-state', 'error-state', 'success-state'];

    for (const state of allStates) {
      const element = host.querySelector(`[data-testid="${state}"]`);

      if (state === activeTestId) {
        expect(element).toBeTruthy();
      } else {
        expect(element).toBeNull();
      }
    }
  }
});
