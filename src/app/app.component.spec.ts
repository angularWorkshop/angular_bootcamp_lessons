import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import 'zone.js/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should log form data on submit', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const nameInput = fixture.nativeElement.querySelector('[name="name"]');
    const emailInput = fixture.nativeElement.querySelector('[name="email"]');
    const form = fixture.nativeElement.querySelector('form');

    nameInput.value = 'Test Name';
    nameInput.dispatchEvent(new Event('input'));
    emailInput.value = 'test@example.com';
    emailInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(consoleSpy).toHaveBeenCalled();
    const loggedValue = consoleSpy.mock.calls[0][0];
    expect(loggedValue.name).toBeTruthy();
    expect(loggedValue.email).toBeTruthy();
  });
});
