# Upload cancel, retry, and validation

## Goal

Separate rejected files, failed files, and retried uploads into explicit states.

## What you are training

- file validation
- cancel and retry flows
- partial success handling

## Task

Finish the TODOs in the starter files.

1. reject invalid files before upload
2. allow cancel on one record
3. retry a failed record through the same API

## Definition of done

- all tests pass with `npm test -- --runInBand`
- `npm run start:dev` shows a working Angular screen and a green Jest watcher
