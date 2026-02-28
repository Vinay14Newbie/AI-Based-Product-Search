function ProductCard({ product }) {
  return (
    <div className="border rounded-xl p-4 shadow-md bg-white">
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-sm text-gray-500">{product.category}</p>
      <p className="text-blue-600 font-bold mt-2">₹{product.price}</p>
      <p className="text-gray-700 mt-2 text-sm">{product.description}</p>
    </div>
  );
}

export default ProductCard;
