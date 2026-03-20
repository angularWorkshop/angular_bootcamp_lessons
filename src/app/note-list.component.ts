import { Component, inject } from '@angular/core';
import { NoteService } from './note.service';
import { CardComponent } from './card.component';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CardComponent],
  template: `
    <div class="feature" data-testid="note-list">
      <div class="feature__header">
        <h2 class="feature__title">Notes ({{ service.count() }})</h2>
      </div>
      <div class="feature__input-row">
        <input
          class="feature__input"
          data-testid="note-input"
          placeholder="New note..."
          [value]="newText"
          (input)="newText = $any($event.target).value"
          (keydown.enter)="add()"
        />
        <button class="feature__add-btn" data-testid="note-add-btn" (click)="add()">Add</button>
      </div>
      <div class="feature__list">
        @for (note of service.allNotes(); track note.id) {
          <app-card
            [text]="note.text"
            [cardId]="note.id"
            (remove)="service.remove(note.id)"
          ></app-card>
        } @empty {
          <p class="feature__empty" data-testid="note-empty">No notes yet</p>
        }
      </div>
    </div>
  `,
  styles: [`
    .feature { padding: 0; }
    .feature__header { margin-bottom: 16px; }
    .feature__title { margin: 0; font-size: 18px; font-weight: 700; color: #f8fafc; }
    .feature__input-row { display: flex; gap: 10px; margin-bottom: 16px; }
    .feature__input {
      flex: 1; padding: 10px 14px; border: 1px solid #334155; border-radius: 10px;
      background: #0f172a; color: #f8fafc; font-size: 14px; outline: none;
    }
    .feature__input:focus { border-color: #3b82f6; }
    .feature__input::placeholder { color: #64748b; }
    .feature__add-btn {
      padding: 10px 20px; border: none; border-radius: 10px;
      background: #3b82f6; color: #fff; font-size: 14px; font-weight: 600; cursor: pointer;
    }
    .feature__add-btn:hover { background: #2563eb; }
    .feature__empty { text-align: center; color: #64748b; font-size: 14px; padding: 24px; }
  `],
})
export class NoteListComponent {
  protected readonly service = inject(NoteService);
  protected newText = '';

  protected add(): void {
    this.service.add(this.newText);
    this.newText = '';
  }
}
