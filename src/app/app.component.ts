import { Component } from '@angular/core';
import { HeavyTableComponent } from './heavy-table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [HeavyTableComponent],
  styleUrl: './app.component.scss',
})
export class AppComponent {}
