import { Prisma, PrismaClient } from "@prisma/client";
import { Client } from "../models/client.model";
import Logger from "../utils/logger";

const prisma = new PrismaClient();

export class ClientService {
  static async create(payload: Prisma.ClientCreateInput) {
    Logger.info("Creating client...");
    try {
      const client = new Client(payload);

      if (!client.validateEmail()) {
        throw new Error("Invalid email");
      }

      await client.hashPassword();
      const data = client.createInput;

      return prisma.client.create({
        data,
      });
    } catch (error) {
      Logger.error(error.message);
      throw new Error("Failed to create client");
    }
  }
}
