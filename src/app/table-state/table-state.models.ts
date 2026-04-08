export interface OrderTableRow {
  id: string;
  title: string;
  owner: string;
  status: 'Live' | 'Draft';
}

export const TABLE_ROWS: OrderTableRow[] = [
  { id: 'row-1', title: 'Billing dashboard', owner: 'Mia', status: 'Live' },
  { id: 'row-2', title: 'Shipping sync', owner: 'Noah', status: 'Draft' },
  { id: 'row-3', title: 'Legal handoff', owner: 'Zoe', status: 'Live' },
  { id: 'row-4', title: 'Operations copy', owner: 'Ava', status: 'Draft' },
];
