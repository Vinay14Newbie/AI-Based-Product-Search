import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5000;

export const COHERE_API_KEY = process.env.COHERE_API_KEY;
