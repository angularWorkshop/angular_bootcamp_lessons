# Permission Directive

This branch contains the completed solution for the exercise.

## Goal

Implement `appHasRole` to control element visibility based on role from DI.

## What the solution demonstrates

- Standalone attribute directive with role input
- Role read through injected `UserRoleService`
- Visibility enforcement with `Renderer2` style updates

## Files

- `src/app/has-role.directive.ts`
- `src/app/user-role.service.ts`
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
