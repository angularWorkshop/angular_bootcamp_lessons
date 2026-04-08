import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { OrdersApiService } from './orders/orders-api.service';
import { OrdersFacadeService } from './orders/orders-facade.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;
  let apiService: OrdersApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [OrdersApiService, OrdersFacadeService],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    apiService = TestBed.inject(OrdersApiService);
    fixture.detectChanges();
  });

  it('should start from the idle state', () => {
    expect(getText('screen-title')).toBe('Feature State and Screen Orchestration');
    expect(query('idle-state')).toBeTruthy();
  });

  it('should render the list and select the first order after a successful load', () => {
    click('load-orders'); fixture.detectChanges();
    expect(query('loading-state')).toBeTruthy();
    apiService.flushPending(); fixture.detectChanges();
    expect(query('success-state')).toBeTruthy();
    expect(getText('summary-label')).toBe('Loaded 3 orders');
    expect(getText('detail-title')).toBe('Billing rules review');
    expect(getText('detail-status')).toBe('Live');
  });

  it('should update the details panel when another card is selected', () => {
    click('load-orders'); apiService.flushPending(); fixture.detectChanges();
    click('order-card-order-2'); fixture.detectChanges();
    expect(getText('detail-title')).toBe('Workspace copy refresh');
    expect(getText('detail-owner')).toBe('Noah');
  });

  it('should refresh through the same facade flow', () => {
    click('load-orders'); apiService.flushPending(); fixture.detectChanges();
    click('refresh-orders'); fixture.detectChanges();
    expect(query('loading-state')).toBeTruthy();
    apiService.flushPending(); fixture.detectChanges();
    expect(getText('summary-label')).toBe('Loaded 3 orders');
  });

  it('should show the empty state when the API returns no orders', () => {
    apiService.setMode('empty');
    click('load-orders'); apiService.flushPending(); fixture.detectChanges();
    expect(query('empty-state')).toBeTruthy();
  });

  it('should show the error state when the API fails', () => {
    apiService.setMode('error');
    click('load-orders'); apiService.flushPending(); fixture.detectChanges();
    expect(query('error-state')).toBeTruthy();
  });

  function click(testId: string): void {
    const element = host.querySelector(`[data-testid="${testId}"]`) as HTMLButtonElement | null;
    expect(element).toBeTruthy();
    element?.click();
  }

  function getText(testId: string): string {
    const element = query(testId);
    expect(element).toBeTruthy();
    return element?.textContent?.trim() ?? '';
  }

  function query(testId: string): HTMLElement | null {
    return host.querySelector(`[data-testid="${testId}"]`);
  }
});
