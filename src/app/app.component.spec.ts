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

  it('should render the starter workspace heading', () => {
    expect(host.querySelector('h1')?.textContent?.trim()).toBe('Angular Starter Workspace');
  });

  it('should explain the custom app shell goal', () => {
    expect(host.textContent).toContain('Replace the empty shell with a clear starting page for the rest of the course.');
  });

  it('should render a CTA button for the next topic', () => {
    expect(host.querySelector('.starter-page__cta')?.textContent?.trim()).toBe('Continue to components');
  });

  it('should render three starter content blocks', () => {
    expect(host.querySelectorAll('[data-testid^="starter-block-"]').length).toBe(3);
  });

  it('should include the final Launch block on the page', () => {
    expect(host.textContent).toContain('Launch');
    expect(host.textContent).toContain('Prepare the app shell for the next exercises and keep the layout ready for growth.');
  });
});
