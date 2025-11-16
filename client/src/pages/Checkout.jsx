import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/cart");
      if (response.data.success) {
        const cartData = response.data.data;
        if (!cartData.items || cartData.items.length === 0) {
          navigate("/cart");
          return;
        }
        setCart(cartData);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError("");

      const response = await axios.post("/orders/checkout", {
        shippingAddress,
      });

      if (response.data.success) {
        // Navigate to order confirmation
        navigate(`/orders/${response.data.data._id}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order");
    } finally {
      setSubmitting(false);
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
          <p className="mt-4 text-brown-600 text-sm">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-brown-50 border-b border-brown-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-brown-900">Checkout</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Shipping Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg border border-brown-200 p-5 shadow-sm"
            >
              <h2 className="text-lg font-bold text-brown-900 mb-4">
                Shipping Address
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-brown-700 font-medium mb-1.5 text-sm">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={shippingAddress.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-brown-300 rounded-lg focus:outline-none focus:border-brown-600 focus:ring-1 focus:ring-brown-600 text-sm"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-brown-700 font-medium mb-1.5 text-sm">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingAddress.phone}
                    onChange={handleInputChange}
                    required
                    pattern="[0-9]{10}"
                    className="w-full px-3 py-2 border border-brown-300 rounded-lg focus:outline-none focus:border-brown-600 focus:ring-1 focus:ring-brown-600 text-sm"
                    placeholder="9876543210"
                  />
                </div>

                <div>
                  <label className="block text-brown-700 font-medium mb-1.5 text-sm">
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={shippingAddress.address}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-brown-300 rounded-lg focus:outline-none focus:border-brown-600 focus:ring-1 focus:ring-brown-600 text-sm resize-none"
                    placeholder="House/Flat no., Street, Area"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-brown-700 font-medium mb-1.5 text-sm">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={shippingAddress.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-brown-300 rounded-lg focus:outline-none focus:border-brown-600 focus:ring-1 focus:ring-brown-600 text-sm"
                      placeholder="Mumbai"
                    />
                  </div>

                  <div>
                    <label className="block text-brown-700 font-medium mb-1.5 text-sm">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={shippingAddress.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-brown-300 rounded-lg focus:outline-none focus:border-brown-600 focus:ring-1 focus:ring-brown-600 text-sm"
                      placeholder="Maharashtra"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-brown-700 font-medium mb-1.5 text-sm">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={shippingAddress.pincode}
                    onChange={handleInputChange}
                    required
                    pattern="[0-9]{6}"
                    className="w-full px-3 py-2 border border-brown-300 rounded-lg focus:outline-none focus:border-brown-600 focus:ring-1 focus:ring-brown-600 text-sm"
                    placeholder="400001"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-6 bg-brown-700 text-white font-semibold py-3 px-4 rounded-lg hover:bg-brown-800 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {submitting ? "Placing Order..." : "Place Order & Pay"}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-brown-200 p-5 shadow-sm sticky top-4">
              <h2 className="text-lg font-bold text-brown-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-4">
                {cart.items.map((item) => (
                  <div
                    key={item.product._id}
                    className="flex gap-2.5 pb-3 border-b border-brown-200 last:border-0 last:pb-0"
                  >
                    <img
                      src={
                        item.product.images?.[0] ||
                        "https://via.placeholder.com/60"
                      }
                      alt={item.product.title}
                      className="w-14 h-14 object-contain rounded-lg border border-brown-200 bg-brown-50 p-1 flex-shrink-0"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/60";
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-brown-900 line-clamp-2 text-sm">
                        {item.product.title}
                      </p>
                      <p className="text-xs text-brown-600 mt-0.5">
                        Qty: {item.quantity} × ₹{item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2.5 mb-4 pt-3 border-t border-brown-200">
                <div className="flex justify-between text-brown-700 text-sm">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    ₹{cart.totalAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-brown-700 text-sm">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="border-t border-brown-200 pt-2.5">
                  <div className="flex justify-between text-lg font-bold text-brown-900">
                    <span>Total</span>
                    <span>₹{cart.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-green-800 font-medium text-xs flex items-center gap-2">
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Payment on delivery
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
