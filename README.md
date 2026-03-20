# Track & Empty

This branch contains the completed solution for the track and `@empty` exercise.

## Goal

A task list with `@for`, `track`, `$index`, and `@empty` fallback.

## What the solution demonstrates

- `@for (task of tasks; track task.id; let i = $index)` with proper tracking
- 1-based numbering via `{{ i + 1 }}`
- `@empty` block showing "No tasks" when the array is empty

## Files

- `src/app/app.component.ts`
- `src/app/app.component.html`
- `src/app/app.component.scss`
- `src/app/app.component.spec.ts`

## Notes

- This is the `answer` branch — reference implementation.
- All tests should pass.

## Commands

Run the app:

```bash
npm start
```

Run tests:

```bash
npm test -- --runInBand
```
