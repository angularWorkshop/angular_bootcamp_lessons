import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <section class="page">
      <h2 class="page__title" data-testid="dashboard-title">Dashboard</h2>
      <p class="page__text">Overview of your activity.</p>
    </section>
  `,
})
export class DashboardComponent {}
