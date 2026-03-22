import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAutoTrim]',
  standalone: true,
})
export class AutoTrimDirective {
  constructor(private readonly host: ElementRef<HTMLElement>) {}

  @HostListener('focusout', ['$event'])
  onFocusOut(event: Event): void {
    const target = event.target as HTMLInputElement | null;

    if (!target) {
      return;
    }

    // TODO: trim input value and keep parent form state in sync.
    this.host.nativeElement.setAttribute('data-last-focusout', target.value);
  }
}
