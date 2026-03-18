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

  it('should render the initial counter state', () => {
    expect(getText('count-value')).toBe('0');
    expect(getText('status-value')).toBe('No orders yet');
    expect(getText('doubled-value')).toBe('Doubled: 0');
  });

  it('should increase the counter when clicking Increase', () => {
    click('increase-button');

    expect(getText('count-value')).toBe('1');
    expect(getText('status-value')).toBe('Active orders: 1');
    expect(getText('doubled-value')).toBe('Doubled: 2');
  });

  it('should decrease the counter but never go below zero', () => {
    click('decrease-button');
    expect(getText('count-value')).toBe('0');
    expect(getText('status-value')).toBe('No orders yet');

    click('increase-button');
    click('increase-button');
    click('decrease-button');
    click('decrease-button');
    click('decrease-button');

    expect(getText('count-value')).toBe('0');
    expect(getText('status-value')).toBe('No orders yet');
    expect(getText('doubled-value')).toBe('Doubled: 0');
  });

  function click(testId: string): void {
    const button = host.querySelector(`[data-testid="${testId}"]`) as HTMLButtonElement | null;

    expect(button).toBeTruthy();
    button?.click();
    fixture.detectChanges();
  }

  function getText(testId: string): string {
    const element = host.querySelector(`[data-testid="${testId}"]`);

    expect(element).toBeTruthy();
    return element?.textContent?.trim() ?? '';
  }
});
