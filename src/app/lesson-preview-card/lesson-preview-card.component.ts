import { Component, Input } from '@angular/core';
import { LessonCardVm } from '../app.component';

@Component({
  selector: 'app-lesson-preview-card',
  standalone: true,
  templateUrl: './lesson-preview-card.component.html',
  styleUrl: './lesson-preview-card.component.scss',
})
export class LessonPreviewCardComponent {
  @Input({ required: true }) lesson!: LessonCardVm;
}
