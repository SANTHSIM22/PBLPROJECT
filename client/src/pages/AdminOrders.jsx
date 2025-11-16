import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState({
    totalOrders: 0,
    placed: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/admin/orders");
      if (response.data.success) {
        const ordersData = response.data.data || [];
        setOrders(ordersData);

        // Calculate stats
        const stats = {
          totalOrders: ordersData.length,
          placed: ordersData.filter((o) => o.status === "Placed").length,
          shipped: ordersData.filter((o) => o.status === "Shipped").length,
          delivered: ordersData.filter((o) => o.status === "Delivered").length,
          cancelled: ordersData.filter((o) => o.status === "Cancelled").length,
          totalRevenue: ordersData
            .filter((o) => o.status !== "Cancelled")
            .reduce((sum, o) => sum + o.totalAmount, 0),
        };
        setStats(stats);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    if (!confirm(`Update order status to ${newStatus}?`)) {
      return;
    }

    try {
      const response = await axios.put(`/orders/${orderId}/status`, {
        status: newStatus,
      });
      if (response.data.success) {
        alert("Order status updated successfully");
        fetchOrders();
      }
    } catch (error) {
      console.error("Error updating order:", error);
      alert(error.response?.data?.message || "Error updating order status");
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

  const filteredOrders = orders.filter((order) => {
    const matchesFilter =
      filter === "all" || order.status.toLowerCase() === filter.toLowerCase();
    const matchesSearch =
      searchTerm === "" ||
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer?.username
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-brown-50 border-b border-brown-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-brown-900">
                Order Monitoring
              </h1>
              <p className="text-brown-600 mt-1 text-sm">
                Track all transactions and deliveries
              </p>
            </div>
            <Link
              to="/admin/dashboard"
              className="bg-brown-700 hover:bg-brown-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-3 border border-brown-200">
            <p className="text-brown-600 text-xs font-medium">Total Orders</p>
            <p className="text-xl font-bold text-brown-900 mt-1">
              {stats.totalOrders}
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg shadow-sm p-3 border border-blue-200">
            <p className="text-blue-700 text-xs font-medium">Placed</p>
            <p className="text-xl font-bold text-blue-800 mt-1">
              {stats.placed}
            </p>
          </div>
          <div className="bg-yellow-50 rounded-lg shadow-sm p-3 border border-yellow-200">
            <p className="text-yellow-700 text-xs font-medium">Shipped</p>
            <p className="text-xl font-bold text-yellow-800 mt-1">
              {stats.shipped}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg shadow-sm p-3 border border-green-200">
            <p className="text-green-700 text-xs font-medium">Delivered</p>
            <p className="text-xl font-bold text-green-800 mt-1">
              {stats.delivered}
            </p>
          </div>
          <div className="bg-red-50 rounded-lg shadow-sm p-3 border border-red-200">
            <p className="text-red-700 text-xs font-medium">Cancelled</p>
            <p className="text-xl font-bold text-red-800 mt-1">
              {stats.cancelled}
            </p>
          </div>
          <div className="bg-brown-700 rounded-lg shadow-sm p-3 border border-brown-800">
            <p className="text-brown-100 text-xs font-medium">Total Revenue</p>
            <p className="text-lg font-bold text-white mt-1">
              ₹{stats.totalRevenue.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 border border-brown-200 mb-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by Order ID, Customer..."
                className="w-full px-3 py-2 border border-brown-300 rounded-lg focus:ring-1 focus:ring-brown-600 focus:border-brown-600 text-sm"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {["all", "placed", "shipped", "delivered", "cancelled"].map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-3 py-2 rounded-lg font-medium transition-colors capitalize text-xs ${
                      filter === status
                        ? "bg-brown-700 text-white"
                        : "bg-brown-100 text-brown-800 hover:bg-brown-200"
                    }`}
                  >
                    {status} (
                    {status === "all" ? stats.totalOrders : stats[status]})
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-lg shadow-sm border border-brown-200">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin w-12 h-12 border-3 border-brown-600 border-t-transparent rounded-full mx-auto"></div>
              <p className="text-brown-600 mt-4 text-sm">Loading orders...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="p-12 text-center">
              <svg
                className="w-12 h-12 text-brown-300 mx-auto mb-4"
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
              <p className="text-brown-600 text-sm">No orders found</p>
            </div>
          ) : (
            <div className="divide-y divide-brown-100">
              {filteredOrders.map((order) => (
                <div
                  key={order._id}
                  className="p-4 hover:bg-brown-50 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-base font-semibold text-brown-900">
                          Order #{order._id.slice(-8).toUpperCase()}
                        </h3>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-xs text-brown-600">
                        <p>
                          <span className="font-medium">Customer:</span>{" "}
                          {order.customer?.firstName ||
                            order.customer?.username}{" "}
                          ({order.customer?.email})
                        </p>
                        <p>
                          <span className="font-medium">Date:</span>{" "}
                          {new Date(order.orderDate).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </p>
                        <p>
                          <span className="font-medium">Items:</span>{" "}
                          {order.items.length}
                        </p>
                        <p>
                          <span className="font-medium">Total:</span>{" "}
                          <span className="text-base font-bold text-brown-900">
                            ₹{order.totalAmount.toLocaleString()}
                          </span>
                        </p>
                      </div>

                      <div className="mt-1.5 text-xs text-brown-600">
                        <span className="font-medium">Shipping:</span>{" "}
                        {order.shippingAddress.address},{" "}
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state} -{" "}
                        {order.shippingAddress.pincode}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Link
                        to={`/orders/${order._id}`}
                        className="bg-brown-700 hover:bg-brown-800 text-white font-medium py-1.5 px-4 rounded-lg transition-colors text-center text-xs"
                      >
                        View Details
                      </Link>

                      {order.status === "Placed" && (
                        <button
                          onClick={() =>
                            handleUpdateStatus(order._id, "Shipped")
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1.5 px-4 rounded-lg transition-colors text-xs"
                        >
                          Mark as Shipped
                        </button>
                      )}

                      {order.status === "Shipped" && (
                        <button
                          onClick={() =>
                            handleUpdateStatus(order._id, "Delivered")
                          }
                          className="bg-green-500 hover:bg-green-600 text-white font-medium py-1.5 px-4 rounded-lg transition-colors text-xs"
                        >
                          Mark as Delivered
                        </button>
                      )}

                      {order.status !== "Cancelled" &&
                        order.status !== "Delivered" && (
                          <button
                            onClick={() =>
                              handleUpdateStatus(order._id, "Cancelled")
                            }
                            className="bg-red-100 hover:bg-red-200 text-red-700 font-medium py-1.5 px-4 rounded-lg transition-colors text-xs"
                          >
                            Cancel Order
                          </button>
                        )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
