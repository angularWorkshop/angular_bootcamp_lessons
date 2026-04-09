import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ShellCardComponent } from './shared/shell-card.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, ShellCardComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should render the projected body and expose the warning tone', () => {
    expect(query('projected-body')?.textContent).toContain('Deploy is ready');
    expect(query('shell-card')?.getAttribute('data-tone')).toBe('warning');
  });

  it('should render the projected action slot content', () => {
    expect(query('projected-button')?.textContent).toContain('Open checklist');
  });

  it('should emit the shared action output', () => {
    click('shell-action');
    expect(getText('action-clicks')).toBe('1');
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
