import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncate', standalone: true, pure: true })
export class TruncatePipe implements PipeTransform {
  transform(value: string | null | undefined, maxLength = 50, suffix = '...'): string {
    if (!value) return '';
    const limit = Number.isFinite(maxLength) ? Math.max(0, Math.floor(maxLength)) : 50;
    return value.length <= limit ? value : value.slice(0, limit).trimEnd() + suffix;
  }
}
