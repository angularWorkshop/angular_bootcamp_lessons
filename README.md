# UI States with @if

This branch contains the starter version of the conditional rendering exercise.

## Goal

Ensure that a product catalog page shows only one UI state at a time: loading, error, empty, or success. Use Angular's `@if` / `@else if` / `@else` to conditionally render each state.

## What the learner should implement

Wrap the four state blocks with `@if` / `@else if` / `@else` so that only one is visible:

- `isLoading` → show loading state
- `hasError` → show error state
- `products.length === 0` → show empty state
- otherwise → show product list

## Files

- `src/app/app.component.ts`
- `src/app/app.component.html`
- `src/app/app.component.scss`
- `src/app/app.component.spec.ts`

## What can be changed

- `src/app/app.component.html` — add `@if` / `@else if` / `@else`

## Notes

- This is the `lesson` branch.
- Currently all four state blocks are visible simultaneously.
- Tests that check "only one state visible" will fail until the conditions are added.

## Commands

Run the app:

```bash
npm start
```

Run tests:

```bash
npm test -- --runInBand
```
