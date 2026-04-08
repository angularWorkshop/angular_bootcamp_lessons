import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AppComponent } from './app.component';
import { DeepLinkFacadeService } from './deep-link/deep-link-facade.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;
  let route$: BehaviorSubject<ReturnType<typeof convertToParamMap>>;
  let router: { navigate: jest.Mock };

  beforeEach(async () => {
    route$ = new BehaviorSubject(convertToParamMap({ search: 'billing', status: 'Live', page: '2', orderId: 'order-2' }));
    router = { navigate: jest.fn() };

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        DeepLinkFacadeService,
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: { queryParamMap: route$.asObservable() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should restore the selected order from the route state', () => {
    expect(getText('detail-title')).toBe('Shipping sync');
    expect(getText('detail-owner')).toBe('Noah');
  });

  it('should write a new deep-link when another card is selected', () => {
    click('deep-row-order-3');
    expect(router.navigate).toHaveBeenCalledWith([], { queryParams: { search: 'billing', status: 'Live', page: 2, orderId: 'order-3' } });
  });

  it('should react to a route change that restores another order after reload', () => {
    route$.next(convertToParamMap({ search: 'billing', status: 'Live', page: '2', orderId: 'order-1' }));
    fixture.detectChanges();
    expect(getText('detail-title')).toBe('Billing dashboard');
  });

  function click(testId: string): void {
    const element = host.querySelector(`[data-testid="${testId}"]`) as HTMLButtonElement | null;
    expect(element).toBeTruthy();
    element?.click();
    fixture.detectChanges();
  }

  function getText(testId: string): string {
    const element = host.querySelector(`[data-testid="${testId}"]`);
    expect(element).toBeTruthy();
    return element?.textContent?.trim() ?? '';
  }
});
