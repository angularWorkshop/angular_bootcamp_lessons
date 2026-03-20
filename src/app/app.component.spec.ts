import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import * as fs from 'fs';
import * as path from 'path';

// Dynamic imports — these must resolve after the student moves files.
// The tests use lazy re-imports so they work with BOTH flat and feature-based layouts.
let NoteListComponent: any;
let ContactListComponent: any;
let CardComponent: any;
let NoteService: any;
let ContactService: any;
let IdService: any;

function tryImport(paths: string[]): any {
  for (const p of paths) {
    try {
      return require(p);
    } catch {}
  }
  return null;
}

beforeAll(() => {
  const noteList = tryImport(['./features/notes/note-list.component', './note-list.component']);
  const contactList = tryImport(['./features/contacts/contact-list.component', './contact-list.component']);
  const card = tryImport(['./shared/card/card.component', './card.component']);
  const noteService = tryImport(['./features/notes/note.service', './note.service']);
  const contactService = tryImport(['./features/contacts/contact.service', './contact.service']);
  const idService = tryImport(['./core/id.service', './id.service']);

  NoteListComponent = noteList?.NoteListComponent;
  ContactListComponent = contactList?.ContactListComponent;
  CardComponent = card?.CardComponent;
  NoteService = noteService?.NoteService;
  ContactService = contactService?.ContactService;
  IdService = idService?.IdService;
});

function getText(fixture: ComponentFixture<AppComponent>, testId: string): string {
  const el = fixture.nativeElement.querySelector(`[data-testid="${testId}"]`);
  return el ? el.textContent.trim() : '';
}

function click(fixture: ComponentFixture<AppComponent>, testId: string): void {
  const el = fixture.nativeElement.querySelector(`[data-testid="${testId}"]`);
  el?.click();
  fixture.detectChanges();
}

function typeAndAdd(fixture: ComponentFixture<AppComponent>, inputTestId: string, btnTestId: string, value: string): void {
  const input: HTMLInputElement = fixture.nativeElement.querySelector(`[data-testid="${inputTestId}"]`);
  input.value = value;
  input.dispatchEvent(new Event('input'));
  fixture.detectChanges();
  click(fixture, btnTestId);
}

describe('AppComponent — Organizer', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    const imports = [CommonModule];
    if (NoteListComponent) imports.push(NoteListComponent);
    if (ContactListComponent) imports.push(ContactListComponent);

    await TestBed.configureTestingModule({
      imports,
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the title "Organizer"', () => {
    expect(getText(fixture, 'title')).toBe('Organizer');
  });

  it('should show Notes tab active by default', () => {
    const tab = fixture.nativeElement.querySelector('[data-testid="tab-notes"]');
    expect(tab.classList.contains('app__tab--active')).toBe(true);
  });

  it('should render note list by default', () => {
    expect(fixture.nativeElement.querySelector('[data-testid="note-list"]')).toBeTruthy();
  });

  it('should switch to Contacts tab', () => {
    click(fixture, 'tab-contacts');
    expect(fixture.nativeElement.querySelector('[data-testid="contact-list"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-testid="note-list"]')).toBeNull();
  });

  it('should add a note', () => {
    typeAndAdd(fixture, 'note-input', 'note-add-btn', 'My first note');
    const cards = fixture.nativeElement.querySelectorAll('[data-testid^="card-text-"]');
    expect(cards.length).toBe(1);
    expect(cards[0].textContent.trim()).toBe('My first note');
  });

  it('should add a contact', () => {
    click(fixture, 'tab-contacts');
    typeAndAdd(fixture, 'contact-input', 'contact-add-btn', 'Alice');
    const cards = fixture.nativeElement.querySelectorAll('[data-testid^="card-text-"]');
    expect(cards.length).toBe(1);
    expect(cards[0].textContent.trim()).toBe('Alice');
  });

  it('should remove a note via card button', () => {
    typeAndAdd(fixture, 'note-input', 'note-add-btn', 'Temp note');
    const removeBtn = fixture.nativeElement.querySelector('[data-testid^="card-remove-"]');
    removeBtn.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[data-testid="note-empty"]')).toBeTruthy();
  });
});

describe('Feature-based structure', () => {
  const appDir = path.resolve(__dirname);

  it('should have features/notes/ folder with note-list.component.ts', () => {
    const filePath = path.join(appDir, 'features', 'notes', 'note-list.component.ts');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should have features/notes/ folder with note.service.ts', () => {
    const filePath = path.join(appDir, 'features', 'notes', 'note.service.ts');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should have features/contacts/ folder with contact-list.component.ts', () => {
    const filePath = path.join(appDir, 'features', 'contacts', 'contact-list.component.ts');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should have features/contacts/ folder with contact.service.ts', () => {
    const filePath = path.join(appDir, 'features', 'contacts', 'contact.service.ts');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should have shared/card/ folder with card.component.ts', () => {
    const filePath = path.join(appDir, 'shared', 'card', 'card.component.ts');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should have core/ folder with id.service.ts', () => {
    const filePath = path.join(appDir, 'core', 'id.service.ts');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should NOT have flat note.service.ts in app root', () => {
    const filePath = path.join(appDir, 'note.service.ts');
    expect(fs.existsSync(filePath)).toBe(false);
  });

  it('should NOT have flat contact.service.ts in app root', () => {
    const filePath = path.join(appDir, 'contact.service.ts');
    expect(fs.existsSync(filePath)).toBe(false);
  });

  it('should NOT have flat card.component.ts in app root', () => {
    const filePath = path.join(appDir, 'card.component.ts');
    expect(fs.existsSync(filePath)).toBe(false);
  });

  it('should NOT have flat id.service.ts in app root', () => {
    const filePath = path.join(appDir, 'id.service.ts');
    expect(fs.existsSync(filePath)).toBe(false);
  });
});
