import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AppComponent } from './app.component';
import { TableStateFacadeService } from './table-state/table-state-facade.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;
  let queryParams$: BehaviorSubject<ReturnType<typeof convertToParamMap>>;
  let router: { navigate: jest.Mock };

  beforeEach(async () => {
    queryParams$ = new BehaviorSubject(convertToParamMap({ search: 'billing', status: 'Live', sort: 'title', page: '1' }));
    router = { navigate: jest.fn() };

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        TableStateFacadeService,
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: { queryParamMap: queryParams$.asObservable() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should hydrate the table from query params', () => {
    expect((host.querySelector('[data-testid="search-input"]') as HTMLInputElement).value).toBe('billing');
    expect(getText('status-label')).toBe('Status Live');
    expect(query('row-row-1')).toBeTruthy();
  });

  it('should sync a search change into the router state', () => {
    setInputValue('search-input', 'shipping');
    expect(router.navigate).toHaveBeenCalledWith([], { queryParams: { search: 'shipping', status: 'Live', sort: 'title', page: 1 } });
  });

  it('should sync a status change into the router state', () => {
    const select = host.querySelector('[data-testid="status-select"]') as HTMLSelectElement;
    select.value = 'Draft';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith([], { queryParams: { search: 'billing', status: 'Draft', sort: 'title', page: 1 } });
  });

  it('should keep sort and page in the same URL contract', () => {
    click('sort-owner');
    click('next-page');
    expect(router.navigate).toHaveBeenLastCalledWith([], { queryParams: { search: 'billing', status: 'Live', sort: 'owner', page: 2 } });
  });

  function setInputValue(testId: string, value: string): void {
    const input = host.querySelector(`[data-testid="${testId}"]`) as HTMLInputElement;
    input.value = value;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  function click(testId: string): void {
    const element = query(testId) as HTMLButtonElement | null;
    expect(element).toBeTruthy();
    element?.click();
    fixture.detectChanges();
  }

  function query(testId: string): HTMLElement | null {
    return host.querySelector(`[data-testid="${testId}"]`);
  }

  function getText(testId: string): string {
    const element = query(testId);
    expect(element).toBeTruthy();
    return element?.textContent?.trim() ?? '';
  }
});
