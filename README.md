# User List Rendering

This branch contains the completed solution for the `@for` exercise.

## Goal

Render a list of team members from an array using Angular's built-in `@for` control flow.

## What the solution demonstrates

- `@for (user of users; track user.id)` iterates over the array
- each user is rendered as a card with name and role

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
