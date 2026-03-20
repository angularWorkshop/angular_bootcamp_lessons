# Route Guards

This branch contains the completed solution for the exercise.

## Goal

Learn to protect routes with functional guards: `canActivate` to restrict access and `canDeactivate` to prevent losing unsaved changes.

## What the learner should build

- An auth guard that blocks `/admin` for unauthenticated users and redirects to `/login`
- An unsaved-changes guard that shows a confirmation dialog before leaving `/editor` with unsaved work
- Guards wired up to the routes in `app.routes.ts`

## What the learner should implement

- Implement `authGuard` in `auth.guard.ts`: check `AuthService.isLoggedIn()`, redirect to `/login` if false
- Implement `unsavedChangesGuard` in `unsaved-changes.guard.ts`: check `component.hasUnsavedChanges`, show `window.confirm()` if true
- Add `canActivate: [authGuard]` to the `/admin` route in `app.routes.ts`
- Add `canDeactivate: [unsavedChangesGuard]` to the `/editor` route in `app.routes.ts`

## Files

- `src/app/auth.guard.ts` — implement auth guard
- `src/app/unsaved-changes.guard.ts` — implement unsaved changes guard
- `src/app/app.routes.ts` — wire guards to routes
- `src/app/auth.service.ts` — auth service (read-only)
- `src/app/editor.component.ts` — editor with unsaved state (read-only)
- `src/app/app.component.spec.ts` — tests

## What can be changed

- `src/app/auth.guard.ts`
- `src/app/unsaved-changes.guard.ts`
- `src/app/app.routes.ts`

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
