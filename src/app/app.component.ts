import { Component } from '@angular/core';

// TODO: Import inject, computed from '@angular/core'
// TODO: Import toSignal from '@angular/core/rxjs-interop'
// TODO: Import UserService

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // TODO: Inject UserService via inject()
  // TODO: Declare users = toSignal(this.userService.getUsers(), { initialValue: [] })
  // TODO: Declare totalCount = computed(() => this.users().length)
  // TODO: Declare adminCount = computed(() => this.users().filter(u => u.role === 'admin').length)
}
