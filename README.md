# Class & Style Bindings

This branch contains the starter version of the class and style binding exercise.

## Goal

Make a task tracker card that visually reacts to state changes: CSS classes toggle based on urgency and completion, and a progress bar width reflects task progress via style binding.

## What the learner should build

The UI must include:

- a heading: `Task Tracker`
- a task card with title and status text
- a progress bar that fills based on task progress
- a toggle button for urgency
- a button to advance the task status

## What the learner should implement

The methods and event bindings are already in place. The learner must add:

- `[class.task-card--urgent]="task.isUrgent"` on the card element
- `[class.task-card--done]="task.status === 'done'"` on the card element
- `[style.width.%]="progress"` on the progress bar element

## Files

- `src/app/app.component.ts`
- `src/app/app.component.html`
- `src/app/app.component.scss`
- `src/app/app.component.spec.ts`

## What can be changed

- `src/app/app.component.html` — add the class and style bindings

## Notes

- This is the `lesson` branch.
- Tests that check CSS classes and progress bar width will fail until the bindings are added.
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
