import axios from "axios";
import { products } from "../data/products.js";
import { COHERE_API_KEY } from "../config/serverConfig.js";

export const askLLM = async (query) => {
  try {
    const prompt = `
You are a product recommendation assistant.

Here is the product catalog:
${JSON.stringify(products)}

User query:
"${query}"

Return ONLY valid JSON in this format:
{
  "productIds": ["id1", "id2"],
  "summary": "short explanation"
}

Do not return anything else.
`;

    const response = await axios.post(
      "https://api.cohere.ai/v1/chat",
      {
        model: "command-r",
        message: prompt,
      },
      {
        headers: {
          Authorization: `Bearer ${COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const text = response.data.text;

    // Try parsing JSON safely
    try {
      const parsed = JSON.parse(text);
      return parsed;
    } catch (parseError) {
      throw new Error("Invalid JSON returned from LLM");
    }
  } catch (error) {
    console.error("LLM Error:", error.message);
    throw new Error("AI service unavailable");
  }
};
