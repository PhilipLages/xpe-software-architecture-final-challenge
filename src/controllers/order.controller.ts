import { Request, Response } from "express";
import Logger from "../utils/logger";
import { httpStatusCodes } from "../utils/http-status-codes";
import { OrderService } from "../services/order.service";

export class OrderController {
  static async create(req: Request, res: Response) {
    Logger.info("Creating a new order");
    try {
      const { status, data, error } = await OrderService.create(
        req.body.order,
        req.body.products
      );

      if (data) {
        Logger.info(`Order created: ${data.id}`);
      }

      res.status(status).json({ data, error });
    } catch (error: unknown) {
      const message = (error as Error).message;
      Logger.error(message);
      res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  }

  static async getById(req: Request, res: Response) {
    Logger.info("Getting order by id");
    try {
      const id = req.params.id;
      const { status, data, error } = await OrderService.getById(id);

      if (data) {
        Logger.info(`Order found: ${data.id}`);
      }

      res.status(status).json({ data, error });
    } catch (error: unknown) {
      const message = (error as Error).message;
      Logger.error(message);
      res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  }

  static async getAll(req: Request, res: Response) {
    Logger.info("Getting all orders");
    try {
      const { status, data, error } = await OrderService.getAll();

      if (data) {
        Logger.info(`Found ${data.length} orders`);
      }

      res.status(status).json({ data, error });
    } catch (error: unknown) {
      const message = (error as Error).message;
      Logger.error(message);
      res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  }

  static async getByClientId(req: Request, res: Response) {
    Logger.info("Getting orders by client id");
    try {
      const clientId = req.params.clientId;
      const { status, data, error } = await OrderService.getByClientId(
        clientId
      );

      if (data) {
        Logger.info(`Found ${data.length} orders`);
      }

      res.status(status).json({ data, error });
    } catch (error: unknown) {
      const message = (error as Error).message;
      Logger.error(message);
      res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  }

  static async update(req: Request, res: Response) {
    Logger.info("Updating order");
    try {
      const id = req.params.id;
      const { status, data, error } = await OrderService.update(id, req.body);

      if (data) {
        Logger.info(`Order updated: ${data.id}`);
      }

      res.status(status).json({ data, error });
    } catch (error: unknown) {
      const message = (error as Error).message;
      Logger.error(message);
      res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  }

  static async delete(req: Request, res: Response) {
    Logger.info("Deleting order");
    try {
      const id = req.params.id;
      const { status, data, error } = await OrderService.delete(id);

      if (data) {
        Logger.info(`Order deleted: ${data.id}`);
      }

      res.status(status).json({ data, error });
    } catch (error: unknown) {
      const message = (error as Error).message;
      Logger.error(message);
      res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  }
}
