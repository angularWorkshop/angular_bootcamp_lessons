# Permission Directive

This branch contains the starter version of the exercise.

## Goal

Implement `appHasRole` to control element visibility based on role from DI.

## What the learner should build

- Directive receives required role through input
- Current role comes from `UserRoleService`
- Element is hidden when role does not match

## What the learner should implement

- Complete visibility logic in `src/app/has-role.directive.ts`
- Keep current template and test ids

## Files

- `src/app/has-role.directive.ts` — main TODO
- `src/app/user-role.service.ts`
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
