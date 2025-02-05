import { Prisma, PrismaClient } from "@prisma/client";
import { httpStatusCodes } from "../utils/http-status-codes";
import { Order } from "../models/order.model";
import { DefaultResponse, ManyOrdersResponse, OneOrderResponse } from "../types";
import { checkProductsStock } from "../utils/check-products-stock";

const prisma = new PrismaClient();

export class OrderService {
  static async create(
    payload: Prisma.OrderCreateInput,
    products: Prisma.OrderItemCreateManyInput[]
  ): Promise<OneOrderResponse> {
    const checkedProducts = await checkProductsStock(products);

    const totalAmount = checkedProducts.reduce((acc, product) => {
      return acc + Number(product.price) * product.quantity;
    }, 0);

    const newOrder = await prisma.$transaction(async (prisma) => {
      const order = await prisma.order.create({
        data: {
          ...payload,
          total: totalAmount,
        },
      });

      await prisma.orderItem.createMany({
        data: checkedProducts.map((product) => ({
          ...product,
          orderId: order.id,
        })),
      });

      return order;
    });

    const data: Order = {
      ...newOrder,
      orderItems: checkedProducts,
      total: newOrder.total.toNumber(),
      status: newOrder.status,
    };

    return { status: httpStatusCodes.CREATED, data, error: null };
  }

  static async getById(id: string): Promise<OneOrderResponse> {
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
        data: null,
        error: "Order not found",
      };
    }

    const data: Order = {
      ...order,
      total: order.total.toNumber(),
      orderItems: order.orderItems.map((item) => ({
        ...item,
        price: item.price.toNumber(),
        product: {
          ...item.product,
          price: item.product.price.toNumber(),
        },
      })),
    };

    return { status: httpStatusCodes.OK, data, error: null };
  }

  static async getByClientId(clientId: string): Promise<ManyOrdersResponse> {
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
      orderItems: order.orderItems.map((item) => ({
        ...item,
        price: item.price.toNumber(),
        product: {
          ...item.product,
          price: item.product.price.toNumber(),
        },
      })),
    }));

    return { status: httpStatusCodes.OK, data, error: null };
  }

  static async getAll(): Promise<ManyOrdersResponse> {
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
      orderItems: order.orderItems.map((item) => ({
        ...item,
        price: item.price.toNumber(),
        product: {
          ...item.product,
          price: item.product.price.toNumber(),
        },
      })),
    }));

    return { status: httpStatusCodes.OK, data, error: null };
  }

  static async update(
    id: string,
    payload: Prisma.OrderUpdateInput
  ): Promise<OneOrderResponse> {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
    });

    if (!order) {
      return {
        status: httpStatusCodes.NOT_FOUND,
        data: null,
        error: "Order not found",
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

    return { status: httpStatusCodes.OK, data, error: null };
  }

  static async delete(id: string) {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
    });

    if (!order) {
      return {
        status: httpStatusCodes.NOT_FOUND,
        data: null,
        error: "Order not found",
      };
    }

    const deletedOrder = await prisma.order.delete({
      where: {
        id,
      },
      include: {
        orderItems: true,
      },
    });

    const data = {
      ...deletedOrder,
    };

    return { status: httpStatusCodes.OK, data, error: null };
  }

  static async countAll(): Promise<DefaultResponse<Number>> {
    const data = await prisma.order.count();

    return { status: httpStatusCodes.OK, data, error: null };
  }
}
