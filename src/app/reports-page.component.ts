import { Component } from '@angular/core';

@Component({
  selector: 'app-reports-page',
  standalone: true,
  template: `
    <section class="page" data-testid="reports-page">
      <h2>Reports Page</h2>
      <p>This route should be lazy loaded via loadComponent.</p>
    </section>
  `,
})
export class ReportsPageComponent {}
