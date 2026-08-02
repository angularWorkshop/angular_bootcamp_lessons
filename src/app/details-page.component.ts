import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { LessonCard } from './lesson-data.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-details-page',
  template: `,
  imports: [AsyncPipe],
    <section data-testid="details-page">
      <h2 data-testid="details-title">{{ (lesson$ | async)?.title }}</h2>
    </section>
  `,
})
export class DetailsPageComponent {
  private readonly route = inject(ActivatedRoute);

  readonly lesson$ = this.route.data.pipe(map((data) => data['lesson'] as LessonCard));
}
