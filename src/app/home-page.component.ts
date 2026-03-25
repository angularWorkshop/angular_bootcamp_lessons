import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  standalone: true,
  template: `
    <section class="page" data-testid="home-page">
      <h2>Home Page</h2>
      <p>Welcome to the performance lab.</p>
    </section>
  `,
})
export class HomePageComponent {}
