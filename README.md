# Passing Data with @Input

This branch contains the completed solution for the exercise.

## Goal

Pass typed lesson data from the parent component into a standalone child card through `@Input`.

## What the solution demonstrates

- a parent component that passes two different lesson objects
- a standalone `LessonPreviewCardComponent`
- typed `@Input` data rendered in the child template
- visible title, format, duration, and level values in both cards

## Files

- `src/app/app.component.ts`
- `src/app/app.component.html`
- `src/app/app.component.scss`
- `src/app/app.component.spec.ts`
- `src/app/lesson-preview-card/lesson-preview-card.component.ts`
- `src/app/lesson-preview-card/lesson-preview-card.component.html`
- `src/app/lesson-preview-card/lesson-preview-card.component.scss`

## Notes

- This is the `answer` branch.
- It contains the finished reference implementation.
- The test suite should stay green here.

## Commands

Run the app:

```bash
npm start
```

Run tests:

```bash
npm test -- --runInBand
```
