import { Component } from '@angular/core';
import { FileSizePipe } from './file-size.pipe';
import { TruncatePipe } from './truncate.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FileSizePipe, TruncatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  precision = 1;
  descriptionLimit = 18;
  files: { id: string; name: string; bytes: number | null; description: string | null }[] = [
    { id: 'guide', name: 'course-guide.pdf', bytes: 2411724, description: 'A detailed guide for the frontend course.' },
    { id: 'notes', name: 'notes.txt', bytes: 512, description: 'Short notes' },
    { id: 'empty', name: 'empty.txt', bytes: 0, description: '' },
    { id: 'pending', name: 'pending.dat', bytes: null, description: null },
  ];
}
