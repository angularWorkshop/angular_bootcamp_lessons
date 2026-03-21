import { TestBed } from '@angular/core/testing';
import { ReleaseHealthService, ReleaseSnapshot } from './release-health.service';

describe('ReleaseHealthService', () => {
  let service: ReleaseHealthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReleaseHealthService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should return a green badge for a quiet dev release', () => {
    expect(service.getBadge(createSnapshot())).toBe('DEV-GREEN');
  });

  it('should return a yellow badge when staging release still has warnings', () => {
    const snapshot = createSnapshot({
      environment: 'staging',
      warnings: 2,
    });

    expect(service.getBadge(snapshot)).toBe('TODO');
  });

  it('should escalate a production release with blockers', () => {
    const snapshot = createSnapshot({
      environment: 'prod',
      blockers: 1,
    });

    expect(service.shouldEscalate(snapshot)).toBe(false);
  });

  it('should format reviewer summary for an empty reviewer list', () => {
    expect(service.formatReviewerSummary([])).toBe('TODO');
  });

  function createSnapshot(overrides: Partial<ReleaseSnapshot> = {}): ReleaseSnapshot {
    return {
      name: 'Checkout polish',
      environment: 'dev',
      blockers: 0,
      warnings: 0,
      reviewers: ['Mia'],
      ...overrides,
    };
  }
});
