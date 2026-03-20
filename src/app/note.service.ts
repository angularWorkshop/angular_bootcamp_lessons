import { Injectable, inject, signal, computed } from '@angular/core';
import { IdService } from './id.service';

export interface Note {
  id: number;
  text: string;
}

@Injectable({ providedIn: 'root' })
export class NoteService {
  private readonly idService = inject(IdService);
  private readonly notes = signal<Note[]>([]);

  readonly allNotes = this.notes.asReadonly();
  readonly count = computed(() => this.notes().length);

  add(text: string): void {
    const trimmed = text.trim();
    if (!trimmed) return;
    this.notes.update(list => [...list, { id: this.idService.generate(), text: trimmed }]);
  }

  remove(id: number): void {
    this.notes.update(list => list.filter(n => n.id !== id));
  }
}
