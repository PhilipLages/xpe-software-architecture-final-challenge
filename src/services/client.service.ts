import { Prisma, PrismaClient } from "@prisma/client";
import { Client } from "../models/client.model";
import { httpStatusCodes } from "../controllers/utils";
import { validateEmail } from "../utils/validate-email";
import { hashPassword } from "../utils/hash-password";
import { DefaultClientResponse } from "../types";

const prisma = new PrismaClient();

export class ClientService {
  static async create(
    payload: Prisma.ClientCreateInput
  ): Promise<DefaultClientResponse> {
    if (!validateEmail(payload.email)) {
      throw new Error("Invalid email");
    }

    const hashedPassword = await hashPassword(payload.password);

    const data = {
      ...payload,
      password: hashedPassword,
    };

    const newClient = await prisma.client.create({
      data,
    });

    return { status: httpStatusCodes.CREATED, data: newClient };
  }

  static async getById(id: string): Promise<DefaultClientResponse> {
    const client = await prisma.client.findUnique({
      where: {
        id,
      },
    });

    if (!client) {
      return {
        status: httpStatusCodes.NOT_FOUND,
        data: { message: "Client not found" },
      };
    }

    return { status: httpStatusCodes.OK, data: client };
  }

  static async update(
    id: string,
    payload: Prisma.ClientUpdateInput
  ): Promise<DefaultClientResponse> {
    const client = await prisma.client.findUnique({
      where: {
        id,
      },
    });

    if (!client) {
      return {
        status: httpStatusCodes.NOT_FOUND,
        data: { message: "Client not found" },
      };
    }

    if (payload.email && !validateEmail(payload.email as string)) {
      return {
        status: httpStatusCodes.BAD_REQUEST,
        data: { message: "Invalid email" },
      };
    }

    const hashedPassword = payload.password
      ? await hashPassword(payload.password as string)
      : client.password;

    const data = {
      ...payload,
      password: hashedPassword,
    };

    const updatedClient = await prisma.client.update({
      where: {
        id,
      },
      data,
    });

    return { status: httpStatusCodes.OK, data: updatedClient };
  }
}
