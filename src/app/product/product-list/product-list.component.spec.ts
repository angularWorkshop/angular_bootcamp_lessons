import 'zone.js/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ProductListComponent } from './product-list.component';

describe('ProductListComponent (Jest style)', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created without errors', () => {
    expect(component).toBeTruthy();
  });

  it('must contain an array of products', () => {
    expect(component.products).toBeDefined();
    expect(Array.isArray(component.products)).toBe(true);
  });

  it('must display at least one product', () => {
    const liElements = fixture.nativeElement.querySelectorAll('li');
    expect(liElements.length).toBeGreaterThanOrEqual(1);
  });
});
