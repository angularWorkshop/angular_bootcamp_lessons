# Computed Booking Summary

This branch contains the starter version of the computed exercise.

## Goal

Build a `Booking Summary` screen where source state is stored in Signals, and all summary values are derived through `computed()`.

## What the learner should build

The UI must include:

- a heading: `Booking Summary`
- counters for adults and children
- `+` and `-` buttons for both counters
- a derived line: `Total tickets: X`
- a derived line: `Total price: $X`
- a derived booking status

## Source state

Use these values as the main source state:

- `adults`
- `children`

## Derived state

The learner must implement:

- total number of tickets
- total booking price
- booking status based on total tickets

## Files

Main exercise files:

- `src/app/app.component.ts`
- `src/app/app.component.html`
- `src/app/app.component.scss`
- `src/app/app.component.spec.ts`

## What can be changed

The learner should work mainly in:

- `src/app/app.component.ts`

Markup and styles may be adjusted if needed, but the target behavior is described by the tests.

## Notes

- This is the `lesson` branch.
- Some tests are expected to fail until the computed logic is implemented.
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
