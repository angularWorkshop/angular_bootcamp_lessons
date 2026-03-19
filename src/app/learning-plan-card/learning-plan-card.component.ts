import { Component } from '@angular/core';
import { UiCardComponent } from '../ui-card/ui-card.component';

@Component({
  selector: 'app-learning-plan-card',
  standalone: true,
  templateUrl: './learning-plan-card.component.html',
  styleUrl: './learning-plan-card.component.scss',
  imports: [UiCardComponent],
})
export class LearningPlanCardComponent {}
