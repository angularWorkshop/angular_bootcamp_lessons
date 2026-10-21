import { Component, OnDestroy } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import type { Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { HasPermissionDirective } from './has-permission.directive';
import { AppComponent } from './app.component';

const childDestroyed = jest.fn();
@Component({ selector: 'test-child', standalone: true, template: 'Protected child' })
class ChildComponent implements OnDestroy {
  ngOnDestroy(): void { childDestroyed(); }
}
@Component({ standalone: true, imports: [HasPermissionDirective, ChildComponent], template: `
  <button *appHasPermission="required" data-testid="protected">Protected action</button>
  <test-child *appHasPermission="required"></test-child>
` })
class HostComponent { required = 'admin'; }

describe('structural appHasPermission', () => {
  let auth: AuthService;
  let fixture: ComponentFixture<HostComponent>;
  const button = () => (fixture.nativeElement as HTMLElement).querySelector('[data-testid="protected"]');
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent, AppComponent] }).compileComponents();
    auth = TestBed.inject(AuthService);
    childDestroyed.mockClear();
    fixture = TestBed.createComponent(HostComponent);
  });
  afterEach(() => jest.restoreAllMocks());
  it('keeps an unauthorized element absent from the DOM', () => {
    fixture.detectChanges();
    expect(button()).toBeNull();
    expect((fixture.nativeElement as HTMLElement).querySelector('test-child')).toBeNull();
  });
  it('inserts an authorized template', () => {
    auth.setPermissions(['admin']); fixture.detectChanges();
    expect(button()?.textContent).toContain('Protected action');
  });
  it('updates after permissions are granted and revoked', () => {
    fixture.detectChanges();
    auth.setPermissions(['admin']); fixture.detectChanges(); expect(button()).not.toBeNull();
    auth.setPermissions(['viewer']); fixture.detectChanges(); expect(button()).toBeNull();
  });
  it('reacts when the required permission input changes', () => {
    auth.setPermissions(['admin']); fixture.detectChanges(); expect(button()).not.toBeNull();
    fixture.componentInstance.required = 'editor'; fixture.detectChanges(); expect(button()).toBeNull();
    auth.setPermissions(['editor']); fixture.detectChanges(); expect(button()).not.toBeNull();
  });
  it('does not duplicate or recreate an already visible view', () => {
    auth.setPermissions(['admin']); fixture.detectChanges(); const original = button();
    auth.setPermissions(['admin']); fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).querySelectorAll('[data-testid="protected"]')).toHaveLength(1);
    expect(button()).toBe(original);
  });
  it('rejects an empty permission even if supplied to the demo service', () => {
    fixture.componentInstance.required = ''; auth.setPermissions(['']); fixture.detectChanges();
    expect(button()).toBeNull();
  });
  it('destroys child components when permission is revoked', () => {
    auth.setPermissions(['admin']); fixture.detectChanges();
    auth.setPermissions([]); fixture.detectChanges();
    expect(childDestroyed).toHaveBeenCalledTimes(1);
  });
  it('closes permission subscriptions when the host is destroyed', () => {
    const spy = jest.spyOn(auth.permissions$, 'subscribe');
    fixture.detectChanges();
    const subscriptions = spy.mock.results.map(result => result.value as Subscription);
    expect(subscriptions.length).toBeGreaterThan(0);
    expect(subscriptions.every(subscription => !subscription.closed)).toBe(true);
    fixture.destroy();
    expect(subscriptions.every(subscription => subscription.closed)).toBe(true);
  });
  it('uses the structural directive for each real workspace permission block', () => {
    const app = TestBed.createComponent(AppComponent); app.detectChanges();
    expect(app.debugElement.queryAllNodes(By.directive(HasPermissionDirective))).toHaveLength(3);
    auth.setPermissions(['admin', 'editor']); app.detectChanges();
    const host = app.nativeElement as HTMLElement;
    expect(host.querySelector('[data-testid="admin-action"]')).not.toBeNull();
    expect(host.querySelector('[data-testid="editor-panel"]')).not.toBeNull();
    expect(host.querySelector('[data-testid="viewer-note"]')).toBeNull();
  });
});
