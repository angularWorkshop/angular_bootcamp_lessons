import { Component } from '@angular/core';

interface ProductCard {
  name: string;
  price: number;
  releasedAt: string;
  description: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly products: ProductCard[] = [
    {
      name: 'Team dashboard',
      price: 1249.9,
      releasedAt: '2025-11-03T00:00:00Z',
      description: 'Project cockpit with widgets and quick actions.',
    },
    {
      name: 'Billing analytics',
      price: 780,
      releasedAt: '2025-07-19T00:00:00Z',
      description: 'Invoice insights with payment trend highlights.',
    },
    {
      name: 'Audit timeline',
      price: 99.5,
      releasedAt: '2024-12-12T00:00:00Z',
      description: 'Chronological activity feed for compliance checks.',
    },
  ];
}
