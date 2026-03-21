import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceSessionService {
  private unlocked = false;

  public unlock(): void {
    this.unlocked = true;
  }

  public lock(): void {
    this.unlocked = false;
  }

  public isUnlocked(): boolean {
    return this.unlocked;
  }
}
