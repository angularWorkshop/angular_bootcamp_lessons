import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncate', standalone: true, pure: true })
export class TruncatePipe implements PipeTransform {
  transform(value: string | null | undefined, maxLength = 50, suffix = '...'): string {
    // TODO: keep short text, trim long text, and append the suffix only when needed.
    void [maxLength, suffix];
    return value ?? '';
  }
}
