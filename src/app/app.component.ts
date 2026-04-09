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
    this.confirmOpen = this.rows.some(row => row.selected);
  }

  protected confirmDelete(): void {
    this.lastDeleted = this.rows.filter(row => row.selected).map(row => ({ ...row, selected: false }));
    this.rows = this.rows.filter(row => !row.selected);
    this.confirmOpen = false;
    this.snackbar = 'Rows deleted. Undo is available.';
  }

  protected undoDelete(): void {
    this.rows = [...this.rows, ...this.lastDeleted];
    this.lastDeleted = [];
    this.snackbar = '';
  }
}
