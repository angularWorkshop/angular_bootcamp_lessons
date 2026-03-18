import { Component } from '@angular/core';

interface LearningProgress {
  completedLessons: number;
  totalLessons: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = 'OnPush Progress Card';
  protected progress: LearningProgress = {
    completedLessons: 2,
    totalLessons: 5,
  };

  protected completeLesson(): void {
    if (this.progress.completedLessons >= this.progress.totalLessons) {
      return;
    }

    this.progress = {
      ...this.progress,
      completedLessons: this.progress.completedLessons + 1,
    };
  }

  protected resetProgress(): void {
    this.progress = {
      ...this.progress,
      completedLessons: 0,
    };
  }
}
