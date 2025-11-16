import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brown-700 via-brown-600 to-brown-800 text-white overflow-hidden">
        {/* Geometric Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M0 0h40v40H0V0zm40 40h40v40H40V40z" /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }}
          ></div>
        </div>

        <div
          className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center space-y-8 sm:space-y-10">
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-4">
              <p className="text-brown-100 text-sm font-medium m-0">
                PREMIUM HANDCRAFTED MARKETPLACE
              </p>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
              Discover Authentic
              <span className="block mt-2 bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent">
                Artisan Craftsmanship
              </span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-brown-50 max-w-3xl mx-auto leading-relaxed px-4 font-light">
              Connect with master artisans and explore unique handcrafted
              products
              <br className="hidden sm:block" />
              that celebrate tradition, culture, and exceptional craftsmanship
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10 sm:mt-12 px-4">
              <Link
                to="/products"
                className="w-full sm:w-auto bg-white text-brown-700 px-8 sm:px-10 py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-brown-50 transition-all duration-300 shadow-2xl hover:shadow-xl hover:scale-105 no-underline text-center flex items-center justify-center gap-2"
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
                Explore Collection
              </Link>
              <Link
                to="/artisans"
                className="w-full sm:w-auto bg-transparent text-white px-8 sm:px-10 py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-white/10 transition-all duration-300 border-2 border-white/30 backdrop-blur-sm no-underline text-center flex items-center justify-center gap-2"
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Meet Artisans
              </Link>
            </div>
          </div>
        </div>

        {/* Elegant Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M0,32L60,37.3C120,43,240,53,360,58.7C480,64,600,64,720,58.7C840,53,960,43,1080,42.7C1200,43,1320,53,1380,58.7L1440,64L1440,80L1380,80C1320,80,1200,80,1080,80C960,80,840,80,720,80C600,80,480,80,360,80C240,80,120,80,60,80L0,80Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-brown-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brown-900 mb-4">
              Why Choose Artisan Connect
            </h2>
            <p className="text-base sm:text-lg text-brown-600 max-w-2xl mx-auto">
              Your trusted platform connecting you with authentic artisan
              craftsmanship
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="group bg-white p-8 rounded-xl text-center border border-brown-200/50 transition-all duration-300 hover:shadow-2xl hover:border-brown-400 hover:-translate-y-1">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-brown-600 to-brown-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                    <path
                      d="M24 8L28 20H40L30 28L34 40L24 32L14 40L18 28L8 20H20L24 8Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-brown-900 mb-3">
                Verified Artisans
              </h3>
              <p className="text-sm text-brown-600 leading-relaxed m-0">
                Every artisan undergoes rigorous verification to ensure
                authenticity and exceptional craftsmanship.
              </p>
            </div>

            <div className="group bg-white p-8 rounded-xl text-center border border-brown-200/50 transition-all duration-300 hover:shadow-2xl hover:border-brown-400 hover:-translate-y-1">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-brown-600 to-brown-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                    <path
                      d="M32 16H16C14 16 12 18 12 20V32C12 34 14 36 16 36H32C34 36 36 34 36 32V20C36 18 34 16 32 16Z"
                      fill="white"
                    />
                    <circle cx="24" cy="24" r="4" fill="#8B4513" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-brown-900 mb-3">
                Cultural Heritage
              </h3>
              <p className="text-sm text-brown-600 leading-relaxed m-0">
                Discover the rich stories and traditions behind each unique
                handcrafted masterpiece.
              </p>
            </div>

            <div className="group bg-white p-8 rounded-xl text-center border border-brown-200/50 transition-all duration-300 hover:shadow-2xl hover:border-brown-400 hover:-translate-y-1">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-brown-600 to-brown-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                    <path
                      d="M24 12C17.4 12 12 17.4 12 24C12 30.6 17.4 36 24 36C30.6 36 36 30.6 36 24C36 17.4 30.6 12 24 12ZM22 30L16 24L18.4 21.6L22 25.2L29.6 17.6L32 20L22 30Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-brown-900 mb-3">
                Secure Transactions
              </h3>
              <p className="text-sm text-brown-600 leading-relaxed m-0">
                Enterprise-grade security with encrypted payment processing for
                complete peace of mind.
              </p>
            </div>

            <div className="group bg-white p-8 rounded-xl text-center border border-brown-200/50 transition-all duration-300 hover:shadow-2xl hover:border-brown-400 hover:-translate-y-1">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-brown-600 to-brown-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                    <path
                      d="M24 8L12 14V22C12 30 17 37.6 24 40C31 37.6 36 30 36 22V14L24 8Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-brown-900 mb-3">
                Quality Guarantee
              </h3>
              <p className="text-sm text-brown-600 leading-relaxed m-0">
                Stringent quality standards ensure every product exceeds
                expectations in craftsmanship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brown-900 mb-4">
              Explore Our Collections
            </h2>
            <p className="text-base sm:text-lg text-brown-600 max-w-2xl mx-auto">
              Browse through carefully curated categories of authentic
              handcrafted products
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <Link
              to="/category/pottery"
              className="group bg-gradient-to-br from-white to-brown-50/50 p-8 rounded-xl text-center no-underline border border-brown-200/50 transition-all flex flex-col items-center gap-4 hover:shadow-2xl hover:border-brown-400 hover:-translate-y-1"
            >
              <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-brown-600 to-brown-700 rounded-xl mb-2 group-hover:scale-110 transition-transform duration-300">
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M24 8C20 8 16 10 16 14V34C16 38 20 40 24 40C28 40 32 38 32 34V14C32 10 28 8 24 8Z"
                    fill="white"
                  />
                  <ellipse cx="24" cy="14" rx="8" ry="4" fill="#D2691E" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brown-900 m-0">
                Pottery & Ceramics
              </h3>
              <p className="text-sm text-brown-600 m-0">
                Handcrafted clay creations
              </p>
            </Link>

            <Link
              to="/category/textiles"
              className="group bg-gradient-to-br from-white to-brown-50/50 p-8 rounded-xl text-center no-underline border border-brown-200/50 transition-all flex flex-col items-center gap-4 hover:shadow-2xl hover:border-brown-400 hover:-translate-y-1"
            >
              <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-brown-600 to-brown-700 rounded-xl mb-2 group-hover:scale-110 transition-transform duration-300">
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M12 12V36L24 30L36 36V12L24 18L12 12Z"
                    fill="white"
                  />
                  <path
                    d="M12 12L24 18L36 12"
                    stroke="#D2691E"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 20L24 26L36 20"
                    stroke="#D2691E"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brown-900 m-0">
                Textiles & Fabrics
              </h3>
              <p className="text-sm text-brown-600 m-0">Woven with tradition</p>
            </Link>

            <Link
              to="/category/jewelry"
              className="group bg-gradient-to-br from-white to-brown-50/50 p-8 rounded-xl text-center no-underline border border-brown-200/50 transition-all flex flex-col items-center gap-4 hover:shadow-2xl hover:border-brown-400 hover:-translate-y-1"
            >
              <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-brown-600 to-brown-700 rounded-xl mb-2 group-hover:scale-110 transition-transform duration-300">
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                  <circle
                    cx="24"
                    cy="20"
                    r="8"
                    stroke="white"
                    strokeWidth="3"
                    fill="none"
                  />
                  <path d="M16 20L12 32L24 28L36 32L32 20" fill="#D2691E" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brown-900 m-0">
                Jewelry & Accessories
              </h3>
              <p className="text-sm text-brown-600 m-0">Elegant adornments</p>
            </Link>

            <Link
              to="/category/woodwork"
              className="group bg-gradient-to-br from-white to-brown-50/50 p-8 rounded-xl text-center no-underline border border-brown-200/50 transition-all flex flex-col items-center gap-4 hover:shadow-2xl hover:border-brown-400 hover:-translate-y-1"
            >
              <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-brown-600 to-brown-700 rounded-xl mb-2 group-hover:scale-110 transition-transform duration-300">
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                  <rect
                    x="12"
                    y="12"
                    width="24"
                    height="24"
                    rx="2"
                    fill="white"
                  />
                  <path
                    d="M12 18H36M12 24H36M12 30H36"
                    stroke="#8B4513"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brown-900 m-0">
                Woodwork & Carvings
              </h3>
              <p className="text-sm text-brown-600 m-0">
                Masterfully carved pieces
              </p>
            </Link>

            <Link
              to="/category/metalwork"
              className="group bg-gradient-to-br from-white to-brown-50/50 p-8 rounded-xl text-center no-underline border border-brown-200/50 transition-all flex flex-col items-center gap-4 hover:shadow-2xl hover:border-brown-400 hover:-translate-y-1"
            >
              <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-brown-600 to-brown-700 rounded-xl mb-2 group-hover:scale-110 transition-transform duration-300">
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                  <path d="M10 24L24 10L38 24L24 38L10 24Z" fill="white" />
                  <circle cx="24" cy="24" r="6" fill="#D2691E" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brown-900 m-0">
                Metalwork
              </h3>
              <p className="text-sm text-brown-600 m-0">
                Forged with precision
              </p>
            </Link>

            <Link
              to="/category/paintings"
              className="group bg-gradient-to-br from-white to-brown-50/50 p-8 rounded-xl text-center no-underline border border-brown-200/50 transition-all flex flex-col items-center gap-4 hover:shadow-2xl hover:border-brown-400 hover:-translate-y-1"
            >
              <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-brown-600 to-brown-700 rounded-xl mb-2 group-hover:scale-110 transition-transform duration-300">
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                  <rect
                    x="10"
                    y="10"
                    width="28"
                    height="28"
                    rx="2"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M15 25L20 20L25 25L30 18L33 21"
                    stroke="#D2691E"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brown-900 m-0">
                Art & Paintings
              </h3>
              <p className="text-sm text-brown-600 m-0">Canvas of culture</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-brown-800 via-brown-700 to-brown-900 py-20 sm:py-24 px-4 sm:px-8 text-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M0 0h40v40H0V0zm40 40h40v40H40V40z" /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }}
          ></div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
            <p className="text-brown-100 text-sm font-medium m-0">
              JOIN OUR COMMUNITY
            </p>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Are You an Artisan?
          </h2>
          <p className="text-lg sm:text-xl text-brown-100 leading-relaxed mb-10 max-w-2xl mx-auto">
            Showcase your exceptional crafts to a global audience. Join our
            community of verified artisans and grow your business with us.
          </p>
          <Link
            to="/artisan/register"
            className="inline-flex items-center gap-2 bg-white text-brown-700 px-10 py-4 rounded-lg font-bold text-lg transition-all shadow-2xl hover:shadow-xl hover:scale-105 no-underline"
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
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Become an Artisan
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
