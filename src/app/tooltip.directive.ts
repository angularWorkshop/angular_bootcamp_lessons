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
    if (this.tooltipElement || !this.tooltipText) {
      return;
    }

    this.tooltipElement = this.renderer.createElement('span');
    this.renderer.setAttribute(this.tooltipElement, 'data-testid', 'tooltip-popup');
    this.renderer.setStyle(this.tooltipElement, 'display', 'inline-block');
    this.renderer.setStyle(this.tooltipElement, 'margin-left', '8px');
    this.renderer.setStyle(this.tooltipElement, 'padding', '4px 8px');
    this.renderer.setStyle(this.tooltipElement, 'border-radius', '6px');
    this.renderer.setStyle(this.tooltipElement, 'background', '#0f172a');
    this.renderer.setStyle(this.tooltipElement, 'color', '#ffffff');
    this.renderer.setStyle(this.tooltipElement, 'font-size', '12px');
    this.renderer.appendChild(this.tooltipElement, this.renderer.createText(this.tooltipText));
    this.renderer.appendChild(this.host.nativeElement, this.tooltipElement);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.tooltipElement) {
      this.renderer.removeChild(this.host.nativeElement, this.tooltipElement);
      this.tooltipElement = null;
    }
  }
}
