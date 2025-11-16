import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "../utils/axios";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [inWishlist, setInWishlist] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  useEffect(() => {
    fetchProduct();
    checkWishlist();
    fetchReviews();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/products/${id}`);
      if (response.data.success) {
        setProduct(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      setReviewsLoading(true);
      const response = await axios.get(`/reviews/product/${id}`);
      if (response.data.success) {
        setReviews(response.data.data || []);
      }
    } catch (err) {
      console.error("Failed to load reviews:", err);
      setReviews([]);
    } finally {
      setReviewsLoading(false);
    }
  };

  const checkWishlist = async () => {
    try {
      const response = await axios.get(`/wishlist/check/${id}`);
      if (response.data.success) {
        setInWishlist(response.data.data.inWishlist);
      }
    } catch (err) {
      // User might not be logged in
      setInWishlist(false);
    }
  };

  const toggleWishlist = async () => {
    try {
      const response = await axios.post("/wishlist/toggle", { productId: id });
      if (response.data.success) {
        setInWishlist(response.data.inWishlist);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      } else {
        alert(err.response?.data?.message || "Failed to update wishlist");
      }
    }
  };

  const addToCart = async () => {
    try {
      const response = await axios.post("/cart/add", {
        productId: id,
        quantity,
      });
      if (response.data.success) {
        alert("Product added to cart!");
        navigate("/cart");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      } else {
        alert(err.response?.data?.message || "Failed to add to cart");
      }
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
          <p className="mt-4 text-brown-600 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-16 h-16 bg-gradient-to-br from-brown-600 to-brown-700 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg
              className="w-8 h-8 text-white"
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
          <h2 className="text-xl font-bold text-brown-900 mb-2">
            Product Not Found
          </h2>
          <p className="text-brown-600 mb-6 text-sm">{error}</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-brown-700 to-brown-800 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:shadow-lg transition-all no-underline"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

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

      {/* Breadcrumb */}
      <div className="bg-brown-50 border-b border-brown-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-xs text-brown-600">
            <Link to="/" className="hover:text-brown-900 transition-colors">
              Home
            </Link>
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <Link
              to="/products"
              className="hover:text-brown-900 transition-colors"
            >
              Products
            </Link>
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="text-brown-900 font-medium capitalize">
              {product.category}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
          {/* Product Images */}
          <div>
            {/* Main Image */}
            <div className="bg-white rounded-lg border border-brown-200 overflow-hidden mb-4 shadow-sm hover:shadow-md transition-shadow">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[selectedImage]}
                  alt={product.title}
                  className="w-full h-[280px] sm:h-[350px] lg:h-[420px] object-contain p-4"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/800x600?text=No+Image";
                  }}
                />
              ) : (
                <div className="w-full h-[280px] sm:h-[350px] lg:h-[420px] flex items-center justify-center bg-brown-50">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-brown-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <svg
                        className="w-8 h-8 text-white"
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
                    <p className="text-brown-600 text-sm">No Image Available</p>
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-md overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-brown-600 shadow-md"
                        : "border-brown-200 hover:border-brown-500"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-14 sm:h-16 object-contain p-1"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/100?text=Image";
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="bg-white rounded-lg border border-brown-200 p-5 shadow-sm">
              <h1 className="text-xl sm:text-2xl font-bold text-brown-900 mb-3 leading-tight">
                {product.title}
              </h1>

              {/* Category and Status Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-brown-700 text-white rounded-md text-xs font-semibold capitalize flex items-center gap-1.5">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  {product.category}
                </span>
                {product.customizable && (
                  <span className="px-3 py-1 bg-amber-600 text-white rounded-md text-xs font-semibold flex items-center gap-1.5">
                    <svg
                      className="w-3 h-3"
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
                    Customizable
                  </span>
                )}
                {!product.isAvailable && (
                  <span className="px-3 py-1 bg-red-600 text-white rounded-md text-xs font-semibold flex items-center gap-1.5">
                    <svg
                      className="w-3 h-3"
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
                    Sold Out
                  </span>
                )}
              </div>

              {/* Rating */}
              {product.ratings && product.ratings.count > 0 && (
                <div className="flex items-center gap-3 mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-4 h-4 ${
                          star <= Math.round(product.ratings.average)
                            ? "text-yellow-500 fill-current"
                            : "text-brown-300"
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-brown-900 font-bold text-base">
                      {product.ratings.average.toFixed(1)}
                    </span>
                    <span className="text-brown-600 text-xs">
                      ({product.ratings.count}{" "}
                      {product.ratings.count === 1 ? "review" : "reviews"})
                    </span>
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="mb-4 p-4 bg-brown-50 rounded-lg border border-brown-200">
                <p className="text-brown-600 text-xs font-semibold uppercase mb-1">
                  Price
                </p>
                <div className="text-2xl sm:text-3xl font-bold text-brown-900 mb-2">
                  ₹{product.price.toLocaleString()}
                </div>
                {product.stock > 0 ? (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-green-700 font-medium text-sm">
                      In Stock ({product.stock} available)
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <p className="text-red-700 font-medium text-sm">
                      Out of Stock
                    </p>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-4 pb-4 border-b border-brown-100">
                <h3 className="text-sm font-semibold text-brown-900 mb-2 flex items-center gap-2">
                  <div className="w-1 h-4 bg-brown-600 rounded-full"></div>
                  Description
                </h3>
                <p className="text-brown-700 text-sm leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              {/* Materials */}
              {product.materials && (
                <div className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b-2 border-brown-100">
                  <h3 className="text-xl sm:text-2xl font-bold text-brown-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                    <div className="w-1 sm:w-1.5 h-6 sm:h-7 bg-gradient-to-b from-brown-700 via-brown-600 to-brown-500 rounded-full"></div>
                    Materials Used
                  </h3>
                  <p className="text-brown-700 text-base leading-relaxed">
                    {product.materials}
                  </p>
                </div>
              )}

              {/* Customization Options */}
              {product.customizable && product.customizationOptions && (
                <div className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b-2 border-brown-100">
                  <h3 className="text-xl sm:text-2xl font-bold text-brown-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                    <div className="w-1 sm:w-1.5 h-6 sm:h-7 bg-gradient-to-b from-brown-700 via-brown-600 to-brown-500 rounded-full"></div>
                    Customization Options
                  </h3>
                  <p className="text-brown-700 text-base leading-relaxed">
                    {product.customizationOptions}
                  </p>
                </div>
              )}

              {/* Dimensions */}
              {product.dimensions &&
                (product.dimensions.length ||
                  product.dimensions.width ||
                  product.dimensions.height) && (
                  <div className="mb-6 sm:mb-8 lg:mb-10 pb-6 sm:pb-8 border-b-2 border-brown-100">
                    <h3 className="text-xl sm:text-2xl font-bold text-brown-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                      <div className="w-1 sm:w-1.5 h-6 sm:h-7 bg-gradient-to-b from-brown-700 via-brown-600 to-brown-500 rounded-full"></div>
                      Dimensions
                    </h3>
                    <p className="text-brown-700 font-mono text-xl">
                      {product.dimensions.length &&
                        `L: ${product.dimensions.length}${product.dimensions.unit}`}
                      {product.dimensions.width &&
                        ` × W: ${product.dimensions.width}${product.dimensions.unit}`}
                      {product.dimensions.height &&
                        ` × H: ${product.dimensions.height}${product.dimensions.unit}`}
                    </p>
                  </div>
                )}

              {/* Quantity Selector */}
              {product.isAvailable && product.stock > 0 && (
                <div className="mb-6 sm:mb-8">
                  <label className="block text-brown-900 font-bold mb-3 sm:mb-4 text-base sm:text-lg">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3 sm:gap-6">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl border-2 border-brown-400 bg-gradient-to-br from-white to-brown-50/30 text-brown-800 font-bold hover:bg-brown-100 hover:border-brown-700 transition-all hover:shadow-xl flex items-center justify-center text-xl sm:text-2xl"
                    >
                      −
                    </button>
                    <span className="w-16 sm:w-24 text-center font-bold text-2xl sm:text-3xl text-brown-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity(Math.min(product.stock, quantity + 1))
                      }
                      className="w-9 h-9 rounded-lg border border-brown-300 bg-white text-brown-700 font-semibold hover:bg-brown-50 hover:border-brown-600 transition-all flex items-center justify-center text-lg"
                    >
                      +
                    </button>
                    <span className="text-brown-600 text-xs">
                      ({product.stock} available)
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={addToCart}
                  disabled={!product.isAvailable || product.stock === 0}
                  className="flex-1 bg-gradient-to-r from-brown-800 via-brown-700 to-brown-900 text-white font-bold py-4 sm:py-5 px-6 sm:px-8 rounded-xl sm:rounded-2xl hover:from-brown-900 hover:to-brown-950 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Add to Cart
                </button>
                <button
                  onClick={toggleWishlist}
                  className={`sm:w-auto border-2 font-bold py-4 sm:py-5 px-6 sm:px-8 rounded-xl sm:rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3 ${
                    inWishlist
                      ? "bg-gradient-to-r from-red-500 via-red-600 to-red-700 border-red-600 text-white hover:from-red-600 hover:to-red-800"
                      : "bg-gradient-to-br from-white to-brown-50/30 border-brown-600 text-brown-700 hover:bg-brown-100"
                  }`}
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill={inWishlist ? "currentColor" : "none"}
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
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Story Behind the Craft */}
        {product.storyDescription && (
          <div className="bg-gradient-to-br from-white via-orange-50/20 to-brown-50/40 rounded-2xl sm:rounded-3xl border-2 border-brown-200/60 p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12 shadow-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brown-900 mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4">
              <div className="w-1.5 sm:w-2 h-8 sm:h-10 bg-gradient-to-b from-brown-700 via-brown-600 to-brown-500 rounded-full"></div>
              Story Behind the Craft
            </h2>

            <p className="text-brown-700 text-base sm:text-lg leading-relaxed whitespace-pre-line">
              {product.storyDescription}
            </p>
          </div>
        )}

        <div className="bg-gradient-to-br from-white via-orange-50/20 to-brown-50/40 rounded-2xl sm:rounded-3xl border-2 border-brown-200/60 p-6 sm:p-8 lg:p-10 shadow-2xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brown-900 mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4">
            <div className="w-1.5 sm:w-2 h-8 sm:h-10 bg-gradient-to-b from-brown-700 via-brown-600 to-brown-500 rounded-full"></div>
            Customer Reviews
          </h2>

          {reviewsLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin w-12 h-12 border-4 border-brown-600 border-t-transparent rounded-full mx-auto"></div>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-brown-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-brown-900 mb-1">
                No reviews yet
              </h3>
              <p className="text-brown-600 text-sm">
                Be the first to review this product!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="border-b border-brown-100 pb-4 last:border-0"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={
                        review.customer?.profile?.avatar ||
                        `https://ui-avatars.com/api/?name=${
                          review.customer?.username || "User"
                        }&background=8B4513&color=fff`
                      }
                      alt={review.customer?.username}
                      className="w-10 h-10 rounded-lg border border-brown-200"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-brown-900 text-sm">
                            {review.customer?.username || "Anonymous"}
                            {review.verified && (
                              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
                                Verified
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-brown-600">
                            {new Date(review.createdAt).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "text-yellow-500 fill-current"
                                  : "text-brown-200"
                              }`}
                              fill={i < review.rating ? "currentColor" : "none"}
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                              />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-brown-700 leading-relaxed text-sm">
                        {review.comment}
                      </p>

                      {review.images && review.images.length > 0 && (
                        <div className="flex gap-2 mt-2">
                          {review.images.map((img, index) => (
                            <img
                              key={index}
                              src={img}
                              alt={`Review ${index + 1}`}
                              className="w-16 h-16 object-cover rounded-lg border border-brown-200"
                            />
                          ))}
                        </div>
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

export default ProductDetails;
