import { httpStatusCodes } from "../controllers/utils";
import { Client } from "../models/client.model";
import { Order } from "../models/order.model";
import { Product } from "../models/product.model";

export type DefaultClientResponse = {
  status: (typeof httpStatusCodes)[keyof typeof httpStatusCodes];
  data:
    | Omit<Client, "password">
    | Omit<Client, "password">[]
    | { message: string };
};

export type DefaultProductResponse = {
  status: (typeof httpStatusCodes)[keyof typeof httpStatusCodes];
  data: Product | Product[] | { message: string };
};

export type DefaultOrderResponse = {
  status: (typeof httpStatusCodes)[keyof typeof httpStatusCodes];
  data: Order | Order[] | { message: string };
};
