import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "../utils/axios";

const ArtisanProfile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    avatar: "",
    bio: "",
    craftType: "",
    location: "",
    portfolioImages: [""],
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.profile?.firstName || user.firstName || "",
        lastName: user.profile?.lastName || user.lastName || "",
        phone: user.profile?.phone || user.phone || "",
        avatar: user.profile?.avatar || user.avatar || "",
        bio: user.profile?.bio || user.bio || "",
        craftType: user.artisanProfile?.craftType || "",
        location: user.artisanProfile?.location || "",
        portfolioImages:
          user.artisanProfile?.portfolioImages?.length > 0
            ? user.artisanProfile.portfolioImages
            : [""],
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePortfolioChange = (index, value) => {
    const newPortfolio = [...formData.portfolioImages];
    newPortfolio[index] = value;
    setFormData({ ...formData, portfolioImages: newPortfolio });
  };

  const addPortfolioField = () => {
    setFormData({
      ...formData,
      portfolioImages: [...formData.portfolioImages, ""],
    });
  };

  const removePortfolioField = (index) => {
    const newPortfolio = formData.portfolioImages.filter((_, i) => i !== index);
    setFormData({ ...formData, portfolioImages: newPortfolio });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const cleanedData = {
        profile: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          avatar: formData.avatar,
          bio: formData.bio,
        },
        artisanProfile: {
          craftType: formData.craftType,
          location: formData.location,
          portfolioImages: formData.portfolioImages.filter(
            (img) => img.trim() !== ""
          ),
        },
      };

      const response = await axios.put("/users/profile", cleanedData);

      if (response.data.success) {
        setSuccess("Profile updated successfully!");
        // Update user in context
        if (updateUser) {
          updateUser(response.data.data);
        }
        setTimeout(() => {
          navigate("/artisan/dashboard");
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-brown-50 border-b border-brown-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-brown-900">Artisan Profile</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm p-5 border border-brown-200">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Personal Information */}
            <div className="space-y-3">
              <h2 className="text-base font-semibold text-brown-900">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-brown-700 mb-1.5">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-brown-300 rounded-lg focus:ring-1 focus:ring-brown-600 focus:border-brown-600 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-brown-700 mb-1.5">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-brown-300 rounded-lg focus:ring-1 focus:ring-brown-600 focus:border-brown-600 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-brown-700 mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  pattern="[6-9]\d{9}"
                  className="w-full px-3 py-2 border border-brown-300 rounded-lg focus:ring-1 focus:ring-brown-600 focus:border-brown-600 text-sm"
                  placeholder="10-digit mobile number"
                />
                <p className="text-xs text-brown-600 mt-1">
                  Enter Indian mobile number (10 digits, starting with 6-9)
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-brown-700 mb-1.5">
                  Avatar URL
                </label>
                <input
                  type="url"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-brown-300 rounded-lg focus:ring-1 focus:ring-brown-600 focus:border-brown-600 text-sm"
                  placeholder="https://example.com/avatar.jpg"
                />
                {formData.avatar && (
                  <img
                    src={formData.avatar}
                    alt="Avatar Preview"
                    className="mt-2 w-20 h-20 rounded-full object-cover border border-brown-300"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-brown-700 mb-1.5">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  maxLength="500"
                  rows="4"
                  className="w-full px-3 py-2 border border-brown-300 rounded-lg focus:ring-1 focus:ring-brown-600 focus:border-brown-600 text-sm resize-none"
                  placeholder="Tell us about yourself and your craft..."
                />
                <p className="text-xs text-brown-600 mt-1">
                  {formData.bio.length}/500 characters
                </p>
              </div>
            </div>

            {/* Artisan Details */}
            <div className="space-y-3">
              <h2 className="text-base font-semibold text-brown-900">
                Artisan Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-brown-700 mb-1.5">
                    Craft Type *
                  </label>
                  <input
                    type="text"
                    name="craftType"
                    value={formData.craftType}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-brown-300 rounded-lg focus:ring-1 focus:ring-brown-600 focus:border-brown-600 text-sm"
                    placeholder="e.g., Pottery, Weaving, Jewelry"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-brown-700 mb-1.5">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-brown-300 rounded-lg focus:ring-1 focus:ring-brown-600 focus:border-brown-600 text-sm"
                    placeholder="e.g., Mumbai, Maharashtra"
                  />
                </div>
              </div>
            </div>

            {/* Portfolio Images */}
            <div className="space-y-3">
              <h2 className="text-base font-semibold text-brown-900">
                Portfolio Images
              </h2>
              <p className="text-xs text-brown-600">
                Showcase your best work with image URLs
              </p>

              {formData.portfolioImages.map((image, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={image}
                      onChange={(e) =>
                        handlePortfolioChange(index, e.target.value)
                      }
                      placeholder="https://example.com/portfolio-image.jpg"
                      className="flex-1 px-3 py-2 border border-brown-300 rounded-lg focus:ring-1 focus:ring-brown-600 focus:border-brown-600 text-sm"
                    />
                    {formData.portfolioImages.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePortfolioField(index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm font-medium"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  {image && (
                    <img
                      src={image}
                      alt={`Portfolio ${index + 1}`}
                      className="w-full max-w-md h-40 object-cover rounded border border-brown-300"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addPortfolioField}
                className="bg-brown-100 text-brown-700 font-medium py-2 px-4 rounded-lg hover:bg-brown-200 transition-colors text-sm"
              >
                + Add More Portfolio Images
              </button>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-brown-700 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-brown-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-1 text-sm"
              >
                {loading ? "Updating..." : "Update Profile"}
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

export default ArtisanProfile;
