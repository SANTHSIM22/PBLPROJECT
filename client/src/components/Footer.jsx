import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-brown-700 to-brown-800 text-brown-100 mt-auto">
      <div className="max-w-7xl mx-auto px-8 py-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-10">
          {/* About Section */}
          <div className="flex flex-col gap-4">
            <h3 className="text-brown-300 text-lg font-bold mb-2 tracking-wide">
              About Artisan Connect
            </h3>
            <p className="text-brown-200 leading-relaxed text-[15px]">
              Bridging the gap between local artisans and customers through
              authentic handmade crafts and cultural stories.
            </p>
            <div className="flex gap-4 mt-2">
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-brown-300/10 text-brown-300 transition-all duration-300 border border-brown-300/20 hover:bg-brown-300 hover:text-brown-800 hover:-translate-y-1 hover:shadow-lg"
                aria-label="Facebook"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-brown-300/10 text-brown-300 transition-all duration-300 border border-brown-300/20 hover:bg-brown-300 hover:text-brown-800 hover:-translate-y-1 hover:shadow-lg"
                aria-label="Instagram"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path
                    d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"
                    fill="white"
                  />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="white" />
                </svg>
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-brown-300/10 text-brown-300 transition-all duration-300 border border-brown-300/20 hover:bg-brown-300 hover:text-brown-800 hover:-translate-y-1 hover:shadow-lg"
                aria-label="Twitter"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-brown-300/10 text-brown-300 transition-all duration-300 border border-brown-300/20 hover:bg-brown-300 hover:text-brown-800 hover:-translate-y-1 hover:shadow-lg"
                aria-label="WhatsApp"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-brown-300 text-lg font-bold mb-2 tracking-wide">
              Quick Links
            </h3>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              <li>
                <Link
                  to="/"
                  className="text-brown-200 no-underline text-[15px] transition-all inline-block relative before:content-['→'] before:absolute before:-left-5 before:opacity-0 before:transition-all hover:text-brown-300 hover:pl-5 hover:before:opacity-100 hover:before:left-0"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/artisans"
                  className="text-brown-200 no-underline text-[15px] transition-all inline-block relative before:content-['→'] before:absolute before:-left-5 before:opacity-0 before:transition-all hover:text-brown-300 hover:pl-5 hover:before:opacity-100 hover:before:left-0"
                >
                  Browse Artisans
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-brown-200 no-underline text-[15px] transition-all inline-block relative before:content-['→'] before:absolute before:-left-5 before:opacity-0 before:transition-all hover:text-brown-300 hover:pl-5 hover:before:opacity-100 hover:before:left-0"
                >
                  Shop Products
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-brown-200 no-underline text-[15px] transition-all inline-block relative before:content-['→'] before:absolute before:-left-5 before:opacity-0 before:transition-all hover:text-brown-300 hover:pl-5 hover:before:opacity-100 hover:before:left-0"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-brown-200 no-underline text-[15px] transition-all inline-block relative before:content-['→'] before:absolute before:-left-5 before:opacity-0 before:transition-all hover:text-brown-300 hover:pl-5 hover:before:opacity-100 hover:before:left-0"
                >
                  Blog & Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* For Artisans */}
          <div className="flex flex-col gap-4">
            <h3 className="text-brown-300 text-lg font-bold mb-2 tracking-wide">
              For Artisans
            </h3>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              <li>
                <Link
                  to="/artisan/register"
                  className="text-brown-200 no-underline text-[15px] transition-all inline-block relative before:content-['→'] before:absolute before:-left-5 before:opacity-0 before:transition-all hover:text-brown-300 hover:pl-5 hover:before:opacity-100 hover:before:left-0"
                >
                  Become an Artisan
                </Link>
              </li>
              <li>
                <Link
                  to="/artisan/dashboard"
                  className="text-brown-200 no-underline text-[15px] transition-all inline-block relative before:content-['→'] before:absolute before:-left-5 before:opacity-0 before:transition-all hover:text-brown-300 hover:pl-5 hover:before:opacity-100 hover:before:left-0"
                >
                  Artisan Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/artisan/guide"
                  className="text-brown-200 no-underline text-[15px] transition-all inline-block relative before:content-['→'] before:absolute before:-left-5 before:opacity-0 before:transition-all hover:text-brown-300 hover:pl-5 hover:before:opacity-100 hover:before:left-0"
                >
                  Seller Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/artisan/support"
                  className="text-brown-200 no-underline text-[15px] transition-all inline-block relative before:content-['→'] before:absolute before:-left-5 before:opacity-0 before:transition-all hover:text-brown-300 hover:pl-5 hover:before:opacity-100 hover:before:left-0"
                >
                  Artisan Support
                </Link>
              </li>
              <li>
                <Link
                  to="/artisan/training"
                  className="text-brown-200 no-underline text-[15px] transition-all inline-block relative before:content-['→'] before:absolute before:-left-5 before:opacity-0 before:transition-all hover:text-brown-300 hover:pl-5 hover:before:opacity-100 hover:before:left-0"
                >
                  Training Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-4">
            <h3 className="text-brown-300 text-lg font-bold mb-2 tracking-wide">
              Customer Support
            </h3>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              <li>
                <Link
                  to="/help"
                  className="text-brown-200 no-underline text-[15px] transition-all inline-block relative before:content-['→'] before:absolute before:-left-5 before:opacity-0 before:transition-all hover:text-brown-300 hover:pl-5 hover:before:opacity-100 hover:before:left-0"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-brown-200 no-underline text-[15px] transition-all inline-block relative before:content-['→'] before:absolute before:-left-5 before:opacity-0 before:transition-all hover:text-brown-300 hover:pl-5 hover:before:opacity-100 hover:before:left-0"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-brown-200 no-underline text-[15px] transition-all inline-block relative before:content-['→'] before:absolute before:-left-5 before:opacity-0 before:transition-all hover:text-brown-300 hover:pl-5 hover:before:opacity-100 hover:before:left-0"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-brown-200 no-underline text-[15px] transition-all inline-block relative before:content-['→'] before:absolute before:-left-5 before:opacity-0 before:transition-all hover:text-brown-300 hover:pl-5 hover:before:opacity-100 hover:before:left-0"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="text-brown-200 no-underline text-[15px] transition-all inline-block relative before:content-['→'] before:absolute before:-left-5 before:opacity-0 before:transition-all hover:text-brown-300 hover:pl-5 hover:before:opacity-100 hover:before:left-0"
                >
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brown-300/20 pt-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <p className="text-brown-300 text-sm m-0">
              &copy; {currentYear} Artisan Connect Platform. All rights
              reserved.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <Link
                to="/privacy"
                className="text-brown-200 no-underline text-sm transition-colors hover:text-brown-300 hover:underline"
              >
                Privacy Policy
              </Link>
              <span className="text-brown-300/40">|</span>
              <Link
                to="/terms"
                className="text-brown-200 no-underline text-sm transition-colors hover:text-brown-300 hover:underline"
              >
                Terms of Service
              </Link>
              <span className="text-brown-300/40">|</span>
              <Link
                to="/cookies"
                className="text-brown-200 no-underline text-sm transition-colors hover:text-brown-300 hover:underline"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
