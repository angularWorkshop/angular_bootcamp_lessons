import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  standalone: true,
  template: `
    <section class="page">
      <h2 class="page__title" data-testid="settings-title">Settings</h2>
      <p class="page__text">Manage your preferences.</p>
    </section>
  `,
})
export class SettingsComponent {}
