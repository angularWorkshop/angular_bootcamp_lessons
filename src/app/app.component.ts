import { Component } from '@angular/core';
import { UploadApiService } from './upload/upload-api.service';
import { UploadFacadeService } from './upload/upload-facade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = 'Upload Zone';

  public constructor(
    protected readonly facade: UploadFacadeService,
    public readonly uploadApi: UploadApiService,
  ) {}
}
