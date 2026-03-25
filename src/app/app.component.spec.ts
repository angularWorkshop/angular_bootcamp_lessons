import { ActivatedRouteSnapshot, RouterStateSnapshot, convertToParamMap } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { readFileSync } from 'fs';
import { join } from 'path';
import { routes } from './app.routes';
import { LessonDataService } from './lesson-data.service';
import { lessonDetailsResolver } from './lesson-details.resolver';

describe('Exercise 33.1 — details resolver', () => {
  it('should resolve lesson details by id through LessonDataService', async () => {
    const getLessonById = jest.fn().mockReturnValue(of({ id: '42', title: 'Signals Deep Dive' }));

    TestBed.configureTestingModule({
      providers: [{ provide: LessonDataService, useValue: { getLessonById } }],
    });

    const route = {
      paramMap: convertToParamMap({ id: '42' }),
    } as ActivatedRouteSnapshot;

    const result = await firstValueFrom(
      TestBed.runInInjectionContext(() =>
        lessonDetailsResolver(route, {} as RouterStateSnapshot),
      ),
    );

    expect(getLessonById).toHaveBeenCalledWith('42');
    expect(result).toEqual({ id: '42', title: 'Signals Deep Dive' });
  });

  it('should connect resolver in details route config', () => {
    const detailsRoute = routes.find((route) => route.path === 'details/:id');

    expect(detailsRoute?.resolve?.['lesson']).toBe(lessonDetailsResolver);
  });

  it('should read data from ActivatedRoute.data in details component', () => {
    const componentSource = readFileSync(
      join(process.cwd(), 'src/app/details-page.component.ts'),
      'utf8',
    );

    expect(componentSource).toContain('route.data');
  });
});
