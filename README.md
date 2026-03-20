# Legacy Module Analysis

This branch contains the completed solution for the exercise.

## Goal

Learn to recognize a legacy `NgModule` boundary and move feature wiring out of `AppModule` into a dedicated feature module.

## What the learner should build

- A working legacy profile card with avatar, editable display name, and tags
- A dedicated `LegacyProfileModule` that owns the legacy feature
- An `AppModule` that consumes the legacy module instead of declaring the feature directly

## What the learner should implement

- Configure `LegacyProfileModule` with the correct `declarations`, `imports`, and `exports`
- Move the legacy feature components out of `AppModule`
- Import `LegacyProfileModule` into `AppModule`

## Files

- `src/app/app.module.ts` — root module
- `src/app/legacy-profile.module.ts` — feature module to fix
- `src/app/legacy-profile.component.ts` — legacy feature component
- `src/app/legacy-avatar.component.ts` — nested legacy component
- `src/app/app.component.spec.ts` — tests

## What can be changed

- `src/app/app.module.ts`
- `src/app/legacy-profile.module.ts`

## Notes

- This is the `answer` branch.
- It contains the finished reference implementation.
- The test suite should stay green here.

## Commands

Run the app:

```bash
npm start
```

Run tests:

```bash
npm test -- --runInBand
```
