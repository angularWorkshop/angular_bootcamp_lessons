# Drawer dirty-state guard

## Goal

Protect the editor drawer from silent data loss by separating original value, draft value, and the close flow.

## What you are training

- draft state
- dirty guard
- cancel rollback

## Task

Finish the TODOs in the starter files.

1. block direct close when the drawer is dirty
2. rollback the draft on cancel
3. persist the draft on save

## Definition of done

- all tests pass with `npm test -- --runInBand`
- `npm run start:dev` shows a working Angular screen and a green Jest watcher
