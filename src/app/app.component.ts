import { Component } from '@angular/core';

export interface LessonCardVm {
  title: string;
  format: string;
  duration: string;
  level: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = 'Input Binding Lab';

  protected readonly introLesson: LessonCardVm = {
    title: 'Standalone Basics',
    format: 'Video lesson',
    duration: '12 min',
    level: 'Beginner',
  };

  protected readonly practiceLesson: LessonCardVm = {
    title: 'Template Inputs Practice',
    format: 'Hands-on exercise',
    duration: '27 min',
    level: 'Practice',
  };
}
