enum OrderStatusEnum {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELED = "CANCELED",
}

export interface Order {
  id: string;
  clientId: string;
  total: number;
  status: OrderStatusEnum;
  orderItems: string[];
  createdAt: Date;
}
