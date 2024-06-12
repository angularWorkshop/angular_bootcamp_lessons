import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HelloWorldComponent } from './hello-world/hello-world.component';

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
});
