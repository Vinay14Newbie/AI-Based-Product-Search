# AI-Powered E-commerce Product Explorer

This repository contains a simple product discovery application with a backend API and a React frontend. The backend exposes a catalog of mock products and an `/ask` endpoint that uses Cohere's language model to interpret natural-language queries and return matching items. The frontend displays products and lets the user ask questions such as "budget laptops" or "good for gaming".

## Features

- **Backend**
  - In-memory product catalog (`/backend/src/data/products.js`) with 10 items.
  - `GET /api/products` to list or filter products by category.
  - `POST /api/ask` accepts `{ query: "..." }`, forwards the text to Cohere, and returns JSON with `productIds` and `summary`.
  - Prompt includes product context so the model can pick relevant items.
  - Environment-driven configuration (`COHERE_API_KEY` and `PORT`).
  - Basic error handling and logging.

- **Frontend**
  - React app bootstrapped with Vite.
  - Product grid using a reusable `ProductCard` component.
  - Input box for natural-language questions; results update the list and show an AI summary.
  - Simple loading and error states.

- **AI/LLM**
  - Cohere `command-nightly` model used via a small service module.
  - Response parsed for JSON; unparseable replies produce an error message.

## Getting Started

### 1. Clone the repo

```bash
git clone <https://github.com/Vinay14Newbie/AI-Based-Product-Search> ai-product-explorer
cd ai-product-explorer
```

### 2. Backend

```bash
cd backend
# install dependencies
npm install

# create a .env file (don't commit it):
# COHERE_API_KEY=your_cohere_key_here
# PORT=5000

npm start   # or `npm run dev` if you add nodemon/ts-node
```

The API should now be running on http://localhost:5000.

- `GET /api/products` returns the full catalog or `?category=` filter.
- `POST /api/ask` accepts JSON `{ query: "text" }` and returns something like:

```json
{
  "productIds": ["1", "5"],
  "summary": "These laptops are affordable and suitable for gaming."
}
```

### 3. Frontend

```bash
cd ../frontend
npm install

# make sure the API URL is set correctly in frontend/.env:
# VITE_API_URL=http://localhost:5000/api

npm run dev
```

Open http://localhost:5173 (or whatever Vite outputs) in a browser. You should see the product grid and an ask box.

### 4. Using the App

1. Browse the products or filter them by asking something in the input field.
2. Click `Ask` to send the query to the backend.
3. The page updates to show matching items and an AI-generated summary.
4. Click `Reset` to return to the full list.
