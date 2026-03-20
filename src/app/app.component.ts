import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = 'Angular App Initialization';
  protected readonly subtitle =
    'Create the starter workspace, run the dev server, and confirm the root Angular screen appears.';
  protected readonly environmentLabel = 'Starter project';

  protected readonly projectStepTitle = 'Create the project';
  protected readonly projectStepDescription =
    'Use Angular CLI to scaffold the workspace and keep the starter files in place.';

  protected readonly serveStepTitle = 'Run the dev server';
  protected readonly serveStepDescription =
    'Start `ng serve` and check that the browser opens the application shell.';

  // TODO: Replace the placeholder values with the final verification step.
  protected readonly verifyStepTitle = 'TODO: add the final setup step';
  protected readonly verifyStepDescription = '';
}
