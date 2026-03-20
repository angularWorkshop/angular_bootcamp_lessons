# Page Navigation

This branch contains the completed solution for the exercise.

## Goal

Learn to navigate between pages using route parameters, `routerLink` with dynamic segments, and programmatic navigation via `Router.navigate()`.

## What the learner should build

- A user list page at `/users` with clickable names
- A user detail page at `/users/:id` showing the selected user's name and email
- A "Back to list" button that navigates back programmatically

## What the learner should implement

- Add a `users/:id` route in `app.routes.ts`
- Add `[routerLink]` with dynamic path to each user in `user-list.component.ts`
- Read the `:id` param via `ActivatedRoute` in `user-detail.component.ts`
- Implement `goBack()` using `Router.navigate()` in `user-detail.component.ts`

## Files

- `src/app/app.routes.ts` — add the detail route
- `src/app/user-list.component.ts` — add routerLink
- `src/app/user-detail.component.ts` — read params, implement back navigation
- `src/app/user.model.ts` — user data (read-only)
- `src/app/app.component.spec.ts` — tests

## What can be changed

- `src/app/app.routes.ts`
- `src/app/user-list.component.ts`
- `src/app/user-detail.component.ts`

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
