import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';

function tryImport(paths: string[]): any {
  for (const p of paths) {
    try { return require(p); } catch {}
  }
  return null;
}

let SearchBoxComponent: any;

beforeAll(() => {
  SearchBoxComponent = tryImport(['./search-box.component'])?.SearchBoxComponent;
});

function getText(el: HTMLElement, testId: string): string {
  const target = el.querySelector(`[data-testid="${testId}"]`);
  return target ? target.textContent!.trim() : '';
}

function click(fixture: ComponentFixture<any>, testId: string): void {
  const el = fixture.nativeElement.querySelector(`[data-testid="${testId}"]`);
  el?.click();
  fixture.detectChanges();
}

function getInput(fixture: ComponentFixture<any>): HTMLInputElement | null {
  return fixture.nativeElement.querySelector('[data-testid="search-input"]');
}

function typeInInput(fixture: ComponentFixture<any>, value: string): void {
  const input = getInput(fixture);
  if (input) {
    input.value = value;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }
}

describe('Exercise 28.1 — viewChild() Signal Query', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  // --- Basic rendering ---

  it('should create the app component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the title "Search"', () => {
    expect(getText(fixture.nativeElement, 'title')).toBe('Search');
  });

  it('should show "Query: " by default (empty)', () => {
    expect(getText(fixture.nativeElement, 'query-display')).toBe('Query:');
  });

  // --- SearchBoxComponent ---

  it('SearchBoxComponent should exist and be standalone', () => {
    expect(SearchBoxComponent).toBeTruthy();
    const cmpDef = (SearchBoxComponent as any)?.ɵcmp;
    expect(cmpDef?.standalone !== false).toBe(true);
  });

  it('SearchBoxComponent should use viewChild (has no @ViewChild decorator)', () => {
    if (!SearchBoxComponent) return pending('SearchBoxComponent not found');
    const propDecorators = (SearchBoxComponent as any).__prop__metadata__;
    const hasOldViewChild = propDecorators
      ? Object.values(propDecorators).some((decorators: any) =>
          Array.isArray(decorators) && decorators.some((d: any) => d.ngMetadataName === 'ViewChild')
        )
      : false;
    expect(hasOldViewChild).toBe(false);
  });

  it('should render the search input', () => {
    const input = getInput(fixture);
    expect(input).toBeTruthy();
    expect(input?.placeholder).toBe('Type to search...');
  });

  it('should render the Focus button', () => {
    const btn = fixture.nativeElement.querySelector('[data-testid="focus-btn"]');
    expect(btn).toBeTruthy();
  });

  it('should render the Clear & Focus button', () => {
    const btn = fixture.nativeElement.querySelector('[data-testid="clear-btn"]');
    expect(btn).toBeTruthy();
  });

  // --- Interaction ---

  it('should update query display when typing in input', () => {
    typeInInput(fixture, 'angular');
    expect(getText(fixture.nativeElement, 'query-display')).toBe('Query: angular');
  });

  it('should focus input when Focus button is clicked', () => {
    const input = getInput(fixture);
    input?.blur();
    click(fixture, 'focus-btn');
    expect(document.activeElement).toBe(input);
  });

  it('should clear input and focus when Clear & Focus is clicked', () => {
    typeInInput(fixture, 'hello');
    click(fixture, 'clear-btn');

    const input = getInput(fixture);
    expect(input?.value).toBe('');
    expect(document.activeElement).toBe(input);
  });

  it('should update query display to empty after Clear & Focus', () => {
    typeInInput(fixture, 'test');
    expect(getText(fixture.nativeElement, 'query-display')).toBe('Query: test');

    click(fixture, 'clear-btn');
    expect(getText(fixture.nativeElement, 'query-display')).toBe('Query:');
  });

  // --- Output binding ---

  it('SearchBoxComponent should declare queryChange output', () => {
    if (!SearchBoxComponent) return pending('SearchBoxComponent not found');
    const cmpDef = (SearchBoxComponent as any).ɵcmp;
    expect(cmpDef.outputs?.queryChange).toBeTruthy();
  });

  it('should propagate query to parent via output', () => {
    typeInInput(fixture, 'signals');
    expect((fixture.componentInstance as any).query()).toBe('signals');
  });
});
