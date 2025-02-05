import { Prisma, PrismaClient } from "@prisma/client";
import { httpStatusCodes } from "../utils/http-status-codes";
import { validateEmail } from "../utils/validate-email";
import { hashPassword } from "../utils/hash-password";
import { DefaultResponse, ManyClientsResponse, OneClientResponse } from "../types";

const prisma = new PrismaClient();

export class ClientService {
  static async create(
    payload: Prisma.ClientCreateInput
  ): Promise<OneClientResponse> {
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

    return { status: httpStatusCodes.CREATED, data: newClient, error: null };
  }

  static async getById(id: string): Promise<OneClientResponse> {
    const client = await prisma.client.findUnique({
      where: {
        id,
      },
    });

    if (!client) {
      return {
        status: httpStatusCodes.NOT_FOUND,
        data: null,
        error: "Client not found",
      };
    }

    delete client.password;

    return { status: httpStatusCodes.OK, data: client, error: null };
  }

  static async getByName(name: string): Promise<ManyClientsResponse> {
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

    return { status: httpStatusCodes.OK, data: clients, error: null };
  }

  static async update(
    id: string,
    payload: Prisma.ClientUpdateInput
  ): Promise<OneClientResponse> {
    const client = await prisma.client.findUnique({
      where: {
        id,
      },
    });

    if (!client) {
      return {
        status: httpStatusCodes.NOT_FOUND,
        data: null,
        error: "Client not found",
      };
    }

    if (payload.email && !validateEmail(payload.email as string)) {
      return {
        status: httpStatusCodes.BAD_REQUEST,
        data: null,
        error: "Invalid email",
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

    return { status: httpStatusCodes.OK, data: updatedClient, error: null };
  }

  static async delete(id: string): Promise<OneClientResponse> {
    const client = await prisma.client.findUnique({
      where: {
        id,
      },
    });

    if (!client) {
      return {
        status: httpStatusCodes.NOT_FOUND,
        data: null,
        error: "Client not found",
      };
    }

    const deletedClient = await prisma.client.delete({
      where: {
        id,
      },
    });

    delete deletedClient.password;

    return { status: httpStatusCodes.OK, data: deletedClient, error: null };
  }

  static async getAll(): Promise<ManyClientsResponse> {
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

    return { status: httpStatusCodes.OK, data: clients, error: null };
  }

  static async countAll(): Promise<DefaultResponse<Number>> {
    const data = await prisma.client.count();

    return { status: httpStatusCodes.OK, data, error: null };
  }
}
