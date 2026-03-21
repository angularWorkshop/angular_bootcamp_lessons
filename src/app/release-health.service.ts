import { Injectable } from '@angular/core';

export interface ReleaseSnapshot {
  name: string;
  environment: 'dev' | 'staging' | 'prod';
  blockers: number;
  warnings: number;
  reviewers: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ReleaseHealthService {
  public getBadge(snapshot: ReleaseSnapshot): string {
    if (snapshot.blockers > 0) {
      return `${snapshot.environment.toUpperCase()}-RED`;
    }

    if (snapshot.warnings > 0) {
      return `${snapshot.environment.toUpperCase()}-YELLOW`;
    }

    return `${snapshot.environment.toUpperCase()}-GREEN`;
  }

  public shouldEscalate(snapshot: ReleaseSnapshot): boolean {
    return snapshot.environment === 'prod' && (snapshot.blockers > 0 || snapshot.warnings >= 3);
  }

  public formatReviewerSummary(reviewers: string[]): string {
    if (reviewers.length === 0) {
      return 'No reviewers assigned';
    }

    if (reviewers.length === 1) {
      return '1 reviewer assigned';
    }

    return `${reviewers.length} reviewers assigned`;
  }
}
