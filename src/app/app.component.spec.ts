import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should keep submit disabled until the form becomes valid', () => {
    expect(getSubmitButton().disabled).toBe(true);
  });

  it('should enable submit after the user enters a valid name and selects a role', () => {
    typeName('Mia');
    selectRole('Reviewer');

    expect(getSubmitButton().disabled).toBe(false);
  });

  it('should show a success message after submitting a valid invite', () => {
    typeName('Nina');
    selectRole('Approver');
    clickSubmit();

    expect(getText('success-state')).toBe('Nina invited as Approver');
  });

  it('should include the urgent suffix when the user submits an urgent invite', () => {
    typeName('Alex');
    selectRole('Reviewer');
    toggleUrgent();
    clickSubmit();

    expect(getText('success-state')).toBe('Alex invited as Reviewer (urgent)');
  });

  function typeName(value: string): void {
    const input = host.querySelector('[data-testid="name-input"]') as HTMLInputElement | null;

    expect(input).toBeTruthy();
    if (input) {
      input.value = value;
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
    }
  }

  function selectRole(value: string): void {
    const select = host.querySelector('[data-testid="role-select"]') as HTMLSelectElement | null;

    expect(select).toBeTruthy();
    if (select) {
      select.value = value;
      select.dispatchEvent(new Event('change'));
      fixture.detectChanges();
    }
  }

  function toggleUrgent(): void {
    const checkbox = host.querySelector('[data-testid="urgent-checkbox"]') as HTMLInputElement | null;

    expect(checkbox).toBeTruthy();
    if (checkbox) {
      checkbox.checked = true;
      checkbox.dispatchEvent(new Event('change'));
      fixture.detectChanges();
    }
  }

  function clickSubmit(): void {
    getSubmitButton().click();
    fixture.detectChanges();
  }

  function getSubmitButton(): HTMLButtonElement {
    const button = host.querySelector('[data-testid="submit-btn"]') as HTMLButtonElement | null;

    expect(button).toBeTruthy();
    return button as HTMLButtonElement;
  }

  function getText(testId: string): string {
    const element = host.querySelector(`[data-testid="${testId}"]`);

    expect(element).toBeTruthy();
    return element?.textContent?.trim() ?? '';
  }
});
