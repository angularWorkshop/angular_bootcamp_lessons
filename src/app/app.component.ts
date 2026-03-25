import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  readonly viewportWidth = signal<number | null>(null);
  readonly resizeEvents = signal(0);

  private readonly onResize = () => {
    this.viewportWidth.set(window.innerWidth);
    this.resizeEvents.update((value) => value + 1);
  };

  ngOnInit(): void {
    // TODO: move browser-only logic to afterNextRender + platform guard.
    this.viewportWidth.set(window.innerWidth);
    window.addEventListener('resize', this.onResize);
  }
}
