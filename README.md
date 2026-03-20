# Active Routes

This branch contains the completed solution for the exercise.

## Goal

Learn to highlight the active navigation link using `routerLinkActive` and control exact matching with `routerLinkActiveOptions`.

## What the learner should build

- A sidebar navigation with Dashboard, Settings, and Profile links
- The active link is visually highlighted with the `active` CSS class
- Only one link is active at a time

## What the learner should implement

- Add `routerLinkActive="active"` to each navigation link in `app.component.html`
- Add `[routerLinkActiveOptions]="{ exact: true }"` to the Dashboard link (empty path) so it doesn't stay active on every page

## Files

- `src/app/app.component.html` — add routerLinkActive (main task)
- `src/app/app.component.ts`
- `src/app/app.component.scss` — styles (already includes `.active` class)
- `src/app/app.component.spec.ts` — tests
- `src/app/dashboard.component.ts`
- `src/app/settings.component.ts`
- `src/app/profile.component.ts`

## What can be changed

- `src/app/app.component.html`

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
