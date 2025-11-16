import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "pottery",
    price: "",
    materials: "",
    stock: "",
    images: [""],
    storyVideo: "",
    storyDescription: "",
    customizable: false,
    customizationOptions: "",
    isAvailable: true,
  });

  const categories = [
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
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setFetchLoading(true);
      const response = await axios.get(`/products/${id}`);

      if (response.data.success) {
        const product = response.data.data;
        setFormData({
          title: product.title || "",
          description: product.description || "",
          category: product.category || "pottery",
          price: product.price || "",
          materials: product.materials || "",
          stock: product.stock || "",
          images: product.images?.length > 0 ? product.images : [""],
          storyVideo: product.storyVideo || "",
          storyDescription: product.storyDescription || "",
          customizable: product.customizable || false,
          customizationOptions: product.customizationOptions || "",
          isAvailable:
            product.isAvailable !== undefined ? product.isAvailable : true,
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch product");
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ""] });
  };

  const removeImageField = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Filter out empty image URLs
      const cleanedData = {
        ...formData,
        images: formData.images.filter((img) => img.trim() !== ""),
        price: Number(formData.price),
        stock: Number(formData.stock),
      };

      const response = await axios.put(`/products/${id}`, cleanedData);

      if (response.data.success) {
        alert("Product updated successfully!");
        navigate("/artisan/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-brown-50 border-b border-brown-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-brown-900">Edit Product</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm p-5 border border-brown-200">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Basic Information */}
            <div className="space-y-3">
              <h2 className="text-base font-semibold text-brown-900">
                Basic Information
              </h2>

              <div>
                <label className="block text-xs font-medium text-brown-700 mb-1.5">
                  Product Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  maxLength="100"
                  className="w-full px-3 py-2 border border-brown-300 rounded-lg focus:ring-1 focus:ring-brown-600 focus:border-brown-600 text-sm"
                  placeholder="e.g., Handcrafted Ceramic Vase"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-brown-700 mb-1.5">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  maxLength="2000"
                  rows="4"
                  className="w-full px-3 py-2 border border-brown-300 rounded-lg focus:ring-1 focus:ring-brown-600 focus:border-brown-600 text-sm resize-none"
                  placeholder="Describe your product in detail..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-brown-700 mb-1.5">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-brown-300 rounded-lg focus:ring-1 focus:ring-brown-600 focus:border-brown-600 text-sm"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-brown-700 mb-1.5">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-brown-300 rounded-lg focus:ring-1 focus:ring-brown-600 focus:border-brown-600 text-sm"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-brown-700 mb-1.5">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-brown-300 rounded-lg focus:ring-1 focus:ring-brown-600 focus:border-brown-600 text-sm"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-brown-700 mb-1.5">
                  Materials Used
                </label>
                <input
                  type="text"
                  name="materials"
                  value={formData.materials}
                  onChange={handleChange}
                  maxLength="500"
                  className="w-full px-3 py-2 border border-brown-300 rounded-lg focus:ring-1 focus:ring-brown-600 focus:border-brown-600 text-sm"
                  placeholder="e.g., Clay, Natural colors, Wood"
                />
              </div>
            </div>

            {/* Product Images */}
            <div className="space-y-3">
              <h2 className="text-base font-semibold text-brown-900">
                Product Images (URLs)
              </h2>
              {formData.images.map((image, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 px-3 py-2 border border-brown-300 rounded-lg focus:ring-1 focus:ring-brown-600 focus:border-brown-600 text-sm"
                  />
                  {image && (
                    <img
                      src={image}
                      alt="Preview"
                      className="w-12 h-12 object-cover rounded border border-brown-300"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  )}
                  {formData.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm font-medium"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addImageField}
                className="bg-brown-100 text-brown-700 font-medium py-2 px-4 rounded-lg hover:bg-brown-200 transition-colors text-sm"
              >
                + Add More Images
              </button>
            </div>

            {/* Story Behind the Craft */}
            <div className="space-y-3">
              <h2 className="text-base font-semibold text-brown-900">
                Story Behind the Craft
              </h2>

              <div>
                <label className="block text-xs font-medium text-brown-700 mb-1.5">
                  Story Video URL
                </label>
                <input
                  type="url"
                  name="storyVideo"
                  value={formData.storyVideo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-brown-300 rounded-lg focus:ring-1 focus:ring-brown-600 focus:border-brown-600 text-sm"
                  placeholder="https://example.com/story-video.mp4"
                />
                {formData.storyVideo && (
                  <video
                    src={formData.storyVideo}
                    className="mt-2 w-full max-w-md rounded border border-brown-300"
                    controls
                    onError={(e) => (e.target.style.display = "none")}
                  />
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-brown-700 mb-1.5">
                  Story Description
                </label>
                <textarea
                  name="storyDescription"
                  value={formData.storyDescription}
                  onChange={handleChange}
                  maxLength="1000"
                  rows="4"
                  className="w-full px-3 py-2 border border-brown-300 rounded-lg focus:ring-1 focus:ring-brown-600 focus:border-brown-600 text-sm resize-none"
                  placeholder="Share the cultural story behind this craft..."
                />
              </div>
            </div>

            {/* Additional Options */}
            <div className="space-y-3">
              <h2 className="text-base font-semibold text-brown-900">
                Additional Options
              </h2>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="customizable"
                  id="customizable"
                  checked={formData.customizable}
                  onChange={handleChange}
                  className="w-4 h-4 text-brown-600 border-brown-300 rounded focus:ring-brown-600"
                />
                <label
                  htmlFor="customizable"
                  className="text-sm font-medium text-brown-700"
                >
                  Product is customizable
                </label>
              </div>

              {formData.customizable && (
                <div>
                  <label className="block text-xs font-medium text-brown-700 mb-1.5">
                    Customization Options
                  </label>
                  <textarea
                    name="customizationOptions"
                    value={formData.customizationOptions}
                    onChange={handleChange}
                    maxLength="500"
                    rows="3"
                    className="w-full px-3 py-2 border border-brown-300 rounded-lg focus:ring-1 focus:ring-brown-600 focus:border-brown-600 text-sm resize-none"
                    placeholder="Describe available customization options..."
                  />
                </div>
              )}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isAvailable"
                  id="isAvailable"
                  checked={formData.isAvailable}
                  onChange={handleChange}
                  className="w-4 h-4 text-brown-600 border-brown-300 rounded focus:ring-brown-600"
                />
                <label
                  htmlFor="isAvailable"
                  className="text-sm font-medium text-brown-700"
                >
                  Product is available for sale
                </label>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-brown-700 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-brown-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-1 text-sm"
              >
                {loading ? "Updating..." : "Update Product"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/artisan/dashboard")}
                className="bg-brown-100 text-brown-700 font-medium py-2.5 px-4 rounded-lg hover:bg-brown-200 transition-colors text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
