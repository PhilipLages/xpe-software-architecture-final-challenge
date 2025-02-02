import { Prisma, PrismaClient } from "@prisma/client";
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

    delete newClient.password;

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

    delete client.password;

    return { status: httpStatusCodes.OK, data: client };
  }

  static async getByName(name: string): Promise<DefaultClientResponse> {
    const clients = await prisma.client.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        createdAt: true,
        updatedAt: true,
        password: false,
      },
    });

    return { status: httpStatusCodes.OK, data: clients };
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

    delete updatedClient.password;

    return { status: httpStatusCodes.OK, data: updatedClient };
  }

  static async delete(id: string): Promise<DefaultClientResponse> {
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

    const deletedClient = await prisma.client.delete({
      where: {
        id,
      },
    });

    delete deletedClient.password;

    return { status: httpStatusCodes.OK, data: deletedClient };
  }

  static async getAll(): Promise<DefaultClientResponse> {
    const clients = await prisma.client.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        createdAt: true,
        updatedAt: true,
        password: false,
      },
    });

    return { status: httpStatusCodes.OK, data: clients };
  }
}
