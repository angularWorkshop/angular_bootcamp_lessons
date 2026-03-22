import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appFocusHighlight]',
  standalone: true,
})
export class FocusHighlightDirective {
  @HostBinding('class.focus-highlight') protected isFocused = false;

  @HostListener('focusin')
  onFocusIn(): void {
    this.isFocused = true;
  }

  @HostListener('focusout')
  onFocusOut(): void {
    this.isFocused = false;
  }
}
