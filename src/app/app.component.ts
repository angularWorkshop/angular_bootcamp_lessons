import { Component, inject, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly userService = inject(UserService);

  protected readonly users = toSignal(this.userService.getUsers(), { initialValue: [] });
  protected readonly totalCount = computed(() => this.users().length);
  protected readonly adminCount = computed(() => this.users().filter(u => u.role === 'admin').length);
}
