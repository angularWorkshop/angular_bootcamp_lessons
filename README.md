# Exercise 27.2 — Signal Outputs

**Branch:** `lesson-topic-27-exercise-02-signal-outputs`

## Goal
Learn to use signal-based outputs (`output()`) to emit events from child to parent.

## What the learner should build
A Product Catalog page with a category filter. The filter component emits selection and clear events via `output()`.

## What the learner should implement
1. Create `category-filter.component.ts` — standalone component with:
   - `categories = input.required<string[]>()` — list of categories
   - `selected = output<string>()` — emits selected category
   - `cleared = output()` — emits when filter is cleared
2. Implement the filter template with category buttons and clear button
3. Import in `AppComponent`, handle events, update state

## Commands
```bash
npm start
npm test -- --runInBand
```
