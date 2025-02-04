import { $Enums } from "@prisma/client";
import { OrderItem } from "./order-item.model";

export interface Order {
  id: string;
  clientId: string;
  total: number;
  status: $Enums.OrderStatus;
  orderItems?: OrderItem[];
  createdAt: Date;
}
