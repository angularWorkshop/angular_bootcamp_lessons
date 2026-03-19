# Component Composition and Reuse

This branch contains the starter version of the exercise.

## Goal

Build a reusable `UiCardComponent` and compose it inside multiple standalone feature components.

## What the learner should build

- a `Component Composition Lab` page
- a reusable `UiCardComponent`
- two standalone feature cards rendered on the page

## What the learner should implement

- keep the child feature components standalone
- use the same `UiCardComponent` shell inside both feature cards
- avoid duplicating the visual shell across feature components

## Files

- `src/app/app.component.ts`
- `src/app/app.component.html`
- `src/app/app.component.scss`
- `src/app/app.component.spec.ts`
- `src/app/ui-card/ui-card.component.ts`
- `src/app/learning-plan-card/learning-plan-card.component.ts`
- `src/app/practice-reminder-card/practice-reminder-card.component.ts`

## What can be changed

- `src/app/practice-reminder-card/practice-reminder-card.component.ts`
- `src/app/practice-reminder-card/practice-reminder-card.component.html`
- `src/app/practice-reminder-card/practice-reminder-card.component.scss`

You may also adjust the shell or the page markup if needed, but the target behavior is described by the tests.

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
