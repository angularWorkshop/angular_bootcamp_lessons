# Effect Preferences Sync

This branch contains the completed solution for the `effect()` exercise.

## Goal

Build a `Preferences Sync` screen where local UI state is stored in Signals, and side effects are synchronized through `effect()`.

## What the learner should build

The UI must include:

- a heading: `Preferences Sync`
- the current theme
- the current compact mode status
- a `Toggle theme` button
- a `Toggle compact mode` button
- a note about `document.title`
- a note about `localStorage`

## Source state

Use these values as the main source state:

- `theme`
- `compactMode`

## Side effects

The learner must implement synchronization for:

- `document.title`
- `localStorage`

## Files

Main exercise files:

- `src/app/app.component.ts`
- `src/app/app.component.html`
- `src/app/app.component.scss`
- `src/app/app.component.spec.ts`

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
