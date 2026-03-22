# Async Pipe HTTP Feed

This branch contains the starter version of the exercise.

## Goal

Load lesson data from `HttpClient` and render it via `AsyncPipe`.

## What the learner should build

- HTTP request for lesson feed data
- Loading state while request is pending
- List rendering through template async binding

## What the learner should implement

- Remove manual subscription from `AppComponent`
- Expose observable stream for the template
- Use `async` pipe in `app.component.html`

## Files

- `src/app/app.component.ts` — currently uses manual subscribe (target fix)
- `src/app/app.component.html`
- `src/app/lesson-feed.service.ts`
- `src/app/app.component.spec.ts`

## Notes

- This is the `lesson` branch.
- Some tests are expected to fail before completion.

## Commands

```bash
npm start
npm test -- --runInBand
```
