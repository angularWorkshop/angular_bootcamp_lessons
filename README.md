# Structural Permission Directive

Starter project. TODOs are intentionally incomplete.

## Task

Implement appHasPermission with TemplateRef and ViewContainerRef; replace repeated @if conditions in the real app with the structural directive.

Use the provided AuthService.hasPermission and permissions$ stream. React to permission and input changes, create at most one view, remove unauthorized DOM, and unsubscribe/clear on destroy. Empty permission is denied. This is a local UI exercise, not server authorization.

## Files to edit

src/app/has-permission.directive.ts, src/app/app.component.html

## Checks

```bash
npm install
npm test -- --runInBand
npm run build
```

StackBlitz installs dependencies and starts the status runner automatically. Changes trigger another check. The starter reports NOT COMPLETED until the task is solved; the answer reports COMPLETED.

Do not edit tests to complete the exercise.
