import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';

function getText(el: HTMLElement, testId: string): string {
  const target = el.querySelector(`[data-testid="${testId}"]`);
  return target ? target.textContent!.trim() : '';
}

function typeInInput(fixture: ComponentFixture<any>, value: string): void {
  const input: HTMLInputElement | null = fixture.nativeElement.querySelector('[data-testid="search-input"]');
  if (input) {
    input.value = value;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick(); // flush effect from toObservable
    fixture.detectChanges();
  }
}

describe('Exercise 29.2 — toObservable: Signal to RxJS', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the title "Live Search"', () => {
    expect(getText(fixture.nativeElement, 'title')).toBe('Live Search');
  });

  it('should render search input', () => {
    const input = fixture.nativeElement.querySelector('[data-testid="search-input"]');
    expect(input).toBeTruthy();
  });

  it('should show empty search term by default', () => {
    expect(getText(fixture.nativeElement, 'search-term')).toBe('Search:');
  });

  it('should not update search term when query is shorter than 2 chars', fakeAsync(() => {
    typeInInput(fixture, 'a');
    expect(getText(fixture.nativeElement, 'search-term')).toBe('Search:');
  }));

  it('should update search term when query has 2 or more chars', fakeAsync(() => {
    typeInInput(fixture, 'an');
    expect(getText(fixture.nativeElement, 'search-term')).toBe('Search: an');
  }));

  it('should show matching results for query "an" (Angular)', fakeAsync(() => {
    typeInInput(fixture, 'an');
    const results = fixture.nativeElement.querySelectorAll('.result-item');
    expect(results.length).toBe(1);
  }));

  it('should show result count', fakeAsync(() => {
    typeInInput(fixture, 'an');
    expect(getText(fixture.nativeElement, 'result-count')).toBe('Results: 1');
  }));

  it('should find "Angular" with query "ang"', fakeAsync(() => {
    typeInInput(fixture, 'ang');
    const result = fixture.nativeElement.querySelector('.result-item [data-testid="result-name"]');
    expect(result?.textContent?.trim()).toBe('Angular');
  }));

  it('should find "Svelte" with query "sv"', fakeAsync(() => {
    typeInInput(fixture, 'sv');
    const result = fixture.nativeElement.querySelector('.result-item [data-testid="result-name"]');
    expect(result?.textContent?.trim()).toBe('Svelte');
  }));

  it('should show 0 results when query yields no matches', fakeAsync(() => {
    typeInInput(fixture, 'xyz');
    expect(getText(fixture.nativeElement, 'result-count')).toBe('Results: 0');
  }));

  it('should show 0 results when query is cleared after a search', fakeAsync(() => {
    typeInInput(fixture, 'vu');
    expect(getText(fixture.nativeElement, 'result-count')).not.toBe('Results: 0');

    typeInInput(fixture, '');
    expect(getText(fixture.nativeElement, 'result-count')).toBe('Results: 0');
  }));
});
