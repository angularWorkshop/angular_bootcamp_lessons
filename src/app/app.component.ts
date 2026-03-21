import { Component } from '@angular/core';
import { ReleaseHealthService, ReleaseSnapshot } from './release-health.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly scenarios: ReleaseSnapshot[] = [
    {
      name: 'Checkout polish',
      environment: 'dev',
      blockers: 0,
      warnings: 0,
      reviewers: ['Mia'],
    },
    {
      name: 'Billing sync',
      environment: 'staging',
      blockers: 0,
      warnings: 2,
      reviewers: ['Alex', 'Nina'],
    },
    {
      name: 'Access audit',
      environment: 'prod',
      blockers: 1,
      warnings: 0,
      reviewers: [],
    },
  ];

  constructor(protected readonly releaseHealthService: ReleaseHealthService) {}
}
