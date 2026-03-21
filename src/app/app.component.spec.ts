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

  it('should create the app component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the submit heading and button', () => {
    expect(getText('approval-title')).toBe('Release Approval Desk');
    expect(getText('submit-release-btn')).toBe('Submit release');
  });

  it('should show the empty payload state before submit', () => {
    expect(host.querySelector('[data-testid="empty-state"]')).toBeTruthy();
    expect(host.querySelector('[data-testid="payload-state"]')).toBeNull();
  });

  it('should submit the reactive form and render the mapped payload', () => {
    fillInput('release-name-input', '  Phoenix GA  ');
    fillInput('approver-input', '  Denis Svirko  ');
    selectValue('environment-select', 'staging');
    toggleCheckbox('rollback-checkbox', true);

    submitForm();

    expect(getText('payload-label')).toBe('Release: Phoenix GA');
    expect(getText('payload-environment')).toBe('Environment: staging');
    expect(getText('payload-approver')).toBe('Approved by: Denis Svirko');
    expect(getText('payload-rollback')).toBe('Rollback plan: required');
  });

  it('should replace the previous payload after a second submission', () => {
    fillInput('release-name-input', 'Pilot');
    fillInput('approver-input', 'Alex');
    submitForm();

    fillInput('release-name-input', 'Phoenix GA');
    fillInput('approver-input', 'Release Board');
    selectValue('environment-select', 'production');
    toggleCheckbox('rollback-checkbox', false);
    submitForm();

    expect(getText('payload-label')).toBe('Release: Phoenix GA');
    expect(getText('payload-environment')).toBe('Environment: production');
    expect(getText('payload-approver')).toBe('Approved by: Release Board');
    expect(getText('payload-rollback')).toBe('Rollback plan: optional');
  });

  function fillInput(testId: string, value: string): void {
    const input = host.querySelector(`[data-testid="${testId}"]`) as HTMLInputElement | null;

    expect(input).toBeTruthy();
    if (input) {
      input.value = value;
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
    }
  }

  function selectValue(testId: string, value: string): void {
    const select = host.querySelector(`[data-testid="${testId}"]`) as HTMLSelectElement | null;

    expect(select).toBeTruthy();
    if (select) {
      select.value = value;
      select.dispatchEvent(new Event('change'));
      fixture.detectChanges();
    }
  }

  function toggleCheckbox(testId: string, checked: boolean): void {
    const checkbox = host.querySelector(`[data-testid="${testId}"]`) as HTMLInputElement | null;

    expect(checkbox).toBeTruthy();
    if (checkbox) {
      checkbox.checked = checked;
      checkbox.dispatchEvent(new Event('change'));
      fixture.detectChanges();
    }
  }

  function submitForm(): void {
    const form = host.querySelector('[data-testid="approval-form"]') as HTMLFormElement | null;

    expect(form).toBeTruthy();
    form?.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
  }

  function getText(testId: string): string {
    const element = host.querySelector(`[data-testid="${testId}"]`);

    expect(element).toBeTruthy();
    return element?.textContent?.trim() ?? '';
  }
});
