export type OrdersScreenState = 'idle' | 'loading' | 'empty' | 'error' | 'success';

export interface OrderCard {
  id: string;
  title: string;
  owner: string;
  status: 'Draft' | 'Live' | 'Paused';
  priority: 'High' | 'Medium' | 'Low';
  summary: string;
}
