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

  it('should render the heading', () => {
    const heading = host.querySelector('h1');

    expect(heading?.textContent?.trim()).toBe('Booking Summary');
  });

  it('should render the initial derived values', () => {
    expect(getText('total-tickets')).toBe('Total tickets: 0');
    expect(getText('total-price')).toBe('Total price: $0');
    expect(getText('booking-status')).toBe('No tickets selected');
  });

  it('should derive ticket count and total price from source state', () => {
    click('increase-adults');
    click('increase-adults');
    click('increase-children');

    expect(getText('adults-count')).toBe('2');
    expect(getText('children-count')).toBe('1');
    expect(getText('total-tickets')).toBe('Total tickets: 3');
    expect(getText('total-price')).toBe('Total price: $31');
  });

  it('should change booking status when the booking becomes large enough', () => {
    click('increase-adults');
    click('increase-adults');
    click('increase-children');
    click('increase-children');

    expect(getText('booking-status')).toBe('Group booking');
  });

  it('should never move counters below zero', () => {
    click('decrease-adults');
    click('decrease-children');

    expect(getText('adults-count')).toBe('0');
    expect(getText('children-count')).toBe('0');
    expect(getText('total-tickets')).toBe('Total tickets: 0');
    expect(getText('total-price')).toBe('Total price: $0');
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
