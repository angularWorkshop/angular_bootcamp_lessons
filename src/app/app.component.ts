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

  addTodo(): void {
    const text = this.newTodoText.trim();

    if (!text) {
      return;
    }

    this.todos.push({ id: nextId++, text });
    this.newTodoText = '';
  }

  removeTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
}
