import { useEffect, useState } from "react";
import ProductCard from "./Components/ProductCard";
import { fetchProducts, askProducts } from "./api/productApi";

function App() {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [aiSummary, setAiSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load products on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setOriginalProducts(data);
      } catch (err) {
        setError("Failed to load products.");
      }
    };

    loadProducts();
  }, []);

  const handleAsk = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setAiSummary("");

    try {
      const data = await askProducts(query);

      const { productIds, summary } = data;

      const filteredProducts = originalProducts.filter((product) =>
        productIds.includes(product.id),
      );

      setProducts(filteredProducts);
      setAiSummary(summary);
    } catch (err) {
      setError("AI service failed. Please try again.");
    }

    setLoading(false);
  };

  const handleReset = () => {
    setProducts(originalProducts);
    setAiSummary("");
    setQuery("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">
          AI Product Discovery
        </h1>

        {/* Ask Section */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Ask something like 'budget laptops for gaming'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 p-2 border rounded-md"
          />

          <button
            onClick={handleAsk}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Ask
          </button>

          <button
            onClick={handleReset}
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Reset
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-blue-600 mb-4">Loading AI response...</p>
        )}

        {/* Error */}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        {/* AI Summary */}
        {aiSummary && (
          <div className="bg-white p-4 rounded-md shadow mb-6">
            <h2 className="font-semibold mb-2">AI Summary</h2>
            <p>{aiSummary}</p>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
