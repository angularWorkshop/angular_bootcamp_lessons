import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fileSize', standalone: true, pure: true })
export class FileSizePipe implements PipeTransform {
  transform(bytes: number | null | undefined, precision = 1): string {
    if (bytes === null || bytes === undefined || !Number.isFinite(bytes) || bytes <= 0) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    const exponent = Math.max(0, Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1));
    const digits = Number.isInteger(precision) && precision >= 0 && precision <= 20 ? precision : 1;
    return `${(bytes / 1024 ** exponent).toFixed(digits)} ${units[exponent]}`;
  }
}
