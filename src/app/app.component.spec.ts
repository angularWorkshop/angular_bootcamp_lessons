import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, convertToParamMap } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { lessonRedirectResolver } from './lesson-redirect.resolver';
import { LessonCard, LessonDataService } from './lesson-data.service';

describe('Exercise 33.2 — resolver error redirect', () => {
  it('should resolve lesson data on successful service response', (done) => {
    const navigate = jest.fn();
    const getLessonById = jest.fn().mockReturnValue(of({ id: '7', title: 'Routing Deep Dive' }));

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: { navigate } },
        { provide: LessonDataService, useValue: { getLessonById } },
      ],
    });

    const route = { paramMap: convertToParamMap({ id: '7' }) } as ActivatedRouteSnapshot;

    TestBed.runInInjectionContext(() =>
      lessonRedirectResolver(route, {} as RouterStateSnapshot),
    ).subscribe((value: LessonCard) => {
      expect(getLessonById).toHaveBeenCalledWith('7');
      expect(value).toEqual({ id: '7', title: 'Routing Deep Dive' });
      expect(navigate).not.toHaveBeenCalled();
      done();
    });
  });

  it('should redirect to /error and complete without emission on failure', (done) => {
    const navigate = jest.fn().mockResolvedValue(true);
    const getLessonById = jest.fn().mockReturnValue(
      throwError(() => ({ status: 404, message: 'Missing lesson' })),
    );

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: { navigate } },
        { provide: LessonDataService, useValue: { getLessonById } },
      ],
    });

    const route = { paramMap: convertToParamMap({ id: '404' }) } as ActivatedRouteSnapshot;
    const result$ = TestBed.runInInjectionContext(
      () => lessonRedirectResolver(route, {} as RouterStateSnapshot),
    ) as Observable<LessonCard>;

    const nextSpy = jest.fn();
    result$.subscribe({
      next: nextSpy,
      complete: () => {
        expect(navigate).toHaveBeenCalledWith(['/error']);
        expect(nextSpy).not.toHaveBeenCalled();
        done();
      },
    });
  });
});
