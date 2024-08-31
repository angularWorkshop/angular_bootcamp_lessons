import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';


describe('ReactiveFormComponent', () => {
  let component: ReactiveFormComponent;
  let fixture: ComponentFixture<ReactiveFormComponent>;
  let consoleSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReactiveFormComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ReactiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    consoleSpy = jest.spyOn(console, 'log');
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('должен создать компонент', () => {
    expect(component).toBeTruthy();
  });

  it('должен содержать два поля ввода и кнопку', () => {
    const compiled = fixture.nativeElement;
    const nameInput = compiled.querySelector('input[formControlName="name"]');
    const commentInput = compiled.querySelector('textarea[formControlName="comment"]');
    const submitButton = compiled.querySelector('button[type="submit"]');

    expect(nameInput).toBeTruthy();
    expect(commentInput).toBeTruthy();
    expect(submitButton).toBeTruthy();
  });

  it('должен выводить данные в консоль при отправке формы', () => {
    const compiled = fixture.nativeElement;
    const nameInput = compiled.querySelector('input[formControlName="name"]');
    const commentInput = compiled.querySelector('textarea[formControlName="comment"]');
    const submitButton = compiled.querySelector('button[type="submit"]');

    nameInput.value = 'Иван';
    nameInput.dispatchEvent(new Event('input'));

    commentInput.value = 'Это комментарий';
    commentInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    submitButton.click();

    expect(consoleSpy).toHaveBeenCalledWith({
      name: 'Иван',
      comment: 'Это комментарий'
    });
  });
});
