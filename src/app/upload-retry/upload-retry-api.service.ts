import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UploadRetryApiService {
  private readonly subjects = new Map<string, Subject<void>>();
  private readonly outcomes = new Map<string, 'success' | 'error'>();

  public setOutcome(fileId: string, outcome: 'success' | 'error'): void {
    this.outcomes.set(fileId, outcome);
  }

  public start(fileId: string): Observable<void> {
    const subject = new Subject<void>();
    this.subjects.set(fileId, subject);
    return subject.asObservable();
  }

  public flush(fileId: string): void {
    const subject = this.subjects.get(fileId);
    if (!subject) return;
    const outcome = this.outcomes.get(fileId) ?? 'success';
    this.outcomes.delete(fileId);
    this.subjects.delete(fileId);
    if (outcome === 'error') {
      subject.error(new Error('Upload failed'));
      return;
    }
    subject.next();
    subject.complete();
  }
}
