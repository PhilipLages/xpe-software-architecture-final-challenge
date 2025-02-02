import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import Logger from "../utils/logger";
import { httpStatusCodes } from "./utils";

export class ProductController {
  static async create(req: Request, res: Response) {
    Logger.info("Creating a new product");
    try {
      const { status, data } = await ProductService.create(req.body);

      if ("id" in data) {
        Logger.info(`Product created: ${data.id}`);
      }

      res.status(status).json(data);
    } catch (error: unknown) {
      const message = (error as Error).message;
      Logger.error(message);
      res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  }

  static async getById(req: Request, res: Response) {
    Logger.info("Getting product by id");
    try {
      const id = req.params.id;
      const { status, data } = await ProductService.getById(id);

      if ("id" in data) {
        Logger.info(`Product found: ${data.id}`);
      }

      res.status(status).json(data);
    } catch (error: unknown) {
      const message = (error as Error).message;
      Logger.error(message);
      res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  }

  static async getByName(req: Request, res: Response) {
    Logger.info("Getting products by name");
    try {
      const name = req.params.name;
      const { status, data } = await ProductService.getByName(name);

      if (Array.isArray(data)) {
        Logger.info(`Found ${data.length} products`);
      }

      res.status(status).json(data);
    } catch (error: unknown) {
      const message = (error as Error).message;
      Logger.error(message);
      res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  }

  static async getAll(req: Request, res: Response) {
    Logger.info("Getting all products");
    try {
      const { status, data } = await ProductService.getAll();

      if (Array.isArray(data)) {
        Logger.info(`Found ${data.length} products`);
      }

      res.status(status).json(data);
    } catch (error: unknown) {
      const message = (error as Error).message;
      Logger.error(message);
      res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  }

  static async update(req: Request, res: Response) {
    Logger.info("Updating product");
    try {
      const id = req.params.id;
      const { status, data } = await ProductService.update(id, req.body);

      if ("id" in data) {
        Logger.info(`Product updated: ${data.id}`);
      }

      res.status(status).json(data);
    } catch (error: unknown) {
      const message = (error as Error).message;
      Logger.error(message);
      res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  }

  static async delete(req: Request, res: Response) {
    Logger.info("Deleting product");
    try {
      const id = req.params.id;
      const { status, data } = await ProductService.delete(id);

      if ("id" in data) {
        Logger.info(`Product deleted: ${data.id}`);
      }

      res.status(status).json(data);
    } catch (error: unknown) {
      const message = (error as Error).message;
      Logger.error(message);
      res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message });
    }
  }
}
