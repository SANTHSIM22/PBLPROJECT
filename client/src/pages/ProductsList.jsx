import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axios";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "",
    search: "",
    minPrice: "",
    maxPrice: "",
    sort: "-createdAt",
  });

  const categories = [
    { value: "", label: "All Categories" },
    { value: "pottery", label: "Pottery" },
    { value: "textiles", label: "Textiles" },
    { value: "jewelry", label: "Jewelry" },
    { value: "woodwork", label: "Woodwork" },
    { value: "metalwork", label: "Metalwork" },
    { value: "paintings", label: "Paintings" },
    { value: "sculptures", label: "Sculptures" },
    { value: "handicrafts", label: "Handicrafts" },
    { value: "other", label: "Other" },
  ];

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.category) params.append("category", filters.category);
      if (filters.search) params.append("search", filters.search);
      if (filters.minPrice) params.append("minPrice", filters.minPrice);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
      if (filters.sort) params.append("sort", filters.sort);

      const response = await axios.get(`/products?${params.toString()}`);
      if (response.data.success) {
        setProducts(response.data.data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%238B4513" fill-opacity="1"%3E%3Cpath d="M0 0h40v40H0V0zm40 40h40v40H40V40z" /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        ></div>
      </div>

      {/* Header */}
      <div className="relative bg-gradient-to-br from-brown-700 via-brown-600 to-brown-800 text-white overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brown-900/20 rounded-full -ml-32 -mb-32"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-4">
              <div className="w-1.5 h-1.5 bg-brown-200 rounded-full animate-pulse"></div>
              <p className="text-brown-100 text-xs font-semibold tracking-wider m-0">
                ARTISAN MARKETPLACE
              </p>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-brown-100 bg-clip-text text-transparent">
              Browse Products
            </h1>
            <p className="text-brown-100 text-lg leading-relaxed">
              Discover authentic handmade crafts from local artisans
            </p>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-brown-200/50 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-brown-600 to-brown-700 rounded-xl flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-brown-900">
              Filter & Search
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div>
              <label className="block text-sm font-bold text-brown-700 mb-3 uppercase tracking-wide">
                Category
              </label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 border border-brown-300 rounded-xl focus:ring-2 focus:ring-brown-500 focus:border-brown-500 bg-white transition-all"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-brown-700 mb-3 uppercase tracking-wide">
                Min Price (₹)
              </label>
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="0"
                className="w-full px-4 py-3 border border-brown-300 rounded-xl focus:ring-2 focus:ring-brown-500 focus:border-brown-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-brown-700 mb-3 uppercase tracking-wide">
                Max Price (₹)
              </label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="10000"
                className="w-full px-4 py-3 border border-brown-300 rounded-xl focus:ring-2 focus:ring-brown-500 focus:border-brown-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-brown-700 mb-3 uppercase tracking-wide">
                Sort By
              </label>
              <select
                name="sort"
                value={filters.sort}
                onChange={handleFilterChange}
                className="w-full px-4 py-3 border border-brown-300 rounded-xl focus:ring-2 focus:ring-brown-500 focus:border-brown-500 bg-white transition-all"
              >
                <option value="-createdAt">Newest First</option>
                <option value="createdAt">Oldest First</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
                <option value="-ratings.average">Highest Rated</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-brown-700 mb-3 uppercase tracking-wide">
                Search
              </label>
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search products..."
                className="w-full px-4 py-3 border border-brown-300 rounded-xl focus:ring-2 focus:ring-brown-500 focus:border-brown-500 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-brown-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-20 h-20 border-4 border-brown-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="mt-6 text-brown-600 font-semibold">
              Loading products...
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="relative bg-white rounded-2xl shadow-lg p-12 sm:p-16 text-center border border-brown-200/50 overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-brown-50 to-transparent rounded-full -mr-32 -mt-32 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-brown-50 to-transparent rounded-full -ml-24 -mb-24 opacity-50"></div>

            <div className="relative">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-brown-600 to-brown-700 rounded-3xl blur-xl opacity-30"></div>
                <div className="relative w-24 h-24 bg-gradient-to-br from-brown-600 to-brown-700 rounded-3xl flex items-center justify-center shadow-2xl">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-brown-900 mb-3">
                No Products Found
              </h3>
              <p className="text-brown-600 text-base leading-relaxed max-w-md mx-auto">
                Try adjusting your filters or check back later for new arrivals
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link
                key={product._id}
                to={`/products/${product._id}`}
                className="group relative bg-white rounded-3xl shadow-xl border border-brown-200/50 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 no-underline"
              >
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brown-100/30 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Product Image */}
                <div className="relative h-72 bg-gradient-to-br from-brown-50 via-white to-brown-50/30 overflow-hidden">
                  {product.images && product.images.length > 0 ? (
                    <div className="relative w-full h-full p-6">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/400x400?text=No+Image";
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="w-24 h-24 text-brown-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-6 left-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-brown-600 rounded-2xl blur opacity-20"></div>
                      <div className="relative bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-2xl shadow-lg border border-brown-200/50">
                        <span className="text-brown-700 text-xs font-bold uppercase tracking-widest">
                          {product.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stock Badge */}
                  {!product.isAvailable && (
                    <div className="absolute top-6 right-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-red-600 rounded-2xl blur opacity-30"></div>
                        <div className="relative bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2.5 rounded-2xl text-xs font-bold shadow-xl">
                          Sold Out
                        </div>
                      </div>
                    </div>
                  )}
                  {product.stock > 0 &&
                    product.stock <= 5 &&
                    product.isAvailable && (
                      <div className="absolute top-6 right-6">
                        <div className="relative">
                          <div className="absolute inset-0 bg-orange-600 rounded-2xl blur opacity-30"></div>
                          <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2.5 rounded-2xl text-xs font-bold shadow-xl">
                            Only {product.stock} left
                          </div>
                        </div>
                      </div>
                    )}

                  {/* Customizable Badge */}
                  {product.customizable && (
                    <div className="absolute bottom-6 right-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-brown-600 rounded-2xl blur opacity-30"></div>
                        <div className="relative bg-gradient-to-r from-brown-600 to-brown-700 text-white px-5 py-2.5 rounded-2xl text-xs font-bold shadow-xl flex items-center gap-2">
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
                              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                            />
                          </svg>
                          <span>Customizable</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="relative p-6 bg-gradient-to-b from-white to-brown-50/30">
                  <h3 className="text-2xl font-bold text-brown-900 mb-4 line-clamp-2 min-h-[3.5rem] group-hover:text-brown-600 transition-colors">
                    {product.title}
                  </h3>

                  {/* Rating */}
                  <div className="mb-4 pb-4 border-b-2 border-brown-100">
                    {product.ratings && product.ratings.count > 0 ? (
                      <div className="flex items-center gap-4">
                        <div className="flex gap-1.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`w-6 h-6 ${
                                star <= Math.round(product.ratings.average)
                                  ? "text-yellow-400 fill-current"
                                  : "text-brown-200"
                              }`}
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                          ))}
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-brown-900 text-lg font-bold">
                            {product.ratings.average.toFixed(1)}
                          </span>
                          <span className="text-brown-500 text-sm">
                            ({product.ratings.count})
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className="w-6 h-6 text-brown-200"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price and Stock */}
                  <div className="flex items-center justify-between pt-4">
                    <div className="flex-1">
                      <p className="text-brown-600 text-sm font-semibold uppercase tracking-wide mb-1">
                        Price
                      </p>
                      <div className="text-3xl font-bold bg-gradient-to-r from-brown-800 to-brown-600 bg-clip-text text-transparent">
                        ₹{product.price.toLocaleString()}
                      </div>
                    </div>
                    {product.stock > 0 && product.isAvailable ? (
                      <div className="flex items-center gap-2 text-green-700 bg-gradient-to-r from-green-50 to-green-100 px-5 py-3 rounded-2xl border-2 border-green-200 shadow-sm">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm font-bold">In Stock</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-red-700 bg-gradient-to-r from-red-50 to-red-100 px-5 py-3 rounded-2xl border-2 border-red-200 shadow-sm">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm font-bold">Out of Stock</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
