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

  it('should render three bootstrap stages', () => {
    expect(host.querySelectorAll('[data-testid^="entry-stage-"]').length).toBe(3);
  });

  it('should show the final AppComponent render stage', () => {
    expect(host.textContent).toContain('AppComponent');
    expect(host.textContent).toContain('renders the first visible screen');
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
