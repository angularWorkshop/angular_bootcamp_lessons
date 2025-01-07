import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProductListComponent } from './product-list/product-list.component';
import { FormsModule } from '@angular/forms';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display the initial list of products', () => {
    const productItems = fixture.debugElement.queryAll(By.css('li'));
    expect(productItems.length).toBe(2);
    expect(productItems[0].nativeElement.textContent).toContain('Product 1');
    expect(productItems[1].nativeElement.textContent).toContain('Product 2');
  });

  it('should display a message if the product list is empty', () => {
    component.products = [];
    fixture.detectChanges();

    const emptyMessageElem = fixture.debugElement.query(By.css('.empty-list'));
    expect(emptyMessageElem).toBeTruthy();
    expect(emptyMessageElem.nativeElement.textContent).toContain('The product list is empty');
  });

  it('should add a new product when valid values are provided', () => {
    component.newProductName = 'Product 3';
    component.newProductPrice = 300;
    component.addProduct();
    fixture.detectChanges();

    const productItems = fixture.debugElement.queryAll(By.css('li'));
    expect(productItems.length).toBe(3);
    expect(productItems[2].nativeElement.textContent).toContain('Product 3');
    expect(productItems[2].nativeElement.textContent).toContain('$300.00');
  });

  it('should not add a product if the fields are empty', () => {
    component.newProductName = '';
    component.newProductPrice = null;
    component.addProduct();
    fixture.detectChanges();

    const productItems = fixture.debugElement.queryAll(By.css('li'));
    expect(productItems.length).toBe(2);
  });

  it('should display the price in USD', () => {
    component.products = [{ name: 'Test', price: 1234.56 }];
    fixture.detectChanges();

    const productItem = fixture.debugElement.query(By.css('li')).nativeElement;
    expect(productItem.textContent).toMatch(/\$1,234.56/);
  });
});