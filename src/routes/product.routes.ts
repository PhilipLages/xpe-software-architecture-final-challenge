import { Router } from "express";
import { ProductController } from "../controllers/product.controller";

const productRouter = Router();

productRouter.post("/create", ProductController.create);
productRouter.get("/", ProductController.getAll);
productRouter.get("/count", ProductController.countAll);
productRouter.get("/name/:name", ProductController.getByName);
productRouter.get("/:id", ProductController.getById);
productRouter.put("/:id", ProductController.update);
productRouter.delete("/:id", ProductController.delete);

export default productRouter;
