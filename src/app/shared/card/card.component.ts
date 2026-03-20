import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div class="card" [attr.data-testid]="'card-' + cardId">
      <div class="card__body">
        <span class="card__text" [attr.data-testid]="'card-text-' + cardId">{{ text }}</span>
      </div>
      <button
        class="card__remove"
        [attr.data-testid]="'card-remove-' + cardId"
        (click)="remove.emit()"
      >✕</button>
    </div>
  `,
  styles: [`
    .card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 14px;
      border-bottom: 1px solid #334155;
    }
    .card__text {
      font-size: 14px;
      color: #e2e8f0;
    }
    .card__remove {
      padding: 4px 8px;
      border: 1px solid #475569;
      border-radius: 6px;
      background: transparent;
      color: #94a3b8;
      font-size: 12px;
      cursor: pointer;
    }
    .card__remove:hover {
      color: #ef4444;
      border-color: #ef4444;
    }
  `],
})
export class CardComponent {
  @Input() text = '';
  @Input() cardId: number | string = '';
  @Output() remove = new EventEmitter<void>();
}
