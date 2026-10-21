import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fileSize', standalone: true, pure: true })
export class FileSizePipe implements PipeTransform {
  transform(bytes: number | null | undefined, precision = 1): string {
    // TODO: format base-1024 units and handle null/zero/invalid input.
    void precision;
    return String(bytes ?? '');
  }
}
