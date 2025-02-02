import { Request, Response } from "express";
import { ClientService } from "../services/client.service";
import { httpStatusCodes } from "./utils";

export class ClientController {
  static async create(req: Request, res: Response) {
    try {
      const client = await ClientService.create(req.body);

      res.status(httpStatusCodes.CREATED).json(client);
    } catch (error: unknown) {
      const message = (error as Error).message;
      console.error(error);

      res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  }
}
