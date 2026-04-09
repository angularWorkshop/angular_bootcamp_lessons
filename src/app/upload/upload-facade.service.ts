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
    for (const file of this.files()) {
      this.files.update(list => list.map(item => item.id === file.id ? { ...item, status: 'uploading', progress: 10 } : item));
      this.uploadApi.startUpload(file.id).subscribe(() => {
        this.files.update(list => list.map(item => item.id === file.id ? { ...item, status: 'done', progress: 100 } : item));
      });
    }
  }
}
