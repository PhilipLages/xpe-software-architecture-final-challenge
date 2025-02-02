import { Request, Response } from "express";
import { ClientService } from "../services/client.service";
import { httpStatusCodes } from "./utils";
import Logger from "../utils/logger";

export class ClientController {
  static async create(req: Request, res: Response) {
    Logger.info("Creating a new client");
    try {
      const { status, data } = await ClientService.create(req.body);

      if ("id" in data) {
        Logger.info(`Client created: ${data.id}`);
      }

      res.status(status).json(data);
    } catch (error: unknown) {
      const message = (error as Error).message;
      Logger.error(message);

      res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  }

  static async getById(req: Request, res: Response) {
    Logger.info("Getting client by id");
    try {
      const id = req.params.id;
      const { status, data } = await ClientService.getById(id);

      if ("id" in data) {
        Logger.info(`Client found: ${data.id}`);
      }

      res.status(status).json(data);
    } catch (error: unknown) {
      const message = (error as Error).message;
      Logger.error(message);

      res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  }

  static async update(req: Request, res: Response) {
    Logger.info("Updating client");
    try {
      const id = req.params.id;
      const { status, data } = await ClientService.update(id, req.body);

      if ("id" in data) {
        Logger.info(`Client updated: ${data.id}`);
      }

      res.status(status).json(data);
    } catch (error: unknown) {
      const message = (error as Error).message;
      Logger.error(message);

      res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  }

  static async delete(req: Request, res: Response) {
    Logger.info("Deleting client");
    try {
      const id = req.params.id;
      const { status, data } = await ClientService.delete(id);

      if ("id" in data) {
        Logger.info(`Client deleted: ${data.id}`);
      }

      res.status(status).json(data);
    } catch (error: unknown) {
      const message = (error as Error).message;
      Logger.error(message);

      res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  }
}
