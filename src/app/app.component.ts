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

  protected readonly verifyStepTitle = 'Verify root component';
  protected readonly verifyStepDescription =
    'Keep AppComponent mounted through the stable `app-root` selector and confirm the first screen is visible.';
}
