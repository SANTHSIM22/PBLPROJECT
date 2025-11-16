import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axios";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/wishlist");
      if (response.data.success) {
        setWishlist(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const response = await axios.delete(`/wishlist/remove/${productId}`);
      if (response.data.success) {
        setWishlist(response.data.data);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to remove from wishlist");
    }
  };

  const addToCart = async (productId) => {
    try {
      const response = await axios.post("/cart/add", {
        productId,
        quantity: 1,
      });
      if (response.data.success) {
        alert("Product added to cart!");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add to cart");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-12 h-12 border-3 border-brown-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-12 h-12 border-3 border-brown-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-brown-600 text-sm">Loading wishlist...</p>
        </div>
      </div>
    );
  }

  const products = wishlist?.products || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-brown-50 border-b border-brown-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-brown-900">My Wishlist</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {products.length === 0 ? (
          <div className="bg-white rounded-lg border border-brown-200 p-12 text-center shadow-sm">
            <div className="w-20 h-20 mx-auto mb-4 bg-brown-100 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-brown-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-brown-900 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-brown-600 mb-6 text-sm">
              Save your favorite products for later!
            </p>
            <Link
              to="/products"
              className="inline-block bg-brown-700 text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-brown-800 transition-colors text-sm"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="group bg-white rounded-lg shadow-sm border border-brown-200 overflow-hidden hover:shadow-md hover:border-brown-300 transition-all duration-300"
              >
                {/* Product Image */}
                <div className="relative h-56 bg-brown-50 overflow-hidden">
                  <Link to={`/products/${product._id}`}>
                    <img
                      src={
                        product.images?.[0] || "https://via.placeholder.com/400"
                      }
                      alt={product.title}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/400?text=No+Image";
                      }}
                    />
                  </Link>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromWishlist(product._id)}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 shadow-md transition-colors"
                    title="Remove from wishlist"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {/* Category Badge */}
                  <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-md">
                    <span className="text-brown-700 text-xs font-semibold uppercase tracking-wide">
                      {product.category}
                    </span>
                  </div>

                  {/* Stock Badge */}
                  {product.stock === 0 && (
                    <div className="absolute bottom-2 right-2 bg-red-500 text-white px-2.5 py-1 rounded-full text-xs font-semibold shadow-md">
                      Out of Stock
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <Link to={`/products/${product._id}`}>
                    <h3 className="text-base font-semibold text-brown-900 mb-2 line-clamp-2 min-h-[2.5rem] group-hover:text-brown-700 transition-colors">
                      {product.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-brown-600 mb-3 line-clamp-2 min-h-[2rem]">
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="mb-3">
                    <div className="text-xl font-bold text-brown-900">
                      ₹{product.price.toLocaleString()}
                    </div>
                  </div>

                  {/* Actions */}
                  <button
                    onClick={() => addToCart(product._id)}
                    disabled={!product.isAvailable || product.stock === 0}
                    className="w-full bg-brown-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-brown-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-sm text-sm"
                  >
                    {product.isAvailable && product.stock > 0
                      ? "Add to Cart"
                      : "Out of Stock"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
