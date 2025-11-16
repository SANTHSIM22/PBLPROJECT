import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

const ArtisanDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    activeOrders: 0,
    totalEarnings: 0,
  });
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // Fetch products
      const productsResponse = await axios.get(
        "http://localhost:5000/api/products/my/products",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Fetch orders
      const ordersResponse = await axios.get(
        "http://localhost:5000/api/orders/artisan",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const productsData =
        productsResponse.data.data || productsResponse.data || [];
      const ordersData = ordersResponse.data.data || ordersResponse.data || [];

      setProducts(productsData);
      setOrders(ordersData);

      // Calculate stats
      const activeOrdersCount = ordersData.filter(
        (o) => o.status === "Placed" || o.status === "Shipped"
      ).length;

      const totalEarnings = ordersData.reduce((sum, order) => {
        const myItems = order.items.filter(
          (item) => item.artisan?._id === user._id || item.artisan === user._id
        );
        return (
          sum +
          myItems.reduce(
            (itemSum, item) => itemSum + item.price * item.quantity,
            0
          )
        );
      }, 0);

      setStats({
        totalProducts: productsData.length,
        totalOrders: ordersData.length,
        activeOrders: activeOrdersCount,
        totalEarnings: totalEarnings,
      });

      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.response?.data?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-brown-50 border-b border-brown-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-brown-900">
                Artisan Dashboard
              </h1>
              <p className="text-brown-600 mt-0.5 text-sm">
                Welcome back, {user?.firstName}!
              </p>
              {user?.artisanProfile?.isVerified ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1.5">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Verified Artisan
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mt-1.5">
                  Verification Pending
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <img
                src={
                  user?.avatar ||
                  `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=8B4513&color=fff`
                }
                alt={user?.firstName}
                className="w-10 h-10 rounded-full border-2 border-brown-300"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-brown-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-brown-600 text-xs font-medium">
                  Total Products
                </p>
                <p className="text-2xl font-bold text-brown-900 mt-1">
                  {stats.totalProducts}
                </p>
              </div>
              <div className="bg-brown-100 p-2.5 rounded-lg">
                <svg
                  className="w-6 h-6 text-brown-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border border-brown-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-brown-600 text-xs font-medium">
                  Total Orders
                </p>
                <p className="text-2xl font-bold text-brown-900 mt-1">
                  {stats.totalOrders}
                </p>
              </div>
              <div className="bg-brown-100 p-2.5 rounded-lg">
                <svg
                  className="w-6 h-6 text-brown-600"
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
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border border-brown-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-brown-600 text-xs font-medium">
                  Active Orders
                </p>
                <p className="text-2xl font-bold text-brown-900 mt-1">
                  {stats.activeOrders}
                </p>
              </div>
              <div className="bg-brown-100 p-2.5 rounded-lg">
                <svg
                  className="w-6 h-6 text-brown-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border border-brown-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-brown-600 text-xs font-medium">
                  Total Earnings
                </p>
                <p className="text-2xl font-bold text-brown-900 mt-1">
                  ₹{stats.totalEarnings.toLocaleString()}
                </p>
              </div>
              <div className="bg-green-100 p-2.5 rounded-lg">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <Link
            to="/artisan/products/new"
            className="bg-brown-700 rounded-lg shadow-sm p-4 text-white hover:bg-brown-800 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-base">Add Product</h3>
                <p className="text-brown-100 text-xs">List a new item</p>
              </div>
            </div>
          </Link>

          <Link
            to="/artisan/orders"
            className="bg-brown-600 rounded-lg shadow-sm p-4 text-white hover:bg-brown-700 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <svg
                  className="w-6 h-6"
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
              </div>
              <div>
                <h3 className="font-semibold text-base">Manage Orders</h3>
                <p className="text-brown-100 text-xs">View and update orders</p>
              </div>
            </div>
          </Link>

          <Link
            to="/artisan/profile"
            className="bg-brown-800 rounded-lg shadow-sm p-4 text-white hover:bg-brown-900 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-base">Edit Profile</h3>
                <p className="text-brown-100 text-xs">Update your details</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm p-5 border border-brown-200 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-brown-900">Recent Orders</h2>
            <Link
              to="/artisan/orders"
              className="text-brown-600 hover:text-brown-800 font-medium text-sm"
            >
              View All →
            </Link>
          </div>
          {loading ? (
            <div className="text-center py-12">
              <div className="relative inline-block">
                <div className="w-10 h-10 border-3 border-brown-200 rounded-full"></div>
                <div className="absolute top-0 left-0 w-10 h-10 border-3 border-brown-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="text-brown-600 mt-3 text-sm">Loading orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="w-12 h-12 text-brown-300 mx-auto mb-3"
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
              <p className="text-brown-600 text-base">No orders yet</p>
              <p className="text-brown-500 mt-1 text-sm">
                Orders from customers will appear here!
              </p>
            </div>
          ) : (
            <div className="divide-y divide-brown-100">
              {orders.slice(0, 5).map((order) => {
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
                    className="py-3 hover:bg-brown-50 transition-colors rounded-lg px-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="font-semibold text-brown-900 text-sm">
                            #{order._id.slice(-8).toUpperCase()}
                          </p>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "Placed"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <p className="text-brown-600 text-xs">
                          {myItems.length} item{myItems.length > 1 ? "s" : ""} •{" "}
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
                      <div className="text-right">
                        <p className="text-base font-bold text-brown-900">
                          ₹{myTotal.toLocaleString()}
                        </p>
                        <Link
                          to={`/orders/${order._id}`}
                          className="text-xs text-brown-600 hover:text-brown-800 font-medium"
                        >
                          View Details →
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* My Products */}
        <div className="bg-white rounded-lg shadow-sm p-5 border border-brown-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-brown-900">My Products</h2>
            <Link
              to="/artisan/products/new"
              className="text-brown-600 hover:text-brown-800 font-medium text-sm"
            >
              Add New →
            </Link>
          </div>
          {loading ? (
            <div className="text-center py-12">
              <div className="relative inline-block">
                <div className="w-10 h-10 border-3 border-brown-200 rounded-full"></div>
                <div className="absolute top-0 left-0 w-10 h-10 border-3 border-brown-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="text-brown-600 mt-3 text-sm">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="w-12 h-12 text-brown-300 mx-auto mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <p className="text-brown-600 text-base">No products yet</p>
              <p className="text-brown-500 mt-1 text-sm">
                Start adding your handcrafted products!
              </p>
              <Link
                to="/artisan/products/new"
                className="inline-block mt-4 bg-brown-700 hover:bg-brown-800 text-white font-semibold py-2 px-5 rounded-lg transition-colors text-sm"
              >
                Add Your First Product
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.slice(0, 6).map((product) => (
                <div
                  key={product._id}
                  className="border border-brown-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square bg-brown-50 flex items-center justify-center relative">
                    <img
                      src={
                        product.images?.[0] || "https://via.placeholder.com/300"
                      }
                      alt={product.title}
                      className="w-full h-full object-contain p-3"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300";
                      }}
                    />
                    {!product.isAvailable && (
                      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                        <div className="text-center">
                          <span className="bg-red-500 text-white font-semibold px-3 py-1.5 rounded-lg block mb-1.5 text-xs">
                            DISABLED BY ADMIN
                          </span>
                          <span className="text-white text-xs">
                            Contact admin for details
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-0.5">
                      <h3 className="font-semibold text-brown-900 line-clamp-1 flex-1 text-sm">
                        {product.title}
                      </h3>
                      {!product.isAvailable && (
                        <span className="ml-2 px-1.5 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded">
                          Disabled
                        </span>
                      )}
                    </div>
                    <p className="text-brown-600 text-xs mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-base font-bold text-brown-900">
                        ₹{product.price.toLocaleString()}
                      </p>
                      <p className="text-xs text-brown-600">
                        Stock:{" "}
                        <span
                          className={`font-semibold ${
                            product.stock > 10
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {product.stock}
                        </span>
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/products/${product._id}`}
                        className="flex-1 text-center bg-brown-100 hover:bg-brown-200 text-brown-800 font-medium py-1.5 px-3 rounded-lg transition-colors text-xs"
                      >
                        View
                      </Link>
                      <Link
                        to={`/artisan/products/edit/${product._id}`}
                        className="flex-1 text-center bg-brown-700 hover:bg-brown-800 text-white font-medium py-1.5 px-3 rounded-lg transition-colors text-xs"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {products.length > 6 && (
            <div className="text-center mt-4">
              <Link
                to="/artisan/products"
                className="inline-block bg-brown-700 hover:bg-brown-800 text-white font-semibold py-2 px-5 rounded-lg transition-colors text-sm"
              >
                View All Products
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtisanDashboard;
