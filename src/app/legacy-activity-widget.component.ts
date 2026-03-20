import { Component } from '@angular/core';

@Component({
  selector: 'app-legacy-activity-widget',
  template: `
    <section class="legacy-widget" data-testid="legacy-widget">
      <div class="legacy-widget__header">
        <h3 data-testid="legacy-widget-title">Legacy Activity</h3>
        <button type="button" data-testid="sync-button">Sync status</button>
      </div>

      <ul class="legacy-widget__list" data-testid="activity-list">
        <li *ngFor="let item of items">
          <strong>{{ item.label }}</strong>
          <span>{{ item.status }}</span>
        </li>
      </ul>
    </section>
  `,
  styles: [
    `
      .legacy-widget {
        padding: 24px;
        border-radius: 18px;
        background: white;
        box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);
      }

      .legacy-widget__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 16px;
      }

      .legacy-widget__header h3 {
        margin: 0;
      }

      .legacy-widget__list {
        display: grid;
        gap: 12px;
        margin: 0;
        padding: 0;
        list-style: none;
      }

      .legacy-widget__list li {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        padding: 12px 14px;
        border-radius: 14px;
        background: #fff7ed;
      }
    `,
  ],
})
export class LegacyActivityWidgetComponent {
  items = [
    { label: 'Content audit', status: 'Done' },
    { label: 'NgModule boundary', status: 'In review' },
    { label: 'Standalone host', status: 'Ready' },
  ];
}
