# Dynamic List Management

This branch contains the completed solution for the dynamic list exercise.

## Goal

A todo list with add and remove operations that update the UI correctly.

## What the solution demonstrates

- `addTodo()` validates input, pushes a new item, and clears the field
- `removeTodo(id)` filters out the item by id
- `@empty` block appears when the list is emptied

## Files

- `src/app/app.component.ts`
- `src/app/app.component.html`
- `src/app/app.component.scss`
- `src/app/app.component.spec.ts`
- `src/app/app.module.ts`

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
