import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class UserFormComponent implements OnInit {
  constructor() {}

  username: string = '';

  onSubmit(form: any) {
    if (form.valid) {
      console.log(form.form.value);
    }
  }

  ngOnInit() {}
}
