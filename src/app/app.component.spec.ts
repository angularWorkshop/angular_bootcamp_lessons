import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule,
    AppComponent
  ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should guard the close flow when the drawer is dirty', () => {
    click('edit-item-1');
    setInput('draft-input', 'Billing dashboard v2');
    click('attempt-close');
    expect(query('editor-drawer')).toBeTruthy();
    expect(getText('guard-message')).toBe('Unsaved changes must be reviewed before closing.');
  });

  it('should rollback the draft on cancel', () => {
    click('edit-item-1');
    setInput('draft-input', 'Billing dashboard v2');
    click('cancel-changes');
    fixture.detectChanges();
    expect(query('editor-drawer')).toBeNull();
    expect(getText('title-item-1')).toBe('Billing dashboard');
  });

  it('should persist the draft on save', () => {
    click('edit-item-1');
    setInput('draft-input', 'Billing dashboard v2');
    click('save-changes');
    fixture.detectChanges();
    expect(getText('title-item-1')).toBe('Billing dashboard v2');
  });

  function setInput(testId: string, value: string): void {
    const input = query(testId) as HTMLInputElement;
    input.value = value;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

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
