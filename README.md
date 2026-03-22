# Exercise 27.1 — Signal Inputs

**Branch:** `lesson-topic-27-exercise-01-signal-inputs`

## Goal
Learn to use signal-based inputs (`input()`, `input.required()`) and derive computed values from them.

## What the learner should build
A Team Members page displaying user cards. Each card receives data through signal-based inputs and computes derived values (full name, initials, role label).

## What the learner should implement
1. Create `user-card.component.ts` — standalone component with:
   - `user = input.required<User>()` — required signal input
   - `showEmail = input(true)` — optional signal input
   - `fullName = computed(...)` — firstName + lastName
   - `initials = computed(...)` — first letters uppercased
   - `roleLabel = computed(...)` — human-readable role
2. Implement the card template with proper `data-testid` attributes
3. Import `UserCardComponent` in `AppComponent` and render cards

## Files
| File | Role |
|---|---|
| `user.model.ts` | User interface |
| `user-card.component.ts` | Component to implement |
| `app.component.ts` | Parent — holds data, passes to cards |
| `app.component.html` | Parent template — iterate and render cards |
| `app.component.spec.ts` | Tests |

## Commands
```bash
npm start
npm test -- --runInBand
```
