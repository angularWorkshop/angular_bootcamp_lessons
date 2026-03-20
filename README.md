# App Pages

This branch contains the starter version of the exercise.

## Goal

Set up basic routing in an Angular app: define routes for three pages and render them with `<router-outlet>`.

## What the learner should build

- A navigation bar with links to Home, About, and Contact pages
- A `<router-outlet>` that renders the active page component
- Three page components are already created — you only need to wire them up

## What the learner should implement

- Define routes in `app.routes.ts` mapping paths to page components
- Add `<router-outlet>` to `app.component.html`

## Files

- `src/app/app.routes.ts` — route definitions (main task)
- `src/app/app.component.html` — add router-outlet
- `src/app/app.component.ts`
- `src/app/app.component.spec.ts` — tests
- `src/app/home.component.ts`
- `src/app/about.component.ts`
- `src/app/contact.component.ts`

## What can be changed

- `src/app/app.routes.ts`
- `src/app/app.component.html`

## Notes

- This is the `lesson` branch.
- Some tests are expected to fail before the learner completes the task.

## Commands

Run the app:

```bash
npm start
```

Run tests:

```bash
npm test -- --runInBand
```
