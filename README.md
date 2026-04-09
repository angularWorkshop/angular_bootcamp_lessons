# Upload zone with preview and progress

## Goal

Represent the upload flow as a queue of files with status and progress instead of one generic loading flag.

## What you are training

- upload queue state
- preview records
- per-file progress

## Task

Finish the TODOs in the starter files.

1. accept the demo files into the queue
2. move them into uploading state
3. finish them through the upload API flush

## Definition of done

- all tests pass with `npm test -- --runInBand`
- `npm run start:dev` shows a working Angular screen and a green Jest watcher
