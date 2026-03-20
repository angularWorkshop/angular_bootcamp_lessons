import { Injectable, signal, computed } from '@angular/core';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly tasks = signal<Task[]>([]);
  private nextId = 1;

  readonly allTasks = this.tasks.asReadonly();

  readonly totalCount = computed(() => this.tasks().length);
  readonly completedCount = computed(
    () => this.tasks().filter(t => t.done).length
  );
  readonly remainingCount = computed(
    () => this.totalCount() - this.completedCount()
  );

  addTask(title: string): void {
    const trimmed = title.trim();
    if (!trimmed) return;
    this.tasks.update(list => [
      ...list,
      { id: this.nextId++, title: trimmed, done: false },
    ]);
  }

  toggleTask(id: number): void {
    this.tasks.update(list =>
      list.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  removeTask(id: number): void {
    this.tasks.update(list => list.filter(t => t.id !== id));
  }
}
