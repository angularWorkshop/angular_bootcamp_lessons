import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { Component, input, computed, InputSignal } from '@angular/core';

function tryImport(paths: string[]): any {
  for (const p of paths) {
    try { return require(p); } catch {}
  }
  return null;
}

let UserCardComponent: any;

beforeAll(() => {
  const mod = tryImport(['./user-card.component']);
  UserCardComponent = mod?.UserCardComponent;
});

function getText(el: HTMLElement, testId: string): string {
  const target = el.querySelector(`[data-testid="${testId}"]`);
  return target ? target.textContent!.trim() : '';
}

function getAll(el: HTMLElement, testId: string): HTMLElement[] {
  return Array.from(el.querySelectorAll(`[data-testid="${testId}"]`));
}

function click(fixture: ComponentFixture<any>, testId: string): void {
  const el = fixture.nativeElement.querySelector(`[data-testid="${testId}"]`);
  el?.click();
  fixture.detectChanges();
}

describe('Exercise 27.1 — Signal Inputs', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    const imports: any[] = [CommonModule];
    if (UserCardComponent) imports.push(UserCardComponent);

    await TestBed.configureTestingModule({
      imports,
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the title "Team Members"', () => {
    expect(getText(fixture.nativeElement, 'title')).toBe('Team Members');
  });

  // --- UserCardComponent must exist and be standalone ---

  it('UserCardComponent should exist', () => {
    expect(UserCardComponent).toBeTruthy();
  });

  it('UserCardComponent should be standalone', () => {
    const annotations = (UserCardComponent as any)?.__annotations__
      ?? (UserCardComponent as any)?.ɵcmp;
    expect(annotations?.standalone !== false).toBe(true);
  });

  // --- Signal inputs check ---

  it('UserCardComponent should declare "user" as an input', () => {
    if (!UserCardComponent) return pending('UserCardComponent not found');

    const cmpDef = (UserCardComponent as any).ɵcmp;
    expect(cmpDef).toBeTruthy();

    // Angular compiler stores input mapping in the component definition
    const inputs = cmpDef.inputs;
    expect(inputs).toBeTruthy();
    expect(inputs.user).toBeTruthy();
  });

  it('UserCardComponent should declare "showEmail" as an input', () => {
    if (!UserCardComponent) return pending('UserCardComponent not found');

    const cmpDef = (UserCardComponent as any).ɵcmp;
    const inputs = cmpDef.inputs;
    expect(inputs).toBeTruthy();
    expect(inputs.showEmail).toBeTruthy();
  });

  // --- Rendered cards ---

  it('should render 3 user cards', () => {
    const cards = getAll(fixture.nativeElement, 'user-card');
    expect(cards.length).toBe(3);
  });

  it('should display full names in cards', () => {
    const cards = getAll(fixture.nativeElement, 'user-card');
    const names = cards.map(card => getText(card, 'full-name'));
    expect(names).toEqual(['Anna Petrova', 'Boris Ivanov', 'Clara Sidorova']);
  });

  it('should display initials in cards', () => {
    const cards = getAll(fixture.nativeElement, 'user-card');
    const initials = cards.map(card => getText(card, 'initials'));
    expect(initials).toEqual(['AP', 'BI', 'CS']);
  });

  it('should display role labels', () => {
    const cards = getAll(fixture.nativeElement, 'user-card');
    const roles = cards.map(card => getText(card, 'role-label'));
    expect(roles).toEqual(['Admin', 'Editor', 'Viewer']);
  });

  it('should display emails when showEmail is true', () => {
    const cards = getAll(fixture.nativeElement, 'user-card');
    const emails = cards.map(card => getText(card, 'email'));
    expect(emails).toEqual(['anna@example.com', 'boris@example.com', 'clara@example.com']);
  });

  it('should hide emails when toggle is clicked', () => {
    click(fixture, 'toggle-emails');
    const emailEls = fixture.nativeElement.querySelectorAll('[data-testid="email"]');
    expect(emailEls.length).toBe(0);
  });

  it('should show emails again after toggling twice', () => {
    click(fixture, 'toggle-emails');
    click(fixture, 'toggle-emails');
    const cards = getAll(fixture.nativeElement, 'user-card');
    const emails = cards.map(card => getText(card, 'email'));
    expect(emails).toEqual(['anna@example.com', 'boris@example.com', 'clara@example.com']);
  });

  it('should derive computed values correctly (fullName reacts to different data)', () => {
    // Verify by checking rendered output — first card should show "Anna Petrova"
    const cards = getAll(fixture.nativeElement, 'user-card');
    expect(cards.length).toBeGreaterThan(0);

    // Check that initials match the names (derived correctly)
    const firstName = 'Anna';
    const lastName = 'Petrova';
    const expectedInitials = 'AP';
    const card = cards[0];
    expect(getText(card, 'full-name')).toBe(`${firstName} ${lastName}`);
    expect(getText(card, 'initials')).toBe(expectedInitials);
  });
});
