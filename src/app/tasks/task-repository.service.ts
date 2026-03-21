import { Injectable } from '@angular/core';
import { Observable, delay, of, throwError } from 'rxjs';

export type TaskStatus = 'Backlog' | 'In Progress' | 'Done';

export interface TaskDraft {
  title: string;
  owner: string;
  status: TaskStatus;
  urgent: boolean;
}

export interface TaskItem extends TaskDraft {
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskRepositoryService {
  private nextId = 3;
  private failNextListLoad = false;

  private tasks: TaskItem[] = [
    {
      id: 'task-1',
      title: 'Polish checkout checklist',
      owner: 'Mia',
      status: 'In Progress',
      urgent: false,
    },
    {
      id: 'task-2',
      title: 'Audit admin roles',
      owner: 'Nina',
      status: 'Backlog',
      urgent: true,
    },
  ];

  public loadTasks(): Observable<TaskItem[]> {
    if (this.failNextListLoad) {
      this.failNextListLoad = false;

      return throwError(() => new Error('Could not sync tasks.')).pipe(delay(80));
    }

    return of(this.tasks.map((task) => ({ ...task }))).pipe(delay(80));
  }

  public loadTask(id: string): Observable<TaskItem> {
    const task = this.tasks.find((item) => item.id === id);

    if (!task) {
      return throwError(() => new Error('Task not found')).pipe(delay(80));
    }

    return of({ ...task }).pipe(delay(80));
  }

  public createTask(draft: TaskDraft): Observable<TaskItem> {
    const createdTask: TaskItem = {
      id: `task-${this.nextId}`,
      ...draft,
    };

    this.nextId += 1;
    this.tasks = [...this.tasks, createdTask];

    return of({ ...createdTask }).pipe(delay(80));
  }

  public updateTask(id: string, draft: TaskDraft): Observable<TaskItem> {
    const currentTask = this.tasks.find((item) => item.id === id);

    if (!currentTask) {
      return throwError(() => new Error('Task not found')).pipe(delay(80));
    }

    const updatedTask: TaskItem = {
      ...currentTask,
      ...draft,
    };

    this.tasks = this.tasks.map((item) => (item.id === id ? updatedTask : item));

    return of({ ...updatedTask }).pipe(delay(80));
  }

  public simulateNextListFailure(): void {
    this.failNextListLoad = true;
  }

  public clearAll(): void {
    this.tasks = [];
  }
}
