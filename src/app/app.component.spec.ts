import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HasRoleDirective } from './has-role.directive';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HasRoleDirective],
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render title and both role-bound elements', () => {
    expect(getText('title')).toBe('Role-based visibility panel');
    expect(getByTestId('admin-action')).toBeTruthy();
    expect(getByTestId('viewer-note')).toBeTruthy();
  });

  it('should hide admin action for viewer role', () => {
    const adminButton = getByTestId('admin-action') as HTMLElement;

    expect(adminButton.style.display).toBe('none');
  });

  it('should keep viewer note visible for viewer role', () => {
    const viewerNote = getByTestId('viewer-note') as HTMLElement;

    expect(viewerNote.style.display).not.toBe('none');
  });

  function getByTestId(testId: string): Element {
    const element = host.querySelector(`[data-testid="${testId}"]`);

    expect(element).toBeTruthy();
    return element as Element;
  }

  function getText(testId: string): string {
    return getByTestId(testId).textContent?.trim() ?? '';
  }
});
