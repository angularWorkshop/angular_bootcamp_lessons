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

  it('should render the app initialization heading', () => {
    expect(host.querySelector('h1')?.textContent?.trim()).toBe('Angular App Initialization');
  });

  it('should render the starter environment label', () => {
    expect(host.textContent).toContain('Starter project');
  });

  it('should explain the startup goal', () => {
    expect(host.textContent).toContain(
      'Create the starter workspace, run the dev server, and confirm the root Angular screen appears.',
    );
  });

  it('should show three launch checklist cards', () => {
    expect(host.querySelectorAll('[data-testid^="launch-step-"]').length).toBe(3);
  });

  it('should describe the project scaffold step', () => {
    const projectCard = host.querySelector('[data-testid="launch-step-project"]');

    expect(projectCard?.textContent).toContain('Create the project');
    expect(projectCard?.textContent).toContain('Angular CLI');
  });

  it('should describe the dev server step', () => {
    const serveCard = host.querySelector('[data-testid="launch-step-serve"]');

    expect(serveCard?.textContent).toContain('Run the dev server');
    expect(serveCard?.textContent).toContain('ng serve');
  });

  it('should name the final verification step', () => {
    const verifyCard = host.querySelector('[data-testid="launch-step-verify"]');

    expect(verifyCard?.textContent).toContain('Verify root component');
  });

  it('should explain that app-root stays mounted as the root selector', () => {
    const verifyCard = host.querySelector('[data-testid="launch-step-verify"]');

    expect(verifyCard?.textContent).toContain('app-root');
  });

  it('should keep the app root selector set to app-root', () => {
    const selector = (AppComponent as any)['ɵcmp']?.selectors?.[0]?.[0];

    expect(selector).toBe('app-root');
  });
});
