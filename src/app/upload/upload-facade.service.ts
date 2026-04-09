import { Injectable, signal } from '@angular/core';
import { UploadApiService } from './upload-api.service';
import { UploadFileVm, DEMO_FILES } from './upload.models';

@Injectable({ providedIn: 'root' })
export class UploadFacadeService {
  public readonly files = signal<UploadFileVm[]>([]);

  public constructor(private readonly uploadApi: UploadApiService) {}

  public acceptDemoFiles(): void {
    this.files.set(DEMO_FILES.map(file => ({ ...file })));
  }

  public startUploads(): void {
    // TODO: move files to uploading state and react to upload completions from the API.
  }
}
