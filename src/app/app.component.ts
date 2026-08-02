import { Component } from '@angular/core';
import { DetailsPageComponent } from './details-page.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [DetailsPageComponent, RouterOutlet],
  styleUrl: './app.component.scss',
})
export class AppComponent {}
