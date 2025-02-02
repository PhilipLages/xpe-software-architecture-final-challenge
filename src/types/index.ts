import { httpStatusCodes } from "../controllers/utils";
import { Client } from "../models/client.model";

export type DefaultClientResponse = {
  status: (typeof httpStatusCodes)[keyof typeof httpStatusCodes];
  data: Client | { message: string };
};
