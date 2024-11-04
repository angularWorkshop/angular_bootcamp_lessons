import { Component } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {
  public username: string = 'Denis';
  public age: number = 30;
  public profileImageUrl: string = 'https://example.com/profile.jpg';
}