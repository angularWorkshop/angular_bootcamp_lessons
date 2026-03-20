import { CanDeactivateFn } from '@angular/router';
import { EditorComponent } from './editor.component';

export const unsavedChangesGuard: CanDeactivateFn<EditorComponent> = (component) => {
  if (component.hasUnsavedChanges) {
    return window.confirm('You have unsaved changes. Leave anyway?');
  }
  return true;
};
