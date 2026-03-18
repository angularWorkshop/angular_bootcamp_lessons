# OnPush Progress Card

This branch contains the completed solution for the `OnPush` exercise.

## Goal

Build a small `Progress Card` flow where a child component uses `OnPush`, and the parent updates its input data without mutating the old object.

## What the learner should build

The UI must include:

- a heading: `OnPush Progress Card`
- a child progress card
- current progress like `Completed 2 of 5 lessons`
- a `Complete lesson` button
- a `Reset progress` button
- a note about `OnPush`
- a note about immutable updates

## What the learner should implement

The learner must:

- move the child component to `OnPush`
- keep the UI working correctly
- stop mutating the existing progress object
- update state through new object references

## Files

Main exercise files:

- `src/app/app.component.ts`
- `src/app/app.component.html`
- `src/app/app.component.scss`
- `src/app/app.component.spec.ts`
- `src/app/progress-card.component.ts`

## What can be changed

The learner would usually work mainly in:

- `src/app/app.component.ts`
- `src/app/progress-card.component.ts`

Markup and styles may be adjusted if needed, but the target behavior is described by the tests.

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
