import axios from "axios";
import { products } from "../data/products.js";
import { COHERE_API_KEY } from "../config/serverConfig.js";

export const askLLM = async (query) => {
  try {
    if (!COHERE_API_KEY) {
      throw new Error(
        "COHERE_API_KEY is not set. Please add it to your .env file.",
      );
    }

    const productContext = products
      .map(
        (p) =>
          `- ${p.name} (ID: ${p.id}): ${p.description} - Price: ₹${p.price} - Category: ${p.category}`,
      )
      .join("\n");

    const systemPrompt = `You are a helpful product recommendation assistant. Given the product catalog and a user query, recommend the most relevant products by returning their IDs from the catalog. Always respond with valid JSON in the specified format.`;

    const userMessage = `Product Catalog:
${productContext}

User Query: "${query}"

Based on the products and user query, return a JSON response with:
1. productIds: array of product IDs that match the query (must be from the catalog above)
2. summary: brief explanation of why these products match

Return ONLY valid JSON with no markdown or extra text:
{
  "productIds": ["id1", "id2"],
  "summary": "explanation"
}`;

    // console.log("Calling Cohere API with query:", query);
    // console.log("API Key present:", !!COHERE_API_KEY);

    const response = await axios.post(
      "https://api.cohere.com/v1/chat",
      {
        model: "command-nightly",
        message: userMessage,
        chat_history: [],
        system: systemPrompt,
      },
      {
        headers: {
          Authorization: `Bearer ${COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    // console.log("Cohere response received:", response.status);
    // console.log("Response data:", JSON.stringify(response.data, null, 2));

    const text = response.data.text || response.data.message;

    console.log("Response text:", text);

    // Try parsing JSON safely
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error("No JSON found in response");
        throw new Error("No JSON found in response");
      }

      const parsed = JSON.parse(jsonMatch[0]);
      console.log("Parsed result:", parsed);
      return parsed;
    } catch (parseError) {
      console.error("JSON parse error:", parseError.message);
      console.error("Raw text:", text);
      throw new Error("Failed to parse AI response as JSON");
    }
  } catch (error) {
    console.error("LLM Service Error:", error.message);
    if (error.response) {
      console.error("Error status:", error.response.status);
      console.error("Error data:", error.response.data);
    }
    throw new Error("AI service unavailable: " + error.message);
  }
};
