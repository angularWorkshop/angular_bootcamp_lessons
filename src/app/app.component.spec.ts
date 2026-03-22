import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as fs from 'fs';
import * as path from 'path';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create the component', () => {
    fixture.detectChanges();
    flushLessons([]);

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show loading state before HTTP response arrives', () => {
    fixture.detectChanges();

    expect(getText('loading-state')).toBe('Loading lessons...');
    flushLessons([]);
  });

  it('should render lessons after HTTP response and hide loading', () => {
    fixture.detectChanges();
    flushLessons([
      { id: 1, title: 'Signals foundations', level: 'core' },
      { id: 2, title: 'RxJS cancellation', level: 'advanced' },
    ]);
    fixture.detectChanges();

    expect(host.querySelector('[data-testid="loading-state"]')).toBeFalsy();
    expect(host.querySelectorAll('[data-testid^="lesson-"]').length).toBe(2);
    expect(host.textContent).toContain('Signals foundations');
    expect(host.textContent).toContain('advanced');
  });

  it('should avoid manual subscribe in component code and rely on AsyncPipe', () => {
    const sourcePath = path.join(process.cwd(), 'src/app/app.component.ts');
    const source = fs.readFileSync(sourcePath, 'utf8');

    expect(source).not.toMatch(/\.subscribe\s*\(/);
  });

  function flushLessons(lessons: Array<{ id: number; title: string; level: string }>): void {
    const request = httpTestingController.expectOne('/api/lesson-feed');
    expect(request.request.method).toBe('GET');
    request.flush(lessons);
  }

  function getText(testId: string): string {
    const element = host.querySelector(`[data-testid="${testId}"]`);

    expect(element).toBeTruthy();
    return element?.textContent?.trim() ?? '';
  }
});
