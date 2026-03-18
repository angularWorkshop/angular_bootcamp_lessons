import { Component } from '@angular/core';

interface LearningProgress {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = 'Immutable Lesson Checklist';
  protected lessons: LearningProgress[] = [
    { id: 1, title: 'Angular Signals', completed: false },
    { id: 2, title: 'Computed Values', completed: false },
    { id: 3, title: 'Effect Basics', completed: false },
  ];

  protected completeFirstLesson(): void {
    const firstLesson = this.lessons[0];

    if (!firstLesson || firstLesson.completed) {
      return;
    }

    // TODO: update the checklist through a new array and a new lesson object
    firstLesson.completed = true;
  }

  protected resetChecklist(): void {
    // TODO: reset the checklist through new references instead of mutating existing lesson objects
    this.lessons.forEach((lesson) => {
      lesson.completed = false;
    });
  }
}
