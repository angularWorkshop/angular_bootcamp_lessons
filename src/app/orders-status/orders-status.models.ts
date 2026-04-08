export interface OrderStatusCard {
  id: string;
  title: string;
  status: 'Queued' | 'Completed';
  owner: string;
}
