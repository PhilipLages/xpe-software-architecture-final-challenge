import { Router } from "express";
import { ProductController } from "../controllers/product.controller";

const productRouter = Router();

productRouter.post("/create", ProductController.create);
productRouter.get("/:id", ProductController.getById);
productRouter.get("/name/:name", ProductController.getByName);
productRouter.get("/", ProductController.getAll);
productRouter.put("/:id", ProductController.update);
productRouter.delete("/:id", ProductController.delete);

export default productRouter;
