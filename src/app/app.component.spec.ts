import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TabComponent } from './tab.component';
import { TabsComponent } from './tabs.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsComponent, TabComponent],
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create and render title', () => {
    expect(fixture.componentInstance).toBeTruthy();
    expect(getText('title')).toBe('Tabs projection workspace');
  });

  it('should render tab buttons from projected tab components', () => {
    expect(host.querySelectorAll('[data-testid^="tab-btn-"]').length).toBe(3);
    expect(getByTestId('tab-btn-0').textContent).toContain('Overview');
    expect(getByTestId('tab-btn-1').textContent).toContain('Incidents');
  });

  it('should display first tab content by default', () => {
    expect(getVisiblePanelText()).toContain('Overview metrics and release notes.');
  });

  it('should switch visible content after clicking second tab button', () => {
    const secondTabButton = getByTestId('tab-btn-1') as HTMLButtonElement;
    secondTabButton.click();
    fixture.detectChanges();

    expect(getVisiblePanelText()).toContain('Incident timeline and mitigations.');
    expect(host.textContent).not.toContain('Overview metrics and release notes.');
  });

  function getByTestId(testId: string): Element {
    const element = host.querySelector(`[data-testid="${testId}"]`);

    expect(element).toBeTruthy();
    return element as Element;
  }

  function getText(testId: string): string {
    return getByTestId(testId).textContent?.trim() ?? '';
  }

  function getVisiblePanelText(): string {
    const panel = getByTestId('tab-panel');
    return panel.textContent?.trim() ?? '';
  }
});
