import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "../utils/axios";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalArtisans: 0,
    totalCustomers: 0,
    verifiedArtisans: 0,
    activeUsers: 0,
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("users"); // 'users' or 'artisans'
  const [filters, setFilters] = useState({
    role: "",
    isActive: "",
    search: "",
  });

  useEffect(() => {
    fetchStats();
    fetchUsers();
  }, [filters]);

  const fetchStats = async () => {
    try {
      const response = await axios.get("/admin/stats");
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.role) params.append("role", filters.role);
      if (filters.isActive !== "") params.append("isActive", filters.isActive);
      if (filters.search) params.append("search", filters.search);

      const response = await axios.get(`/admin/users?${params.toString()}`);
      if (response.data.success) {
        setUsers(response.data.data.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async (userId, currentStatus) => {
    try {
      const response = await axios.put(`/admin/users/${userId}/status`, {
        isActive: !currentStatus,
      });
      if (response.data.success) {
        fetchUsers();
        fetchStats();
      }
    } catch (error) {
      console.error("Error updating user status:", error);
      alert(error.response?.data?.message || "Error updating user status");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (
      !confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      return;
    }
    try {
      const response = await axios.delete(`/admin/users/${userId}`);
      if (response.data.success) {
        fetchUsers();
        fetchStats();
        alert("User deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert(error.response?.data?.message || "Error deleting user");
    }
  };

  const handleRoleChange = async (userId, currentRole) => {
    const newRole = currentRole === "artisan" ? "customer" : "artisan";
    if (!confirm(`Change user role from ${currentRole} to ${newRole}?`)) {
      return;
    }
    try {
      const response = await axios.put(`/admin/users/${userId}/role`, {
        role: newRole,
      });
      if (response.data.success) {
        fetchUsers();
        fetchStats();
        alert("User role updated successfully");
      }
    } catch (error) {
      console.error("Error updating user role:", error);
      alert(error.response?.data?.message || "Error updating user role");
    }
  };

  const handleVerifyArtisan = async (userId, currentStatus) => {
    const action = currentStatus ? "unverify" : "verify";
    if (!confirm(`Are you sure you want to ${action} this artisan?`)) {
      return;
    }
    try {
      const response = await axios.put(`/admin/artisans/${userId}/verify`, {
        isVerified: !currentStatus,
      });
      if (response.data.success) {
        fetchUsers();
        fetchStats();
        alert(`Artisan ${action}ied successfully`);
      }
    } catch (error) {
      console.error("Error verifying artisan:", error);
      alert(error.response?.data?.message || "Error verifying artisan");
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
                Admin Dashboard
              </h1>
              <p className="text-brown-600 mt-1 text-sm">
                Welcome back, {user?.firstName}!
              </p>
            </div>
            <div className="flex items-center">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Administrator
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-brown-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-brown-600 text-xs font-medium">
                  Total Users
                </p>
                <p className="text-2xl font-bold text-brown-900 mt-1">
                  {stats.totalUsers}
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
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border border-brown-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-brown-600 text-xs font-medium">Artisans</p>
                <p className="text-2xl font-bold text-brown-900 mt-1">
                  {stats.totalArtisans}
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
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border border-brown-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-brown-600 text-xs font-medium">Customers</p>
                <p className="text-2xl font-bold text-brown-900 mt-1">
                  {stats.totalCustomers}
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border border-brown-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-brown-600 text-xs font-medium">Verified</p>
                <p className="text-2xl font-bold text-brown-900 mt-1">
                  {stats.verifiedArtisans}
                </p>
                <p className="text-xs text-brown-500 mt-0.5">
                  {stats.totalArtisans - stats.verifiedArtisans > 0 && (
                    <span className="text-yellow-600 font-semibold">
                      {stats.totalArtisans - stats.verifiedArtisans} pending
                    </span>
                  )}
                </p>
              </div>
              <div className="bg-green-100 p-2 rounded relative">
                {stats.totalArtisans - stats.verifiedArtisans > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {stats.totalArtisans - stats.verifiedArtisans}
                  </span>
                )}
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
                  Active Users
                </p>
                <p className="text-2xl font-bold text-brown-900 mt-1">
                  {stats.activeUsers}
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Link
            to="/admin/products"
            className="bg-brown-700 rounded-lg shadow-sm p-4 text-white hover:bg-brown-800 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-brown-100 p-2 rounded text-brown-700">
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
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-base">Product Management</h3>
                <p className="text-brown-100 text-xs">
                  View, edit, and remove products
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/orders"
            className="bg-brown-600 rounded-lg shadow-sm p-4 text-white hover:bg-brown-700 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-brown-100 p-2 rounded text-brown-600">
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
                <h3 className="font-semibold text-base">Order Monitoring</h3>
                <p className="text-brown-100 text-xs">
                  Track transactions and deliveries
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-brown-200 mb-6">
          <div className="flex border-b border-brown-200">
            <button
              onClick={() => setActiveTab("users")}
              className={`flex-1 px-4 py-3 font-semibold text-sm transition-colors ${
                activeTab === "users"
                  ? "bg-brown-700 text-white"
                  : "bg-white text-brown-600 hover:bg-brown-50"
              }`}
            >
              All Users Management
            </button>
            <button
              onClick={() => setActiveTab("artisans")}
              className={`flex-1 px-4 py-3 font-semibold text-sm transition-colors ${
                activeTab === "artisans"
                  ? "bg-brown-700 text-white"
                  : "bg-white text-brown-600 hover:bg-brown-50"
              }`}
            >
              Artisan Verification Panel
            </button>
          </div>
        </div>

        {/* Filters */}
        {activeTab === "users" && (
          <div className="bg-white rounded-lg shadow-sm p-4 border border-brown-200 mb-4">
            <h2 className="text-base font-semibold text-brown-900 mb-3">
              Filters
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-brown-700 mb-1.5">
                  Role
                </label>
                <select
                  value={filters.role}
                  onChange={(e) =>
                    setFilters({ ...filters, role: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-brown-300 rounded-lg focus:ring-1 focus:ring-brown-600 focus:border-brown-600 text-sm"
                >
                  <option value="">All Roles</option>
                  <option value="customer">Customer</option>
                  <option value="artisan">Artisan</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-brown-700 mb-1.5">
                  Status
                </label>
                <select
                  value={filters.isActive}
                  onChange={(e) =>
                    setFilters({ ...filters, isActive: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-brown-300 rounded-lg focus:ring-1 focus:ring-brown-600 focus:border-brown-600 text-sm"
                >
                  <option value="">All Status</option>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
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
                  placeholder="Search by name, email..."
                  className="w-full px-3 py-2 border border-brown-300 rounded-lg focus:ring-1 focus:ring-brown-600 focus:border-brown-600 text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* Users Table */}
        {activeTab === "users" && (
          <div className="bg-white rounded-lg shadow-sm border border-brown-200 overflow-hidden">
            <div className="p-4 border-b border-brown-200">
              <h2 className="text-lg font-semibold text-brown-900">
                User Management
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-brown-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-brown-700 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-brown-700 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-brown-700 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-brown-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-brown-700 uppercase tracking-wider">
                      Verified
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-brown-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-brown-100">
                  {loading ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-4 py-3 text-center text-brown-600 text-sm"
                      >
                        Loading...
                      </td>
                    </tr>
                  ) : users.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-4 py-3 text-center text-brown-600 text-sm"
                      >
                        No users found
                      </td>
                    </tr>
                  ) : (
                    users.map((u) => (
                      <tr key={u._id} className="hover:bg-brown-50">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={
                                u.avatar ||
                                `https://ui-avatars.com/api/?name=${u.firstName}+${u.lastName}`
                              }
                              alt={u.firstName}
                              className="w-8 h-8 rounded-full mr-2"
                            />
                            <div>
                              <div className="text-xs font-medium text-brown-900">
                                {u.firstName} {u.lastName}
                              </div>
                              <div className="text-xs text-brown-500">
                                @{u.username}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-xs text-brown-900">
                          {u.email}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              u.role === "admin"
                                ? "bg-red-100 text-red-800"
                                : u.role === "artisan"
                                ? "bg-brown-100 text-brown-800"
                                : "bg-brown-100 text-brown-700"
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              u.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {u.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-brown-900">
                          {u.role === "artisan" ? (
                            u.artisanProfile?.isVerified ? (
                              <span className="text-green-600 font-bold">
                                ✅ Verified
                              </span>
                            ) : (
                              <span className="text-yellow-600 font-bold">
                                ⏳ Pending
                              </span>
                            )
                          ) : u.emailVerified ? (
                            "✅"
                          ) : (
                            "❌"
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          {u.role !== "admin" && (
                            <>
                              {u.role === "artisan" && (
                                <button
                                  onClick={() =>
                                    handleVerifyArtisan(
                                      u._id,
                                      u.artisanProfile?.isVerified
                                    )
                                  }
                                  className={`${
                                    u.artisanProfile?.isVerified
                                      ? "text-orange-600 hover:text-orange-900"
                                      : "text-green-600 hover:text-green-900 font-bold"
                                  }`}
                                >
                                  {u.artisanProfile?.isVerified
                                    ? "Unverify"
                                    : "✓ Verify"}
                                </button>
                              )}
                              <button
                                onClick={() =>
                                  handleStatusToggle(u._id, u.isActive)
                                }
                                className={`${
                                  u.isActive
                                    ? "text-red-600 hover:text-red-900"
                                    : "text-green-600 hover:text-green-900"
                                }`}
                              >
                                {u.isActive ? "Deactivate" : "Activate"}
                              </button>
                              <button
                                onClick={() => handleRoleChange(u._id, u.role)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Change Role
                              </button>
                              <button
                                onClick={() => handleDeleteUser(u._id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Artisan Verification Panel */}
        {activeTab === "artisans" && (
          <div className="bg-white rounded-xl shadow-md border-2 border-brown-100 overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-brown-800 mb-4">
                Artisan Verification Panel
              </h2>
              <p className="text-brown-600 mb-4">
                Review and verify artisan profiles to allow them to sell on the
                platform
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-brown-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-brown-700 uppercase tracking-wider">
                      Artisan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-brown-700 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-brown-700 uppercase tracking-wider">
                      Craft Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-brown-700 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-brown-700 uppercase tracking-wider">
                      Verification Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-brown-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-brown-100">
                  {loading ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-4 text-center text-brown-600"
                      >
                        Loading...
                      </td>
                    </tr>
                  ) : users.filter((u) => u.role === "artisan").length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-4 text-center text-brown-600"
                      >
                        No artisans found
                      </td>
                    </tr>
                  ) : (
                    users
                      .filter((u) => u.role === "artisan")
                      .map((artisan) => (
                        <tr key={artisan._id} className="hover:bg-brown-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={
                                  artisan.avatar ||
                                  `https://ui-avatars.com/api/?name=${artisan.firstName}+${artisan.lastName}&background=8B4513&color=fff`
                                }
                                alt={artisan.firstName}
                                className="w-12 h-12 rounded-full mr-3 border-2 border-brown-200"
                              />
                              <div>
                                <div className="text-sm font-bold text-brown-900">
                                  {artisan.firstName} {artisan.lastName}
                                </div>
                                <div className="text-sm text-brown-500">
                                  @{artisan.username}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-brown-900">
                            {artisan.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-brown-900">
                              {artisan.artisanProfile?.craftType ? (
                                Array.isArray(
                                  artisan.artisanProfile.craftType
                                ) ? (
                                  <div className="flex flex-wrap gap-1">
                                    {artisan.artisanProfile.craftType.map(
                                      (craft, idx) => (
                                        <span
                                          key={idx}
                                          className="px-2 py-1 bg-brown-100 text-brown-700 rounded-full text-xs"
                                        >
                                          {craft}
                                        </span>
                                      )
                                    )}
                                  </div>
                                ) : (
                                  <span className="px-2 py-1 bg-brown-100 text-brown-700 rounded-full text-xs">
                                    {artisan.artisanProfile.craftType}
                                  </span>
                                )
                              ) : (
                                <span className="text-gray-400">Not set</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-brown-900">
                            {artisan.artisanProfile?.location || (
                              <span className="text-gray-400">Not set</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {artisan.artisanProfile?.isVerified ? (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border-2 border-green-300">
                                <svg
                                  className="w-4 h-4 mr-1"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                Verified
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 border-2 border-yellow-300">
                                ⏳ Pending
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            {artisan.artisanProfile?.isVerified ? (
                              <button
                                onClick={() =>
                                  handleVerifyArtisan(
                                    artisan._id,
                                    artisan.artisanProfile.isVerified
                                  )
                                }
                                className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg font-bold transition-colors"
                              >
                                Unverify
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handleVerifyArtisan(
                                    artisan._id,
                                    artisan.artisanProfile?.isVerified
                                  )
                                }
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold transition-colors"
                              >
                                ✓ Verify Artisan
                              </button>
                            )}
                            <button
                              onClick={() =>
                                handleStatusToggle(
                                  artisan._id,
                                  artisan.isActive
                                )
                              }
                              className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                                artisan.isActive
                                  ? "bg-gray-200 hover:bg-gray-300 text-gray-700"
                                  : "bg-blue-500 hover:bg-blue-600 text-white"
                              }`}
                            >
                              {artisan.isActive ? "Deactivate" : "Activate"}
                            </button>
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
