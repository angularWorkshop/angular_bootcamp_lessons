import { HttpClient } from '@angular/common/http';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { readFileSync } from 'fs';
import { join } from 'path';
import { authInterceptor } from './auth.interceptor';
import { AuthTokenService } from './auth-token.service';

describe('Exercise 32.1 — auth interceptor', () => {
  let http: HttpClient;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthTokenService,
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    http = TestBed.inject(HttpClient);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should append Authorization header with bearer token', () => {
    http.get('/api/profile').subscribe();

    const request = httpTesting.expectOne('/api/profile');
    expect(request.request.headers.get('Authorization')).toBe('Bearer lesson-token');
    request.flush({ ok: true });
  });

  it('should keep existing headers while adding Authorization', () => {
    http.get('/api/reports', { headers: { 'X-Trace': 'trace-1' } }).subscribe();

    const request = httpTesting.expectOne('/api/reports');
    expect(request.request.headers.get('X-Trace')).toBe('trace-1');
    expect(request.request.headers.get('Authorization')).toBe('Bearer lesson-token');
    request.flush({ ok: true });
  });

  it('should wire interceptor through provideHttpClient(withInterceptors()) in app.module', () => {
    const moduleSource = readFileSync(join(process.cwd(), 'src/app/app.module.ts'), 'utf8');

    expect(moduleSource).toMatch(/provideHttpClient\s*\(\s*withInterceptors\s*\(/);
  });
});
