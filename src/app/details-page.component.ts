import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-page',
  template: `
    <article class="details" data-testid="details-page">
      <h2 data-testid="details-title">{{ title }}</h2>
      <p data-testid="details-id">Route id: {{ routeId }}</p>
      <p class="hint">TODO: consume resolved data from ActivatedRoute.data.</p>
    </article>
  `,
})
export class DetailsPageComponent {
  private readonly route = inject(ActivatedRoute);

  routeId = this.route.snapshot.paramMap.get('id') ?? '';
  title = 'Starter details page';
}
