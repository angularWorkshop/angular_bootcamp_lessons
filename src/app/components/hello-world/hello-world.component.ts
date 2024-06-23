import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hello-world',
  template: `
    <h1>Hello, {{ name }}!</h1>
    <button (click)="sayHello()">Say Hello</button>
  `,
  styleUrls: ['./hello-world.component.scss'],
})
export class HelloWorldComponent {
  @Input() name: string = 'World';
  @Output() greeted: EventEmitter<string> = new EventEmitter<string>();

  sayHello() {
    this.greeted.emit(`Hello, ${this.name}!`);
  }
}
