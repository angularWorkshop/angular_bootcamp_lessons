import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="dashboard" data-testid="dashboard">
      <div class="dashboard__header">
        <p class="dashboard__eyebrow">Migration checkpoint</p>
        <h2 class="dashboard__title" data-testid="dashboard-title">Dashboard</h2>
        <p class="dashboard__text">
          This standalone screen is ready, but the legacy activity widget is still disconnected.
        </p>
      </div>

      <div class="dashboard__placeholder" data-testid="integration-status">
        Legacy widget not connected yet
      </div>
    </section>
  `,
  styles: [
    `
      .dashboard {
        display: grid;
        gap: 24px;
      }

      .dashboard__eyebrow {
        margin: 0 0 8px;
        color: #c2410c;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .dashboard__title {
        margin: 0 0 12px;
        font-size: 32px;
      }

      .dashboard__text {
        margin: 0;
        max-width: 60ch;
        line-height: 1.5;
      }

      .dashboard__placeholder {
        padding: 24px;
        border: 2px dashed #fb923c;
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.8);
        color: #9a3412;
        font-weight: 600;
      }
    `,
  ],
})
export class DashboardComponent {}
