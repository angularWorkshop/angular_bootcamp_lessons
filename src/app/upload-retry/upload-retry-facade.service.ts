import { Injectable, signal } from '@angular/core';
import { UploadRetryApiService } from './upload-retry-api.service';
import { RetryFileVm, INPUT_FILES } from './upload-retry.models';

@Injectable({ providedIn: 'root' })
export class UploadRetryFacadeService {
  public readonly files = signal<RetryFileVm[]>([]);
  public readonly rejected = signal<string[]>([]);

  public constructor(private readonly api: UploadRetryApiService) {}

  public loadInputFiles(): void {
    const accepted: RetryFileVm[] = [];
    const rejected: string[] = [];
    for (const file of INPUT_FILES) {
      if (file.size > 2000 || !['image/png', 'image/webp'].includes(file.type)) {
        rejected.push(file.name);
      } else {
        accepted.push({ ...file, status: 'queued', progress: 0, error: '' });
      }
    }
    this.files.set(accepted);
    this.rejected.set(rejected);
  }

  public startFile(fileId: string): void {
    this.files.update(list => list.map(file => file.id === fileId ? { ...file, status: 'uploading', progress: 10, error: '' } : file));
    this.api.start(fileId).subscribe({
      next: () => {
        this.files.update(list => list.map(file => file.id === fileId ? { ...file, status: 'done', progress: 100, error: '' } : file));
      },
      error: () => {
        this.files.update(list => list.map(file => file.id === fileId ? { ...file, status: 'failed', progress: 10, error: 'Upload failed' } : file));
      },
    });
  }

  public cancelFile(fileId: string): void {
    this.files.update(list => list.map(file => file.id === fileId ? { ...file, status: 'canceled' } : file));
  }

  public retryFile(fileId: string): void {
    this.startFile(fileId);
  }
}
