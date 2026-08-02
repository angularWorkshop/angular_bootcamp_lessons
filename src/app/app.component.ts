import { Component, signal } from '@angular/core';
import { User } from './user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',

})
export class AppComponent {
  protected readonly users = signal<User[]>([
    { id: 1, firstName: 'Anna', lastName: 'Petrova', email: 'anna@example.com', role: 'admin' },
    { id: 2, firstName: 'Boris', lastName: 'Ivanov', email: 'boris@example.com', role: 'editor' },
    { id: 3, firstName: 'Clara', lastName: 'Sidorova', email: 'clara@example.com', role: 'viewer' },
  ]);

  protected showEmails = signal(true);

  protected toggleEmails(): void {
    this.showEmails.update(v => !v);
  }
}
