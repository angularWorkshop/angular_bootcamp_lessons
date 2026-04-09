import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { mapLegacyOrder } from './migration/legacy-order.adapter';
import { migrationPlan } from './migration/migration-plan';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ declarations: [AppComponent] }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should map the legacy DTO into the new order view model', () => {
    expect(mapLegacyOrder({
      order_id: 'legacy-2',
      order_title: 'Queue rebuild',
      owner_name: 'Anya',
    })).toEqual({
      id: 'legacy-2',
      title: 'Queue rebuild',
      owner: 'Anya',
    });
  });

  it('should expose the safe migration order', () => {
    expect(migrationPlan).toEqual([
      'add adapter layer',
      'switch read path',
      'move edit flow',
      'retire legacy screen',
    ]);
  });

  it('should render the mapped order and the first migration step', () => {
    expect(getText('mapped-title')).toBe('Legacy billing flow');
    expect(getText('first-plan-step')).toBe('add adapter layer');
  });

  function getText(testId: string): string {
    const element = host.querySelector(`[data-testid="${testId}"]`);
    expect(element).toBeTruthy();
    return element?.textContent?.trim() ?? '';
  }
});
