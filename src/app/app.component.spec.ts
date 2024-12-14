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

  it('должен отображать начальный список продуктов', () => {
    const productItems = fixture.debugElement.queryAll(By.css('li'));
    expect(productItems.length).toBe(2);
    expect(productItems[0].nativeElement.textContent).toContain('Продукт 1');
  });

  it('должен добавлять новый продукт в список', () => {
    component.newProductName = 'Продукт 3';
    component.newProductPrice = 300;
    component.addProduct();
    fixture.detectChanges();

    const productItems = fixture.debugElement.queryAll(By.css('li'));
    expect(productItems.length).toBe(3);
    expect(productItems[2].nativeElement.textContent).toContain('Продукт 3');
  });

  it('не должен добавлять продукт с пустым именем или ценой', () => {
    component.newProductName = '';
    component.newProductPrice = null;
    component.addProduct();
    fixture.detectChanges();

    const productItems = fixture.debugElement.queryAll(By.css('li'));
    expect(productItems.length).toBe(2);
  });
});