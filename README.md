# Exercise 27.3 — model() Two-Way Binding

**Branch:** `lesson-topic-27-exercise-03-model-two-way`

## Goal
Learn to use `model()` for two-way binding between parent and child components.

## What the learner should build
A Product Review page with a star rating component and a toggle component, both using `model()` for two-way binding.

## What the learner should implement
1. `star-rating.component.ts` — `rating = model(0)`, 5 star buttons
2. `toggle.component.ts` — `checked = model(false)`, toggle button
3. Wire both in `AppComponent` with `[(rating)]` and `[(checked)]` syntax
4. Reset button that sets both back to defaults

## Commands
```bash
npm start
npm test -- --runInBand
```
