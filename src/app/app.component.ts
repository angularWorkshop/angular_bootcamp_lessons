import { Component, computed, signal } from '@angular/core';
import { TelemetryService } from './telemetry.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly activeTab = signal('overview');
  protected readonly liveMessage = signal('');
  protected readonly secondaryVisible = signal(false);
  protected readonly telemetryReady = signal(false);
  protected readonly a11yReady = signal(false);
  protected readonly runtimeReady = signal(true);
  protected readonly budgetStatus = computed(() => this.secondaryVisible() ? 'extended' : 'primary-only');
  protected readonly releaseStatus = computed(() =>
    this.a11yReady() && this.telemetryReady() && this.runtimeReady() ? 'ready' : 'blocked',
  );

  public constructor(protected readonly telemetry: TelemetryService) {}

  protected persistLastTab(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('last-opened-tab', this.activeTab());
      this.liveMessage.set('Last opened tab was persisted safely.');
    }
  }

  protected markA11yReady(): void {
    this.a11yReady.set(true);
    this.liveMessage.set('Accessibility checks are ready.');
  }

  protected showSecondaryBlock(): void {
    this.secondaryVisible.set(true);
  }

  protected connectTelemetry(): void {
    this.telemetry.capture('release_hardening_ready', { tab: this.activeTab() });
    this.telemetryReady.set(true);
  }
}
