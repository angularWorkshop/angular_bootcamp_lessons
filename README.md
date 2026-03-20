# App Pages

This branch contains the completed solution for the exercise.

## Goal

Set up basic routing in an Angular app: define routes for three pages and render them with `<router-outlet>`.

## What the solution demonstrates

- Route definitions mapping paths to standalone page components
- `<router-outlet>` rendering the active page
- Navigation between Home, About, and Contact pages via `routerLink`

## Files

- `src/app/app.routes.ts` — route definitions
- `src/app/app.component.html` — layout with router-outlet
- `src/app/app.component.ts`
- `src/app/app.component.spec.ts` — tests
- `src/app/home.component.ts`
- `src/app/about.component.ts`
- `src/app/contact.component.ts`

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
