import { Component } from '@angular/core';

@Component({
  selector: 'app-error-page',
  template: `
    <section data-testid="error-page">
      <h2>Could not load lesson</h2>
    </section>
  `,
})
export class ErrorPageComponent {}
