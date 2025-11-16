import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const getDashboardLink = () => {
    if (!user) return "/";
    switch (user.role) {
      case "admin":
        return "/admin/dashboard";
      case "artisan":
        return "/artisan/dashboard";
      case "customer":
        return "/customer/dashboard";
      default:
        return "/";
    }
  };

  return (
    <header className="bg-gradient-to-br from-white to-brown-100 shadow-md sticky top-0 z-50 border-b border-brown-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex justify-between items-center gap-4">
        <div className="flex-shrink-0">
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 no-underline transition-transform hover:-translate-y-0.5"
            onClick={closeMobileMenu}
          >
            <div className="flex items-center justify-center">
              <svg
                width="32"
                height="32"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="sm:w-10 sm:h-10"
              >
                <path
                  d="M20 5L5 12.5V27.5L20 35L35 27.5V12.5L20 5Z"
                  fill="#8B4513"
                  stroke="#5D2E11"
                  strokeWidth="2"
                />
                <circle cx="20" cy="20" r="6" fill="#D2691E" />
              </svg>
            </div>
            <span className="text-lg sm:text-2xl font-bold bg-gradient-to-br from-brown-600 to-brown-400 bg-clip-text text-transparent tracking-wide">
              Artisan Connect
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center flex-grow justify-center">
          <Link
            to="/"
            className="text-brown-700 no-underline font-medium text-base relative py-2 transition-colors hover:text-brown-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-brown-600 after:to-brown-400 after:transition-all hover:after:w-full"
          >
            Home
          </Link>
          <Link
            to="/artisans"
            className="text-brown-700 no-underline font-medium text-base relative py-2 transition-colors hover:text-brown-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-brown-600 after:to-brown-400 after:transition-all hover:after:w-full"
          >
            Artisans
          </Link>
          <Link
            to="/products"
            className="text-brown-700 no-underline font-medium text-base relative py-2 transition-colors hover:text-brown-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-brown-600 after:to-brown-400 after:transition-all hover:after:w-full"
          >
            Products
          </Link>
          <Link
            to="/about"
            className="text-brown-700 no-underline font-medium text-base relative py-2 transition-colors hover:text-brown-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-brown-600 after:to-brown-400 after:transition-all hover:after:w-full"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-brown-700 no-underline font-medium text-base relative py-2 transition-colors hover:text-brown-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-brown-600 after:to-brown-400 after:transition-all hover:after:w-full"
          >
            Contact
          </Link>
        </nav>

        {/* Desktop Right Section */}
        <div className="hidden md:flex gap-4 flex-shrink-0 items-center">
          {isAuthenticated ? (
            <>
              {/* Wishlist Icon */}
              <Link
                to="/wishlist"
                className="relative p-2 text-brown-600 hover:text-brown-800 transition-colors"
                title="Wishlist"
              >
                <svg
                  className="w-7 h-7"
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
              </Link>

              {/* Cart Icon */}
              <Link
                to="/cart"
                className="relative p-2 text-brown-600 hover:text-brown-800 transition-colors"
                title="Cart"
              >
                <svg
                  className="w-7 h-7"
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
              </Link>

              <Link
                to={getDashboardLink()}
                className="btn btn-primary flex items-center gap-2"
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
                    d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"
                  />
                </svg>
                Dashboard
              </Link>
              <div className="flex items-center gap-3">
                <img
                  src={
                    user?.profile?.avatar ||
                    "https://ui-avatars.com/api/?name=" +
                      (user?.username || "User") +
                      "&background=8B4513&color=fff"
                  }
                  alt={user?.username}
                  className="w-10 h-10 rounded-full border-2 border-brown-600"
                />
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-brown-800 m-0">
                    {user?.username}
                  </p>
                  <p className="text-xs text-brown-600 m-0 capitalize">
                    {user?.role}
                  </p>
                </div>
              </div>
              <button onClick={handleLogout} className="btn btn-secondary">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-brown-600 hover:text-brown-800 transition-colors focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu Slide-in */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-br from-white to-brown-50 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Close Button */}
          <div className="flex justify-end p-4 border-b border-brown-200">
            <button
              onClick={closeMobileMenu}
              className="p-2 text-brown-600 hover:text-brown-800 transition-colors"
              aria-label="Close menu"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* User Info Section (if authenticated) */}
          {isAuthenticated && user && (
            <div className="p-4 border-b border-brown-200">
              <div className="flex items-center gap-3">
                <img
                  src={
                    user?.profile?.avatar ||
                    "https://ui-avatars.com/api/?name=" +
                      (user?.username || "User") +
                      "&background=8B4513&color=fff"
                  }
                  alt={user?.username}
                  className="w-12 h-12 rounded-full border-2 border-brown-600"
                />
                <div>
                  <p className="text-sm font-semibold text-brown-800 m-0">
                    {user?.username}
                  </p>
                  <p className="text-xs text-brown-600 m-0 capitalize">
                    {user?.role}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex flex-col py-4 flex-grow overflow-y-auto">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="px-6 py-3 text-brown-700 no-underline font-medium hover:bg-brown-100 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/artisans"
              onClick={closeMobileMenu}
              className="px-6 py-3 text-brown-700 no-underline font-medium hover:bg-brown-100 transition-colors"
            >
              Artisans
            </Link>
            <Link
              to="/products"
              onClick={closeMobileMenu}
              className="px-6 py-3 text-brown-700 no-underline font-medium hover:bg-brown-100 transition-colors"
            >
              Products
            </Link>
            <Link
              to="/about"
              onClick={closeMobileMenu}
              className="px-6 py-3 text-brown-700 no-underline font-medium hover:bg-brown-100 transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={closeMobileMenu}
              className="px-6 py-3 text-brown-700 no-underline font-medium hover:bg-brown-100 transition-colors"
            >
              Contact
            </Link>

            {isAuthenticated && (
              <>
                <div className="border-t border-brown-200 my-2"></div>
                <Link
                  to="/wishlist"
                  onClick={closeMobileMenu}
                  className="px-6 py-3 text-brown-700 no-underline font-medium hover:bg-brown-100 transition-colors flex items-center gap-2"
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  Wishlist
                </Link>
                <Link
                  to="/cart"
                  onClick={closeMobileMenu}
                  className="px-6 py-3 text-brown-700 no-underline font-medium hover:bg-brown-100 transition-colors flex items-center gap-2"
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
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Cart
                </Link>
                <Link
                  to={getDashboardLink()}
                  onClick={closeMobileMenu}
                  className="px-6 py-3 text-brown-700 no-underline font-medium hover:bg-brown-100 transition-colors flex items-center gap-2"
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
                      d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"
                    />
                  </svg>
                  Dashboard
                </Link>
              </>
            )}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-brown-200 space-y-2">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }}
                className="w-full btn btn-secondary"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="w-full btn btn-secondary block text-center"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMobileMenu}
                  className="w-full btn btn-primary block text-center"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
