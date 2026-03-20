# Event State Management

This branch contains the starter version of the event binding exercise.

## Goal

Make the user profile card interactive: wire up two buttons so that clicking them changes the component state and updates the UI without a page reload.

## What the learner should build

The UI must include:

- a heading: `User Profile`
- the user's full name, role, and city
- an online status badge showing `Online` or `Offline`
- a toggle button labeled `Go Online` / `Go Offline`
- a promote button labeled `Promote`

## What the learner should implement

- implement `toggleOnlineStatus()` — flip `user.isOnline` between `true` and `false`
- implement `promote()` — advance the role: `Junior Developer` → `Middle Developer` → `Senior Developer` (stay at Senior)
- bind both buttons to their methods using Angular event binding `(click)`

## Files

- `src/app/app.component.ts`
- `src/app/app.component.html`
- `src/app/app.component.scss`
- `src/app/app.component.spec.ts`

## What can be changed

- `src/app/app.component.ts` — implement the two methods
- `src/app/app.component.html` — add `(click)` bindings to the buttons

## Notes

- This is the `lesson` branch.
- Tests that check click behavior will fail until the methods and event bindings are in place.
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
