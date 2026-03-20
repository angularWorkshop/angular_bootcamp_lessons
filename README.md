# Exercise 18.1 — Extract Business Logic into a Service (starter version)

**Branch:** `lesson-topic-18-exercise-01-extract-service`

## Goal

Learn to separate business logic from the component by extracting it into an Angular service, using `inject()` for dependency injection.

## What the learner should build

A Task Tracker where:
- Tasks are stored and managed inside a `TaskService`
- The component is thin — only UI and service calls
- Stats (total, completed, remaining) are computed in the service

## What the learner should implement

1. Create `task.service.ts` with `@Injectable({ providedIn: 'root' })`
2. Move task signal, `addTask`, `removeTask`, `toggleTask` into the service
3. Add computed fields: `totalCount`, `completedCount`, `remainingCount`
4. Inject the service in the component via `inject(TaskService)`
5. Replace direct data access with service calls

## Files

| File | Role |
|------|------|
| `app.component.ts` | Component with inline logic (needs refactoring) |
| `app.component.html` | Template (no changes needed) |
| `app.component.scss` | Styles (no changes needed) |
| `app.component.spec.ts` | Tests (do not modify) |
| `task.service.ts` | **Create this file** |

## Commands

```bash
npm start          # dev server
npm test -- --runInBand   # run tests
```
