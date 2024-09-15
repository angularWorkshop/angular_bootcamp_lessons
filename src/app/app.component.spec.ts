import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RegistrationComponent } from './registration/registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let consoleSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should update the model when input changes', async () => {
    const usernameInput = fixture.debugElement.query(By.css('input[name="username"]')).nativeElement;
    const passwordInput = fixture.debugElement.query(By.css('input[name="password"]')).nativeElement;

    usernameInput.value = 'testuser';
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.value = 'password123';
    passwordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.username).toBe('testuser');
    expect(component.password).toBe('password123');
  });

 it('должен выводить данные в консоль при нажатии на кнопку или отправке формы', () => {
  component.username = 'testuser';
  component.password = 'password123';

  fixture.detectChanges();

  const button = fixture.debugElement.query(By.css('button')).nativeElement;

  button.click();

  expect(consoleSpy).toHaveBeenCalledTimes(2);
  expect(consoleSpy.mock.calls[0]).toEqual(['Username:', 'testuser']);
  expect(consoleSpy.mock.calls[1]).toEqual(['Password:', 'password123']);
});
});
