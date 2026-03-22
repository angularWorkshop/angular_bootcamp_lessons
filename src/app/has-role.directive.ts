import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';
import { UserRoleService } from './user-role.service';

@Directive({
  selector: '[appHasRole]',
  standalone: true,
})
export class HasRoleDirective implements OnInit, OnChanges {
  @Input('appHasRole') requiredRole: 'admin' | 'viewer' = 'viewer';

  constructor(
    private readonly host: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
    private readonly userRoleService: UserRoleService,
  ) {}

  ngOnInit(): void {
    this.applyVisibility();
  }

  ngOnChanges(): void {
    this.applyVisibility();
  }

  private applyVisibility(): void {
    const role = this.userRoleService.currentRole;
    const isVisible = role === this.requiredRole;

    this.renderer.setStyle(this.host.nativeElement, 'display', isVisible ? '' : 'none');
  }
}
