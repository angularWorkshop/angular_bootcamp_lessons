import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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

  it('should render the launch page heading', () => {
    expect(host.querySelector('h1')?.textContent?.trim()).toBe('Angular Launch Checklist');
  });

  it('should render the starter environment label', () => {
    expect(host.textContent).toContain('Starter project');
  });

  it('should explain that the project is ready to bootstrap', () => {
    expect(host.textContent).toContain('Prepare the starter project before building features.');
  });

  it('should show three launch checklist steps', () => {
    expect(host.querySelectorAll('[data-testid^="launch-step-"]').length).toBe(3);
  });

  it('should include the root component step in the checklist', () => {
    expect(host.textContent).toContain('Root component');
  });

  it('should keep the app root selector set to app-root', () => {
    const selector = (AppComponent as any).ɵcmp?.selectors?.[0]?.[0];

    expect(selector).toBe('app-root');
  });

  it('should render the checklist cards through structural rendering', () => {
    expect(fixture.debugElement.queryAll(By.css('.checklist__card')).length).toBeGreaterThanOrEqual(3);
  });
});
