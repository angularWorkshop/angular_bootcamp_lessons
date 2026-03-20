import { CanDeactivateFn } from '@angular/router';
import { EditorComponent } from './editor.component';

// TODO: Implement a functional canDeactivate guard for EditorComponent.
// If the component has unsaved changes (component.hasUnsavedChanges is true),
// show a confirmation dialog: window.confirm('You have unsaved changes. Leave anyway?')
// Return the user's choice (true = leave, false = stay).
// If there are no unsaved changes, return true.

export const unsavedChangesGuard: CanDeactivateFn<EditorComponent> = (component) => {
  return true;
};
