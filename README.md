# Track & Empty

This branch contains the starter version of the track and `@empty` exercise.

## Goal

Render a task list using `@for` with `track`, display a 1-based index via `$index`, and show a fallback message using `@empty` when the list is cleared.

## What the learner should build

- a task list rendered with `@for`
- each item shows its 1-based number and title
- an empty-state message when there are no tasks

## What the learner should implement

- `@for (task of tasks; track task.id)` to iterate
- `$index + 1` displayed in a `<span data-testid="task-index">`
- task title in a `<span data-testid="task-title">`
- each `<li>` must have `data-testid="task-item"`
- `@empty` block with a `<li data-testid="empty-message">No tasks</li>`

## Files

- `src/app/app.component.ts`
- `src/app/app.component.html`
- `src/app/app.component.scss`
- `src/app/app.component.spec.ts`

## What can be changed

- `src/app/app.component.html` — add `@for` with track, $index, and `@empty`

## Notes

- This is the `lesson` branch.
- Tests for list rendering, indices, and empty state will fail until the template is complete.
- The `answer` branch contains the finished reference solution.

## Commands

Run the app:

```bash
npm start
```

Run tests:

```bash
npm test -- --runInBand
```
