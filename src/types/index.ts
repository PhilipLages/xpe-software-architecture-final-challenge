import { httpStatusCodes } from "../utils/http-status-codes";
import { Client } from "../models/client.model";
import { Order } from "../models/order.model";
import { Product } from "../models/product.model";

export type DefaultResponse<T> = {
  status: (typeof httpStatusCodes)[keyof typeof httpStatusCodes];
  data: T | null;
  error: string | null;
};

export interface OneClientResponse
  extends DefaultResponse<Omit<Client, "password">> {}

export interface OneProductResponse extends DefaultResponse<Product> {}

export interface OneOrderResponse extends DefaultResponse<Order> {}

export interface ManyClientsResponse
  extends DefaultResponse<Omit<Client, "password">[]> {}

export interface ManyProductsResponse extends DefaultResponse<Product[]> {}

export interface ManyOrdersResponse extends DefaultResponse<Order[]> {}
