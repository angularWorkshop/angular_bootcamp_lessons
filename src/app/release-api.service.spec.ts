import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReleaseApiService } from './release-api.service';

describe('ReleaseApiService', () => {
  let service: ReleaseApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(ReleaseApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should request the release queue with a GET call', () => {
    service.loadQueue().subscribe((items) => {
      expect(items).toEqual([]);
    });

    const request = httpTestingController.expectOne('/api/release-queue');

    expect(request.request.method).toBe('GET');
    request.flush([]);
  });

  it('should map blockers into a blocked queue card', () => {
    let receivedStatus = '';

    service.loadQueue().subscribe((items) => {
      expect(items[0].title).toBe('PROD: Access audit');
      receivedStatus = items[0].status;
    });

    const request = httpTestingController.expectOne('/api/release-queue');

    request.flush([
      {
        id: 'rel-1',
        name: 'Access audit',
        environment: 'prod',
        blockers: 1,
        warnings: 0,
      },
    ]);

    expect(receivedStatus).toBe('TODO');
  });

  it('should post to the retry endpoint for a specific release', () => {
    let receivedMessage = '';

    service.retryRelease('rel-9').subscribe((message) => {
      receivedMessage = message;
    });

    const request = httpTestingController.expectOne('/api/release-queue/rel-9/retry');

    expect(request.request.method).toBe('POST');
    request.flush({ message: 'Retry queued' });

    expect(receivedMessage).toBe('TODO');
  });

  it('should return a fallback message when retry request fails', () => {
    let receivedMessage = '';

    service.retryRelease('rel-2').subscribe((message) => {
      receivedMessage = message;
    });

    const request = httpTestingController.expectOne('/api/release-queue/rel-2/retry');

    request.flush('Network down', {
      status: 500,
      statusText: 'Server Error',
    });

    expect(receivedMessage).toBe('TODO');
  });
});
