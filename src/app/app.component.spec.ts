import { ComponentFixture, TestBed } from '@angular/core/testing';
import { readFileSync } from 'fs';
import { join } from 'path';
import { AppComponent } from './app.component';

describe('Exercise 35.1 — SSR and hydration setup', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should render the exercise title', () => {
    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('[data-testid="title"]')?.textContent).toContain(
      'SSR and Hydration Setup',
    );
  });

  it('should include setup guidance text', () => {
    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('[data-testid="lead"]')?.textContent).toContain('server-side rendering');
  });

  it('should register provideClientHydration in AppModule', () => {
    const source = readSource('src/app/app.module.ts');
    const sourceWithoutComments = source
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*$/gm, '');

    expect(sourceWithoutComments).toMatch(/provideClientHydration/);
    expect(sourceWithoutComments).toMatch(/providers\s*:\s*\[[\s\S]*provideClientHydration\s*\(\s*\)/);
  });

  it('should avoid direct window-based bootstrap hot-reload hack in main.ts', () => {
    const source = readSource('src/main.ts');
    const sourceWithoutComments = source
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*$/gm, '');

    expect(sourceWithoutComments).not.toContain("window['ngRef']");
  });

  function readSource(relativePath: string): string {
    return readFileSync(join(process.cwd(), relativePath), 'utf8');
  }
});
