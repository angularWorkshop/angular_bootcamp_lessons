export interface LegacyOrder {
  order_id: string;
  order_title: string;
  owner_name: string;
}

export interface OrderCardVm {
  id: string;
  title: string;
  owner: string;
}

export function mapLegacyOrder(dto: LegacyOrder): OrderCardVm {
  // TODO: translate the legacy shape into the new VM shape.
  return {
    id: dto.order_id,
    title: '',
    owner: '',
  };
}
