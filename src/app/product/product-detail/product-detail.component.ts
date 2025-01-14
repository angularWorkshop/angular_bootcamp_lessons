import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  public productId: number | null = null;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
  }
}
