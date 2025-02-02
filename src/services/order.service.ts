import { Prisma, PrismaClient } from "@prisma/client";
import { httpStatusCodes } from "../controllers/utils";
import { OrderStatusEnum } from "../models/order.model";

const prisma = new PrismaClient();

export class OrderService {
  static async create(
    payload: Prisma.OrderCreateInput,
    products: Prisma.OrderItemCreateManyInput[]
  ) {
    const newOrder = await prisma.$transaction(async (prisma) => {
      const order = await prisma.order.create({
        data: payload,
      });

      await prisma.orderItem.createMany({
        data: products.map((product) => ({
          ...product,
          orderId: order.id,
        })),
      });

      return order;
    });

    const data = {
      ...newOrder,
      total: newOrder.total.toNumber(),
    };

    return { status: httpStatusCodes.CREATED, data };
  }

  static async getById(id: string) {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return {
        status: httpStatusCodes.NOT_FOUND,
        data: { message: "Order not found" },
      };
    }

    const data = {
      ...order,
      total: order.total.toNumber(),
    };

    return { status: httpStatusCodes.OK, data };
  }

  static async getByClientId(clientId: string) {
    const orders = await prisma.order.findMany({
      where: {
        clientId,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    const data = orders.map((order) => ({
      ...order,
      total: order.total.toNumber(),
    }));

    return { status: httpStatusCodes.OK, data };
  }

  static async getAll() {
    const orders = await prisma.order.findMany({
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    const data = orders.map((order) => ({
      ...order,
      total: order.total.toNumber(),
    }));

    return { status: httpStatusCodes.OK, data };
  }

  static async update(id: string, payload: Prisma.OrderUpdateInput) {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
    });

    if (!order) {
      return {
        status: httpStatusCodes.NOT_FOUND,
        data: { message: "Order not found" },
      };
    }

    const updatedOrder = await prisma.order.update({
      where: {
        id,
      },
      data: payload,
    });

    const data = {
      ...updatedOrder,
      total: updatedOrder.total.toNumber(),
    };

    return { status: httpStatusCodes.OK, data };
  }

  static async delete(id: string) {
    const order = await prisma.order.delete({
      where: {
        id,
      },
    });

    const data = {
      ...order,
      total: order.total.toNumber(),
    };

    return { status: httpStatusCodes.OK, data };
  }
}
