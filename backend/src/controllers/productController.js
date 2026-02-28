import { products } from "../data/products.js";
import { askLLM } from "../services/llmService.js";

export const getProductsController = (req, res) => {
  try {
    const { category } = req.query;

    if (category) {
      const filtered = products.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase(),
      );
      return res.json(filtered);
    }

    return res.json(products);
  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch products",
    });
  }
};

export const askProductsController = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({
        error: "Query is required",
      });
    }

    const result = await askLLM(query);

    return res.json(result);
  } catch (error) {
    return res.status(502).json({
      error: "AI service unavailable. Please try again later.",
    });
  }
};
