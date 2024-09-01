import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RegistrationComponent } from './registration/registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should bind username and email inputs using ngModel', () => {
    const usernameInput = fixture.debugElement.query(By.css('input[ngModel][placeholder="Enter your username"]'));
    const emailInput = fixture.debugElement.query(By.css('input[ngModel][placeholder="Enter your email"]'));

    expect(usernameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();

    const usernameEl = usernameInput.nativeElement;
    const emailEl = emailInput.nativeElement;

    usernameEl.value = 'testUser';
    emailEl.value = 'test@example.com';

    usernameEl.dispatchEvent(new Event('input'));
    emailEl.dispatchEvent(new Event('input'));

    expect(component.username).toBe('testUser');
    expect(component.email).toBe('test@example.com');
  });

  it('should log the username and email on submit', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    component.username = 'testUser';
    component.email = 'test@example.com';

    fixture.debugElement.query(By.css('button')).triggerEventHandler('click', null);

    expect(consoleSpy).toHaveBeenCalledWith('Username:', 'testUser');
    expect(consoleSpy).toHaveBeenCalledWith('Email:', 'test@example.com');

    consoleSpy.mockRestore();
  });

  it('should display the entered username and email in the template', () => {
    component.username = 'testUser';
    component.email = 'test@example.com';
    fixture.detectChanges();

    const displayedText = fixture.debugElement.nativeElement.querySelector('p').textContent;

    expect(displayedText).toContain('testUser');
    expect(displayedText).toContain('test@example.com');
  });
});
