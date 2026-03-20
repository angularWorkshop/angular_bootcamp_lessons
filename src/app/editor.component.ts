import { Component } from '@angular/core';

@Component({
  selector: 'app-editor',
  standalone: true,
  template: `
    <section class="page">
      <h2 class="page__title" data-testid="editor-title">Editor</h2>
      <p class="page__text">Edit your content below.</p>

      <textarea
        data-testid="editor-textarea"
        [value]="content"
        (input)="onInput($event)"
        rows="4"
        placeholder="Type something..."
      ></textarea>

      <p class="page__text" data-testid="unsaved-indicator">
        {{ hasUnsavedChanges ? 'Unsaved changes' : 'No changes' }}
      </p>

      <button type="button" data-testid="save-button" (click)="save()">Save</button>
    </section>
  `,
})
export class EditorComponent {
  content = '';
  hasUnsavedChanges = false;

  onInput(event: Event): void {
    this.content = (event.target as HTMLTextAreaElement).value;
    this.hasUnsavedChanges = true;
  }

  save(): void {
    this.hasUnsavedChanges = false;
  }
}
