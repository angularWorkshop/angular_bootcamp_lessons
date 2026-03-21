import { firstValueFrom } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { TaskRepositoryService } from './task-repository.service';

describe('TaskRepositoryService', () => {
  let service: TaskRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskRepositoryService);
  });

  it('should create a task and expose it in the next list load', async () => {
    const createdTask = await firstValueFrom(
      service.createTask({
        title: 'Plan analytics rollout',
        owner: 'Alex',
        status: 'Backlog',
        urgent: false,
      }),
    );

    const tasks = await firstValueFrom(service.loadTasks());

    expect(createdTask.id).toBe('task-3');
    expect(tasks.some((task) => task.title === 'Plan analytics rollout')).toBe(true);
  });

  it('should fail one list load and recover on retry', async () => {
    service.simulateNextListFailure();

    await expect(firstValueFrom(service.loadTasks())).rejects.toThrow('Could not sync tasks.');

    const tasks = await firstValueFrom(service.loadTasks());

    expect(tasks.length).toBe(2);
  });
});
