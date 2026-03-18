import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-lesson-checklist',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="lesson-checklist">
      <p class="lesson-checklist__eyebrow">Lesson Checklist</p>
      <p class="lesson-checklist__summary" data-testid="completed-summary">
        Completed {{ completedCount }} of {{ lessons.length }} lessons
      </p>

      <ul class="lesson-checklist__list">
        <li
          *ngFor="let lesson of lessons"
          class="lesson-checklist__item"
          [attr.data-testid]="'lesson-' + lesson.id + '-status'"
        >
          {{ lesson.title }} - {{ lesson.completed ? 'Done' : 'Todo' }}
        </li>
      </ul>
    </section>
  `,
  styles: [
    `
      .lesson-checklist {
        display: grid;
        gap: 0.75rem;
        padding: 1.1rem;
        background: linear-gradient(180deg, rgba(15, 23, 42, 0.96), rgba(17, 24, 39, 0.96));
        border: 1px solid rgba(96, 165, 250, 0.14);
        border-radius: 1rem;
      }

      .lesson-checklist__eyebrow,
      .lesson-checklist__summary,
      .lesson-checklist__list {
        margin: 0;
      }

      .lesson-checklist__eyebrow {
        font-size: 0.8rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #93c5fd;
      }

      .lesson-checklist__summary {
        font-size: 1.15rem;
        font-weight: 800;
        color: #eff6ff;
      }

      .lesson-checklist__list {
        display: grid;
        gap: 0.5rem;
        padding-left: 1.1rem;
        color: #dbeafe;
      }
    `,
  ],
})
export class LessonChecklistComponent {
  @Input({ required: true }) public lessons!: Array<{
    id: number;
    title: string;
    completed: boolean;
  }>;

  public get completedCount(): number {
    return this.lessons.filter((lesson) => lesson.completed).length;
  }
}
