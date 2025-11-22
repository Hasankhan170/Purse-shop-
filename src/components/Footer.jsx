import { Link } from "react-router-dom";
import { FaYoutube, FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-warm-ivory pt-10 pb-6 text-warm-ivory overflow-hidden">
      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {/* Column 1 */}
        <div>
          <h2 className="text-2xl font-bold text-soft-gold mb-6">PurseShop</h2>

          <div className="flex flex-col space-y-2">
            <Link to="/about" className="hover:text-soft-gold transition">
              About Us
            </Link>
            <Link to="#" className="hover:text-soft-gold transition">
              FAQs
            </Link>
            <Link to="/contact" className="hover:text-soft-gold transition">
              Contact Us
            </Link>
            <Link to="/products" className="hover:text-soft-gold transition">
              Products
            </Link>
            <Link to="#" className="hover:text-soft-gold transition">
              Press & Blog
            </Link>
            <Link to="#" className="hover:text-soft-gold transition">
              Terms & Conditions
            </Link>
          </div>
        </div>

        {/* Column 2 (Now visible on all devices) */}
        <div>
         
 <h2 className="text-2xl font-bold text-soft-gold mb-6">Customer Service</h2>
          <div className="flex flex-col space-y-2">
            <Link to="#" className="hover:text-soft-gold transition">
              Help Center
            </Link>
            <Link to="#" className="hover:text-soft-gold transition">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-soft-gold transition">
              Installment Plan
            </Link>
            <Link to="#" className="hover:text-soft-gold transition">
              E-Warranty Activation
            </Link>
          </div>
        </div>

        {/* Column 3 */}
        <div>
          {/* <h4 className="font-semibold text-soft-gold mb-4">
            Secure Payment Methods
          </h4> */}
 <h2 className="text-2xl font-bold text-soft-gold mb-6">Secure Payment Methods</h2>

          <img
            src="https://static.priceoye.pk/images/payment_method.svg"
            alt="Payments"
            className="w-60 sm:w-72 md:w-80"
          />

          <img
            src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
            alt="Play Store"
            className="w-32 sm:w-40 md:w-48 mt-4"
          />
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-pure-black/30 mt-10 py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <h6 className="text-sm text-center md:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="text-soft-gold font-semibold">PurseShop</span>
          </h6>

          {/* Social Icons */}
          <div className="flex gap-4">
            <FaYoutube className="w-6 h-6 text-soft-gold transition cursor-pointer" />
            <FaFacebookF className="w-6 h-6 text-soft-gold hover:text-soft-gold transition cursor-pointer" />
            <FaInstagram className="w-6 h-6 text-soft-gold hover:text-soft-gold transition cursor-pointer" />
            <FaTiktok className="w-6 h-6 text-soft-gold hover:text-soft-gold transition cursor-pointer" />
          </div>

          <div></div>
        </div>
      </div>
    </footer>
  );
}
