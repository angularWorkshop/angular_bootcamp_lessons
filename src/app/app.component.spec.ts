import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ declarations: [AppComponent] }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should open confirm only when rows are selected', () => {
    click('request-delete');
    expect(query('confirm-dialog')).toBeNull();
    click('toggle-row-1');
    click('request-delete');
    expect(query('confirm-dialog')).toBeTruthy();
  });

  it('should remove selected rows and expose an undo path', () => {
    click('toggle-row-1');
    click('toggle-row-2');
    click('request-delete');
    click('confirm-delete');
    fixture.detectChanges();
    expect(query('row-row-1')).toBeNull();
    expect(query('row-row-2')).toBeNull();
    expect(query('snackbar')).toBeTruthy();
  });

  it('should restore the rows after undo', () => {
    click('toggle-row-1');
    click('request-delete');
    click('confirm-delete');
    click('undo-delete');
    fixture.detectChanges();
    expect(query('row-row-1')).toBeTruthy();
  });

  function click(testId: string): void {
    const element = query(testId) as HTMLButtonElement | null;
    expect(element).toBeTruthy();
    element?.click();
    fixture.detectChanges();
  }

  function query(testId: string): HTMLElement | null {
    return host.querySelector(`[data-testid="${testId}"]`);
  }
});
