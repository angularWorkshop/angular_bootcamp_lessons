export interface DeepLinkRow {
  id: string;
  title: string;
  owner: string;
  status: 'Live' | 'Draft';
  summary: string;
}

export const DETAIL_ROWS: DeepLinkRow[] = [
  { id: 'order-1', title: 'Billing dashboard', owner: 'Mia', status: 'Live', summary: 'Main billing orchestration screen.' },
  { id: 'order-2', title: 'Shipping sync', owner: 'Noah', status: 'Draft', summary: 'Draft shipping workflow for the next release.' },
  { id: 'order-3', title: 'Operations copy', owner: 'Ava', status: 'Live', summary: 'Stabilize naming and helper copy in the operations shell.' },
];
