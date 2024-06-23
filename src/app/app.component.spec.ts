import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DebugElement } from '@angular/core';
import { HelloWorldComponent } from './components/hello-world/hello-world.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, HelloWorldComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should render HelloWorld component', () => {
    const helloWorldElement = fixture.debugElement.query(
      By.css('app-hello-world')
    );
    expect(helloWorldElement).toBeTruthy();
  });

  it('should render "Hello, World!" text in HelloWorld component', () => {
    const helloWorldElement = fixture.debugElement.query(
      By.css('app-hello-world h1')
    );
    expect(helloWorldElement.nativeElement.textContent).toContain(
      'Hello, World!'
    );
  });
});

describe('HelloWorldComponent', () => {
  let fixture: ComponentFixture<HelloWorldComponent>;
  let component: HelloWorldComponent;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelloWorldComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelloWorldComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the HelloWorld component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default name as "World"', () => {
    expect(component.name).toBe('World');
  });

  it('should render name in the template', () => {
    const h1Element = debugElement.query(By.css('h1')).nativeElement;
    expect(h1Element.textContent).toBe('Hello, World!');
  });

  it('should emit greeted event with the correct message when sayHello is called', () => {
    spyOn(component.greeted, 'emit');

    component.name = 'Angular';
    component.sayHello();

    expect(component.greeted.emit).toHaveBeenCalledWith('Hello, Angular!');
  });
});
