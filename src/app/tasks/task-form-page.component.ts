import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskDraft, TaskRepositoryService, TaskStatus } from './task-repository.service';

@Component({
  selector: 'app-task-form-page',
  templateUrl: './task-form-page.component.html',
  styleUrl: './task-form-page.component.scss',
})
export class TaskFormPageComponent implements OnInit {
  protected mode: 'create' | 'edit' = 'create';
  protected state: 'ready' | 'loading' | 'error' = 'ready';
  protected errorMessage = '';
  protected taskId: string | null = null;

  protected readonly taskForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    owner: ['', [Validators.required, Validators.minLength(2)]],
    status: ['Backlog' as TaskStatus, Validators.required],
    urgent: [false],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly taskRepositoryService: TaskRepositoryService,
  ) {}

  public ngOnInit(): void {
    const taskId = this.activatedRoute.snapshot.paramMap.get('id');

    if (!taskId) {
      return;
    }

    this.mode = 'edit';
    this.taskId = taskId;
    this.state = 'loading';

    this.taskRepositoryService.loadTask(taskId).subscribe({
      next: (task) => {
        this.taskForm.patchValue(task);
        this.state = 'ready';
      },
      error: () => {
        this.state = 'error';
        this.errorMessage = 'Task could not be loaded.';
      },
    });
  }

  protected cancel(): void {
    void this.router.navigateByUrl('/tasks');
  }

  protected saveTask(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const rawValue = this.taskForm.getRawValue();
    const draft: TaskDraft = {
      title: (rawValue.title ?? '').trim(),
      owner: (rawValue.owner ?? '').trim(),
      status: rawValue.status as TaskStatus,
      urgent: !!rawValue.urgent,
    };

    const request$ =
      this.mode === 'edit' && this.taskId
        ? this.taskRepositoryService.updateTask(this.taskId, draft)
        : this.taskRepositoryService.createTask(draft);

    request$.subscribe({
      next: () => {
        void this.router.navigateByUrl('/tasks');
      },
    });
  }
}
