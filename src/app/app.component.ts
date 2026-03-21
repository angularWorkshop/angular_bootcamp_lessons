import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

interface ReleasePayload {
  releaseLabel: string;
  targetEnvironment: string;
  approvedBy: string;
  rollbackPlanRequired: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = 'Release Approval Desk';
  protected readonly releaseForm = this.formBuilder.nonNullable.group({
    releaseName: ['Phoenix Cutover'],
    approver: [''],
    environment: ['production'],
    rollbackPlan: [false],
  });
  protected submittedPayload: ReleasePayload | null = null;

  constructor(private readonly formBuilder: FormBuilder) {}

  protected submitRelease(): void {
    const rawValue = this.releaseForm.getRawValue();

    this.submittedPayload = {
      releaseLabel: rawValue.releaseName.trim(),
      targetEnvironment: rawValue.environment,
      approvedBy: rawValue.approver.trim(),
      rollbackPlanRequired: rawValue.rollbackPlan,
    };
  }
}
