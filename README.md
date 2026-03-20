# Exercise 19.1 — Feature-Based Project Structure (completed solution)

**Branch:** `answer-topic-19-exercise-01-feature-based-structure`

## Goal

Learn to organize an Angular project using feature-based architecture: features/, shared/, core/.

## What the learner should build

An Organizer app with Notes and Contacts features, reorganized from flat structure into:
- `features/notes/` — NoteListComponent, NoteService
- `features/contacts/` — ContactListComponent, ContactService
- `shared/card/` — CardComponent
- `core/` — IdService

## What the learner should implement

1. Create the folder structure: features/notes/, features/contacts/, shared/card/, core/
2. Move files into their respective folders
3. Update all imports (components, services, module)
4. Ensure features don't import from each other

## Files

| File | Role |
|------|------|
| `app.component.ts` | Shell with tab navigation |
| `app.module.ts` | Root module (update imports after moving files) |
| `note-list.component.ts` | **Move to features/notes/** |
| `note.service.ts` | **Move to features/notes/** |
| `contact-list.component.ts` | **Move to features/contacts/** |
| `contact.service.ts` | **Move to features/contacts/** |
| `card.component.ts` | **Move to shared/card/** |
| `id.service.ts` | **Move to core/** |
| `app.component.spec.ts` | Tests (do not modify) |

## Commands

```bash
npm start          # dev server
npm test -- --runInBand   # run tests
```
