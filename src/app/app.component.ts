import { Component } from '@angular/core';

interface ServiceGoal {
  id: string;
  step: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = 'Create the Lesson API Service';
  protected readonly endpoint = '/api/lessons';
  protected readonly serviceGoals: ServiceGoal[] = [
    {
      id: 'request',
      step: 'Step 1',
      title: 'Request lesson data',
      description: 'The service should use HttpClient to send a GET request to the lessons endpoint.',
    },
    {
      id: 'type',
      step: 'Step 2',
      title: 'Type the API response',
      description: 'Define interfaces for the response shape instead of working with loose objects.',
    },
    {
      id: 'return',
      step: 'Step 3',
      title: 'Return the items array',
      description: 'The service should expose only the lesson collection that the next component will consume.',
    },
  ];
}
