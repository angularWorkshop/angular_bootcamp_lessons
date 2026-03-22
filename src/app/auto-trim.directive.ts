import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAutoTrim]',
  standalone: true,
})
export class AutoTrimDirective {
  @HostListener('focusout', ['$event'])
  onFocusOut(event: Event): void {
    const target = event.target as HTMLInputElement | null;

    if (!target) {
      return;
    }

    const trimmedValue = target.value.trim();
    if (trimmedValue === target.value) {
      return;
    }

    target.value = trimmedValue;
    target.dispatchEvent(new Event('input', { bubbles: true }));
  }
}
