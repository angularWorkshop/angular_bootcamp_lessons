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
    this.errorSurface = this.runtime.apiBaseUrl ? '' : 'API base URL is missing.';
    this.runtime.debugToolsEnabled = this.runtime.production ? false : this.runtime.debugToolsEnabled;
    this.smokeStatus = !this.runtime.apiBaseUrl || (this.runtime.production && this.runtime.debugToolsEnabled) ? 'blocked' : 'ready';
  }
}
