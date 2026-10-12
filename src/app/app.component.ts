import { Component } from '@angular/core';
import { ShellCardComponent } from './shared/shell-card.component';

@Component({
  selector: 'app-root',
  imports: [ShellCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected actionClicks = 0;

  protected handleAction(): void {
    this.actionClicks += 1;
  }
}
