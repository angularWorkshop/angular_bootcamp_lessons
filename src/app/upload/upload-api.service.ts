import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UploadApiService {
  private readonly pending = new Map<string, Subject<void>>();

  public startUpload(fileId: string): Observable<void> {
    const subject = new Subject<void>();
    this.pending.set(fileId, subject);
    return subject.asObservable();
  }

  public flushUpload(fileId: string): void {
    const subject = this.pending.get(fileId);
    if (!subject) return;
    subject.next();
    subject.complete();
    this.pending.delete(fileId);
  }
}
