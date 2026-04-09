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
    // TODO: guard browser-only access for SSR-safe execution.
    localStorage.setItem('last-opened-tab', this.activeTab());
  }

  protected markA11yReady(): void {
    // TODO: update the accessibility state and live message.
  }

  protected showSecondaryBlock(): void {
    this.secondaryVisible.set(true);
  }

  protected connectTelemetry(): void {
    // TODO: capture a release-ready telemetry event and mark telemetry as ready.
  }
}
