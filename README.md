# Passing Data with @Input

This branch contains the starter version of the exercise.

## Goal

Pass typed lesson data from the parent component into a standalone child card through `@Input`.

## What you need to do

- keep `LessonPreviewCardComponent` standalone
- pass different lesson objects from the parent component
- render the incoming data in the child template
- make sure the UI shows the title, format, duration, and level from the input model

## Files

- `src/app/app.component.ts`
- `src/app/app.component.html`
- `src/app/app.component.scss`
- `src/app/app.component.spec.ts`
- `src/app/lesson-preview-card/lesson-preview-card.component.ts`
- `src/app/lesson-preview-card/lesson-preview-card.component.html`
- `src/app/lesson-preview-card/lesson-preview-card.component.scss`

## Notes

- This is the `lesson` branch.
- Some tests should fail before the exercise is completed.
- Fix the data flow through `@Input` instead of hardcoding values inside the child component.

## Commands

Run the app:

```bash
npm start
```

Run tests:

```bash
npm test -- --runInBand
```
