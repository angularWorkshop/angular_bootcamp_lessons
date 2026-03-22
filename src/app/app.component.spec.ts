import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TooltipDirective } from './tooltip.directive';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TooltipDirective],
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render tooltip target button', () => {
    expect(getText('title')).toBe('Tooltip directive playground');
    expect(getTarget()).toBeTruthy();
  });

  it('should show tooltip element on mouseenter with expected text', () => {
    const target = getTarget();
    target.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();

    const tooltip = host.querySelector('[data-testid="tooltip-popup"]');
    expect(tooltip).toBeTruthy();
    expect(tooltip?.textContent?.trim()).toBe('Use Shift + Enter to submit feedback quickly.');
  });

  it('should hide tooltip element on mouseleave', () => {
    const target = getTarget();
    target.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();

    target.dispatchEvent(new Event('mouseleave'));
    fixture.detectChanges();

    expect(host.querySelector('[data-testid="tooltip-popup"]')).toBeFalsy();
  });

  function getTarget(): HTMLButtonElement {
    const element = host.querySelector('[data-testid="tooltip-target"]') as HTMLButtonElement | null;

    expect(element).toBeTruthy();
    return element as HTMLButtonElement;
  }

  function getText(testId: string): string {
    const element = host.querySelector(`[data-testid="${testId}"]`);

    expect(element).toBeTruthy();
    return element?.textContent?.trim() ?? '';
  }
});
