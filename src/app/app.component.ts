import { Component } from '@angular/core';
import { mapLegacyOrder } from './migration/legacy-order.adapter';
import { migrationPlan } from './migration/migration-plan';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly mappedOrder = mapLegacyOrder({
    order_id: 'legacy-1',
    order_title: 'Legacy billing flow',
    owner_name: 'Marta',
  });
  protected readonly firstPlanStep = migrationPlan[0];
}
