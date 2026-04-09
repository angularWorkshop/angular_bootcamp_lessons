import { Component } from '@angular/core';
import { RuntimeConfigService } from './runtime-config.service';
import { TelemetryService } from './telemetry.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected errorMessage = '';

  public constructor(
    protected readonly runtime: RuntimeConfigService,
    protected readonly telemetry: TelemetryService,
  ) {}

  protected trackPrimaryAction(): void {
    this.telemetry.capture('experimental_action_clicked', { env: this.runtime.environment });
  }

  protected trackError(): void {
    this.errorMessage = 'The feature action failed.';
    this.telemetry.capture('experimental_action_failed', { reason: 'manual-test' });
  }
}
