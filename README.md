# Optimistic toggle статуса, rollback при ошибке и единый message-channel экрана

## Goal

Make the screen feel instant without letting it lie when the request fails.

## What you are training

- optimistic UI
- rollback on error
- a single message channel for the screen

## Task

Finish the TODOs in the Angular screen and its feature layer.

1. update the card status optimistically
2. keep the previous status for rollback
3. surface both success and rollback messages

## Done when

- `npm run test` passes
- the screen behaves honestly for every checked state
- the implementation keeps the feature logic out of the template
