import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { AppComponent } from './app.component';
import { LessonApiResponse, LessonDto } from './lesson-api.models';
import { LessonApiService } from './lesson-api.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the lab heading', () => {
    expect(getText('lab-title')).toBe('Create the Lesson API Service');
  });

  it('should render all three service goals', () => {
    expect(getText('goal-request')).toContain('Request lesson data');
    expect(getText('goal-type')).toContain('Type the API response');
    expect(getText('goal-return')).toContain('Return the items array');
  });

  it('should render the endpoint and observable hints', () => {
    expect(getText('endpoint-hint')).toContain('/api/lessons');
    expect(getText('observable-hint')).toContain('Observable');
  });

  function getText(testId: string): string {
    const element = host.querySelector(`[data-testid="${testId}"]`);

    expect(element).toBeTruthy();
    return element?.textContent?.trim() ?? '';
  }
});

describe('LessonApiService', () => {
  let service: LessonApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(LessonApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the lesson api service', () => {
    expect(service).toBeTruthy();
  });

  it('should expose a typed lessons stream', () => {
    const getLessons: () => Observable<LessonDto[]> = () => service.getLessons();

    expect(getLessons).toBeTruthy();
  });

  it('should request the lessons collection from the API', () => {
    service.getLessons().subscribe();

    const request = httpMock.expectOne('/api/lessons');

    expect(request.request.method).toBe('GET');
    request.flush({ items: [], total: 0 } satisfies LessonApiResponse);
  });

  it('should return the items array from the typed API response', () => {
    let receivedLessons: LessonDto[] | undefined;

    service.getLessons().subscribe((lessons) => {
      receivedLessons = lessons;
    });

    const apiResponse: LessonApiResponse = {
      items: [
        {
          id: 101,
          title: 'Angular HttpClient',
          level: 'Intermediate',
          durationMinutes: 35,
          published: true,
        },
      ],
      total: 1,
    };

    httpMock.expectOne('/api/lessons').flush(apiResponse);

    expect(receivedLessons).toEqual(apiResponse.items);
  });

  it('should keep lesson fields intact after mapping the API response', () => {
    let receivedLesson: LessonDto | undefined;

    service.getLessons().subscribe((lessons) => {
      receivedLesson = lessons[0];
    });

    httpMock.expectOne('/api/lessons').flush({
      items: [
        {
          id: 7,
          title: 'Typed API Responses',
          level: 'Advanced',
          durationMinutes: 28,
          published: false,
        },
      ],
      total: 1,
    } satisfies LessonApiResponse);

    expect(receivedLesson).toEqual({
      id: 7,
      title: 'Typed API Responses',
      level: 'Advanced',
      durationMinutes: 28,
      published: false,
    });
  });

  it('should return an empty array when the response has no lesson items', () => {
    let receivedLessons: LessonDto[] | undefined;

    service.getLessons().subscribe((lessons) => {
      receivedLessons = lessons;
    });

    httpMock.expectOne('/api/lessons').flush({
      items: [],
      total: 0,
    } satisfies LessonApiResponse);

    expect(receivedLessons).toEqual([]);
  });
});
