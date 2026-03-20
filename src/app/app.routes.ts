import { Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { AdminComponent } from './admin.component';
import { EditorComponent } from './editor.component';
import { LoginComponent } from './login.component';
import { authGuard } from './auth.guard';
import { unsavedChangesGuard } from './unsaved-changes.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'public', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'public', component: PublicComponent },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard] },
  { path: 'editor', component: EditorComponent, canDeactivate: [unsavedChangesGuard] },
];
