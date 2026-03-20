import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected activeTab: 'notes' | 'contacts' = 'notes';

  protected switchTab(tab: 'notes' | 'contacts'): void {
    this.activeTab = tab;
  }
}
