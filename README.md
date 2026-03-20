# Creating Standalone Components

This branch contains the starter version of the exercise.

## Goal

Create and connect standalone components before moving on to composition and input binding.

## What the learner should build

- a page titled `Standalone Components Lab`
- a rendered `CourseOverviewCardComponent`
- a rendered `PracticeStatusCardComponent`

## What the learner should implement

- keep both child cards standalone
- connect both cards to the root page
- import the standalone cards into `AppModule`

## Files

- `src/app/app.component.ts`
- `src/app/app.component.html`
- `src/app/app.component.scss`
- `src/app/app.component.spec.ts`
- `src/app/app.module.ts`
- `src/app/course-overview-card/course-overview-card.component.ts`
- `src/app/practice-status-card/practice-status-card.component.ts`

## What can be changed

- `src/app/app.component.html`
- `src/app/app.module.ts`

## Notes

- This is the `lesson` branch.
- Some tests are expected to fail before the learner completes the task.

## Commands

Run the app:

```bash
npm start
```

Run tests:

```bash
npm test -- --runInBand
```
