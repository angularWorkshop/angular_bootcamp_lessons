import { ComponentFixture, TestBed } from '@angular/core/testing';
import { readFileSync } from 'fs';
import { join } from 'path';
import { AppComponent } from './app.component';

describe('Exercise 35.2 — SSR-safe component', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should render exercise title', () => {
    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('[data-testid="title"]')?.textContent).toContain(
      'SSR-Safe Browser Integration',
    );
  });

  it('should render viewport metric block', () => {
    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('[data-testid="viewport"]')?.textContent).toContain('Viewport width');
  });

  it('should defer browser-only initialization via afterNextRender', () => {
    const source = readSource();
    const sourceWithoutComments = source
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*$/gm, '');

    expect(sourceWithoutComments).toMatch(/afterNextRender\s*\(/);
  });

  it('should guard browser-only logic with isPlatformBrowser', () => {
    const source = readSource();
    const sourceWithoutComments = source
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*$/gm, '');

    expect(sourceWithoutComments).toContain('isPlatformBrowser');
    expect(sourceWithoutComments).toContain('PLATFORM_ID');
  });

  it('should cleanup resize listener in ngOnDestroy', () => {
    const source = readSource();
    const sourceWithoutComments = source
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*$/gm, '');

    expect(sourceWithoutComments).toMatch(/ngOnDestroy\s*\(\)\s*\{[\s\S]*removeEventListener\('resize'/);
  });

  function readSource(): string {
    return readFileSync(join(process.cwd(), 'src/app/app.component.ts'), 'utf8');
  }
});
