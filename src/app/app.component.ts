import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = 'Application Entry Flow';
  protected readonly summary = 'Trace how Angular moves from main.ts to the first rendered component.';

  protected readonly entryStageTitle = 'main.ts';
  protected readonly entryStageDetail =
    'The browser starts here and calls platformBrowserDynamic().bootstrapModule(AppModule).';

  protected readonly moduleStageTitle = 'AppModule';
  protected readonly moduleStageDetail =
    'The root module wires Angular dependencies and defines AppComponent as the bootstrap component.';

  // TODO: Replace the placeholder values with the final AppComponent stage.
  protected readonly renderStageTitle = 'TODO: add the final bootstrap stage';
  protected readonly renderStageDetail = '';
}
