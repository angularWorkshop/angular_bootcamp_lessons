import { Component } from '@angular/core';
import { UiCardComponent } from '../ui-card/ui-card.component';

@Component({
  selector: 'app-practice-reminder-card',
  standalone: true,
  templateUrl: './practice-reminder-card.component.html',
  styleUrl: './practice-reminder-card.component.scss',
  imports: [UiCardComponent],
})
export class PracticeReminderCardComponent {}
