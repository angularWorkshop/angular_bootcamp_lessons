# Custom Highlight Pipe

This branch contains the completed solution for the exercise.

## Goal

Create a standalone `highlight` pipe and apply it in a searchable list.

## What the solution demonstrates

- Standalone pipe with safe regex escaping
- Case-insensitive highlighting with `<mark>`
- List rendering with `[innerHTML]` and live query updates
- Separate pipe unit tests plus component behavior tests

## Files

- `src/app/highlight.pipe.ts`
- `src/app/highlight.pipe.spec.ts`
- `src/app/app.component.html`
- `src/app/app.component.spec.ts`

## Notes

- This is the `answer` branch.
- The test suite should pass.

## Commands

```bash
npm start
npm test -- --runInBand
```
