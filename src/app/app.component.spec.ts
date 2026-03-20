import { readFileSync } from 'fs';
import { join } from 'path';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

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

  it('should render the entry flow heading', () => {
    expect(host.querySelector('h1')?.textContent?.trim()).toBe('Application Entry Flow');
  });

  it('should explain the bootstrap chain in the intro', () => {
    expect(host.textContent).toContain('Trace how Angular moves from main.ts to the first rendered component.');
  });

  it('should render three bootstrap stage cards', () => {
    expect(host.querySelectorAll('[data-testid^="entry-stage-"]').length).toBe(3);
  });

  it('should explain the main.ts entry stage', () => {
    const mainCard = host.querySelector('[data-testid="entry-stage-main"]');

    expect(mainCard?.textContent).toContain('main.ts');
    expect(mainCard?.textContent).toContain('bootstrapModule(AppModule)');
  });

  it('should explain the AppModule stage', () => {
    const moduleCard = host.querySelector('[data-testid="entry-stage-module"]');

    expect(moduleCard?.textContent).toContain('AppModule');
    expect(moduleCard?.textContent).toContain('bootstrap component');
  });

  it('should show the final AppComponent render stage', () => {
    const renderCard = host.querySelector('[data-testid="entry-stage-render"]');

    expect(renderCard?.textContent).toContain('AppComponent');
  });

  it('should explain that AppComponent renders inside app-root', () => {
    const renderCard = host.querySelector('[data-testid="entry-stage-render"]');

    expect(renderCard?.textContent).toContain('app-root');
    expect(renderCard?.textContent).toContain('first visible screen');
  });

  it('should keep main.ts bootstrapping AppModule', () => {
    const mainTs = readFileSync(join(process.cwd(), 'src/main.ts'), 'utf8');

    expect(mainTs).toContain('bootstrapModule(AppModule)');
  });

  it('should keep AppModule as the root module class', () => {
    const appModuleTs = readFileSync(join(process.cwd(), 'src/app/app.module.ts'), 'utf8');

    expect(appModuleTs).toContain('export class AppModule');
    expect(appModuleTs).toContain('bootstrap:  [AppComponent]');
  });
});
