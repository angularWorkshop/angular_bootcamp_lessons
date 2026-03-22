import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HighlightPipe } from './highlight.pipe';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighlightPipe],
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render all snippets and the lab title', () => {
    expect(getText('title')).toBe('Custom highlight pipe lab');
    expect(host.querySelectorAll('[data-testid^="snippet-"]').length).toBe(3);
  });

  it('should highlight the query inside rendered snippet text', () => {
    expect(host.innerHTML).toContain('<mark>an</mark>');
  });

  it('should update highlighting after query input change', () => {
    const input = host.querySelector('[data-testid="query-input"]') as HTMLInputElement | null;

    expect(input).toBeTruthy();
    if (input) {
      input.value = 'state';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
    }

    expect(host.innerHTML.toLowerCase()).toContain('<mark>state</mark>');
  });

  function getText(testId: string): string {
    const element = host.querySelector(`[data-testid="${testId}"]`);

    expect(element).toBeTruthy();
    return element?.textContent?.trim() ?? '';
  }
});
