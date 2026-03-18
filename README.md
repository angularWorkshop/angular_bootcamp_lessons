# Signals Counter

This branch contains the completed solution for the Signals exercise.

## Goal

Build a small `Order Counter` screen with Angular Signals:

- `count` stores the source state
- `doubled` is derived with `computed()`
- `status` depends on the current counter value
- `Decrease` must never move the value below `0`

## What the learner is expected to build

The UI should include:

- a heading: `Order Counter`
- the current counter value
- an `Increase` button
- a `Decrease` button
- a status line:
  - `No orders yet` when the count is `0`
  - `Active orders: X` when the count is greater than `0`
- a derived line: `Doubled: X`

## Files

Main exercise files:

- `src/app/app.component.ts`
- `src/app/app.component.html`
- `src/app/app.component.scss`
- `src/app/app.component.spec.ts`

## Notes

- The `lesson` branch should contain the starter version.
- This `answer` branch contains the reference implementation.
- The tests describe the intended behavior and should stay green here.

## Commands

Run the app:

```bash
npm start
```

Run tests:

```bash
npm test -- --runInBand
```
