import { ComponentFixture, TestBed } from '@angular/core/testing';
import { readFileSync } from 'fs';
import { join } from 'path';
import { AppComponent } from './app.component';

describe('Exercise 34.1 — init and cleanup resources', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    jest.useFakeTimers();

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should load lifecycle lessons on init', () => {
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const count = host.querySelector('[data-testid="lesson-count"]');
    expect(count?.textContent).toContain('3');
  });

  it('should increment heartbeat while component is alive', () => {
    fixture.detectChanges();

    jest.advanceTimersByTime(350);
    expect(fixture.componentInstance.heartbeat()).toBeGreaterThanOrEqual(3);
  });

  it('should use takeUntilDestroyed in component source', () => {
    const sourcePath = join(process.cwd(), 'src/app/app.component.ts');
    const source = readFileSync(sourcePath, 'utf8');
    const sourceWithoutComments = source
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*$/gm, '');

    expect(sourceWithoutComments).toMatch(/\.pipe\(\s*takeUntilDestroyed\(/);
  });

  it('should stop heartbeat updates after component destroy', () => {
    fixture.detectChanges();

    jest.advanceTimersByTime(250);
    const valueAtDestroy = fixture.componentInstance.heartbeat();

    fixture.destroy();
    jest.advanceTimersByTime(500);

    expect(fixture.componentInstance.heartbeat()).toBe(valueAtDestroy);
  });
});
