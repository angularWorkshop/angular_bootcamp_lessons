import { Injectable, signal } from '@angular/core';
import { FeedStreamService } from './feed-stream.service';
import { FeedEvent } from './feed.models';

@Injectable({ providedIn: 'root' })
export class FeedFacadeService {
  public readonly connectionStatus = signal<'connected' | 'reconnecting' | 'offline'>('connected');
  public readonly events = signal<FeedEvent[]>([]);

  public constructor(private readonly stream: FeedStreamService) {}

  public connect(): void {
    this.stream.events$.subscribe(event => this.events.update(list => [event, ...list]));
    this.stream.connection$.subscribe(status => this.connectionStatus.set(status));
  }
}
