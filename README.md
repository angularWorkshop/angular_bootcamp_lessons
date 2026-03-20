# Event State Management

This branch contains the completed solution for the event binding exercise.

## Goal

A user profile card with two interactive buttons: one toggles the online status, the other promotes the user through a role chain.

## What the solution demonstrates

- `toggleOnlineStatus()` flips `user.isOnline` on each click
- `promote()` advances the role: `Junior Developer` → `Middle Developer` → `Senior Developer`
- both buttons are connected via Angular `(click)` event binding
- the template reflects state changes through interpolation and conditional expressions

## Files

- `src/app/app.component.ts`
- `src/app/app.component.html`
- `src/app/app.component.scss`
- `src/app/app.component.spec.ts`

## Notes

- This is the `answer` branch — reference implementation.
- All tests should pass.

## Commands

Run the app:

```bash
npm start
```

Run tests:

```bash
npm test -- --runInBand
```
