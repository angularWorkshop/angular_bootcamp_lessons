import { Injectable, signal } from '@angular/core';
import { UploadRetryApiService } from './upload-retry-api.service';
import { RetryFileVm, INPUT_FILES } from './upload-retry.models';

@Injectable({ providedIn: 'root' })
export class UploadRetryFacadeService {
  public readonly files = signal<RetryFileVm[]>([]);
  public readonly rejected = signal<string[]>([]);

  public constructor(private readonly api: UploadRetryApiService) {}

  public loadInputFiles(): void {
    // TODO: validate files, reject invalid ones, and queue the valid records.
  }

  public startFile(fileId: string): void {
    // TODO: start a file upload and move it into failed or done after the API flush.
  }

  public cancelFile(fileId: string): void {
    this.files.update(list => list.map(file => file.id === fileId ? { ...file, status: 'canceled' } : file));
  }

  public retryFile(fileId: string): void {
    // TODO: restart the failed file through the same upload API.
  }
}
