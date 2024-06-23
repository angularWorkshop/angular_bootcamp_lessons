import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { HelloWorldComponent } from "./components/hello-word/hello-word.component";

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HelloWorldComponent
      ],
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
    const helloWorldElement = fixture.debugElement.query(By.css('app-hello-world'));
    expect(helloWorldElement).toBeTruthy();
  });

  it('should render "Hello, World!" text in HelloWorld component', () => {
    const helloWorldElement = fixture.debugElement.query(By.css('app-hello-world h1'));
    expect(helloWorldElement.nativeElement.textContent).toContain('Hello, World!');
  });

  it('should call lifecycle hooks in HelloWorld component', () => {
    const helloWorldComponent = fixture.debugElement.query(By.directive(HelloWorldComponent)).componentInstance;
    const lifecycleHooks = [
      'ngOnChanges',
      'ngDoCheck',
      'ngAfterContentInit',
      'ngAfterContentChecked',
      'ngAfterViewInit',
      'ngAfterViewChecked',
      'ngOnDestroy'
    ];

    lifecycleHooks.forEach(hook => {
      spyOn(helloWorldComponent, hook as any).and.callThrough();
    });

    fixture.detectChanges(); // trigger lifecycle hooks

    lifecycleHooks.forEach(hook => {
      expect(helloWorldComponent[hook]).toHaveBeenCalled();
    });
  });
});