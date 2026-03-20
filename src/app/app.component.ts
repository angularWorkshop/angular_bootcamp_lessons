import { Component } from '@angular/core';

interface LaunchStep {
  readonly label: string;
  readonly description: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = 'Angular Launch Checklist';
  protected readonly subtitle = 'Prepare the starter project before building features.';
  protected readonly environmentLabel = 'Starter project';

  // The lesson branch leaves one launch step out on purpose.
  protected readonly steps: LaunchStep[] = [
    {
      label: 'Project scaffold',
      description: 'Create the Angular workspace and keep the default root component available.',
    },
    {
      label: 'Dev server',
      description: 'Start the app locally and verify the browser can render the shell.',
    },
  ];
}
