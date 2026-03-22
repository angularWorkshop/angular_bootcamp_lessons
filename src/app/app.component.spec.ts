import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';

function tryImport(paths: string[]): any {
  for (const p of paths) {
    try { return require(p); } catch {}
  }
  return null;
}

let StarRatingComponent: any;
let ToggleComponent: any;

beforeAll(() => {
  StarRatingComponent = tryImport(['./star-rating.component'])?.StarRatingComponent;
  ToggleComponent = tryImport(['./toggle.component'])?.ToggleComponent;
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

describe('Exercise 27.3 — model() Two-Way Binding', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    const imports: any[] = [CommonModule];
    if (StarRatingComponent) imports.push(StarRatingComponent);
    if (ToggleComponent) imports.push(ToggleComponent);

    await TestBed.configureTestingModule({
      imports,
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  // --- Basic rendering ---

  it('should create the app component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the title "Product Review"', () => {
    expect(getText(fixture.nativeElement, 'title')).toBe('Product Review');
  });

  it('should show "Rating: 0 / 5" by default', () => {
    expect(getText(fixture.nativeElement, 'rating-display')).toBe('Rating: 0 / 5');
  });

  it('should show "Would recommend: No" by default', () => {
    expect(getText(fixture.nativeElement, 'recommend-display')).toBe('Would recommend: No');
  });

  // --- StarRatingComponent ---

  it('StarRatingComponent should exist and be standalone', () => {
    expect(StarRatingComponent).toBeTruthy();
    const cmpDef = (StarRatingComponent as any)?.ɵcmp;
    expect(cmpDef?.standalone !== false).toBe(true);
  });

  it('StarRatingComponent should declare "rating" as a model (input + output)', () => {
    if (!StarRatingComponent) return pending('StarRatingComponent not found');
    const cmpDef = (StarRatingComponent as any).ɵcmp;
    expect(cmpDef.inputs?.rating).toBeTruthy();
    expect(cmpDef.outputs?.ratingChange).toBeTruthy();
  });

  it('should render 5 star buttons', () => {
    for (let i = 1; i <= 5; i++) {
      const btn = fixture.nativeElement.querySelector(`[data-testid="star-${i}"]`);
      expect(btn).toBeTruthy();
    }
  });

  // --- ToggleComponent ---

  it('ToggleComponent should exist and be standalone', () => {
    expect(ToggleComponent).toBeTruthy();
    const cmpDef = (ToggleComponent as any)?.ɵcmp;
    expect(cmpDef?.standalone !== false).toBe(true);
  });

  it('ToggleComponent should declare "checked" as a model (input + output)', () => {
    if (!ToggleComponent) return pending('ToggleComponent not found');
    const cmpDef = (ToggleComponent as any).ɵcmp;
    expect(cmpDef.inputs?.checked).toBeTruthy();
    expect(cmpDef.outputs?.checkedChange).toBeTruthy();
  });

  it('should render toggle button', () => {
    const btn = fixture.nativeElement.querySelector('[data-testid="toggle-btn"]');
    expect(btn).toBeTruthy();
  });

  // --- Two-way binding ---

  it('should update rating display when star is clicked', () => {
    click(fixture, 'star-3');
    expect(getText(fixture.nativeElement, 'rating-display')).toBe('Rating: 3 / 5');
  });

  it('should fill stars up to selected rating', () => {
    click(fixture, 'star-4');
    for (let i = 1; i <= 4; i++) {
      const btn = fixture.nativeElement.querySelector(`[data-testid="star-${i}"]`);
      expect(btn?.classList.contains('star--filled')).toBe(true);
    }
    const star5 = fixture.nativeElement.querySelector('[data-testid="star-5"]');
    expect(star5?.classList.contains('star--filled')).toBe(false);
  });

  it('should update recommend display when toggle is clicked', () => {
    click(fixture, 'toggle-btn');
    expect(getText(fixture.nativeElement, 'recommend-display')).toBe('Would recommend: Yes');
  });

  it('should toggle back to No on second click', () => {
    click(fixture, 'toggle-btn');
    click(fixture, 'toggle-btn');
    expect(getText(fixture.nativeElement, 'recommend-display')).toBe('Would recommend: No');
  });

  // --- Reset ---

  it('should reset both values when reset button is clicked', () => {
    click(fixture, 'star-5');
    click(fixture, 'toggle-btn');
    click(fixture, 'reset-btn');

    expect(getText(fixture.nativeElement, 'rating-display')).toBe('Rating: 0 / 5');
    expect(getText(fixture.nativeElement, 'recommend-display')).toBe('Would recommend: No');
  });

  it('should clear star fill after reset', () => {
    click(fixture, 'star-3');
    click(fixture, 'reset-btn');

    for (let i = 1; i <= 5; i++) {
      const btn = fixture.nativeElement.querySelector(`[data-testid="star-${i}"]`);
      expect(btn?.classList.contains('star--filled')).toBe(false);
    }
  });
});
