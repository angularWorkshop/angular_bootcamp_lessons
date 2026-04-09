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
    // TODO: capture a telemetry event when the experimental action is used.
  }

  protected trackError(): void {
    this.errorMessage = 'The feature action failed.';
    // TODO: capture a telemetry error event with a reason.
  }
}
