# Deep-link в карточку сущности и восстановление состояния экрана после reload

## Goal

Make the selected entity part of the URL so the details panel survives reloads and shared links.

## What you are training

- deep links through query params
- selection restored from the route
- preserving the rest of the screen context

## Task

Finish the TODOs in the Angular screen and its feature layer.

1. hydrate selection from orderId in the route
2. update query params when another card is selected
3. keep search, status, and page while changing the selected card

## Done when

- `npm run test` passes
- the screen behaves honestly for every checked state
- the implementation keeps the feature logic out of the template
