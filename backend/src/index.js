import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoute.js";
import { PORT } from "./config/serverConfig.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", productRoutes);

app.get("/", (req, res) => {
  return res.json({
    message: "Welcome to the AI-Powered E-commerce Product API",
  });
});

const PORT = PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
