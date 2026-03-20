import { Component } from '@angular/core';

interface User {
  id: number;
  name: string;
  role: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly users: User[] = [
    { id: 1, name: 'Annie Case', role: 'Frontend Developer' },
    { id: 2, name: 'Mark Stone', role: 'Backend Developer' },
    { id: 3, name: 'Lily Chen', role: 'Designer' },
    { id: 4, name: 'Tom Walker', role: 'QA Engineer' },
  ];
}
