import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

interface EscalationFormValue {
  severity: string;
  channel: string;
  rollbackPlan: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = 'Incident Response Pulse';
  protected readonly responseForm = this.formBuilder.nonNullable.group({
    severity: ['medium'],
    channel: ['slack'],
    rollbackPlan: [true],
  });
  protected statusHeadline = 'MEDIUM via slack';
  protected statusNote = 'Rollback plan ready.';

  constructor(private readonly formBuilder: FormBuilder) {
    this.syncStatus(this.responseForm.getRawValue());
    this.connectPreview();
  }

  protected connectPreview(): void {
    this.responseForm.valueChanges.subscribe(() => {
      this.syncStatus(this.responseForm.getRawValue());
    });
  }

  private syncStatus(formValue: EscalationFormValue): void {
    this.statusHeadline = `${formValue.severity.toUpperCase()} via ${formValue.channel}`;
    this.statusNote = formValue.rollbackPlan ? 'Rollback plan ready.' : 'Rollback plan missing.';
  }
}
