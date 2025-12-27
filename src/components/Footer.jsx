import { Link } from "react-router-dom";
import { FaYoutube, FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative text-white overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 " />

      {/* Content */}
      <div className="relative z-10 pt-12 pb-6">
        {/* Top Footer */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          
          {/* Column 1 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">PurseShop</h2>
            <div className="flex flex-col space-y-2 text-white/90">
              <Link to="/about" className="hover:text-white transition">About Us</Link>
              <Link to="#" className="hover:text-white transition">FAQs</Link>
              <Link to="/contact" className="hover:text-white transition">Contact Us</Link>
              <Link to="/products" className="hover:text-white transition">Products</Link>
              <Link to="#" className="hover:text-white transition">Press & Blog</Link>
              <Link to="#" className="hover:text-white transition">Terms & Conditions</Link>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Customer Service</h2>
            <div className="flex flex-col space-y-2 text-white/90">
              <Link to="#" className="hover:text-white transition">Help Center</Link>
              <Link to="#" className="hover:text-white transition">Privacy Policy</Link>
              <Link to="#" className="hover:text-white transition">Installment Plan</Link>
              <Link to="#" className="hover:text-white transition">E-Warranty Activation</Link>
            </div>
          </div>

          {/* Column 3 */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Secure Payment Methods</h2>
            <img
              src="https://static.priceoye.pk/images/payment_method.svg"
              alt="Payments"
              className="w-64 brightness-110"
            />
            <img
              src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
              alt="Play Store"
              className="w-40 mt-4"
            />
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-10 py-4 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row justify-between items-center gap-4">
            <h6 className="text-sm text-white/80">
              © {new Date().getFullYear()}{" "}
              <span className="text-white font-semibold">PurseShop</span>
            </h6>

            <div className="flex gap-4">
              <FaYoutube className="w-6 h-6 text-white hover:scale-110 transition cursor-pointer" />
              <FaFacebookF className="w-6 h-6 text-white hover:scale-110 transition cursor-pointer" />
              <FaInstagram className="w-6 h-6 text-white hover:scale-110 transition cursor-pointer" />
              <FaTiktok className="w-6 h-6 text-white hover:scale-110 transition cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
