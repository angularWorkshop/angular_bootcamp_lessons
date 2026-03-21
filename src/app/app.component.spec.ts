import { CommonModule, Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AccessPageComponent } from './access/access-page.component';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { WorkspaceSessionService } from './core/workspace-session.service';
import { TaskFormPageComponent } from './tasks/task-form-page.component';
import { TaskListPageComponent } from './tasks/task-list-page.component';
import { TaskRepositoryService } from './tasks/task-repository.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;
  let router: Router;
  let location: Location;
  let workspaceSessionService: WorkspaceSessionService;
  let taskRepositoryService: TaskRepositoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, AccessPageComponent, TaskListPageComponent, TaskFormPageComponent],
      imports: [CommonModule, ReactiveFormsModule, RouterTestingModule.withRoutes(routes)],
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    workspaceSessionService = TestBed.inject(WorkspaceSessionService);
    taskRepositoryService = TestBed.inject(TaskRepositoryService);

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;

    router.initialNavigation();
    fixture.detectChanges();
    await wait(20);
    fixture.detectChanges();
  });

  it('should render the access page first while the workspace is locked', () => {
    expect(getText('shell-title')).toBe('Frontend Capstone: Tasks Workspace');
    expect(getText('access-title')).toBe('Unlock the mock workspace');
    expect(location.path()).toBe('/access');
  });

  it('should unlock the workspace and navigate to the task board', async () => {
    click('unlock-workspace-btn');
    await wait(120);
    fixture.detectChanges();

    expect(getText('workspace-state')).toBe('Workspace: Unlocked');
    expect(getText('task-board-title')).toBe('Tasks Workspace');
    expect(host.querySelectorAll('[data-testid^="task-card-"]').length).toBe(2);
  });

  it('should create a task through the form flow and show it on the board', async () => {
    workspaceSessionService.unlock();
    await router.navigateByUrl('/tasks/new');
    fixture.detectChanges();

    typeInput('title-input', 'Ship notifications panel');
    typeInput('owner-input', 'Mia');
    selectValue('status-select', 'Done');
    click('save-task-btn');
    await wait(140);
    fixture.detectChanges();
    await wait(140);
    fixture.detectChanges();

    expect(cardTitles()).toContain('Ship notifications panel');
    expect(location.path()).toBe('/tasks');
  });

  it('should render the list error state when the repository fails the next sync', async () => {
    workspaceSessionService.unlock();
    taskRepositoryService.simulateNextListFailure();
    await router.navigateByUrl('/tasks');
    fixture.detectChanges();
    await wait(120);
    fixture.detectChanges();

    expect(getText('list-error')).toContain('Could not sync tasks.');
  });

  it('should edit an existing task and keep the updated title on the board', async () => {
    workspaceSessionService.unlock();
    await router.navigateByUrl('/tasks/task-1/edit');
    fixture.detectChanges();
    await wait(120);
    fixture.detectChanges();

    typeInput('title-input', 'Polish checkout launch plan');
    click('save-task-btn');
    await wait(140);
    fixture.detectChanges();
    await wait(140);
    fixture.detectChanges();

    expect(cardTitles()).toContain('Polish checkout launch plan');
    expect(location.path()).toBe('/tasks');
  });

  function click(testId: string): void {
    const element = host.querySelector(`[data-testid="${testId}"]`) as HTMLButtonElement | null;

    expect(element).toBeTruthy();
    element?.click();
    fixture.detectChanges();
  }

  function typeInput(testId: string, value: string): void {
    const input = host.querySelector(`[data-testid="${testId}"]`) as HTMLInputElement | null;

    expect(input).toBeTruthy();
    if (input) {
      input.value = value;
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
    }
  }

  function selectValue(testId: string, value: string): void {
    const select = host.querySelector(`[data-testid="${testId}"]`) as HTMLSelectElement | null;

    expect(select).toBeTruthy();
    if (select) {
      select.value = value;
      select.dispatchEvent(new Event('change'));
      fixture.detectChanges();
    }
  }

  function getText(testId: string): string {
    const element = host.querySelector(`[data-testid="${testId}"]`);

    expect(element).toBeTruthy();
    return element?.textContent?.trim() ?? '';
  }

  function cardTitles(): string[] {
    return Array.from(host.querySelectorAll('.task-card h3')).map((element) => element.textContent?.trim() ?? '');
  }

  function wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
});
