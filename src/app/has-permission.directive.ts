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
    this.subscription = this.auth.permissions$.subscribe(() => this.updateView());
  }
  ngOnChanges(): void {
    this.updateView();
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.container.clear();
  }
  private updateView(): void {
    if (this.auth.hasPermission(this.requiredPermission)) {
      if (this.container.length === 0) this.container.createEmbeddedView(this.template);
    } else {
      this.container.clear();
    }
  }
}
