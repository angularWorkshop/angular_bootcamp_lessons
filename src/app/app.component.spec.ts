import { readFileSync } from 'fs';
import { join } from 'path';
import { of } from 'rxjs';
import { routes } from './app.routes';
import { SelectivePreloadingStrategy } from './selective-preloading.strategy';

describe('Exercise 30.2 — Preloading strategy', () => {
  it('should mark analytics route for preloading', () => {
    const analyticsRoute = routes.find(route => route.path === 'analytics');
    expect(analyticsRoute?.data?.['preload']).toBe(true);
  });

  it('should keep settings route out of preloading', () => {
    const settingsRoute = routes.find(route => route.path === 'settings');
    expect(settingsRoute?.data?.['preload']).toBe(false);
  });

  it('should preload route when preload flag is true', () => {
    const strategy = new SelectivePreloadingStrategy();
    const load = jest.fn(() => of('loaded'));

    let result: unknown = null;
    strategy.preload({ data: { preload: true } }, load).subscribe(value => {
      result = value;
    });

    expect(load).toHaveBeenCalledTimes(1);
    expect(result).toBe('loaded');
  });

  it('should skip preload when preload flag is false', () => {
    const strategy = new SelectivePreloadingStrategy();
    const load = jest.fn(() => of('loaded'));

    let result: unknown = 'initial';
    strategy.preload({ data: { preload: false } }, load).subscribe(value => {
      result = value;
    });

    expect(load).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it('should configure router with SelectivePreloadingStrategy', () => {
    const modulePath = join(__dirname, 'app.module.ts');
    const source = readFileSync(modulePath, 'utf8');

    expect(source).toContain('preloadingStrategy: SelectivePreloadingStrategy');
  });
});
