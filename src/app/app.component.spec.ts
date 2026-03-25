import { ComponentFixture, TestBed } from '@angular/core/testing';
import { readFileSync } from 'fs';
import { join } from 'path';
import { AppComponent } from './app.component';

describe('Exercise 34.2 — afterNextRender for DOM integration', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should render chart host container', () => {
    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('[data-testid="chart-host"]')).toBeTruthy();
  });

  it('should initialize chart in afterNextRender callback', () => {
    const source = readSource();
    expect(source).toMatch(/afterNextRender\s*\(/);
  });

  it('should use isPlatformBrowser guard for browser-only DOM code', () => {
    const source = readSource();
    expect(source).toContain('isPlatformBrowser');
  });

  it('should clean chart instance in ngOnDestroy', () => {
    const source = readSource();
    expect(source).toMatch(/ngOnDestroy\s*\(\)\s*\{[\s\S]*chartInstance\?\.destroy\(\)/);
  });

  function readSource(): string {
    const sourcePath = join(process.cwd(), 'src/app/app.component.ts');
    return readFileSync(sourcePath, 'utf8');
  }
});
