import { Component } from '@angular/core';
import { UploadRetryApiService } from './upload-retry/upload-retry-api.service';
import { UploadRetryFacadeService } from './upload-retry/upload-retry-facade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public constructor(
    protected readonly facade: UploadRetryFacadeService,
    protected readonly api: UploadRetryApiService,
  ) {}
}
