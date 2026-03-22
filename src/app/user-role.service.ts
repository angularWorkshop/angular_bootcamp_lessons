import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserRoleService {
  currentRole: 'admin' | 'viewer' = 'viewer';
}
