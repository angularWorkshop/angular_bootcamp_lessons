import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject, throwError } from 'rxjs';
import { AppComponent } from './app.component';
import { DashboardSearchService } from './dashboard/dashboard-search.service';
import { DashboardLesson } from './dashboard/dashboard.models';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;
  let dashboardSearchService: { searchLessons: jest.Mock };

  const liveResults: DashboardLesson[] = [
    {
      id: 'signals-overview',
      title: 'Signals Progress Overview',
      owner: 'Mia',
      track: 'Angular Core',
      status: 'Live',
      durationMinutes: 32,
      learners: 148,
      summary: 'Track how signal-based state stays readable during dashboard updates.',
    },
    {
      id: 'signals-testing',
      title: 'Signals Testing Patterns',
      owner: 'Ava',
      track: 'Angular Core',
      status: 'Live',
      durationMinutes: 36,
      learners: 171,
      summary: 'Focus on observable inputs, state transitions, and UI assertions.',
    },
  ];

  const refreshedResults: DashboardLesson[] = [
    {
      id: 'dashboard-refresh',
      title: 'Dashboard Refresh Review',
      owner: 'Leo',
      track: 'Data Access',
      status: 'Live',
      durationMinutes: 29,
      learners: 94,
      summary: 'Re-run the latest query without losing the current screen contract.',
    },
  ];

  beforeEach(async () => {
    dashboardSearchService = {
      searchLessons: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: DashboardSearchService, useValue: dashboardSearchService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should render the dashboard search title and controls', () => {
    expect(getText('dashboard-title')).toBe('Dashboard Search and Refresh');
    expect(getInput()?.getAttribute('placeholder')).toBe('Search lessons by title, owner, or track');
    expect(getText('refresh-btn')).toBe('Refresh');
  });

  it('should stay idle until the user starts a request', () => {
    expectOnlyState('idle-state');
  });

  it('should debounce query input before calling the search service', async () => {
    const pendingResults = new Subject<DashboardLesson[]>();
    dashboardSearchService.searchLessons.mockReturnValue(pendingResults.asObservable());

    typeQuery('signals');
    await wait(250);
    fixture.detectChanges();

    expect(dashboardSearchService.searchLessons).not.toHaveBeenCalled();

    await wait(120);
    fixture.detectChanges();

    expect(dashboardSearchService.searchLessons).toHaveBeenCalledTimes(1);
    expect(dashboardSearchService.searchLessons).toHaveBeenCalledWith('signals', 'all');
    expectOnlyState('searching-state');
  });

  it('should trigger a request immediately when the status filter changes', async () => {
    dashboardSearchService.searchLessons.mockReturnValue(of(liveResults));

    changeStatus('Live');
    await wait(30);
    fixture.detectChanges();

    expect(dashboardSearchService.searchLessons).toHaveBeenCalledWith('', 'Live');
    expectOnlyState('results-state');
    expect(getText('summary-status')).toBe('Status filter: Live');
    expect(getAll('lesson-status')).toEqual(['Live', 'Live']);
  });

  it('should cancel the previous pending request when a newer query starts', async () => {
    const firstRequest = new Subject<DashboardLesson[]>();
    const latestRequest = new Subject<DashboardLesson[]>();

    dashboardSearchService.searchLessons
      .mockReturnValueOnce(firstRequest.asObservable())
      .mockReturnValueOnce(latestRequest.asObservable());

    typeQuery('signal');
    await wait(350);
    fixture.detectChanges();

    typeQuery('signals');
    await wait(350);
    fixture.detectChanges();

    expect(dashboardSearchService.searchLessons).toHaveBeenNthCalledWith(1, 'signal', 'all');
    expect(dashboardSearchService.searchLessons).toHaveBeenNthCalledWith(2, 'signals', 'all');
    expect(firstRequest.observed).toBe(false);

    latestRequest.next(liveResults);
    latestRequest.complete();
    fixture.detectChanges();

    expectOnlyState('results-state');
    expect(getText('summary-query')).toBe('Latest query: signals');
  });

  it('should refresh the current filters and replace the visible results', async () => {
    dashboardSearchService.searchLessons
      .mockReturnValueOnce(of(liveResults))
      .mockReturnValueOnce(of(refreshedResults));

    typeQuery('dashboard');
    await wait(350);
    fixture.detectChanges();

    click('refresh-btn');
    await wait(30);
    fixture.detectChanges();

    expect(dashboardSearchService.searchLessons).toHaveBeenNthCalledWith(1, 'dashboard', 'all');
    expect(dashboardSearchService.searchLessons).toHaveBeenNthCalledWith(2, 'dashboard', 'all');
    expect(getAll('lesson-title')).toEqual(['Dashboard Refresh Review']);
    expect(getText('detail-title')).toBe('Dashboard Refresh Review');
  });

  it('should show the error state and clear stale results when the request fails', async () => {
    dashboardSearchService.searchLessons
      .mockReturnValueOnce(of(liveResults))
      .mockReturnValueOnce(throwError(() => new Error('Search sync failed')));

    typeQuery('signals');
    await wait(350);
    fixture.detectChanges();
    expectOnlyState('results-state');

    click('refresh-btn');
    await wait(30);
    fixture.detectChanges();

    expectOnlyState('error-state');
    expect(host.querySelector('[data-testid^="lesson-card-"]')).toBeNull();
  });

  function typeQuery(value: string): void {
    const input = getInput();

    expect(input).toBeTruthy();
    if (input) {
      input.value = value;
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
    }
  }

  function changeStatus(value: string): void {
    const select = host.querySelector('[data-testid="status-filter"]') as HTMLSelectElement | null;

    expect(select).toBeTruthy();
    if (select) {
      select.value = value;
      select.dispatchEvent(new Event('change'));
      fixture.detectChanges();
    }
  }

  function click(testId: string): void {
    const button = host.querySelector(`[data-testid="${testId}"]`) as HTMLButtonElement | null;

    expect(button).toBeTruthy();
    button?.click();
    fixture.detectChanges();
  }

  function getInput(): HTMLInputElement | null {
    return host.querySelector('[data-testid="search-input"]') as HTMLInputElement | null;
  }

  function getText(testId: string): string {
    const element = host.querySelector(`[data-testid="${testId}"]`);

    expect(element).toBeTruthy();
    return element?.textContent?.trim() ?? '';
  }

  function getAll(testId: string): string[] {
    return Array.from(host.querySelectorAll(`[data-testid="${testId}"]`)).map(
      (element) => element.textContent?.trim() ?? '',
    );
  }

  function expectOnlyState(activeTestId: string): void {
    const allStates = ['idle-state', 'searching-state', 'empty-state', 'error-state', 'results-state'];

    for (const state of allStates) {
      const element = host.querySelector(`[data-testid="${state}"]`);

      if (state === activeTestId) {
        expect(element).toBeTruthy();
      } else {
        expect(element).toBeNull();
      }
    }
  }

  function wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
});
