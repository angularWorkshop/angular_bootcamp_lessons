import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';

function tryImport(paths: string[]): any {
  for (const p of paths) {
    try { return require(p); } catch {}
  }
  return null;
}

let CategoryFilterComponent: any;

beforeAll(() => {
  const mod = tryImport(['./category-filter.component']);
  CategoryFilterComponent = mod?.CategoryFilterComponent;
});

function getText(el: HTMLElement, testId: string): string {
  const target = el.querySelector(`[data-testid="${testId}"]`);
  return target ? target.textContent!.trim() : '';
}

function getAll(el: HTMLElement, testId: string): HTMLElement[] {
  return Array.from(el.querySelectorAll(`[data-testid="${testId}"]`));
}

function click(fixture: ComponentFixture<any>, testId: string): void {
  const el = fixture.nativeElement.querySelector(`[data-testid="${testId}"]`);
  el?.click();
  fixture.detectChanges();
}

describe('Exercise 27.2 — Signal Outputs', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    const imports: any[] = [CommonModule];
    if (CategoryFilterComponent) imports.push(CategoryFilterComponent);

    await TestBed.configureTestingModule({
      imports,
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the title "Product Catalog"', () => {
    expect(getText(fixture.nativeElement, 'title')).toBe('Product Catalog');
  });

  it('should show "All products" by default', () => {
    expect(getText(fixture.nativeElement, 'selected-category')).toBe('All products');
  });

  it('should show filter change count as 0 initially', () => {
    expect(getText(fixture.nativeElement, 'change-count')).toContain('0');
  });

  // --- CategoryFilterComponent ---

  it('CategoryFilterComponent should exist', () => {
    expect(CategoryFilterComponent).toBeTruthy();
  });

  it('CategoryFilterComponent should be standalone', () => {
    const cmpDef = (CategoryFilterComponent as any)?.ɵcmp;
    expect(cmpDef?.standalone !== false).toBe(true);
  });

  it('CategoryFilterComponent should declare "categories" as an input', () => {
    if (!CategoryFilterComponent) return pending('CategoryFilterComponent not found');
    const cmpDef = (CategoryFilterComponent as any).ɵcmp;
    expect(cmpDef.inputs?.categories).toBeTruthy();
  });

  it('CategoryFilterComponent should declare "selected" as an output', () => {
    if (!CategoryFilterComponent) return pending('CategoryFilterComponent not found');
    const cmpDef = (CategoryFilterComponent as any).ɵcmp;
    expect(cmpDef.outputs?.selected).toBeTruthy();
  });

  it('CategoryFilterComponent should declare "cleared" as an output', () => {
    if (!CategoryFilterComponent) return pending('CategoryFilterComponent not found');
    const cmpDef = (CategoryFilterComponent as any).ɵcmp;
    expect(cmpDef.outputs?.cleared).toBeTruthy();
  });

  // --- Rendered filter ---

  it('should render 4 category buttons', () => {
    const buttons = ['Electronics', 'Books', 'Clothing', 'Sports'];
    buttons.forEach(name => {
      const btn = fixture.nativeElement.querySelector(`[data-testid="category-${name}"]`);
      expect(btn).toBeTruthy();
    });
  });

  it('should render clear button', () => {
    const btn = fixture.nativeElement.querySelector('[data-testid="clear-btn"]');
    expect(btn).toBeTruthy();
  });

  it('should select a category when button is clicked', () => {
    click(fixture, 'category-Electronics');
    expect(getText(fixture.nativeElement, 'selected-category')).toBe('Electronics');
  });

  it('should increment change count on each selection', () => {
    click(fixture, 'category-Books');
    click(fixture, 'category-Clothing');
    expect(getText(fixture.nativeElement, 'change-count')).toContain('2');
  });

  it('should reset to "All products" when clear is clicked', () => {
    click(fixture, 'category-Sports');
    click(fixture, 'clear-btn');
    expect(getText(fixture.nativeElement, 'selected-category')).toBe('All products');
  });

  it('should increment change count on clear too', () => {
    click(fixture, 'category-Electronics');
    click(fixture, 'clear-btn');
    expect(getText(fixture.nativeElement, 'change-count')).toContain('2');
  });
});
