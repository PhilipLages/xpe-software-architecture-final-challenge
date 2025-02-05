import { Prisma, PrismaClient } from "@prisma/client";
import { httpStatusCodes } from "../utils/http-status-codes";
import { DefaultResponse, ManyProductsResponse, OneProductResponse } from "../types";

const prisma = new PrismaClient();

export class ProductService {
  static async create(
    payload: Prisma.ProductCreateInput
  ): Promise<OneProductResponse> {
    const newProduct = await prisma.product.create({
      data: payload,
    });

    const data = {
      ...newProduct,
      price: newProduct.price.toNumber(),
    };

    return { status: httpStatusCodes.CREATED, data, error: null };
  }

  static async getById(id: string): Promise<OneProductResponse> {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      return {
        status: httpStatusCodes.NOT_FOUND,
        data: null,
        error: "Product not found",
      };
    }

    const data = {
      ...product,
      price: product.price.toNumber(),
    };

    return { status: httpStatusCodes.OK, data, error: null };
  }

  static async getByName(name: string): Promise<ManyProductsResponse> {
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

    return { status: httpStatusCodes.OK, data, error: null };
  }

  static async getAll(): Promise<ManyProductsResponse> {
    const products = await prisma.product.findMany();

    const data = products.map((product) => ({
      ...product,
      price: product.price.toNumber(),
    }));

    return { status: httpStatusCodes.OK, data, error: null };
  }

  static async update(
    id: string,
    payload: Prisma.ProductUpdateInput
  ): Promise<OneProductResponse> {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      return {
        status: httpStatusCodes.NOT_FOUND,
        data: null,
        error: "Product not found",
      };
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id,
      },
      data: payload,
    });

    const data = {
      ...updatedProduct,
      price: product.price.toNumber(),
    };

    return { status: httpStatusCodes.OK, data, error: null };
  }

  static async delete(id: string): Promise<OneProductResponse> {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      return {
        status: httpStatusCodes.NOT_FOUND,
        data: null,
        error: "Product not found",
      };
    }

    const deletedProduct = await prisma.product.delete({
      where: {
        id,
      },
    });

    const data = {
      ...product,
      price: deletedProduct.price.toNumber(),
    };

    return { status: httpStatusCodes.OK, data, error: null };
  }

  static async countAll(): Promise<DefaultResponse<Number>> {
    const data = await prisma.product.count();

    return { status: httpStatusCodes.OK, data, error: null };
  }
}
