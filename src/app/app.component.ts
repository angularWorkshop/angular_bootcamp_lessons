import { Component } from '@angular/core';

interface Task {
  id: number;
  title: string;
}

let nextId = 4;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected tasks: Task[] = [
    { id: 1, title: 'Set up project' },
    { id: 2, title: 'Create components' },
    { id: 3, title: 'Write tests' },
  ];

  refresh(): void {
    this.tasks = [
      { id: 2, title: 'Create components' },
      { id: 3, title: 'Write tests' },
      { id: nextId++, title: 'Deploy to production' },
    ];
  }

  clearAll(): void {
    this.tasks = [];
  }
}
