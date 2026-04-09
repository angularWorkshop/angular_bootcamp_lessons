# Public API stabilization

## Goal

Export the shared badge component through one public entrance and remove direct feature imports into internals.

## What you are training

- barrel public API
- shared component reuse
- code-level API stability checks

## Task

Finish the TODOs in the starter files.

1. export both the component and its view model through public-api.ts
2. move feature hosts to the public entrance instead of internal file paths

## Definition of done

- all tests pass with `npm test -- --runInBand`
- `npm run start:dev` shows a working Angular screen and a green Jest watcher
