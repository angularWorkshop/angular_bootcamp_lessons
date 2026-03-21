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

  it('should render the live reactive heading and initial preview', () => {
    expect(getText('pulse-title')).toBe('Incident Response Pulse');
    expect(getText('status-headline')).toBe('MEDIUM via slack');
    expect(getText('status-note')).toBe('Rollback plan ready.');
  });

  it('should render the reactive response form controls', () => {
    expect(host.querySelector('[data-testid="severity-select"]')).toBeTruthy();
    expect(host.querySelector('[data-testid="channel-select"]')).toBeTruthy();
    expect(host.querySelector('[data-testid="rollback-plan-checkbox"]')).toBeTruthy();
  });

  it('should update the status headline when form selections change', () => {
    selectValue('severity-select', 'high');
    selectValue('channel-select', 'war-room');

    expect(getText('status-headline')).toBe('HIGH via war-room');
  });

  it('should update the status note when the rollback flag changes', () => {
    toggleCheckbox('rollback-plan-checkbox', false);

    expect(getText('status-note')).toBe('Rollback plan missing.');
  });

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

  function getText(testId: string): string {
    const element = host.querySelector(`[data-testid="${testId}"]`);

    expect(element).toBeTruthy();
    return element?.textContent?.trim() ?? '';
  }
});
