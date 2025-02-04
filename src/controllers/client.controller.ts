import { Request, Response } from "express";
import { ClientService } from "../services/client.service";
import { httpStatusCodes } from "../utils/http-status-codes";
import Logger from "../utils/logger";

export class ClientController {
  static async create(req: Request, res: Response) {
    Logger.info("Creating a new client");
    try {
      const { status, data, error } = await ClientService.create(req.body);

      if (data) {
        Logger.info(`Client created: ${data.id}`);
      }

      res.status(status).json({ data, error });
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
      const { status, data, error } = await ClientService.getById(id);

      if (data) {
        Logger.info(`Found client: ${data.id}`);
      }

      res.status(status).json({ data, error });
    } catch (error: unknown) {
      const message = (error as Error).message;
      Logger.error(message);

      res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  }

  static async getByName(req: Request, res: Response) {
    Logger.info("Getting clients by name");
    try {
      const name = req.params.name;
      const { status, data, error } = await ClientService.getByName(name);

      if (data) {
        Logger.info(`Found ${data.length} clients`);
      }

      res.status(status).json({ data, error });
    } catch (error: unknown) {
      const message = (error as Error).message;
      Logger.error(message);

      res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  }

  static async getAll(req: Request, res: Response) {
    Logger.info("Getting all clients");
    try {
      const { status, data, error } = await ClientService.getAll();

      if (data) {
        Logger.info(`Found ${data.length} clients`);
      }

      res.status(status).json({ data, error });
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
      const { status, data, error } = await ClientService.update(id, req.body);

      if (data) {
        Logger.info(`Client updated: ${data.id}`);
      }

      res.status(status).json({ data, error });
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
      const { status, data, error } = await ClientService.delete(id);

      if (data) {
        Logger.info(`Client deleted: ${data.id}`);
      }

      res.status(status).json({ data, error });
    } catch (error: unknown) {
      const message = (error as Error).message;
      Logger.error(message);

      res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  }
}
