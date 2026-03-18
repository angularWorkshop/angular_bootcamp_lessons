# Immutable Lesson Checklist

This branch contains the completed solution for the immutable state exercise.

## Goal

Build a `Lesson Checklist` flow where a child component already works with `OnPush`, and the parent updates the list through new array references instead of mutations.

## What the learner should build

The UI must include:

- a heading: `Immutable Lesson Checklist`
- a child checklist component
- a completed summary like `Completed 0 of 3 lessons`
- a `Complete first lesson` button
- a `Reset checklist` button
- a note about immutable updates

## What the learner should implement

The learner must:

- stop mutating the existing lessons array
- stop mutating lesson objects in place
- update the checklist through new array references
- keep the `OnPush` child component working correctly

## Files

Main exercise files:

- `src/app/app.component.ts`
- `src/app/app.component.html`
- `src/app/app.component.scss`
- `src/app/app.component.spec.ts`
- `src/app/lesson-checklist.component.ts`

## What can be changed

The learner would usually work mainly in:

- `src/app/app.component.ts`

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
