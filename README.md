# User List Rendering

This branch contains the starter version of the `@for` exercise.

## Goal

Render a list of team members from an array using Angular's built-in `@for` control flow.

## What the learner should build

- a heading: `Team Members`
- a list of 4 user cards, each showing name and role

## What the learner should implement

- use `@for (user of users; track user.id)` to iterate over the array
- render each user in a `<li>` with `data-testid="user-card"`
- inside each `<li>` render name (`data-testid="user-name"`) and role (`data-testid="user-role"`)

## Files

- `src/app/app.component.ts`
- `src/app/app.component.html`
- `src/app/app.component.scss`
- `src/app/app.component.spec.ts`

## What can be changed

- `src/app/app.component.html` — add the `@for` block

## Notes

- This is the `lesson` branch.
- Tests that check rendered cards will fail until `@for` is added.
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
