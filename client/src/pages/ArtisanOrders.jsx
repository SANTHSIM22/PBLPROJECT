import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "../utils/axios";

const ArtisanOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/orders/artisan");
      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`/orders/${orderId}/status`, {
        status: newStatus,
      });
      if (response.data.success) {
        // Update local state
        setOrders(
          orders.map((order) =>
            order._id === orderId ? response.data.data : order
          )
        );
        alert("Order status updated successfully!");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update order status");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Placed":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Shipped":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-300";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter(
          (order) => order.status.toLowerCase() === filter.toLowerCase()
        );

  if (loading) {
    return (
      <div className="min-h-screen bg-brown-50 flex items-center justify-center">
        <div className="animate-spin w-16 h-16 border-4 border-brown-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brown-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b-2 border-brown-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-brown-800">My Orders</h1>
              <p className="text-brown-600 mt-1">Manage your customer orders</p>
            </div>
            <Link to="/artisan/dashboard" className="btn btn-secondary">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-100 border-2 border-red-300 text-red-700 px-6 py-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* Order Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 border-2 border-brown-100 mb-6">
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium ${
                filter === "all"
                  ? "bg-brown-600 text-white"
                  : "bg-brown-100 text-brown-700 hover:bg-brown-200"
              }`}
            >
              All Orders ({orders.length})
            </button>
            <button
              onClick={() => setFilter("placed")}
              className={`px-4 py-2 rounded-lg font-medium ${
                filter === "placed"
                  ? "bg-brown-600 text-white"
                  : "bg-brown-100 text-brown-700 hover:bg-brown-200"
              }`}
            >
              Placed ({orders.filter((o) => o.status === "Placed").length})
            </button>
            <button
              onClick={() => setFilter("shipped")}
              className={`px-4 py-2 rounded-lg font-medium ${
                filter === "shipped"
                  ? "bg-brown-600 text-white"
                  : "bg-brown-100 text-brown-700 hover:bg-brown-200"
              }`}
            >
              Shipped ({orders.filter((o) => o.status === "Shipped").length})
            </button>
            <button
              onClick={() => setFilter("delivered")}
              className={`px-4 py-2 rounded-lg font-medium ${
                filter === "delivered"
                  ? "bg-brown-600 text-white"
                  : "bg-brown-100 text-brown-700 hover:bg-brown-200"
              }`}
            >
              Delivered ({orders.filter((o) => o.status === "Delivered").length}
              )
            </button>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md border-2 border-brown-100 p-12 text-center">
            <svg
              className="w-24 h-24 text-brown-300 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="text-2xl font-bold text-brown-800 mb-2">
              {filter === "all" ? "No Orders Yet" : `No ${filter} Orders`}
            </h3>
            <p className="text-brown-600 mb-6">
              Orders from customers will appear here
            </p>
            <Link to="/artisan/products/new" className="btn btn-primary">
              Add Your First Product
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              // Filter items that belong to this artisan
              const myItems = order.items.filter(
                (item) =>
                  item.artisan?._id === user._id || item.artisan === user._id
              );

              if (myItems.length === 0) return null;

              const myTotal = myItems.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              );

              return (
                <div
                  key={order._id}
                  className="bg-white rounded-2xl border border-brown-200 overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  {/* Order Header */}
                  <div className="bg-gradient-to-r from-brown-50 to-brown-100 p-6 border-b border-brown-200">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-brown-600 mb-1">Order ID</p>
                        <p className="font-bold text-brown-900">
                          #{order._id.slice(-8).toUpperCase()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-brown-600 mb-1">Customer</p>
                        <p className="font-semibold text-brown-900">
                          {order.customer?.profile?.firstName ||
                            order.customer?.firstName ||
                            "N/A"}{" "}
                          {order.customer?.profile?.lastName ||
                            order.customer?.lastName ||
                            ""}
                        </p>
                        <p className="text-xs text-brown-600">
                          {order.customer?.email}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-brown-600 mb-1">
                          Order Date
                        </p>
                        <p className="font-semibold text-brown-900">
                          {new Date(order.orderDate).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-brown-600 mb-1">Status</p>
                        <span
                          className={`inline-block px-4 py-2 rounded-full text-sm font-bold border-2 ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <h3 className="font-bold text-brown-900 mb-4">
                      Your Products in this Order
                    </h3>
                    <div className="space-y-4 mb-6">
                      {myItems.map((item, index) => (
                        <div
                          key={index}
                          className="flex gap-4 items-center pb-4 border-b border-brown-100 last:border-0"
                        >
                          <img
                            src={
                              item.product?.images?.[0] ||
                              "https://via.placeholder.com/80"
                            }
                            alt={item.title}
                            className="w-20 h-20 object-contain rounded-lg border-2 border-brown-100 bg-brown-50"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/80";
                            }}
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-brown-900">
                              {item.title}
                            </p>
                            <p className="text-sm text-brown-600">
                              Quantity: {item.quantity} × ₹
                              {item.price.toLocaleString()}
                            </p>
                          </div>
                          <p className="font-bold text-brown-900">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between bg-brown-50 p-4 rounded-xl">
                      <div>
                        <p className="text-sm text-brown-600 mb-1">
                          Your Earnings from this Order
                        </p>
                        <p className="text-2xl font-bold text-brown-900">
                          ₹{myTotal.toLocaleString()}
                        </p>
                      </div>

                      <div className="flex gap-3">
                        {order.status === "Placed" && (
                          <button
                            onClick={() =>
                              updateOrderStatus(order._id, "Shipped")
                            }
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                          >
                            Mark as Shipped
                          </button>
                        )}
                        {order.status === "Shipped" && (
                          <button
                            onClick={() =>
                              updateOrderStatus(order._id, "Delivered")
                            }
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                          >
                            Mark as Delivered
                          </button>
                        )}
                        <Link
                          to={`/orders/${order._id}`}
                          className="bg-brown-600 hover:bg-brown-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                        >
                          View Full Order
                        </Link>
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                      <h4 className="font-bold text-brown-900 mb-2">
                        Shipping Address
                      </h4>
                      <p className="text-brown-700">
                        {order.shippingAddress.fullName} -{" "}
                        {order.shippingAddress.phone}
                      </p>
                      <p className="text-brown-600">
                        {order.shippingAddress.address},{" "}
                        {order.shippingAddress.city}
                      </p>
                      <p className="text-brown-600">
                        {order.shippingAddress.state} -{" "}
                        {order.shippingAddress.pincode}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtisanOrders;
