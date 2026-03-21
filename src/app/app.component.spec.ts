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

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the testing title and all three release cards initially', () => {
    expect(getText('dom-title')).toBe('Release Board DOM Testing Lab');
    expect(host.querySelectorAll('[data-testid^="card-"]').length).toBe(3);
  });

  it('should show only blocked releases after clicking the blocked filter', () => {
    click('filter-blocked');

    expect(host.querySelectorAll('[data-testid^="card-"]').length).toBe(1);
    expect(cardTitles()).toEqual(['TODO']);
    expect(isActive('filter-blocked')).toBe(false);
  });

  it('should filter cards by search query from the input field', () => {
    typeSearch('mia');

    expect(cardTitles()).toEqual(['TODO']);
  });

  it('should render an empty state when filters hide every release card', () => {
    click('filter-ready');
    typeSearch('nina');

    expect(getText('empty-state')).toBe('TODO');
  });

  function click(testId: string): void {
    const button = host.querySelector(`[data-testid="${testId}"]`) as HTMLButtonElement | null;

    expect(button).toBeTruthy();
    button?.click();
    fixture.detectChanges();
  }

  function typeSearch(value: string): void {
    const input = host.querySelector('[data-testid="search-input"]') as HTMLInputElement | null;

    expect(input).toBeTruthy();
    if (input) {
      input.value = value;
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
    }
  }

  function getText(testId: string): string {
    const element = host.querySelector(`[data-testid="${testId}"]`);

    expect(element).toBeTruthy();
    return element?.textContent?.trim() ?? '';
  }

  function cardTitles(): string[] {
    return Array.from(host.querySelectorAll('.card h2')).map((element) => element.textContent?.trim() ?? '');
  }

  function isActive(testId: string): boolean {
    const button = host.querySelector(`[data-testid="${testId}"]`);

    return button?.classList.contains('active') ?? false;
  }
});
