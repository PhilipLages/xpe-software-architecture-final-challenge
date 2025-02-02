import { Router } from "express";
import { OrderController } from "../controllers/order.controller";

const orderRouter = Router();

orderRouter.post("/create", OrderController.create);
orderRouter.get("/:id", OrderController.getById);
orderRouter.get("/client/:clientId", OrderController.getByClientId);
orderRouter.get("/", OrderController.getAll);
orderRouter.put("/:id", OrderController.update);
orderRouter.delete("/:id", OrderController.delete);

export default orderRouter;
