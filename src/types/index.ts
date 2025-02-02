import { httpStatusCodes } from "../controllers/utils";
import { Client } from "../models/client.model";

export type DefaultClientResponse = {
  status: (typeof httpStatusCodes)[keyof typeof httpStatusCodes];
  data:
    | Omit<Client, "password">
    | Omit<Client, "password">[]
    | { message: string };
};
