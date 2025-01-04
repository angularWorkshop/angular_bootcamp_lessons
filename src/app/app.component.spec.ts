import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
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

  it('should have a form with a "contactInfo" group', () => {
    const form = fixture.nativeElement.querySelector('form');
    expect(form.querySelector('[ngModelGroup="contactInfo"]')).toBeTruthy();
  });

  it('should disable the submit button if the form is invalid', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTruthy();
  });

  it('should enable the submit button when the form is valid', () => {
    const nameInput = fixture.nativeElement.querySelector('#name');
    const emailInput = fixture.nativeElement.querySelector('#email');
    const button = fixture.nativeElement.querySelector('button');

    nameInput.value = 'John Doe';
    nameInput.dispatchEvent(new Event('input'));
    emailInput.value = 'john.doe@example.com';
    emailInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(button.disabled).toBeFalsy();
  });
});
