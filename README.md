# Release hardening guards

## Goal

Turn debug leakage and broken runtime config into explicit production guards.

## What you are training

- debug guard
- error surface
- smoke status

## Task

Finish the TODOs in the starter files.

1. surface the missing API base URL
2. block the screen when production still enables debug tools
3. compute the smoke status

## Definition of done

- all tests pass with `npm test -- --runInBand`
- `npm run start:dev` shows a working Angular screen and a green Jest watcher
