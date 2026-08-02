import { Component } from '@angular/core';
import { DetailsPageComponent } from './details-page.component';
import { ErrorPageComponent } from './error-page.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [DetailsPageComponent, ErrorPageComponent, RouterOutlet],
  styleUrl: './app.component.scss',
})
export class AppComponent {}
