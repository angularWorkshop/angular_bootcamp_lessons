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

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render three product cards in the DOM', () => {
    expect(getText('title')).toBe('Product feed formatting board');
    expect(host.querySelectorAll('[data-testid^="product-"]').length).toBe(3);
  });

  it('should format the first product price through CurrencyPipe', () => {
    const price = getText('price-0').replace(/\u00A0/g, ' ');

    expect(price).toContain('$');
    expect(price).toContain('1,249.90');
  });

  it('should format release dates and uppercase names through pipes', () => {
    expect(getText('date-0')).toBe('2025-11-03');
    expect(getText('name-0')).toBe('TEAM DASHBOARD');
  });

  function getText(testId: string): string {
    const element = host.querySelector(`[data-testid="${testId}"]`);

    expect(element).toBeTruthy();
    return element?.textContent?.trim() ?? '';
  }
});
