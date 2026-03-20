import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
import { ContactComponent } from './contact.component';

describe('AppComponent – routing', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterOutlet, RouterLink, HomeComponent, AboutComponent, ContactComponent],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the heading', () => {
    const heading = host.querySelector('h1');
    expect(heading?.textContent?.trim()).toBe('App Pages');
  });

  it('should have navigation links for Home, About, and Contact', () => {
    const navLinks = host.querySelectorAll('[data-testid="nav"] a');
    expect(navLinks.length).toBe(3);

    const texts = Array.from(navLinks).map((a) => a.textContent?.trim());
    expect(texts).toEqual(['Home', 'About', 'Contact']);
  });

  it('should have a <router-outlet> element', () => {
    const outlet = host.querySelector('router-outlet');
    expect(outlet).toBeTruthy();
  });

  it('should define a route for the home page (empty path)', () => {
    const homeRoute = routes.find((r) => r.path === '');
    expect(homeRoute).toBeTruthy();
  });

  it('should define a route for the about page', () => {
    const aboutRoute = routes.find((r) => r.path === 'about');
    expect(aboutRoute).toBeTruthy();
  });

  it('should define a route for the contact page', () => {
    const contactRoute = routes.find((r) => r.path === 'contact');
    expect(contactRoute).toBeTruthy();
  });

  it('should render HomeComponent when navigating to "/"', fakeAsync(() => {
    router.navigateByUrl('/');
    tick();
    fixture.detectChanges();

    expect(host.querySelector('[data-testid="home-title"]')?.textContent?.trim()).toBe('Home');
  }));

  it('should render AboutComponent when navigating to "/about"', fakeAsync(() => {
    router.navigateByUrl('/about');
    tick();
    fixture.detectChanges();

    expect(host.querySelector('[data-testid="about-title"]')?.textContent?.trim()).toBe('About');
  }));

  it('should render ContactComponent when navigating to "/contact"', fakeAsync(() => {
    router.navigateByUrl('/contact');
    tick();
    fixture.detectChanges();

    expect(host.querySelector('[data-testid="contact-title"]')?.textContent?.trim()).toBe('Contact');
  }));

  it('should not render about or contact content on the home page', fakeAsync(() => {
    router.navigateByUrl('/');
    tick();
    fixture.detectChanges();

    expect(host.querySelector('[data-testid="about-title"]')).toBeNull();
    expect(host.querySelector('[data-testid="contact-title"]')).toBeNull();
  }));
});
