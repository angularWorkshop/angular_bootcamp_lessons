import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FeedStreamService {
  public readonly events$ = new Subject<{ id: string; text: string }>();
  public readonly connection$ = new Subject<'connected' | 'reconnecting' | 'offline'>();

  public pushEvent(text: string): void {
    this.events$.next({ id: text, text });
  }

  public disconnect(): void {
    this.connection$.next('reconnecting');
  }

  public reconnect(): void {
    this.connection$.next('connected');
  }
}
