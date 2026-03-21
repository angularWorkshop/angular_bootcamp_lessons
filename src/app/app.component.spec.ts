import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the reactive validators heading and status card', () => {
    expect(getText('workspace-title')).toBe('Workspace Provisioning Form');
    expect(getText('form-readiness')).toContain('Form');
  });

  it('should keep the form blocked before valid values are entered', () => {
    expect(getWorkspaceForm().invalid).toBe(true);
    expect(getText('form-readiness')).toBe('Form blocked');
  });

  it('should expose built-in required/minlength/email errors and the custom TEAM prefix error', () => {
    const workspaceName = getWorkspaceForm().controls.workspaceName;
    const teamCode = getWorkspaceForm().controls.teamCode;
    const ownerEmail = getWorkspaceForm().controls.ownerEmail;

    workspaceName.setValue('Ops');
    teamCode.setValue('OPS-42');
    ownerEmail.setValue('wrong-email');
    fixture.detectChanges();

    expect(workspaceName.hasError('minlength')).toBe(true);
    expect(teamCode.hasError('teamCodePrefix')).toBe(true);
    expect(ownerEmail.hasError('email')).toBe(true);
  });

  it('should become ready after all valid values satisfy the built-in and custom validators', () => {
    getWorkspaceForm().setValue({
      workspaceName: 'Mission Control',
      teamCode: 'TEAM-42',
      ownerEmail: 'ops@example.com',
    });
    fixture.detectChanges();

    expect(getWorkspaceForm().valid).toBe(true);
    expect(getText('form-readiness')).toBe('Form ready');
    expect(getText('workspace-name-state')).toBe('Workspace name: valid');
    expect(getText('team-code-state')).toBe('Team code: valid');
    expect(getText('owner-email-state')).toBe('Owner email: valid');
  });

  function getText(testId: string): string {
    const element = host.querySelector(`[data-testid="${testId}"]`);

    expect(element).toBeTruthy();
    return element?.textContent?.trim() ?? '';
  }

  function getWorkspaceForm() {
    return (component as unknown as { workspaceForm: AppComponent['workspaceForm'] }).workspaceForm;
  }
});
