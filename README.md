# Feature-store/facade для списка заказов с loading/error/empty/success, selection и refresh

## Goal

Build one honest screen contract around a feature facade instead of scattering screen orchestration across the component.

## What you are training

- screen-state via signals
- selection synchronized with a details panel
- refresh through the same facade flow

## Task

Finish the TODOs in the Angular screen and its feature layer.

1. finish the facade loading flow
2. select the first order after a successful response
3. reuse the same flow for refresh

## Done when

- `npm run test` passes
- the screen behaves honestly for every checked state
- the implementation keeps the feature logic out of the template
