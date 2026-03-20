import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter, Router, RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { UserListComponent } from './user-list.component';
import { UserDetailComponent } from './user-detail.component';
import { USERS } from './user.model';

describe('AppComponent – page navigation', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterOutlet, UserListComponent, UserDetailComponent],
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
    expect(heading?.textContent?.trim()).toBe('Page Navigation');
  });

  it('should redirect to /users by default', fakeAsync(() => {
    router.navigateByUrl('/');
    tick();
    fixture.detectChanges();

    expect(router.url).toBe('/users');
    expect(host.querySelector('[data-testid="list-title"]')?.textContent?.trim()).toBe('Users');
  }));

  it('should render a list of users', fakeAsync(() => {
    router.navigateByUrl('/users');
    tick();
    fixture.detectChanges();

    const items = host.querySelectorAll('[data-testid="user-list"] li');
    expect(items.length).toBe(USERS.length);
  }));

  it('should have a route for users/:id', () => {
    const detailRoute = routes.find((r) => r.path === 'users/:id');
    expect(detailRoute).toBeTruthy();
  });

  it('should have routerLink on each user in the list', fakeAsync(() => {
    router.navigateByUrl('/users');
    tick();
    fixture.detectChanges();

    const firstLink = host.querySelector('[data-testid="user-link-1"]') as HTMLAnchorElement | null;
    expect(firstLink).toBeTruthy();
    expect(firstLink?.getAttribute('href')).toBe('/users/1');
  }));

  it('should navigate to user detail when clicking a user link', fakeAsync(() => {
    router.navigateByUrl('/users');
    tick();
    fixture.detectChanges();

    const link = host.querySelector('[data-testid="user-link-2"]') as HTMLAnchorElement;
    expect(link).toBeTruthy();
    link.click();
    tick();
    fixture.detectChanges();

    expect(router.url).toBe('/users/2');
  }));

  it('should display the correct user name on the detail page', fakeAsync(() => {
    router.navigateByUrl('/users/1');
    tick();
    fixture.detectChanges();

    expect(host.querySelector('[data-testid="detail-name"]')?.textContent?.trim()).toBe('Alice Johnson');
  }));

  it('should display the correct user email on the detail page', fakeAsync(() => {
    router.navigateByUrl('/users/2');
    tick();
    fixture.detectChanges();

    expect(host.querySelector('[data-testid="detail-email"]')?.textContent?.trim()).toBe('bob@example.com');
  }));

  it('should show "User not found" for an invalid id', fakeAsync(() => {
    router.navigateByUrl('/users/999');
    tick();
    fixture.detectChanges();

    expect(host.querySelector('[data-testid="not-found"]')?.textContent?.trim()).toBe('User not found');
  }));

  it('should navigate back to /users when clicking the back button', fakeAsync(() => {
    router.navigateByUrl('/users/1');
    tick();
    fixture.detectChanges();

    const backBtn = host.querySelector('[data-testid="back-button"]') as HTMLButtonElement;
    expect(backBtn).toBeTruthy();
    backBtn.click();
    tick();
    fixture.detectChanges();

    expect(router.url).toBe('/users');
  }));
});
