# Custom Highlight Pipe

This branch contains the starter version of the exercise.

## Goal

Create a standalone `highlight` pipe and apply it in a searchable list.

## What the learner should build

- Pipe `highlight` that wraps query matches in `<mark>`
- Case-insensitive match handling
- DOM rendering through `[innerHTML]`

## What the learner should implement

- Finish `transform()` in `src/app/highlight.pipe.ts`
- Keep search behavior and template structure intact
- Make both component and pipe tests green

## Files

- `src/app/highlight.pipe.ts` — main TODO
- `src/app/highlight.pipe.spec.ts` — pipe unit tests
- `src/app/app.component.html`
- `src/app/app.component.spec.ts`

## Notes

- This is the `lesson` branch.
- Some tests are expected to fail before completion.

## Commands

```bash
npm start
npm test -- --runInBand
```
