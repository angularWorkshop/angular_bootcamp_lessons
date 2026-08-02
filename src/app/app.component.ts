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
    if (this.dirty) {
      this.guardMessage = 'Unsaved changes must be reviewed before closing.';
      return;
    }
    this.drawerOpen = false;
  }

  protected cancelChanges(): void {
    this.draftTitle = this.originalTitle;
    this.dirty = false;
    this.guardMessage = '';
    this.drawerOpen = false;
  }

  protected saveChanges(): void {
    const current = this.items.find(item => item.id === this.currentId);
    if (current) current.title = this.draftTitle;
    this.originalTitle = this.draftTitle;
    this.dirty = false;
    this.guardMessage = '';
    this.drawerOpen = false;
  }
}
