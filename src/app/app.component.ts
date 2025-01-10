import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <form #contactForm="ngForm" (ngSubmit)="onSubmit(contactForm.value)">
      <label for="name">Имя:</label>
      <input id="name" name="name" ngModel required />

      <label for="email">Email:</label>
      <input id="email" name="email" ngModel required />

      <button type="submit" [disabled]="contactForm.invalid">Отправить</button>
    </form>
  `,
})
export class AppComponent {
  onSubmit(formValue: { name: string; email: string }): void {
    console.log(formValue);
  }
}
