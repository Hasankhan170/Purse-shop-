// import { Link } from "react-router-dom";
// import { useCart } from "../hooks/useCart";
// import toast from "react-hot-toast";

// export default function ProductCard({ product }) {
//   const addToCart = useCart((state) => state.addToCart);

//   const handleAddToCart = () => {
//     addToCart(product);

//     toast.success(`${product.name} added to cart!`, {
//       duration: 2000,
//       style: {
//         borderRadius: "8px",
//         background: "#2c2218",
//         color: "#F6F3ED",
//         fontWeight: "bold",
//         boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
//       },
//     });
//   };

//   return (
//    <div className="bg-warm-ivory rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
//   <img
//     src={product.image}
//     alt={product.name}
//     className="w-full h-64 max-[611px]:h-40 object-cover transition-all duration-300"
//   />
//   <div className="p-6 text-center">
//     <h3 className="text-lg font-semibold text-deep-mocha mb-2">
//       {product.name}
//     </h3>
//     <p className="text-soft-gold text-xl font-bold mb-4">
//       ${product.price}
//     </p>

//     <div className="flex flex-col max-[611px]:flex-col sm:flex-row justify-center gap-3">
//       <button
//         onClick={handleAddToCart}
//         className="flex-1 px-5 py-2 bg-deep-mocha text-warm-ivory rounded-lg 
//                    border border-deep-mocha
//                    hover:bg-soft-gold hover:text-deep-mocha 
//                    hover:-translate-y-1 hover:border-soft-gold 
//                    transition-all duration-200"
//       >
//         Add to Cart
//       </button>

//       <Link
//         to={`/product/${product.id}`}
//         className="flex-1 px-5 py-2 border border-deep-mocha text-deep-mocha rounded-lg 
//                    hover:bg-deep-mocha hover:text-warm-ivory 
//                    hover:-translate-y-1 hover:border-soft-gold 
//                    transition-all duration-200"
//       >
//         View Details
//       </Link>
//     </div>
//   </div>
// </div>

//   );
// }


import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const addToCart = useCart((state) => state.addToCart);

  const handleAddToCart = (e) => {
    e.stopPropagation(); // card click ko block karega
    e.preventDefault();

    addToCart(product);

    toast.success(`${product.name} added to cart!`, {
      duration: 2000,
      style: {
        borderRadius: "8px",
        background: "#2c2218",
        color: "#F6F3ED",
        fontWeight: "bold",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
      },
    });
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="bg-warm-ivory rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition block"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 max-[611px]:h-40 object-cover transition-all duration-300"
      />

      <div className="p-6 text-center">
        <h3 className="text-lg font-semibold text-deep-mocha mb-2">
          {product.name}
        </h3>

        <p className="text-soft-gold text-xl font-bold mb-4">
          ${product.price}
        </p>

        <button
          onClick={handleAddToCart}
          className="w-full px-5 py-2 bg-deep-mocha text-white rounded-lg 
                     border border-deep-mocha
                     hover:bg-soft-gold hover:text-deep-mocha 
                     hover:-translate-y-1 hover:border-soft-gold 
                     transition-all duration-200"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
}
