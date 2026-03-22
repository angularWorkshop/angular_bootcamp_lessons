# Async Pipe HTTP Feed

This branch contains the completed solution for the exercise.

## Goal

Load lesson data from `HttpClient` and render it via `AsyncPipe`.

## What the solution demonstrates

- HTTP data stream exposed as an observable field
- Template rendering with `*ngIf="stream | async as data"`
- Loading placeholder while request is unresolved
- No manual `subscribe()` in `AppComponent`

## Files

- `src/app/app.component.ts`
- `src/app/app.component.html`
- `src/app/lesson-feed.service.ts`
- `src/app/app.component.spec.ts`

## Notes

- This is the `answer` branch.
- The full test suite should pass.

## Commands

```bash
npm start
npm test -- --runInBand
```
