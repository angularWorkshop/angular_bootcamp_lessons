import { Component } from '@angular/core';

interface StarterBlock {
  readonly title: string;
  readonly text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = 'Angular Starter Workspace';
  protected readonly description = 'Replace the empty shell with a clear starting page for the rest of the course.';
  protected readonly ctaLabel = 'Continue to components';

  // The lesson branch keeps the starter page one block short.
  protected readonly blocks: StarterBlock[] = [
    {
      title: 'Build',
      text: 'Keep a visible place for the main app message and feature summary.',
    },
    {
      title: 'Inspect',
      text: 'Use the browser and the Angular files together to understand the project shape.',
    },
  ];
}
