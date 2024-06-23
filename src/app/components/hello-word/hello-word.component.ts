import { Component, OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-hello-world',
  template: `<h1>Hello, World!</h1>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloWorldComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  @Input() title!: string;

  constructor() {
    console.log('HelloWorldComponent: constructor');
  }

  ngOnChanges() {
    console.log('HelloWorldComponent: ngOnChanges');
  }

  ngOnInit() {
    console.log('HelloWorldComponent: ngOnInit');
  }

  ngDoCheck() {
    console.log('HelloWorldComponent: ngDoCheck');
  }

  ngAfterContentInit() {
    console.log('HelloWorldComponent: ngAfterContentInit');
  }

  ngAfterContentChecked() {
    console.log('HelloWorldComponent: ngAfterContentChecked');
  }

  ngAfterViewInit() {
    console.log('HelloWorldComponent: ngAfterViewInit');
  }

  ngAfterViewChecked() {
    console.log('HelloWorldComponent: ngAfterViewChecked');
  }

  ngOnDestroy() {
    console.log('HelloWorldComponent: ngOnDestroy');
  }
}
