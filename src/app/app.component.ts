import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = 'Release Brief Studio';
  protected readonly releaseForm = this.formBuilder.group({
    releaseName: [''],
    owner: [''],
    environment: ['staging'],
  });

  constructor(private readonly formBuilder: FormBuilder) {}

  protected hasReactiveForm(): boolean {
    return (
      this.releaseForm.contains('releaseName') &&
      this.releaseForm.contains('owner') &&
      this.releaseForm.contains('environment')
    );
  }

  protected get fieldCount(): number {
    return Object.keys(this.releaseForm.controls).length;
  }

  protected readValue(controlName: string, fallback: string): string {
    return (this.releaseForm.get(controlName)?.value as string | null) || fallback;
  }
}
