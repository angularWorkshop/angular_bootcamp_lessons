# Angular Application Entry Point

This branch contains the starter version of the exercise.

## Goal

Explain and visualize how Angular reaches the first screen through `main.ts`, `AppModule`, and `AppComponent`.

## What the learner should build

- a page titled `Application Entry Flow`
- a short explanation of the bootstrap chain
- three visible stages that describe how the app starts

## What the learner should implement

- replace the placeholder final stage with the `AppComponent` render step
- keep the project bootstrapped through `main.ts` and `AppModule`
- make the rendered flow match the expectations from the tests

## Files

- `src/main.ts`
- `src/app/app.module.ts`
- `src/app/app.component.ts`
- `src/app/app.component.html`
- `src/app/app.component.scss`
- `src/app/app.component.spec.ts`

## What can be changed

- `src/app/app.component.ts`
- `src/app/app.component.html`
- `src/app/app.component.scss`

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
