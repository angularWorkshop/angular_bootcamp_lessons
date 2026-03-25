import { routes } from './app.routes';
import { ReportsPageComponent } from './reports-page.component';
import { ADMIN_ROUTES } from './admin/admin.routes';
import { AdminDashboardComponent } from './admin/admin-dashboard.component';
import { AdminUsersComponent } from './admin/admin-users.component';

describe('Exercise 30.1 — Lazy loading pages', () => {
  it('should define "reports" route', () => {
    const reportsRoute = routes.find(route => route.path === 'reports');
    expect(reportsRoute).toBeDefined();
  });

  it('should use loadComponent for "reports" route', () => {
    const reportsRoute = routes.find(route => route.path === 'reports');
    expect(reportsRoute?.loadComponent).toBeDefined();
    expect(reportsRoute?.component).toBeUndefined();
  });

  it('should lazy load ReportsPageComponent from reports route', async () => {
    const reportsRoute = routes.find(route => route.path === 'reports');
    expect(reportsRoute?.loadComponent).toBeDefined();

    const loaded = await reportsRoute!.loadComponent!();
    expect(loaded).toBe(ReportsPageComponent);
  });

  it('should use loadChildren for "admin" route', () => {
    const adminRoute = routes.find(route => route.path === 'admin');
    expect(adminRoute?.loadChildren).toBeDefined();
    expect(adminRoute?.children).toBeUndefined();
  });

  it('should lazy load admin routes from admin route', async () => {
    const adminRoute = routes.find(route => route.path === 'admin');
    expect(adminRoute?.loadChildren).toBeDefined();

    const loadedRoutes = await adminRoute!.loadChildren!();
    expect(Array.isArray(loadedRoutes)).toBe(true);

    const defaultRoute = (loadedRoutes as typeof ADMIN_ROUTES).find(route => route.path === '');
    const usersRoute = (loadedRoutes as typeof ADMIN_ROUTES).find(route => route.path === 'users');

    expect(defaultRoute?.component).toBe(AdminDashboardComponent);
    expect(usersRoute?.component).toBe(AdminUsersComponent);
  });
});
