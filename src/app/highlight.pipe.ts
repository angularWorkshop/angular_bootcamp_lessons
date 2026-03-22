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

    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(escapedQuery, 'gi');

    return value.replace(pattern, (match) => `<mark>${match}</mark>`);
  }
}
