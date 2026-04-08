import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { OrdersStatusApiService } from './orders-status/orders-status-api.service';
import { OrdersStatusFacadeService } from './orders-status/orders-status-facade.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;
  let apiService: OrdersStatusApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [OrdersStatusApiService, OrdersStatusFacadeService],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    apiService = TestBed.inject(OrdersStatusApiService);
    fixture.detectChanges();
  });

  it('should render the seed jobs', () => {
    expect(getText('status-value-job-1')).toBe('Queued');
    expect(getText('status-value-job-2')).toBe('Completed');
  });

  it('should change the status immediately and then confirm it on success', () => {
    click('toggle-status-job-1'); fixture.detectChanges();
    expect(getText('status-value-job-1')).toBe('Completed');
    expect(getText('screen-message')).toBe('Saving status…');
    apiService.flushPending(); fixture.detectChanges();
    expect(getText('status-value-job-1')).toBe('Completed');
    expect(getText('screen-message')).toBe('Status saved.');
  });

  it('should roll the status back when the request fails', () => {
    apiService.setNextMode('error');
    click('toggle-status-job-1'); fixture.detectChanges();
    expect(getText('status-value-job-1')).toBe('Completed');
    apiService.flushPending(); fixture.detectChanges();
    expect(getText('status-value-job-1')).toBe('Queued');
    expect(getText('screen-message')).toBe('Could not save the status. Previous value was restored.');
  });

  function click(testId: string): void {
    const element = host.querySelector(`[data-testid="${testId}"]`) as HTMLButtonElement | null;
    expect(element).toBeTruthy();
    element?.click();
  }

  function getText(testId: string): string {
    const element = host.querySelector(`[data-testid="${testId}"]`);
    expect(element).toBeTruthy();
    return element?.textContent?.trim() ?? '';
  }
});
