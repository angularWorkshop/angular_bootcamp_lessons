# Dynamic List Management

This branch contains the starter version of the dynamic list exercise.

## Goal

Implement add and remove operations on a todo list. The UI must update correctly after each action, and empty state must be handled.

## What the learner should build

- an input field + Add button to create new todos
- each todo has a Remove button
- empty-state message when no todos remain

## What the learner should implement

- `addTodo()` — push a new item from `newTodoText`, skip empty/whitespace input, clear `newTodoText` after
- `removeTodo(id)` — remove the todo with the given id from the array

## Files

- `src/app/app.component.ts`
- `src/app/app.component.html`
- `src/app/app.component.scss`
- `src/app/app.component.spec.ts`
- `src/app/app.module.ts`

## What can be changed

- `src/app/app.component.ts` — implement the two methods

## Notes

- This is the `lesson` branch.
- Template and `@for` are already in place. Only the methods need implementation.
- Tests for add/remove behavior will fail until the methods work.
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
