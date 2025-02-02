import express from "express";
import cors from "cors";
import clientRouter from "./routes/client.routes";
import productRouter from "./routes/product.routes";
import orderRouter from "./routes/order.routes";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import path from "path";

const app = express();
app.use(express.json());
app.use(cors());

const swaggerDocument = YAML.load(path.join(__dirname, "docs", "swagger.yaml"));

app.use("/clients", clientRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
