import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';

function getText(el: HTMLElement, testId: string): string {
  const target = el.querySelector(`[data-testid="${testId}"]`);
  return target ? target.textContent!.trim() : '';
}

function click(fixture: ComponentFixture<any>, testId: string): void {
  const el = fixture.nativeElement.querySelector(`[data-testid="${testId}"]`);
  el?.click();
  fixture.detectChanges();
}

function getInput(fixture: ComponentFixture<any>): HTMLInputElement | null {
  return fixture.nativeElement.querySelector('[data-testid="edit-input"]');
}

function typeInInput(fixture: ComponentFixture<any>, value: string): void {
  const input = getInput(fixture);
  if (input) {
    input.value = value;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }
}

describe('Exercise 28.2 — linkedSignal for State Reset', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  // --- Basic rendering ---

  it('should create the app component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the title "Product Editor"', () => {
    expect(getText(fixture.nativeElement, 'title')).toBe('Product Editor');
  });

  it('should render 3 product buttons', () => {
    for (const id of ['1', '2', '3']) {
      const btn = fixture.nativeElement.querySelector(`[data-testid="product-${id}"]`);
      expect(btn).toBeTruthy();
    }
  });

  it('should highlight first product as active by default', () => {
    const btn = fixture.nativeElement.querySelector('[data-testid="product-1"]');
    expect(btn?.classList.contains('active')).toBe(true);
  });

  it('should render the edit input', () => {
    const input = getInput(fixture);
    expect(input).toBeTruthy();
  });

  // --- Default state ---

  it('should show "Editing: Laptop" by default', () => {
    expect(getText(fixture.nativeElement, 'editing-display')).toBe('Editing: Laptop');
  });

  it('should show "Original: Laptop" by default', () => {
    expect(getText(fixture.nativeElement, 'original-display')).toBe('Original: Laptop');
  });

  it('should NOT show modified badge by default', () => {
    const badge = fixture.nativeElement.querySelector('[data-testid="modified-badge"]');
    expect(badge).toBeFalsy();
  });

  // --- Local editing ---

  it('should update editing display when typing', () => {
    typeInInput(fixture, 'Gaming Laptop');
    expect(getText(fixture.nativeElement, 'editing-display')).toBe('Editing: Gaming Laptop');
  });

  it('should show modified badge after local edit', () => {
    typeInInput(fixture, 'Gaming Laptop');
    const badge = fixture.nativeElement.querySelector('[data-testid="modified-badge"]');
    expect(badge).toBeTruthy();
  });

  it('should still show original name after local edit', () => {
    typeInInput(fixture, 'Gaming Laptop');
    expect(getText(fixture.nativeElement, 'original-display')).toBe('Original: Laptop');
  });

  // --- Switching products (linkedSignal reset) ---

  it('should reset editName when selecting a different product', () => {
    typeInInput(fixture, 'Modified Name');
    click(fixture, 'product-2');
    expect(getText(fixture.nativeElement, 'editing-display')).toBe('Editing: Phone');
  });

  it('should update original name when selecting a different product', () => {
    click(fixture, 'product-3');
    expect(getText(fixture.nativeElement, 'original-display')).toBe('Original: Tablet');
  });

  it('should highlight selected product button', () => {
    click(fixture, 'product-2');
    const btn1 = fixture.nativeElement.querySelector('[data-testid="product-1"]');
    const btn2 = fixture.nativeElement.querySelector('[data-testid="product-2"]');
    expect(btn1?.classList.contains('active')).toBe(false);
    expect(btn2?.classList.contains('active')).toBe(true);
  });

  it('should hide modified badge after switching products', () => {
    typeInInput(fixture, 'Changed');
    click(fixture, 'product-2');
    const badge = fixture.nativeElement.querySelector('[data-testid="modified-badge"]');
    expect(badge).toBeFalsy();
  });

  it('should allow local edits after switching products', () => {
    click(fixture, 'product-2');
    typeInInput(fixture, 'Smartphone');
    expect(getText(fixture.nativeElement, 'editing-display')).toBe('Editing: Smartphone');
    const badge = fixture.nativeElement.querySelector('[data-testid="modified-badge"]');
    expect(badge).toBeTruthy();
  });

  // --- linkedSignal verification ---

  it('should use linkedSignal (editName is writable and resets on source change)', () => {
    // 1. Verify local write works
    typeInInput(fixture, 'Custom');
    expect(getText(fixture.nativeElement, 'editing-display')).toBe('Editing: Custom');

    // 2. Verify reset on source change
    click(fixture, 'product-3');
    expect(getText(fixture.nativeElement, 'editing-display')).toBe('Editing: Tablet');

    // 3. Verify local write still works after reset
    typeInInput(fixture, 'iPad');
    expect(getText(fixture.nativeElement, 'editing-display')).toBe('Editing: iPad');
  });
});
