import { Component } from '@angular/core';

interface RowVm { id: string; title: string; selected: boolean; }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected rows: RowVm[] = [
    { id: 'row-1', title: 'Billing review', selected: false },
    { id: 'row-2', title: 'Workspace copy', selected: false },
    { id: 'row-3', title: 'Operations QA', selected: false },
  ];
  protected confirmOpen = false;
  protected snackbar = '';
  protected lastDeleted: RowVm[] = [];

  protected toggleRow(rowId: string): void {
    this.rows = this.rows.map(row => row.id === rowId ? { ...row, selected: !row.selected } : row);
  }

  protected requestDeleteSelected(): void {
    // TODO: open the confirm dialog only when some rows are selected.
  }

  protected confirmDelete(): void {
    // TODO: remove selected rows optimistically, remember them for undo, and show the snackbar.
  }

  protected undoDelete(): void {
    // TODO: restore the last deleted rows and clear the snackbar.
  }
}
