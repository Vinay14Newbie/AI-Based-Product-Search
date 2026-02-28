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
    console.error("Get products error:", error);
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

    console.log("Received ask request:", { query });

    const result = await askLLM(query);

    return res.json(result);
  } catch (error) {
    console.error("Ask products error:", error.message);

    // Return different status codes based on error type
    if (error.message.includes("COHERE_API_KEY")) {
      return res.status(500).json({
        error: "Server misconfiguration. Please contact support.",
      });
    }

    if (error.message.includes("Failed to parse")) {
      return res.status(502).json({
        error: "AI service returned invalid response. Please try again.",
      });
    }

    return res.status(502).json({
      error:
        "AI service temporarily unavailable. Please check your API key and try again.",
    });
  }
};
