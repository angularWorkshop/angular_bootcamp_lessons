import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected runtime = { production: true, debugToolsEnabled: true, apiBaseUrl: '' };
  protected errorSurface = '';
  protected smokeStatus = 'unknown';

  protected runHardeningCheck(): void {
    // TODO: hide debug tools in production, surface broken config, and compute a smoke status.
  }
}
