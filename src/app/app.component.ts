import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FakeChart } from './fake-chart';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  @ViewChild('chartHost', { static: true }) chartHost?: ElementRef<HTMLElement>;

  chartStatus = 'idle';
  private chartInstance?: FakeChart;

  ngAfterViewInit(): void {
    const host = this.chartHost?.nativeElement;
    if (!host) {
      return;
    }

    // TODO: move DOM integration to afterNextRender + browser guard.
    const viewportWidth = window.innerWidth;
    this.chartInstance = new FakeChart(host, viewportWidth);
  }
}
