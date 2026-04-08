# Capstone 1.2 - Dashboard Search, Filters, and Refresh

## Goal

This capstone turns the dashboard into a reactive search screen.
You will debounce text input, react immediately to filter changes, refresh the current result set, and ignore stale responses.

## What you are training

- build one RxJS pipeline for search, filters, and refresh
- debounce text input without delaying status filter changes
- use `switchMap` so old requests stop controlling the UI
- keep the latest results, selection, and error state consistent

## Task

Finish the reactive flow in `src/app/app.component.ts`.

1. Complete `updateStatus()` and `refreshDashboard()` so they notify the reactive pipeline.
2. Complete `bindSearchFlow()` with debounce, merge, switchMap, and correct state handling.
3. Make sure refresh repeats the current query and status instead of inventing a new path.

## Definition of done

- `npm test` passes
- query input is debounced before the service is called
- status filter changes trigger a request immediately
- refresh repeats the current filters and stale requests do not overwrite new results
