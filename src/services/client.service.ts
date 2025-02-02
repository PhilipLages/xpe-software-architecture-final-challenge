import { Prisma, PrismaClient } from "@prisma/client";
import { Client } from "../models/client.model";

const prisma = new PrismaClient();

export class ClientService {
  static async create(payload: Prisma.ClientCreateInput) {
    try {
      const client = new Client(payload);

      if (!client.validateEmail()) {
        throw new Error("Invalid email");
      }

      const data = client.createInput;

      return prisma.client.create({
        data,
      });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create client");
    }
  }
}
