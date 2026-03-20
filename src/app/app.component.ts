import { Component, signal, computed } from '@angular/core';

// TODO: Import TaskService and inject it instead of keeping logic here

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // TODO: Replace all fields and methods below with a TaskService.
  // 1. Create task.service.ts with @Injectable({ providedIn: 'root' })
  // 2. Move tasks signal, addTask, removeTask, toggleTask into the service
  // 3. Add computed fields: totalCount, completedCount, remainingCount
  // 4. Inject the service here via inject(TaskService)
  // 5. Delegate all data access to the service

  private nextId = 1;

  protected readonly tasks = signal<Task[]>([]);

  protected readonly totalCount = computed(() => this.tasks().length);
  protected readonly completedCount = computed(
    () => this.tasks().filter(t => t.done).length
  );
  protected readonly remainingCount = computed(
    () => this.totalCount() - this.completedCount()
  );

  protected newTaskTitle = '';

  protected addTask(): void {
    const title = this.newTaskTitle.trim();
    if (!title) return;
    // TODO: delegate to service
    this.tasks.update(list => [...list, { id: this.nextId++, title, done: false }]);
    this.newTaskTitle = '';
  }

  protected toggleTask(id: number): void {
    // TODO: delegate to service
    this.tasks.update(list =>
      list.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  protected removeTask(id: number): void {
    // TODO: delegate to service
    this.tasks.update(list => list.filter(t => t.id !== id));
  }
}
