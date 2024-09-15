import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { UserFormComponent } from './user-form.component';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFormComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show required error if the input is empty', () => {
    const usernameInput = fixture.debugElement.query(By.css('input[name="username"]'));
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));

    usernameInput.nativeElement.value = '';
    usernameInput.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    submitButton.nativeElement.click();
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('.container__highlight'));
    const textContent = errorMessage.nativeElement.textContent;

    expect(
      textContent.includes('Это поле обязательно для заполнения') || textContent.includes('This field is required')
    ).toBe(true);
  });

  it('should show minlength error if the input is less than 3 characters', () => {
    const usernameInput = fixture.debugElement.query(By.css('input[name="username"]'));
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));

    usernameInput.nativeElement.value = 'ab';
    usernameInput.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    submitButton.nativeElement.click();
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('.container__highlight'));
    const textContent = errorMessage.nativeElement.textContent;

    expect(textContent.includes('Минимум 3 символа') || textContent.includes('Minimum 3 characters')).toBe(true);
  });

  it('should show maxlength error if the input is more than 10 characters', () => {
    const usernameInput = fixture.debugElement.query(By.css('input[name="username"]'));
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));

    usernameInput.nativeElement.value = 'abcdefghijkl';
    usernameInput.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    submitButton.nativeElement.click();
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('.container__highlight'));
    const textContent = errorMessage.nativeElement.textContent;

    expect(textContent.includes('Максимум 10 символов') || textContent.includes('Maximum 10 characters')).toBe(true);
  });

  it('should not show any error if the input is between 3 and 10 characters', () => {
    const usernameInput = fixture.debugElement.query(By.css('input[name="username"]'));
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));

    usernameInput.nativeElement.value = 'validname';
    usernameInput.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    submitButton.nativeElement.click();
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('.container__highlight'));
    expect(errorMessage).toBeNull();
  });
});
