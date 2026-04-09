import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RuntimeConfigService {
  public environment = 'staging';
  public featureFlags = { experimentalAction: true };
}
