import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';
import { UserRoleService } from './user-role.service';

@Directive({
  selector: '[appHasRole]',
  standalone: true,
})
export class HasRoleDirective implements OnChanges {
  @Input('appHasRole') requiredRole: 'admin' | 'viewer' = 'viewer';

  constructor(
    private readonly host: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
    private readonly userRoleService: UserRoleService,
  ) {}

  ngOnChanges(): void {
    // TODO: hide element when role mismatch.
    const role = this.userRoleService.currentRole;
    this.renderer.setAttribute(this.host.nativeElement, 'data-role-seen', role);
  }
}
