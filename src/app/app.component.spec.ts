import { HttpClient } from '@angular/common/http';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { errorRetryInterceptor } from './error-retry.interceptor';

describe('Exercise 32.2 — error and retry interceptor', () => {
  let http: HttpClient;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([errorRetryInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    http = TestBed.inject(HttpClient);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should retry failed 5xx request and eventually resolve', () => {
    let response: { ok: boolean } | undefined;

    http.get<{ ok: boolean }>('/api/metrics').subscribe((result) => {
      response = result;
    });

    const attempt1 = httpTesting.expectOne('/api/metrics');
    attempt1.flush({ message: 'fail-1' }, { status: 500, statusText: 'Server Error' });

    const attempt2 = httpTesting.expectOne('/api/metrics');
    attempt2.flush({ message: 'fail-2' }, { status: 502, statusText: 'Bad Gateway' });

    const attempt3 = httpTesting.expectOne('/api/metrics');
    attempt3.flush({ ok: true });

    expect(response).toEqual({ ok: true });
  });

  it('should normalize 4xx error for UI and avoid retry for client errors', () => {
    let capturedError: { status: number; message: string } | undefined;

    http.get('/api/not-found').subscribe({
      next: () => fail('expected error'),
      error: (error) => {
        capturedError = error;
      },
    });

    const request = httpTesting.expectOne('/api/not-found');
    request.flush({ message: 'Entity not found' }, { status: 404, statusText: 'Not Found' });

    expect(capturedError).toEqual({ status: 404, message: 'Entity not found' });
    expect(httpTesting.match('/api/not-found').length).toBe(0);
  });
});
