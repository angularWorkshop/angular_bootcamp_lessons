import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected actionClicks = 0;

  protected handleAction(): void {
    this.actionClicks += 1;
  }
}
