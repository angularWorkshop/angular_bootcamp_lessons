import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly ssrChecklist = [
    '@angular/ssr configured',
    'server returns ready HTML',
    'client hydrates without mismatches',
  ];
}
