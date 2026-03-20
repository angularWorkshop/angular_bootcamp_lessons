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

    expect(heading?.textContent?.trim()).toBe('Product Catalog');
  });

  it('should show only empty state initially', () => {
    expectOnlyState('empty-state');
  });

  it('should show only loading state after clicking Load', () => {
    clickButton('loading-btn');

    expectOnlyState('loading-state');
  });

  it('should show only success state with 3 products after clicking Show Data', () => {
    clickButton('success-btn');

    expectOnlyState('success-state');

    const items = host.querySelectorAll('[data-testid="product-item"]');
    expect(items.length).toBe(3);
  });

  it('should render correct product names', () => {
    clickButton('success-btn');

    const names = getAll('product-name');
    expect(names).toEqual(['Laptop', 'Keyboard', 'Monitor']);
  });

  it('should render correct product prices', () => {
    clickButton('success-btn');

    const prices = getAll('product-price');
    expect(prices).toEqual(['$1200', '$85', '$450']);
  });

  it('should show only empty state after clicking Show Empty', () => {
    clickButton('success-btn');
    clickButton('empty-btn');

    expectOnlyState('empty-state');
  });

  it('should show only error state after clicking Show Error', () => {
    clickButton('error-btn');

    expectOnlyState('error-state');
  });

  it('should transition from error to loading', () => {
    clickButton('error-btn');
    clickButton('loading-btn');

    expectOnlyState('loading-state');
  });

  it('should transition from loading to success', () => {
    clickButton('loading-btn');
    clickButton('success-btn');

    expectOnlyState('success-state');
  });

  it('should use a single state property, not multiple booleans', () => {
    const component = fixture.componentInstance as any;

    expect(component.state).toBeDefined();
    expect(component.isLoading).toBeUndefined();
    expect(component.hasError).toBeUndefined();
  });

  function clickButton(testId: string): void {
    const btn = host.querySelector(`[data-testid="${testId}"]`) as HTMLButtonElement | null;

    expect(btn).toBeTruthy();
    btn?.click();
    fixture.detectChanges();
  }

  function expectOnlyState(activeTestId: string): void {
    const allStates = ['loading-state', 'error-state', 'empty-state', 'success-state'];

    for (const state of allStates) {
      const el = host.querySelector(`[data-testid="${state}"]`);

      if (state === activeTestId) {
        expect(el).toBeTruthy();
      } else {
        expect(el).toBeNull();
      }
    }
  }

  function getAll(testId: string): string[] {
    return Array.from(host.querySelectorAll(`[data-testid="${testId}"]`)).map(
      el => el.textContent?.trim() ?? '',
    );
  }
});
