import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ProductService } from './product.service';

function getText(el: HTMLElement, testId: string): string {
  const target = el.querySelector(`[data-testid="${testId}"]`);
  return target ? target.textContent!.trim() : '';
}

function click(fixture: ComponentFixture<any>, testId: string): void {
  const el = fixture.nativeElement.querySelector(`[data-testid="${testId}"]`);
  el?.click();
  fixture.detectChanges();
}

describe('Exercise 29.3 — resource() for Data Loading', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [ProductService],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
  });

  it('should create the app component', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the title "Product Viewer"', () => {
    fixture.detectChanges();
    expect(getText(fixture.nativeElement, 'title')).toBe('Product Viewer');
  });

  it('should render 3 product buttons', () => {
    fixture.detectChanges();
    for (const id of [1, 2, 3]) {
      const btn = fixture.nativeElement.querySelector(`[data-testid="product-btn-${id}"]`);
      expect(btn).toBeTruthy();
    }
  });

  it('should highlight first product as active', () => {
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('[data-testid="product-btn-1"]');
    expect(btn?.classList.contains('active')).toBe(true);
  });

  it('should load first product data', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(getText(fixture.nativeElement, 'product-name')).toBe('Laptop Pro');
    expect(getText(fixture.nativeElement, 'product-price')).toBe('Price: $1299');
  }));

  it('should show product description', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(getText(fixture.nativeElement, 'product-description')).toBe('High-performance laptop');
  }));

  it('should load different product when button clicked', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    click(fixture, 'product-btn-2');
    tick();
    fixture.detectChanges();

    expect(getText(fixture.nativeElement, 'product-name')).toBe('Wireless Mouse');
    expect(getText(fixture.nativeElement, 'product-price')).toBe('Price: $49');
  }));

  it('should update active button when switching', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    click(fixture, 'product-btn-3');
    tick();
    fixture.detectChanges();

    const btn1 = fixture.nativeElement.querySelector('[data-testid="product-btn-1"]');
    const btn3 = fixture.nativeElement.querySelector('[data-testid="product-btn-3"]');
    expect(btn1?.classList.contains('active')).toBe(false);
    expect(btn3?.classList.contains('active')).toBe(true);
  }));

  it('should render reload button', () => {
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('[data-testid="reload-btn"]');
    expect(btn).toBeTruthy();
  });

  it('should render status display', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const status = getText(fixture.nativeElement, 'status');
    // After loading, status should contain something (resolved, etc.)
    expect(status.length).toBeGreaterThan(0);
  }));
});
