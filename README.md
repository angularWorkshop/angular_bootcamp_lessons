# User Profile Bindings

This branch contains the completed solution for the template bindings exercise.

## Goal

Build a `User Profile Card` that renders a user model through interpolation and property binding.

## What the learner should build

The UI must include:

- a heading: `User Profile Card`
- the user's full name
- the user's role
- the user's city
- the user's email
- a user avatar
- an online status badge
- a contact link

## What the learner should implement

The learner must:

- display model values with interpolation
- bind avatar properties through Angular bindings
- bind the email link correctly
- reflect the online state in the badge

## Files

Main exercise files:

- `src/app/app.component.ts`
- `src/app/app.component.html`
- `src/app/app.component.scss`
- `src/app/app.component.spec.ts`

## What can be changed

The learner would usually work mainly in:

- `src/app/app.component.html`

Markup and styles may be adjusted if needed, but the target behavior is described by the tests.

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
