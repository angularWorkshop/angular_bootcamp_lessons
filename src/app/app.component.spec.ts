import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { UserInfoComponent } from './user-info/user-info.component';

describe('UserInfoComponent', () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserInfoComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('должен отображать имя пользователя через интерполяцию', () => {
    component.username = 'Алексей';
    fixture.detectChanges();
    const usernameDisplay = fixture.debugElement.query(By.css('.username')).nativeElement;
    expect(usernameDisplay.textContent).toContain('Алексей');
  });

  it('должен обновлять изображение профиля с помощью привязки свойства', () => {
    component.profileImageUrl = 'https://example.com/profile.jpg';
    fixture.detectChanges();
    const img = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(img.src).toContain('https://example.com/profile.jpg');
  });

  it('должен увеличивать возраст пользователя при нажатии на кнопку', () => {
    component.age = 25;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    fixture.detectChanges();
    expect(component.age).toBe(26);
  });

  it('должен изменять имя пользователя через поле ввода с двусторонней привязкой', () => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'Мария';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.username).toBe('Мария');
  });
});
