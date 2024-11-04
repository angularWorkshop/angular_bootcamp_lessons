import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProductListComponent } from './product-list/product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('должен отображать сообщение "Нет доступных продуктов", если список пуст', () => {
    component.products = [];
    fixture.detectChanges();
    const noProductsMessage = fixture.debugElement.query(By.css('p'));
    expect(noProductsMessage.nativeElement.textContent).toContain('Нет доступных продуктов');
  });

  it('должен отображать список продуктов, если в массиве products есть элементы', () => {
    component.products = [
      { name: 'Продукт 1', description: 'Описание продукта 1', showDescription: false },
      { name: 'Продукт 2', description: 'Описание продукта 2', showDescription: false }
    ];
    fixture.detectChanges();
    const productItems = fixture.debugElement.queryAll(By.css('li'));
    expect(productItems.length).toBe(2);
  });

  it('должен отображать описание продукта при нажатии на кнопку "Показать описание"', () => {
    component.products = [
      { name: 'Продукт 1', description: 'Описание продукта 1', showDescription: false }
    ];
    fixture.detectChanges();
    const toggleButton = fixture.debugElement.query(By.css('button')).nativeElement;
    toggleButton.click();
    fixture.detectChanges();
    const description = fixture.debugElement.query(By.css('p'));
    expect(description.nativeElement.textContent).toContain('Описание продукта 1');
  });
});
