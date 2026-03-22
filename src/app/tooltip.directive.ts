import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective {
  @Input('appTooltip') tooltipText = '';

  private tooltipElement: HTMLElement | null = null;

  constructor(
    private readonly host: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    // TODO: render tooltip element near the host.
    this.renderer.setAttribute(this.host.nativeElement, 'title', this.tooltipText);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.tooltipElement) {
      this.renderer.removeChild(this.host.nativeElement, this.tooltipElement);
      this.tooltipElement = null;
    }
  }
}
