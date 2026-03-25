import { Component } from '@angular/core';

@Component({
  selector: 'app-heavy-table',
  template: `
    <section class="heavy" data-testid="heavy-table">
      <h2>Sales Table</h2>
      <table>
        <thead>
          <tr><th>Product</th><th>Units</th><th>Revenue</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of rows">
            <td>{{ row.product }}</td>
            <td>{{ row.units }}</td>
            <td>{{ row.revenue }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
})
export class HeavyTableComponent {
  protected readonly rows = [
    { product: 'Starter Kit', units: 34, revenue: '$3,400' },
    { product: 'Pro Pack', units: 21, revenue: '$5,250' },
    { product: 'Enterprise', units: 9, revenue: '$9,900' },
  ];
}
