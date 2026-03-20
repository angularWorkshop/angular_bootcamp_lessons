# Legacy Standalone Integration

This branch contains the completed solution for the exercise.

## Goal

Learn how to integrate a legacy `NgModule` feature into a modern standalone component without rewriting the old feature.

## What the learner should build

- A standalone dashboard screen
- A legacy activity widget rendered inside that dashboard
- A clean integration boundary where the dashboard imports the legacy module

## What the learner should implement

- Export the legacy widget from `LegacyActivityModule`
- Import `LegacyActivityModule` into `DashboardComponent`
- Replace the placeholder state with the real legacy widget

## Files

- `src/app/dashboard.component.ts` — standalone host component
- `src/app/legacy-activity.module.ts` — legacy module
- `src/app/legacy-activity-widget.component.ts` — legacy widget
- `src/app/app.module.ts` — app bootstrap module
- `src/app/app.component.spec.ts` — tests

## What can be changed

- `src/app/dashboard.component.ts`
- `src/app/legacy-activity.module.ts`

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
