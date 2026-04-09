# Bulk delete with undo

## Goal

Build a destructive flow that moves through confirm, optimistic removal, and undo without losing context.

## What you are training

- confirm dialog state
- optimistic removal
- undo window

## Task

Finish the TODOs in the starter files.

1. open confirm only when rows are selected
2. remove selected rows after confirmation
3. restore them through undo

## Definition of done

- all tests pass with `npm test -- --runInBand`
- `npm run start:dev` shows a working Angular screen and a green Jest watcher
