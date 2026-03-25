import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  afterNextRender,
  inject,
} from '@angular/core';
import { FakeChart } from './fake-chart';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);

  @ViewChild('chartHost', { static: true }) chartHost?: ElementRef<HTMLElement>;

  chartStatus = 'idle';
  private chartInstance?: FakeChart;

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      const host = this.chartHost?.nativeElement;
      if (!host) {
        return;
      }

      const hostWidth = host.clientWidth > 0 ? host.clientWidth : 320;
      this.chartInstance = new FakeChart(host, hostWidth);
      this.chartStatus = 'ready';
    });
  }

  ngOnDestroy() {
    this.chartInstance?.destroy();
    this.chartStatus = 'destroyed';
  }
}
