import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalOrders: 0,
    activeOrders: 0,
    completedOrders: 0,
    totalSpent: 0,
  });

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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-4">
                <div className="w-1.5 h-1.5 bg-brown-200 rounded-full animate-pulse"></div>
                <p className="text-brown-100 text-xs font-semibold tracking-wider m-0">
                  CUSTOMER DASHBOARD
                </p>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-3 bg-gradient-to-r from-white to-brown-100 bg-clip-text text-transparent">
                Welcome back, {user?.firstName}!
              </h1>
              <p className="text-brown-100 text-base sm:text-lg max-w-2xl">
                Manage your orders and explore handcrafted treasures from
                artisans around the world
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-2xl blur"></div>
                <img
                  src={
                    user?.avatar ||
                    `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=8B4513&color=fff`
                  }
                  alt={user?.firstName}
                  className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-3 border-white/40 shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Stats Section */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-brown-300 to-transparent flex-1"></div>
            <h2 className="text-xl sm:text-2xl font-bold text-brown-900 uppercase tracking-wider">
              Dashboard Overview
            </h2>
            <div className="h-px bg-gradient-to-r from-transparent via-brown-300 to-transparent flex-1"></div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group relative bg-white rounded-2xl shadow-lg p-8 border border-brown-200/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-brown-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-brown-600 rounded-full"></div>
                    <p className="text-brown-600 text-xs font-bold uppercase tracking-widest">
                      Total Orders
                    </p>
                  </div>
                  <p className="text-5xl font-bold text-brown-900 mb-1">
                    {stats.totalOrders}
                  </p>
                  <p className="text-brown-500 text-sm">All time</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-brown-600 to-brown-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
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
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="group relative bg-white rounded-2xl shadow-lg p-8 border border-brown-200/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brown-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-brown-500 rounded-full animate-pulse"></div>
                    <p className="text-brown-600 text-xs font-bold uppercase tracking-widest">
                      Active Orders
                    </p>
                  </div>
                  <p className="text-5xl font-bold text-brown-900 mb-1">
                    {stats.activeOrders}
                  </p>
                  <p className="text-brown-500 text-sm">In progress</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-brown-500 to-brown-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="group relative bg-white rounded-2xl shadow-lg p-8 border border-brown-200/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brown-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-brown-600 rounded-full"></div>
                    <p className="text-brown-600 text-xs font-bold uppercase tracking-widest">
                      Completed
                    </p>
                  </div>
                  <p className="text-5xl font-bold text-brown-900 mb-1">
                    {stats.completedOrders}
                  </p>
                  <p className="text-brown-500 text-sm">Delivered</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-brown-600 to-brown-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="group relative bg-white rounded-2xl shadow-lg p-8 border border-brown-200/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brown-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="relative flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-brown-700 rounded-full"></div>
                    <p className="text-brown-600 text-xs font-bold uppercase tracking-widest">
                      Total Spent
                    </p>
                  </div>
                  <p className="text-5xl font-bold text-brown-900 mb-1">
                    ₹{stats.totalSpent.toLocaleString()}
                  </p>
                  <p className="text-brown-500 text-sm">Lifetime value</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-brown-700 to-brown-800 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
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
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-brown-300 to-transparent flex-1"></div>
            <h2 className="text-xl sm:text-2xl font-bold text-brown-900 uppercase tracking-wider">
              Quick Actions
            </h2>
            <div className="h-px bg-gradient-to-r from-transparent via-brown-300 to-transparent flex-1"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/products"
              className="group relative bg-gradient-to-br from-brown-700 to-brown-800 rounded-2xl shadow-lg p-8 text-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 no-underline overflow-hidden"
            >
              {/* Decorative circles */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-brown-900/20 rounded-full"></div>

              <div className="relative">
                <div className="w-16 h-16 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-2">Browse Products</h3>
                <p className="text-brown-100 text-sm leading-relaxed">
                  Discover unique handmade treasures from talented artisans
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold">
                  <span>Explore Now</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-2 transition-transform"
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
                </div>
              </div>
            </Link>

            <Link
              to="/orders"
              className="group relative bg-gradient-to-br from-brown-600 to-brown-700 rounded-2xl shadow-lg p-8 text-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 no-underline overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-brown-900/20 rounded-full"></div>

              <div className="relative">
                <div className="w-16 h-16 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl">
                  <svg
                    className="w-8 h-8"
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
                <h3 className="font-bold text-xl mb-2">My Orders</h3>
                <p className="text-brown-100 text-sm leading-relaxed">
                  Track and manage all your purchases in one place
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold">
                  <span>View Orders</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-2 transition-transform"
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
                </div>
              </div>
            </Link>

            <Link
              to="/wishlist"
              className="group relative bg-gradient-to-br from-brown-500 to-brown-600 rounded-2xl shadow-lg p-8 text-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 no-underline overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-brown-900/20 rounded-full"></div>

              <div className="relative">
                <div className="w-16 h-16 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl">
                  <svg
                    className="w-8 h-8"
                    fill="none"
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
                </div>
                <h3 className="font-bold text-xl mb-2">Wishlist</h3>
                <p className="text-brown-100 text-sm leading-relaxed">
                  Save your favorite items for later
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold">
                  <span>View Wishlist</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-2 transition-transform"
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
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Orders */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-brown-300 to-transparent flex-1"></div>
            <h2 className="text-xl sm:text-2xl font-bold text-brown-900 uppercase tracking-wider">
              Recent Orders
            </h2>
            <div className="h-px bg-gradient-to-r from-transparent via-brown-300 to-transparent flex-1"></div>
          </div>

          <div className="relative bg-white rounded-2xl shadow-lg p-12 sm:p-16 border border-brown-200/50 overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-brown-50 to-transparent rounded-full -mr-32 -mt-32 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-brown-50 to-transparent rounded-full -ml-24 -mb-24 opacity-50"></div>

            <div className="relative text-center py-8">
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
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-brown-900 mb-3">
                No orders yet
              </h3>
              <p className="text-brown-600 mb-8 max-w-lg mx-auto text-base leading-relaxed">
                Start your journey by exploring our curated collection of unique
                handmade items from talented artisans around the world
              </p>

              <Link
                to="/products"
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-brown-700 to-brown-800 text-white px-10 py-4 rounded-xl font-bold text-base hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 no-underline"
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span>Browse Products</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-2 transition-transform"
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
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
