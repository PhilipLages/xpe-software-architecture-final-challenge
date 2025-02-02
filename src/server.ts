import express from "express";
import cors from "cors";
import clientRouter from "./routes/client.routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/clients", clientRouter);

app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
