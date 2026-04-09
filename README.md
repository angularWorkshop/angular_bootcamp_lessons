# Jobs monitor cleanup and reconnect

## Goal

Keep only one active jobs subscription and rebuild the stream cleanly on reconnect.

## What you are training

- subscription ownership
- cleanup
- reconnect flow

## Task

Finish the TODOs in the starter files.

1. avoid duplicate subscriptions on repeated start
2. unsubscribe on stop
3. reconnect through cleanup plus a fresh start

## Definition of done

- all tests pass with `npm test -- --runInBand`
- `npm run start:dev` shows a working Angular screen and a green Jest watcher
