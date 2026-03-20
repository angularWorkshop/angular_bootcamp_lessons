import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SettingsComponent } from './settings.component';
import { ProfileComponent } from './profile.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'profile', component: ProfileComponent },
];
