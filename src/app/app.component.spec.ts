import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppCardComponent } from './app-card.component';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppCardComponent],
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create component and render title', () => {
    expect(fixture.componentInstance).toBeTruthy();
    expect(getText('title')).toBe('Card content projection workspace');
  });

  it('should render two card instances', () => {
    expect(host.querySelectorAll('app-card').length).toBe(2);
  });

  it('should render header, body, and footer slot containers for each card', () => {
    expect(host.querySelectorAll('[data-testid="card-header-slot"]').length).toBe(2);
    expect(host.querySelectorAll('[data-testid="card-body-slot"]').length).toBe(2);
    expect(host.querySelectorAll('[data-testid="card-footer-slot"]').length).toBe(2);
  });

  it('should keep projected content inside corresponding slots', () => {
    const firstHeader = host.querySelectorAll('[data-testid="card-header-slot"]')[0];
    const secondFooter = host.querySelectorAll('[data-testid="card-footer-slot"]')[1];

    expect(firstHeader?.textContent).toContain('Billing summary');
    expect(secondFooter?.textContent).toContain('Owner: Platform Team');
  });

  function getText(testId: string): string {
    const element = host.querySelector(`[data-testid="${testId}"]`);

    expect(element).toBeTruthy();
    return element?.textContent?.trim() ?? '';
  }
});
