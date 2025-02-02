import { Router } from "express";
import { ClientController } from "../controllers/client.controller";

const clientRouter = Router();

clientRouter.post("/create", ClientController.create);
clientRouter.get("/:id", ClientController.getById);
clientRouter.get("/name/:name", ClientController.getByName);
clientRouter.get("/", ClientController.getAll);
clientRouter.put("/:id", ClientController.update);
clientRouter.delete("/:id", ClientController.delete);

export default clientRouter;
