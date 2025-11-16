import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axios";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    isAvailable: "",
    artisan: "",
  });
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    outOfStock: 0,
  });

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.search) params.append("search", filters.search);
      if (filters.category) params.append("category", filters.category);
      if (filters.isAvailable !== "")
        params.append("isAvailable", filters.isAvailable);

      const response = await axios.get(`/products?${params.toString()}`);
      if (response.data.success) {
        // Handle different response structures
        let productsData = [];
        if (Array.isArray(response.data.data)) {
          productsData = response.data.data;
        } else if (Array.isArray(response.data.products)) {
          productsData = response.data.products;
        } else if (
          response.data.data?.products &&
          Array.isArray(response.data.data.products)
        ) {
          productsData = response.data.data.products;
        }

        setProducts(productsData);

        // Calculate stats
        setStats({
          totalProducts: productsData.length,
          activeProducts: productsData.filter((p) => p.isAvailable).length,
          outOfStock: productsData.filter((p) => p.stock === 0).length,
        });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId, productTitle) => {
    if (
      !confirm(
        `Are you sure you want to delete "${productTitle}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      const response = await axios.delete(`/products/${productId}`);
      if (response.data.success) {
        alert("Product deleted successfully");
        fetchProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert(error.response?.data?.message || "Error deleting product");
    }
  };

  const handleToggleAvailability = async (productId, currentStatus) => {
    try {
      const response = await axios.put(`/products/${productId}`, {
        isAvailable: !currentStatus,
      });
      if (response.data.success) {
        alert(
          `Product ${!currentStatus ? "activated" : "deactivated"} successfully`
        );
        fetchProducts();
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert(error.response?.data?.message || "Error updating product");
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
                Product Management
              </h1>
              <p className="text-brown-600 mt-1 text-sm">
                Monitor and manage all products on the platform
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
              <div className="bg-brown-100 p-2 rounded">
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
                  Active Products
                </p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  {stats.activeProducts}
                </p>
              </div>
              <div className="bg-green-100 p-2 rounded">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border border-brown-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-brown-600 text-xs font-medium">
                  Out of Stock
                </p>
                <p className="text-2xl font-bold text-red-600 mt-1">
                  {stats.outOfStock}
                </p>
              </div>
              <div className="bg-red-100 p-2 rounded">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 border border-brown-200 mb-4">
          <h2 className="text-base font-semibold text-brown-900 mb-3">
            Filters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-brown-700 mb-1.5">
                Search
              </label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
                placeholder="Search by title, artisan..."
                className="w-full px-3 py-2 border border-brown-300 rounded-lg focus:ring-1 focus:ring-brown-600 focus:border-brown-600 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-brown-700 mb-1.5">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value })
                }
                className="w-full px-3 py-2 border border-brown-300 rounded-lg focus:ring-1 focus:ring-brown-600 focus:border-brown-600 text-sm"
              >
                <option value="">All Categories</option>
                <option value="Pottery">Pottery</option>
                <option value="Textiles">Textiles</option>
                <option value="Jewelry">Jewelry</option>
                <option value="Wood Craft">Wood Craft</option>
                <option value="Metal Craft">Metal Craft</option>
                <option value="Paintings">Paintings</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-brown-700 mb-1.5">
                Availability
              </label>
              <select
                value={filters.isAvailable}
                onChange={(e) =>
                  setFilters({ ...filters, isAvailable: e.target.value })
                }
                className="w-full px-3 py-2 border border-brown-300 rounded-lg focus:ring-1 focus:ring-brown-600 focus:border-brown-600 text-sm"
              >
                <option value="">All Status</option>
                <option value="true">Available</option>
                <option value="false">Unavailable</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="bg-white rounded-lg shadow-sm border border-brown-200 p-4">
          <h2 className="text-lg font-semibold text-brown-900 mb-4">
            All Products
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-12 h-12 border-3 border-brown-600 border-t-transparent rounded-full mx-auto"></div>
              <p className="text-brown-600 mt-4 text-sm">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
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
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <p className="text-brown-600 text-sm">No products found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
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
                      className="w-full h-full object-contain p-4"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300";
                      }}
                    />
                    {!product.isAvailable && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="bg-red-500 text-white font-semibold px-3 py-1.5 rounded-lg text-xs">
                          UNAVAILABLE
                        </span>
                      </div>
                    )}
                    {product.stock === 0 && product.isAvailable && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        OUT OF STOCK
                      </div>
                    )}
                  </div>

                  <div className="p-3">
                    <h3 className="font-semibold text-brown-900 mb-0.5 line-clamp-1 text-sm">
                      {product.title}
                    </h3>
                    <p className="text-xs text-brown-600 mb-2">
                      by {product.artisan?.firstName || "Unknown"}{" "}
                      {product.artisan?.lastName || ""}
                    </p>
                    <p className="text-brown-600 text-xs mb-2 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between mb-2">
                      <p className="text-lg font-bold text-brown-900">
                        ₹{product.price?.toLocaleString()}
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

                    <div className="flex gap-2 mb-2">
                      <Link
                        to={`/products/${product._id}`}
                        className="flex-1 text-center bg-brown-100 hover:bg-brown-200 text-brown-800 font-medium py-1.5 px-3 rounded-lg transition-colors text-xs"
                      >
                        View
                      </Link>
                      <button
                        onClick={() =>
                          handleToggleAvailability(
                            product._id,
                            product.isAvailable
                          )
                        }
                        className={`flex-1 font-medium py-1.5 px-3 rounded-lg transition-colors text-xs ${
                          product.isAvailable
                            ? "bg-red-100 hover:bg-red-200 text-red-700"
                            : "bg-green-100 hover:bg-green-200 text-green-700"
                        }`}
                      >
                        {product.isAvailable ? "Disable" : "Enable"}
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        handleDeleteProduct(product._id, product.title)
                      }
                      className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-1.5 px-3 rounded-lg transition-colors text-xs"
                    >
                      Delete Product
                    </button>
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

export default AdminProducts;
