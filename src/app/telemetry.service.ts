import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TelemetryService {
  public readonly events: Array<{ name: string; payload: Record<string, unknown> }> = [];

  public capture(name: string, payload: Record<string, unknown>): void {
    this.events.push({ name, payload });
  }
}
