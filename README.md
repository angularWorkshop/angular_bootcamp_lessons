# Creating Standalone Components

This branch contains the completed solution for the exercise.

## Goal

Create and connect standalone components before moving on to composition and input binding.

## What the solution demonstrates

- two standalone child cards connected to the root page
- a root module that imports both standalone components
- a ready base for the next exercises on composition and `@Input`

## Files

- `src/app/app.component.ts`
- `src/app/app.component.html`
- `src/app/app.component.scss`
- `src/app/app.component.spec.ts`
- `src/app/app.module.ts`
- `src/app/course-overview-card/course-overview-card.component.ts`
- `src/app/practice-status-card/practice-status-card.component.ts`

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
