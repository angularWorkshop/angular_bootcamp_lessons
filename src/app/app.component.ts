import { Component } from '@angular/core';

type TaskStatus = 'todo' | 'in-progress' | 'done';

interface Task {
  title: string;
  status: TaskStatus;
  isUrgent: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected task: Task = {
    title: 'Learn Angular Bindings',
    status: 'todo',
    isUrgent: false,
  };

  protected progress = 0;

  toggleUrgent(): void {
    this.task.isUrgent = !this.task.isUrgent;
  }

  nextStatus(): void {
    if (this.task.status === 'todo') {
      this.task.status = 'in-progress';
      this.progress = 50;
    } else if (this.task.status === 'in-progress') {
      this.task.status = 'done';
      this.progress = 100;
    }
  }
}
