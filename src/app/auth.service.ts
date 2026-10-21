import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly permissions = new BehaviorSubject<ReadonlySet<string>>(new Set(['viewer']));
  readonly permissions$ = this.permissions.asObservable();

  hasPermission(permission: string): boolean {
    return permission.length > 0 && this.permissions.value.has(permission);
  }

  setPermissions(permissions: readonly string[]): void {
    this.permissions.next(new Set(permissions));
  }
}
