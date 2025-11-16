import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axios";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/cart");
      if (response.data.success) {
        setCart(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      setUpdating(true);
      const response = await axios.put("/cart/update", {
        productId,
        quantity: newQuantity,
      });
      if (response.data.success) {
        setCart(response.data.data);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update quantity");
    } finally {
      setUpdating(false);
    }
  };

  const removeItem = async (productId) => {
    if (!confirm("Remove this item from cart?")) return;

    try {
      setUpdating(true);
      const response = await axios.delete(`/cart/remove/${productId}`);
      if (response.data.success) {
        setCart(response.data.data);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to remove item");
    } finally {
      setUpdating(false);
    }
  };

  const clearCart = async () => {
    if (!confirm("Clear all items from cart?")) return;

    try {
      setUpdating(true);
      const response = await axios.delete("/cart/clear");
      if (response.data.success) {
        setCart(response.data.data);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to clear cart");
    } finally {
      setUpdating(false);
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
          <p className="mt-4 text-brown-600 text-sm">Loading cart...</p>
        </div>
      </div>
    );
  }

  const items = cart?.items || [];
  const totalAmount = cart?.totalAmount || 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-brown-50 border-b border-brown-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-brown-900">Shopping Cart</h1>
            {items.length > 0 && (
              <button
                onClick={clearCart}
                disabled={updating}
                className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center gap-1.5"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {items.length === 0 ? (
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-brown-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-brown-600 mb-6 text-sm">
              Explore our amazing handcrafted products!
            </p>
            <Link
              to="/products"
              className="inline-block bg-brown-700 text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-brown-800 transition-colors text-sm"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3">
              {items.map((item) => (
                <div
                  key={item.product._id}
                  className="bg-white rounded-lg border border-brown-200 p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <Link to={`/products/${item.product._id}`}>
                      <img
                        src={
                          item.product.images?.[0] ||
                          "https://via.placeholder.com/200"
                        }
                        alt={item.product.title}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-lg border border-brown-200 bg-brown-50 p-2"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/200?text=No+Image";
                        }}
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/products/${item.product._id}`}
                        className="text-base font-semibold text-brown-900 hover:text-brown-700 mb-1 block line-clamp-2"
                      >
                        {item.product.title}
                      </Link>

                      <p className="text-brown-600 text-xs mb-1 capitalize">
                        {item.product.category}
                      </p>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product._id,
                                item.quantity - 1
                              )
                            }
                            disabled={updating || item.quantity <= 1}
                            className="w-8 h-8 rounded-md border border-brown-300 bg-white text-brown-700 font-semibold hover:bg-brown-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                          >
                            −
                          </button>
                          <span className="w-12 text-center font-semibold text-sm text-brown-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product._id,
                                item.quantity + 1
                              )
                            }
                            disabled={
                              updating || item.quantity >= item.product.stock
                            }
                            className="w-8 h-8 rounded-md border border-brown-300 bg-white text-brown-700 font-semibold hover:bg-brown-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="text-lg font-bold text-brown-900">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </div>
                          <div className="text-xs text-brown-600">
                            ₹{item.price.toLocaleString()} each
                          </div>
                        </div>
                      </div>

                      {/* Stock Warning */}
                      {item.product.stock < item.quantity && (
                        <p className="text-red-600 text-xs mt-2">
                          Only {item.product.stock} items available
                        </p>
                      )}
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.product._id)}
                      disabled={updating}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Remove from cart"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-brown-200 p-5 shadow-sm sticky top-4">
                <h2 className="text-lg font-bold text-brown-900 mb-4">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-brown-700 text-sm">
                    <span>
                      Subtotal ({items.length}{" "}
                      {items.length === 1 ? "item" : "items"})
                    </span>
                    <span className="font-semibold">
                      ₹{totalAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-brown-700 text-sm">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                  <div className="border-t border-brown-200 pt-3">
                    <div className="flex justify-between text-lg font-bold text-brown-900">
                      <span>Total</span>
                      <span>₹{totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  disabled={updating}
                  className="w-full bg-brown-700 text-white font-semibold py-3 px-4 rounded-lg hover:bg-brown-800 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  Proceed to Checkout
                </button>

                <Link
                  to="/products"
                  className="block text-center text-brown-600 hover:text-brown-800 font-medium mt-3 text-sm"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
