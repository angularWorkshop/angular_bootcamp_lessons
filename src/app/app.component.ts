import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Component } from '@angular/core';

function teamCodePrefixValidator(prefix: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = (control.value as string | null) ?? '';

    if (!value) {
      return null;
    }

    return value.startsWith(prefix) ? null : { teamCodePrefix: true };
  };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = 'Workspace Provisioning Form';
  protected readonly workspaceForm = this.formBuilder.nonNullable.group({
    workspaceName: ['', [Validators.required, Validators.minLength(4)]],
    teamCode: ['', [Validators.required, teamCodePrefixValidator('TEAM-')]],
    ownerEmail: ['', [Validators.required, Validators.email]],
  });

  constructor(private readonly formBuilder: FormBuilder) {}

  protected get isReady(): boolean {
    return this.workspaceForm.valid;
  }

  protected get readinessLabel(): string {
    return this.isReady ? 'Form ready' : 'Form blocked';
  }

  protected controlState(controlName: 'workspaceName' | 'teamCode' | 'ownerEmail'): string {
    return this.workspaceForm.controls[controlName].valid ? 'valid' : 'invalid';
  }
}
