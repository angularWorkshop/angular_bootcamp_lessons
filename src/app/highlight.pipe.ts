import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  standalone: true,
})
export class HighlightPipe implements PipeTransform {
  transform(value: string, query: string): string {
    if (!value || !query) {
      return value ?? '';
    }

    // TODO: wrap matches with <mark>...</mark> and keep case-insensitive behavior.
    return value;
  }
}
