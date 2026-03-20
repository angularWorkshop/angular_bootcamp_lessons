import { Component } from '@angular/core';

interface TodoItem {
  id: number;
  text: string;
}

let nextId = 3;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected todos: TodoItem[] = [
    { id: 1, text: 'Buy groceries' },
    { id: 2, text: 'Read Angular docs' },
  ];

  protected newTodoText = '';

  // TODO: реализуй метод — добавь новый todo из newTodoText
  // если текст пустой или только пробелы — не добавляй
  // после добавления очисти newTodoText
  addTodo(): void {}

  // TODO: реализуй метод — удали todo по id
  removeTodo(id: number): void {}
}
