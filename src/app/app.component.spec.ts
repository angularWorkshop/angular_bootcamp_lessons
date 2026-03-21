import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the FormArray heading, add button, and the initial speaker row', () => {
    expect(getText('roster-title')).toBe('Speaker Roster Builder');
    expect(getText('add-speaker-btn')).toBe('Add speaker');
    expect(host.querySelector('[data-testid="speaker-input-0"]')).toBeTruthy();
    expect(getText('speaker-count')).toBe('Speakers: 1');
  });

  it('should render the initial roster preview item', () => {
    expect(getText('speaker-preview-0')).toBe('Keynote host');
  });

  it('should add a new speaker control and update the roster count', () => {
    click('add-speaker-btn');

    expect(host.querySelector('[data-testid="speaker-input-1"]')).toBeTruthy();
    expect(getText('speaker-count')).toBe('Speakers: 2');
  });

  it('should remove the selected speaker control and shrink the roster again', () => {
    click('add-speaker-btn');
    click('remove-speaker-1');

    expect(host.querySelector('[data-testid="speaker-input-1"]')).toBeNull();
    expect(getText('speaker-count')).toBe('Speakers: 1');
  });

  function click(testId: string): void {
    const button = host.querySelector(`[data-testid="${testId}"]`) as HTMLButtonElement | null;

    expect(button).toBeTruthy();
    button?.click();
    fixture.detectChanges();
  }

  function getText(testId: string): string {
    const element = host.querySelector(`[data-testid="${testId}"]`);

    expect(element).toBeTruthy();
    return element?.textContent?.trim() ?? '';
  }
});
