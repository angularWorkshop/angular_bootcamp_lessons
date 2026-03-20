# Centralized State with @switch

This branch contains the starter version of the `@switch` exercise.

## Goal

Replace multiple boolean flags with a single `PageState` union type and render the correct UI state using `@switch`.

## What the learner should implement

**In TypeScript:**
- `showLoading()` — set `state` to `'loading'`, clear `products`
- `showSuccess()` — set `state` to `'success'`, fill `products` with 3 items
- `showEmpty()` — set `state` to `'empty'`, clear `products`
- `showError()` — set `state` to `'error'`, clear `products`

**In template:**
- `@switch (state)` with `@case ('loading')`, `@case ('error')`, `@case ('empty')`, `@case ('success')`

## Files

- `src/app/app.component.ts`
- `src/app/app.component.html`
- `src/app/app.component.scss`
- `src/app/app.component.spec.ts`

## What can be changed

- `src/app/app.component.ts` — implement the four methods
- `src/app/app.component.html` — add `@switch` / `@case` blocks

## Notes

- This is the `lesson` branch.
- Tests check both behavior and that there is no `isLoading`/`hasError` — only a single `state` property.

## Commands

```bash
npm start
npm test -- --runInBand
```
