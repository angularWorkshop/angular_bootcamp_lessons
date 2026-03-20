import { Component } from '@angular/core';

interface BootstrapStage {
  readonly title: string;
  readonly detail: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = 'Application Entry Flow';
  protected readonly summary = 'Trace how Angular moves from main.ts to the first rendered component.';

  // The lesson branch intentionally omits the final render stage.
  protected readonly stages: BootstrapStage[] = [
    {
      title: 'main.ts',
      detail: 'The browser starts here and calls platformBrowserDynamic().bootstrapModule(AppModule).',
    },
    {
      title: 'AppModule',
      detail: 'The root module wires Angular dependencies and defines the bootstrap component.',
    },
  ];
}
