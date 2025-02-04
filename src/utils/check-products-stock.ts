import { Prisma } from "@prisma/client";
import { ProductService } from "../services/product.service";
import { httpStatusCodes } from "./http-status-codes";
import { OrderItem } from "../models/order-item.model";

export const checkProductsStock = async (
  products: Prisma.OrderItemCreateManyInput[]
) => {
  const checkedProducts = await Promise.all(
    products.map(async (productItem) => {
      const { data, status } = await ProductService.getById(
        productItem.productId
      );

      if (status !== httpStatusCodes.OK) {
        throw new Error(`Product with ID ${productItem.productId} not found`);
      }

      if (data.stock < productItem.quantity) {
        throw new Error(
          `Product with ID ${productItem.productId} is out of stock`
        );
      }

      await ProductService.update(data.id, {
        stock: data.stock - productItem.quantity,
      });

      return {
        ...productItem,
        price: data.price,
      } as OrderItem;
    })
  );

  return checkedProducts;
};
