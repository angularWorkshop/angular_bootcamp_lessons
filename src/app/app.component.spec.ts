import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ProfileNameFieldComponent } from './profile-name-field.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileNameFieldComponent],
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create component and render title', () => {
    expect(fixture.componentInstance).toBeTruthy();
    expect(getText('title')).toBe('Directive composition field');
  });

  it('should register both directives in hostDirectives metadata', () => {
    const hostDirectives = ((ProfileNameFieldComponent as any).ɵcmp?.hostDirectives ?? []).map(
      (entry: any) => entry.directive?.name ?? '',
    );

    expect(hostDirectives).toEqual(
      expect.arrayContaining(['FocusHighlightDirective', 'AutoTrimDirective']),
    );
  });

  it('should add focus-highlight class to wrapper during input focus', () => {
    const wrapper = host.querySelector('app-profile-name-field') as HTMLElement | null;
    const input = host.querySelector('[data-testid="profile-input"]') as HTMLInputElement | null;

    expect(wrapper).toBeTruthy();
    expect(input).toBeTruthy();
    input?.dispatchEvent(new Event('focusin', { bubbles: true }));
    fixture.detectChanges();

    expect(wrapper?.classList.contains('focus-highlight')).toBe(true);
  });

  it('should trim input value after focusout', () => {
    const input = host.querySelector('[data-testid="profile-input"]') as HTMLInputElement | null;

    expect(input).toBeTruthy();
    if (input) {
      input.value = '  Denis  ';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      fixture.detectChanges();

      input.dispatchEvent(new Event('focusout', { bubbles: true }));
      fixture.detectChanges();

      expect(input.value).toBe('Denis');
    }
  });

  function getText(testId: string): string {
    const element = host.querySelector(`[data-testid="${testId}"]`);

    expect(element).toBeTruthy();
    return element?.textContent?.trim() ?? '';
  }
});
