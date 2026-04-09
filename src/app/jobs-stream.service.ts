import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JobsStreamService {
  private readonly listeners = new Set<(event: string) => void>();

  public get events$(): Observable<string> {
    return new Observable<string>((subscriber) => {
      const listener = (event: string) => subscriber.next(event);
      this.listeners.add(listener);
      return () => this.listeners.delete(listener);
    });
  }

  public emit(event: string): void {
    for (const listener of this.listeners) {
      listener(event);
    }
  }
}
