// import { Link } from "react-router-dom";
// import { FaYoutube, FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

// export default function Footer() {
//   return (
// <div className="bg-warm-ivory pt-16 pb-5">
//      <footer className="relative m-5 text-white overflow-hidden bg-deep-mocha border rounded">
//       {/* Background with geometric pattern */}
//       <div className="absolute inset-0 overflow-hidden">
//         {/* Top row - 2 boxes */}
//         <div className="absolute top-0 left-0 right-0 h-36 flex justify-center gap-40 pt-10">
//           <div className="w-60 h-40 bg-[#E8D7C6] opacity-20 rounded-lg"></div>
//           <div className="w-60 h-40 bg-[#E8D7C6] opacity-20 rounded-lg"></div>
//         </div>
        
   
        
//         {/* Middle gradient separator */}
//         <div className="absolute top-60 left-0 right-0 h-28 bg-gradient-to-b from-transparent via-deep-mocha/30 to-deep-mocha"></div>
        
//         {/* Bottom row - 2 boxes */}
//         <div className="absolute bottom-20 left-0 right-0 h-36 flex justify-around gap-40 pb-10">
//           <div className="w-52 h-36 bg-[#E8D7C6] opacity-20 rounded-lg"></div>
//           <div className="w-52 h-36 bg-[#E8D7C6] opacity-20 rounded-lg"></div>
//         </div>
        
//         {/* Additional decorative elements */}
//         {/* <div className="absolute bottom-28 left-28 w-36 h-28 bg-[#E8D7C6] opacity-10 rounded-lg"></div>
//         <div className="absolute bottom-24 right-32 w-32 h-32 bg-[#E8D7C6] opacity-10 rounded-lg"></div> */}
//       </div>

//       {/* Light Overlay */}
//       <div className="absolute inset-0 bg-black/5" />

//       {/* Content */}
//       <div className="relative z-10 pt-14 pb-8">
//         {/* Top Footer */}
//         <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          
//           {/* Column 1 */}
//           <div>
//             <h2 className="text-2xl font-bold text-white mb-6">PurseShop</h2>
//             <div className="flex flex-col space-y-3 text-white/90">
//               <Link to="/about" className="hover:text-white transition duration-300 hover:translate-x-1">About Us</Link>
//               <Link to="#" className="hover:text-white transition duration-300 hover:translate-x-1">FAQs</Link>
//               <Link to="/contact" className="hover:text-white transition duration-300 hover:translate-x-1">Contact Us</Link>
//               <Link to="/products" className="hover:text-white transition duration-300 hover:translate-x-1">Products</Link>
//               <Link to="#" className="hover:text-white transition duration-300 hover:translate-x-1">Press & Blog</Link>
//               <Link to="#" className="hover:text-white transition duration-300 hover:translate-x-1">Terms & Conditions</Link>
//             </div>
//           </div>

//           {/* Column 2 */}
//           <div>
//             <h2 className="text-2xl font-bold text-white mb-6">Customer Service</h2>
//             <div className="flex flex-col space-y-3 text-white/90">
//               <Link to="#" className="hover:text-white transition duration-300 hover:translate-x-1">Help Center</Link>
//               <Link to="#" className="hover:text-white transition duration-300 hover:translate-x-1">Privacy Policy</Link>
//               <Link to="#" className="hover:text-white transition duration-300 hover:translate-x-1">Installment Plan</Link>
//               <Link to="#" className="hover:text-white transition duration-300 hover:translate-x-1">E-Warranty Activation</Link>
//             </div>
//           </div>

//           {/* Column 3 */}
//           <div>
//             <h2 className="text-2xl font-bold text-white mb-6">Secure Payment Methods</h2>
//             <img
//               src="https://static.priceoye.pk/images/payment_method.svg"
//               alt="Payments"
//               className="w-64 brightness-110 hover:scale-105 transition duration-300"
//             />
//             <img
//               src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
//               alt="Play Store"
//               className="w-40 mt-4 hover:scale-105 transition duration-300"
//             />
//           </div>
//         </div>

//         {/* Bottom Footer */}
//         <div className="mt-14 py-6 border-t border-white/20">
//           <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row justify-between items-center gap-6">
//             <h6 className="text-sm text-white/80">
//               © {new Date().getFullYear()}{" "}
//               <span className="text-white font-semibold">PurseShop</span>
//             </h6>

//             <div className="flex gap-5">
//               <FaYoutube className="w-7 h-7 text-white hover:scale-125 hover:text-red-500 transition duration-300 cursor-pointer" />
//               <FaFacebookF className="w-7 h-7 text-white hover:scale-125 hover:text-blue-600 transition duration-300 cursor-pointer" />
//               <FaInstagram className="w-7 h-7 text-white hover:scale-125 hover:text-pink-500 transition duration-300 cursor-pointer" />
//               <FaTiktok className="w-7 h-7 text-white hover:scale-125 hover:text-black transition duration-300 cursor-pointer" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//    </div>

//   );
// }



import { Link } from "react-router-dom";
import { FaYoutube, FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="bg-warm-ivory pt-5 pb-5">

<footer className="relative text-white overflow-hidden ml-15 mr-15 max-[549px]:ml-5 max-[549px]:mr-5 mx-auto rounded-3xl">
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
    </div>
  );
}