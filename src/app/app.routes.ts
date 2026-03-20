import { Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { AdminComponent } from './admin.component';
import { EditorComponent } from './editor.component';
import { LoginComponent } from './login.component';

// TODO: Protect the '/admin' route with authGuard (canActivate)
// TODO: Protect the '/editor' route with unsavedChangesGuard (canDeactivate)

export const routes: Routes = [
  { path: '', redirectTo: 'public', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'public', component: PublicComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'editor', component: EditorComponent },
];
