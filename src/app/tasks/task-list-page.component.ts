import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskItem, TaskRepositoryService } from './task-repository.service';

@Component({
  selector: 'app-task-list-page',
  templateUrl: './task-list-page.component.html',
  styleUrl: './task-list-page.component.scss',
})
export class TaskListPageComponent implements OnInit {
  protected state: 'loading' | 'success' | 'empty' | 'error' = 'loading';
  protected errorMessage = '';
  protected tasks: TaskItem[] = [];

  constructor(
    private readonly taskRepositoryService: TaskRepositoryService,
    private readonly router: Router,
  ) {}

  public ngOnInit(): void {
    this.loadTasks();
  }

  protected retryLoad(): void {
    this.loadTasks();
  }

  protected goToCreateTask(): void {
    void this.router.navigateByUrl('/tasks/new');
  }

  protected goToEditTask(taskId: string): void {
    void this.router.navigateByUrl(`/tasks/${taskId}/edit`);
  }

  private loadTasks(): void {
    this.state = 'loading';
    this.errorMessage = '';

    this.taskRepositoryService.loadTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.state = tasks.length ? 'success' : 'empty';
      },
      error: () => {
        // TODO: surface the list error state so the board can render a retry UI
      },
    });
  }
}
