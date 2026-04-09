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

  it('should move focus into the filters panel after opening it', () => {
    click('open-filters');
    fixture.detectChanges();
    expect(query('filters-panel')).toBeTruthy();
    expect(getText('focus-target')).toBe('filters-search');
  });

  it('should restore the results context after apply', () => {
    click('open-filters');
    click('apply-filters');
    fixture.detectChanges();
    expect(query('filters-panel')).toBeNull();
    expect(getText('focus-target')).toBe('results-heading');
    expect(getText('live-region')).toBe('Showing the filtered results.');
  });

  it('should restore focus to the reopen button after cancel', () => {
    click('open-filters');
    click('cancel-filters');
    fixture.detectChanges();
    expect(getText('focus-target')).toBe('open-filters');
  });

  function click(testId: string): void {
    const element = query(testId) as HTMLButtonElement | null;
    expect(element).toBeTruthy();
    element?.click();
    fixture.detectChanges();
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
