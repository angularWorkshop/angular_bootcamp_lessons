import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = 'Standalone Components Lab';
  protected readonly intro = 'Connect small standalone building blocks before moving on to composition and inputs.';
}
