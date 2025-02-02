import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultProductResponse } from "../types";
import { httpStatusCodes } from "../controllers/utils";

const prisma = new PrismaClient();

export class ProductService {
  static async create(
    payload: Prisma.ProductCreateInput
  ): Promise<DefaultProductResponse> {
    const newProduct = await prisma.product.create({
      data: payload,
    });

    const data = {
      ...newProduct,
      price: newProduct.price.toNumber(),
    };

    return { status: httpStatusCodes.CREATED, data };
  }

  static async getById(id: string): Promise<DefaultProductResponse> {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      return {
        status: httpStatusCodes.NOT_FOUND,
        data: { message: "Product not found" },
      };
    }

    const data = {
      ...product,
      price: product.price.toNumber(),
    };

    return { status: httpStatusCodes.OK, data };
  }

  static async getByName(name: string): Promise<DefaultProductResponse> {
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });

    const data = products.map((product) => ({
      ...product,
      price: product.price.toNumber(),
    }));

    return { status: httpStatusCodes.OK, data };
  }

  static async getAll(): Promise<DefaultProductResponse> {
    const products = await prisma.product.findMany();

    const data = products.map((product) => ({
      ...product,
      price: product.price.toNumber(),
    }));

    return { status: httpStatusCodes.OK, data };
  }

  static async update(
    id: string,
    payload: Prisma.ProductUpdateInput
  ): Promise<DefaultProductResponse> {
    const product = await prisma.product.update({
      where: {
        id,
      },
      data: payload,
    });

    const data = {
      ...product,
      price: product.price.toNumber(),
    };

    return { status: httpStatusCodes.OK, data };
  }

  static async delete(id: string): Promise<DefaultProductResponse> {
    const product = await prisma.product.delete({
      where: {
        id,
      },
    });

    const data = {
      ...product,
      price: product.price.toNumber(),
    };

    return { status: httpStatusCodes.OK, data };
  }
}
