import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected ready = false;

  protected isReady(): boolean {
    return this.ready;
  }

  protected enableReady(): void {
    this.ready = true;
  }
}
