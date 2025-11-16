import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/orders/customer");
      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Placed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Shipped":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
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
          <p className="mt-4 text-brown-600 text-sm">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-brown-50 border-b border-brown-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-brown-900">My Orders</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-brown-900 mb-2">
              No orders yet
            </h2>
            <p className="text-brown-600 mb-6 text-sm">
              Start shopping and your orders will appear here!
            </p>
            <Link
              to="/products"
              className="inline-block bg-brown-700 text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-brown-800 transition-colors text-sm"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-lg border border-brown-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Order Header */}
                <div className="bg-brown-50 p-4 border-b border-brown-200">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                      <p className="text-xs text-brown-600 mb-0.5">Order ID</p>
                      <p className="font-semibold text-brown-900 text-sm">
                        #{order._id.slice(-8).toUpperCase()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-brown-600 mb-0.5">
                        Order Date
                      </p>
                      <p className="font-medium text-brown-900 text-sm">
                        {new Date(order.orderDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-brown-600 mb-0.5">
                        Total Amount
                      </p>
                      <p className="text-base font-bold text-brown-900">
                        ₹{order.totalAmount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-brown-600 mb-0.5">Status</p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4">
                  <div className="space-y-3">
                    {order.items.slice(0, 2).map((item, index) => (
                      <div key={index} className="flex gap-3 items-center">
                        <img
                          src={
                            item.product?.images?.[0] ||
                            "https://via.placeholder.com/80"
                          }
                          alt={item.title}
                          className="w-14 h-14 object-contain rounded-lg border border-brown-200 bg-brown-50 p-1 flex-shrink-0"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/80";
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-brown-900 text-sm line-clamp-1">
                            {item.title}
                          </p>
                          <p className="text-xs text-brown-600">
                            Quantity: {item.quantity} × ₹
                            {item.price.toLocaleString()}
                          </p>
                        </div>
                        <p className="font-semibold text-brown-900 text-sm">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                    {order.items.length > 2 && (
                      <p className="text-brown-600 text-xs">
                        + {order.items.length - 2} more{" "}
                        {order.items.length - 2 === 1 ? "item" : "items"}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-brown-200 flex justify-between items-center">
                    <Link
                      to={`/orders/${order._id}`}
                      className="bg-brown-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-brown-800 transition-colors text-sm"
                    >
                      View Details
                    </Link>

                    {order.status === "Delivered" && (
                      <Link
                        to={`/orders/${order._id}`}
                        className="text-brown-600 hover:text-brown-800 font-medium text-sm"
                      >
                        Write a Review
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
