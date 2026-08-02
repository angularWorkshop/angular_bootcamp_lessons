import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface DraftItem { id: string; title: string; }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [FormsModule],
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly items: DraftItem[] = [
    { id: 'item-1', title: 'Billing dashboard' },
    { id: 'item-2', title: 'Shipping sync' },
  ];
  protected drawerOpen = false;
  protected currentId: string | null = null;
  protected originalTitle = '';
  protected draftTitle = '';
  protected dirty = false;
  protected guardMessage = '';

  protected openEditor(item: DraftItem): void {
    this.drawerOpen = true;
    this.currentId = item.id;
    this.originalTitle = item.title;
    this.draftTitle = item.title;
    this.dirty = false;
    this.guardMessage = '';
  }

  protected updateDraft(value: string): void {
    this.draftTitle = value;
    this.dirty = value !== this.originalTitle;
  }

  protected attemptClose(): void {
    // TODO: guard the close action when the draft is dirty.
  }

  protected cancelChanges(): void {
    // TODO: rollback the draft, clear the dirty state, and close the drawer.
  }

  protected saveChanges(): void {
    // TODO: persist the draft into the selected item and close the drawer.
  }
}
