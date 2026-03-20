import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User, USERS } from './user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="page">
      <h2 class="page__title" data-testid="list-title">Users</h2>
      <ul class="page__list" data-testid="user-list">
        @for (user of users; track user.id) {
          <!-- TODO: Add a routerLink that navigates to /users/:id -->
          <li class="page__list-item">
            <a data-testid="user-link-{{ user.id }}">
              {{ user.name }}
            </a>
          </li>
        }
      </ul>
    </section>
  `,
})
export class UserListComponent {
  protected readonly users: User[] = USERS;
}
