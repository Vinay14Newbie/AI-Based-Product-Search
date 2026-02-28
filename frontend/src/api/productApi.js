import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const askProducts = async (query) => {
  const response = await api.post("/ask", { query });
  return response.data;
};
