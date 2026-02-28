import express from "express";
import {
  askProductsController,
  getProductsController,
} from "../controllers/productController.js";

const router = express.Router();

/**
 * GET /api/products
 * Optional query: ?category=Laptop
 */
router.get("/products", getProductsController);

/**
 * POST /api/ask
 * Body: { query: "natural language" }
 */
router.post("/ask", askProductsController);

export default router;
