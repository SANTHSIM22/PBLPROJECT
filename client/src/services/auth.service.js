import api from "../utils/axios";

// Register user
export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  if (response.data.success && response.data.data.token) {
    localStorage.setItem("token", response.data.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.data.user));
  }
  return response.data;
};

// Login user
export const login = async (credentials) => {
  console.log("🔐 Sending login request:", credentials);
  const response = await api.post("/auth/login", credentials);
  console.log("📥 Login response:", response.data);
  if (response.data.success && response.data.data.token) {
    localStorage.setItem("token", response.data.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.data.user));
  }
  return response.data;
};

// Logout user
export const logout = async () => {
  try {
    await api.post("/auth/logout");
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};

// Get current user
export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

// Change password
export const changePassword = async (passwordData) => {
  const response = await api.put("/auth/change-password", passwordData);
  return response.data;
};
