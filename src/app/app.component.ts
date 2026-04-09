import { Component } from '@angular/core';
import { JobsStreamService } from './jobs/jobs-stream.service';
import { JobsMonitorFacadeService } from './jobs/jobs-monitor-facade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public constructor(
    protected readonly facade: JobsMonitorFacadeService,
    protected readonly jobsStream: JobsStreamService,
  ) {}
}
