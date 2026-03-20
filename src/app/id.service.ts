import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class IdService {
  private nextId = 1;

  generate(): number {
    return this.nextId++;
  }
}
