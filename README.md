# Class & Style Bindings

This branch contains the completed solution for the class and style binding exercise.

## Goal

A task tracker card that visually reacts to state changes through CSS class and inline style bindings.

## What the solution demonstrates

- `[class.task-card--urgent]="task.isUrgent"` toggles a red border on urgency
- `[class.task-card--done]="task.status === 'done'"` dims the card when the task is complete
- `[style.width.%]="progress"` drives the progress bar width from component data

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
