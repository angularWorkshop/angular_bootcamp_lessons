import { Injectable, inject, signal, computed } from '@angular/core';
import { IdService } from '../../core/id.service';

export interface Contact {
  id: number;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly idService = inject(IdService);
  private readonly contacts = signal<Contact[]>([]);

  readonly allContacts = this.contacts.asReadonly();
  readonly count = computed(() => this.contacts().length);

  add(name: string): void {
    const trimmed = name.trim();
    if (!trimmed) return;
    this.contacts.update(list => [...list, { id: this.idService.generate(), name: trimmed }]);
  }

  remove(id: number): void {
    this.contacts.update(list => list.filter(c => c.id !== id));
  }
}
