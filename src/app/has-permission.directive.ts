import { Directive, Input, OnChanges, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Directive({ selector: '[appHasPermission]', standalone: true })
export class HasPermissionDirective implements OnInit, OnChanges, OnDestroy {
  @Input('appHasPermission') requiredPermission = '';
  private subscription?: Subscription;

  constructor(private readonly template: TemplateRef<unknown>, private readonly container: ViewContainerRef,
    private readonly auth: AuthService) {}

  ngOnInit(): void {
    // TODO: observe auth.permissions$ and synchronize the embedded view.
    this.container.createEmbeddedView(this.template);
  }
  ngOnChanges(): void {
    // TODO: recheck access if the requested permission changes.
  }
  ngOnDestroy(): void {
    // TODO: unsubscribe and clear the view container.
    void [this.auth, this.subscription];
  }
}
