import { Component, inject } from '@angular/core';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly service = inject(TaskService);

  protected readonly tasks = this.service.allTasks;
  protected readonly totalCount = this.service.totalCount;
  protected readonly completedCount = this.service.completedCount;
  protected readonly remainingCount = this.service.remainingCount;

  protected newTaskTitle = '';

  protected addTask(): void {
    this.service.addTask(this.newTaskTitle);
    this.newTaskTitle = '';
  }

  protected toggleTask(id: number): void {
    this.service.toggleTask(id);
  }

  protected removeTask(id: number): void {
    this.service.removeTask(id);
  }
}
