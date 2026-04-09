# Strangler migration adapters

## Goal

Map a legacy DTO into a new screen VM and describe a safe migration order instead of a big-bang rewrite.

## What you are training

- adapter mapping
- compatibility layer thinking
- safe migration sequencing

## Task

Finish the TODOs in the starter files.

1. map the legacy DTO into the new view model
2. restore the safe migration order from adapter to retirement

## Definition of done

- all tests pass with `npm test -- --runInBand`
- `npm run start:dev` shows a working Angular screen and a green Jest watcher
