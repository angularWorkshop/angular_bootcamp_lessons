import 'zone.js/testing';
import { TestBed } from '@angular/core/testing';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductModule } from './product.module';
import { RouterTestingModule } from '@angular/router/testing';
import 'reflect-metadata';

describe('Feature Module: ProductModule (Jest style)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ProductModule],
    }).compileComponents();
  });

  it('should allow to create ProductListComponent', () => {
    const fixture = TestBed.createComponent(ProductListComponent);
    const listComp = fixture.componentInstance;
    expect(listComp).toBeTruthy();
  });

  it('should allow to create ProductDetailComponent', () => {
    const fixture = TestBed.createComponent(ProductDetailComponent);
    const detailComp = fixture.componentInstance;
    expect(detailComp).toBeTruthy();
  });
});
