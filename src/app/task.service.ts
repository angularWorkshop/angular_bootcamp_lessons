import { Injectable, signal, computed } from '@angular/core';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

// TODO: Implement this service.
// Move all task logic from AppComponent here:
// - tasks signal (private)
// - allTasks (readonly)
// - totalCount, completedCount, remainingCount (computed)
// - addTask, toggleTask, removeTask methods

@Injectable({ providedIn: 'root' })
export class TaskService {
  // TODO: Add tasks signal and expose it as readonly
  readonly allTasks = signal<Task[]>([]).asReadonly();

  // TODO: Add computed fields
  readonly totalCount = computed(() => 0);
  readonly completedCount = computed(() => 0);
  readonly remainingCount = computed(() => 0);

  // TODO: Implement addTask
  addTask(title: string): void {}

  // TODO: Implement toggleTask
  toggleTask(id: number): void {}

  // TODO: Implement removeTask
  removeTask(id: number): void {}
}
