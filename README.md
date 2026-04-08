# Capstone 1.1 - Feature Dashboard Foundations

## Goal

This capstone is the first time the early Angular topics have to work as one real screen.
You will connect a service-driven dashboard, explicit UI states, card selection, and a details panel.

## What you are training

- compose one feature from components, signals, and a service
- keep loading, empty, error, and success as honest screen states
- synchronize list selection with the details panel
- verify the feature through UI-focused Jest tests

## Task

Finish the dashboard flow in `src/app/app.component.ts`.

1. Complete `loadDashboard()` so the screen handles loading, success, empty, and error states.
2. Store the loaded lessons and select the first one after a successful response.
3. Complete `selectLesson()` so the details panel follows the clicked card.

## Definition of done

- `npm test` passes
- the dashboard shows the correct fallback state for each response type
- clicking another lesson card updates the details panel
- StackBlitz autostarts the app and watch mode through `npm run start:dev`
