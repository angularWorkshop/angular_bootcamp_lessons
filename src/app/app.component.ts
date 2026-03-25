import { isPlatformBrowser } from '@angular/common';
import { Component, OnDestroy, PLATFORM_ID, afterNextRender, inject, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);

  readonly viewportWidth = signal<number | null>(null);
  readonly resizeEvents = signal(0);
  private hasResizeListener = false;

  private readonly onResize = () => {
    this.viewportWidth.set(window.innerWidth);
    this.resizeEvents.update((value) => value + 1);
  };

  private readonly scheduleBrowserInit = afterNextRender(() => {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (!this.hasResizeListener) {
      this.onResize();
      window.addEventListener('resize', this.onResize);
      this.hasResizeListener = true;
    }
  });

  ngOnDestroy() {
    if (!this.hasResizeListener) {
      return;
    }

    window.removeEventListener('resize', this.onResize);
    this.hasResizeListener = false;
  }
}
