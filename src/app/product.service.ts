import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly products: Product[] = [
    { id: 1, name: 'Laptop Pro', price: 1299, description: 'High-performance laptop' },
    { id: 2, name: 'Wireless Mouse', price: 49, description: 'Ergonomic wireless mouse' },
    { id: 3, name: 'USB-C Hub', price: 79, description: '7-in-1 USB-C hub' },
  ];

  async getProduct(id: number): Promise<Product> {
    const product = this.products.find(p => p.id === id);
    if (!product) throw new Error(`Product ${id} not found`);
    return product;
  }
}
