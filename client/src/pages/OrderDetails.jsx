import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "../utils/axios";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelling, setCancelling] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: "",
  });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [productReviews, setProductReviews] = useState({});

  useEffect(() => {
    fetchOrder();
  }, [id]);

  useEffect(() => {
    if (order && order.status === "Delivered") {
      checkExistingReviews();
    }
  }, [order]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/orders/${id}`);
      if (response.data.success) {
        setOrder(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load order");
    } finally {
      setLoading(false);
    }
  };

  const checkExistingReviews = async () => {
    if (!order) return;

    try {
      const reviews = {};
      for (const item of order.items) {
        if (item.product?._id) {
          const response = await axios.get(
            `/reviews/product/${item.product._id}/my-review`
          );
          if (response.data.success && response.data.data) {
            reviews[item.product._id] = response.data.data;
          }
        }
      }
      setProductReviews(reviews);
    } catch (err) {
      // Reviews might not exist, which is fine
      console.log("No existing reviews found");
    }
  };

  const openReviewModal = (item) => {
    const existingReview = productReviews[item.product._id];
    setSelectedProduct(item);
    if (existingReview) {
      setReviewData({
        rating: existingReview.rating,
        comment: existingReview.comment,
      });
    } else {
      setReviewData({
        rating: 5,
        comment: "",
      });
    }
    setShowReviewModal(true);
  };

  const closeReviewModal = () => {
    setShowReviewModal(false);
    setSelectedProduct(null);
    setReviewData({
      rating: 5,
      comment: "",
    });
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!reviewData.comment.trim()) {
      alert("Please write a review comment");
      return;
    }

    try {
      setSubmittingReview(true);
      const existingReview = productReviews[selectedProduct.product._id];

      let response;
      if (existingReview) {
        // Update existing review
        response = await axios.put(
          `/reviews/${existingReview._id}`,
          reviewData
        );
      } else {
        // Create new review
        response = await axios.post("/reviews", {
          product: selectedProduct.product._id,
          rating: reviewData.rating,
          comment: reviewData.comment,
          order: order._id,
        });
      }

      if (response.data.success) {
        alert(
          existingReview
            ? "Review updated successfully!"
            : "Review submitted successfully!"
        );
        closeReviewModal();
        checkExistingReviews(); // Refresh reviews
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!confirm("Are you sure you want to cancel this order?")) return;

    try {
      setCancelling(true);
      const response = await axios.put(`/orders/${id}/cancel`);
      if (response.data.success) {
        setOrder(response.data.data);
        alert("Order cancelled successfully");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel order");
    } finally {
      setCancelling(false);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-12 h-12 border-3 border-brown-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-12 h-12 border-3 border-brown-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-brown-600 text-sm">Loading order...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-brown-800 mb-2">
            Order Not Found
          </h2>
          <p className="text-brown-600 mb-4 text-sm">{error}</p>
          <Link
            to="/orders"
            className="inline-block bg-brown-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-brown-800 transition-colors text-sm"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-brown-50 border-b border-brown-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/orders"
            className="text-brown-600 hover:text-brown-800 font-medium mb-3 inline-flex items-center text-sm"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Orders
          </Link>
          <div className="flex items-center justify-between mt-2">
            <h1 className="text-xl sm:text-2xl font-bold text-brown-900">
              Order #{order._id.slice(-8).toUpperCase()}
            </h1>
            <span
              className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold border ${getStatusColor(
                order.status
              )}`}
            >
              {order.status}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Order Timeline */}
        <div className="bg-white rounded-lg border border-brown-200 p-5 mb-4 shadow-sm">
          <h2 className="text-lg font-bold text-brown-900 mb-4">
            Order Timeline
          </h2>

          <div className="relative">
            <div className="absolute left-5 top-0 h-full w-0.5 bg-brown-200"></div>

            <div className="space-y-6">
              {/* Placed */}
              <div className="relative flex items-start">
                <div
                  className={`z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    order.status !== "Cancelled"
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold text-brown-900 text-sm">
                    Order Placed
                  </h3>
                  <p className="text-brown-600 text-xs mt-0.5">
                    {new Date(order.orderDate).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              {/* Shipped */}
              <div className="relative flex items-start">
                <div
                  className={`z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    order.status === "Shipped" || order.status === "Delivered"
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                >
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
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold text-brown-900 text-sm">
                    Shipped
                  </h3>
                  <p className="text-brown-600 text-xs mt-0.5">
                    {order.status === "Shipped" || order.status === "Delivered"
                      ? "In transit"
                      : "Pending"}
                  </p>
                </div>
              </div>

              {/* Delivered */}
              <div className="relative flex items-start">
                <div
                  className={`z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    order.status === "Delivered"
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold text-brown-900 text-sm">
                    Delivered
                  </h3>
                  <p className="text-brown-600 text-xs mt-0.5">
                    {order.deliveryDate
                      ? new Date(order.deliveryDate).toLocaleString("en-IN")
                      : "Estimated in 3-5 days"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-brown-200 p-5 shadow-sm">
              <h2 className="text-lg font-bold text-brown-900 mb-4">
                Order Items
              </h2>

              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 pb-4 border-b border-brown-200 last:border-0 last:pb-0"
                  >
                    <Link to={`/products/${item.product?._id}`}>
                      <img
                        src={
                          item.product?.images?.[0] ||
                          "https://via.placeholder.com/120"
                        }
                        alt={item.title}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-lg border border-brown-200 bg-brown-50 p-2 flex-shrink-0"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/120";
                        }}
                      />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/products/${item.product?._id}`}
                        className="text-base font-semibold text-brown-900 hover:text-brown-700 mb-1 block line-clamp-2"
                      >
                        {item.title}
                      </Link>

                      <p className="text-brown-600 text-xs mb-1">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-brown-600 text-xs mb-2">
                        Price: ₹{item.price.toLocaleString()} each
                      </p>

                      <p className="text-lg font-bold text-brown-900">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>

                      {/* Review Button for Delivered Orders */}
                      {order.status === "Delivered" && (
                        <div className="mt-3">
                          {productReviews[item.product?._id] ? (
                            <button
                              onClick={() => openReviewModal(item)}
                              className="bg-brown-100 hover:bg-brown-200 text-brown-800 font-medium py-1.5 px-3 rounded-lg transition-colors flex items-center gap-1.5 text-xs"
                            >
                              <svg
                                className="w-4 h-4 text-yellow-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              Edit Review
                            </button>
                          ) : (
                            <button
                              onClick={() => openReviewModal(item)}
                              className="bg-brown-700 hover:bg-brown-800 text-white font-medium py-1.5 px-3 rounded-lg transition-colors flex items-center gap-1.5 text-xs"
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
                                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                />
                              </svg>
                              Write Review
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary & Shipping */}
          <div className="lg:col-span-1 space-y-4">
            {/* Shipping Address */}
            <div className="bg-white rounded-lg border border-brown-200 p-4 shadow-sm">
              <h3 className="text-base font-bold text-brown-900 mb-3">
                Shipping Address
              </h3>
              <div className="text-brown-700 text-sm">
                <p className="font-semibold">
                  {order.shippingAddress.fullName}
                </p>
                <p className="text-xs">{order.shippingAddress.phone}</p>
                <p className="mt-2 text-xs">{order.shippingAddress.address}</p>
                <p className="text-xs">
                  {order.shippingAddress.city}, {order.shippingAddress.state}
                </p>
                <p className="text-xs">{order.shippingAddress.pincode}</p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg border border-brown-200 p-4 shadow-sm">
              <h3 className="text-base font-bold text-brown-900 mb-3">
                Order Summary
              </h3>

              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-brown-700 text-sm">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    ₹{order.totalAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-brown-700 text-sm">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="border-t border-brown-200 pt-2">
                  <div className="flex justify-between text-lg font-bold text-brown-900">
                    <span>Total</span>
                    <span>₹{order.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-2.5 mb-3">
                <p className="text-green-800 font-medium text-xs flex items-center gap-1.5">
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
                  Payment Completed
                </p>
              </div>

              {order.status === "Placed" && (
                <button
                  onClick={handleCancelOrder}
                  disabled={cancelling}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {cancelling ? "Cancelling..." : "Cancel Order"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-brown-200 px-5 py-3 flex items-center justify-between">
              <h2 className="text-lg font-bold text-brown-900">
                {productReviews[selectedProduct.product._id]
                  ? "Edit Review"
                  : "Write Review"}
              </h2>
              <button
                onClick={closeReviewModal}
                className="text-brown-600 hover:text-brown-800 transition-colors"
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

            <div className="p-5">
              {/* Product Info */}
              <div className="flex gap-3 mb-4 p-3 bg-brown-50 rounded-lg">
                <img
                  src={
                    selectedProduct.product?.images?.[0] ||
                    "https://via.placeholder.com/80"
                  }
                  alt={selectedProduct.title}
                  className="w-16 h-16 object-contain rounded-lg border border-brown-200 flex-shrink-0"
                />
                <div>
                  <h3 className="font-semibold text-brown-900 text-sm">
                    {selectedProduct.title}
                  </h3>
                  <p className="text-brown-600 text-xs">
                    ₹{selectedProduct.price.toLocaleString()}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmitReview}>
                {/* Star Rating */}
                <div className="mb-4">
                  <label className="block text-brown-800 font-semibold mb-2 text-sm">
                    Your Rating <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-1.5 items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setReviewData({ ...reviewData, rating: star })
                        }
                        className="transition-transform hover:scale-110"
                      >
                        <svg
                          className={`w-8 h-8 ${
                            star <= reviewData.rating
                              ? "text-yellow-500 fill-current"
                              : "text-gray-300"
                          }`}
                          fill={
                            star <= reviewData.rating ? "currentColor" : "none"
                          }
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
                      </button>
                    ))}
                    <span className="ml-2 text-sm font-semibold text-brown-900">
                      {reviewData.rating}{" "}
                      {reviewData.rating === 1 ? "Star" : "Stars"}
                    </span>
                  </div>
                </div>

                {/* Review Comment */}
                <div className="mb-4">
                  <label className="block text-brown-800 font-semibold mb-1.5 text-sm">
                    Your Review <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={reviewData.comment}
                    onChange={(e) =>
                      setReviewData({ ...reviewData, comment: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-brown-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-brown-600 focus:border-brown-600 resize-none text-sm"
                    rows="4"
                    placeholder="Share your experience with this product..."
                    required
                  ></textarea>
                  <p className="text-xs text-brown-600 mt-1">
                    {reviewData.comment.length} / 500 characters
                  </p>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={closeReviewModal}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2.5 px-4 rounded-lg transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingReview || !reviewData.comment.trim()}
                    className="flex-1 bg-brown-700 hover:bg-brown-800 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {submittingReview
                      ? "Submitting..."
                      : productReviews[selectedProduct.product._id]
                      ? "Update Review"
                      : "Submit Review"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
