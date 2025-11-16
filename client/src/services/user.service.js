import api from "../utils/axios";

// Get user profile
export const getUserProfile = async (userId) => {
  const response = await api.get(`/users/profile/${userId}`);
  return response.data;
};

// Update user profile
export const updateProfile = async (profileData) => {
  const response = await api.put("/users/profile", profileData);
  if (response.data.success) {
    localStorage.setItem("user", JSON.stringify(response.data.data.user));
  }
  return response.data;
};

// Update avatar
export const updateAvatar = async (avatarUrl) => {
  const response = await api.put("/users/avatar", { avatar: avatarUrl });
  if (response.data.success) {
    const user = JSON.parse(localStorage.getItem("user"));
    user.profile.avatar = avatarUrl;
    localStorage.setItem("user", JSON.stringify(user));
  }
  return response.data;
};

// Delete account
export const deleteAccount = async () => {
  const response = await api.delete("/users/account");
  if (response.data.success) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
  return response.data;
};

// Get all users (Admin only)
export const getAllUsers = async (params) => {
  const response = await api.get("/users", { params });
  return response.data;
};
