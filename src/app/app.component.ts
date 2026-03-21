import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly notes = [
    'GET /api/release-queue',
    'POST /api/release-queue/:id/retry',
    'Map blockers and warnings into UI-friendly status labels',
  ];
}
