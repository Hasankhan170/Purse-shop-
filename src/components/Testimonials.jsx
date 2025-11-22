// import { useRef } from "react";
// import { products } from "../data/products";
// import { useNavigate } from "react-router-dom";

// const Testimonials = () => {
//   const navigate = useNavigate();
//   const scrollContainerRef = useRef(null);

//   const isDragging = useRef(false);
//   const startX = useRef(0);
//   const scrollLeft = useRef(0);
//   const dragDistance = useRef(0);

//   const onMouseDown = (e) => {
//     isDragging.current = true;
//     startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
//     scrollLeft.current = scrollContainerRef.current.scrollLeft;
//     dragDistance.current = 0;
//   };

//   const onMouseLeave = () => {
//     isDragging.current = false;
//   };

//   const onMouseUp = () => {
//     isDragging.current = false;
//   };

//   const onMouseMove = (e) => {
//     if (!isDragging.current) return;
//     e.preventDefault();
//     const x = e.pageX - scrollContainerRef.current.offsetLeft;
//     const walk = x - startX.current;
//     dragDistance.current = Math.abs(walk);
//     scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
//   };

//   const onTouchStart = (e) => {
//     isDragging.current = true;
//     startX.current = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
//     scrollLeft.current = scrollContainerRef.current.scrollLeft;
//     dragDistance.current = 0;
//   };

//   const onTouchMove = (e) => {
//     if (!isDragging.current) return;
//     const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
//     const walk = x - startX.current;
//     dragDistance.current = Math.abs(walk);
//     scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
//   };

//   const onTouchEnd = () => {
//     isDragging.current = false;
//   };

//   const handleCardClick = (productId) => {
//     if (dragDistance.current < 8) {
//       navigate(`/product/${productId}`);
//     }
//   };

//   const scrollByAmount = (amount) => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollBy({
//         left: amount,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <div className="w-full relative bg-warm-ivory py-16">
//       {/* Heading */}
//       <h2 className="text-3xl font-extrabold text-deep-mocha mb-8 text-center">
//         What Our Customers Say
//       </h2>

//       {/* Wrapper to center scroll container */}
//       <div className="relative max-w-7xl mx-auto px-4">
//         {/* Arrows */}
//         <button
//           aria-label="Scroll Left"
//           onClick={() => scrollByAmount(-300)}
//           className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full p-2 shadow-lg hover:bg-deep-mocha hover:text-warm-ivory transition-colors z-20"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth={2}
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>

//         <button
//           aria-label="Scroll Right"
//           onClick={() => scrollByAmount(300)}
//           className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full p-2 shadow-lg hover:bg-deep-mocha hover:text-warm-ivory transition-colors z-20"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth={2}
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
//           </svg>
//         </button>

//         {/* Scroll container */}
//         <div
//           ref={scrollContainerRef}
//           className="overflow-x-auto scrollbar-hide flex gap-6 cursor-grab py-4"
//           onMouseDown={onMouseDown}
//           onMouseUp={onMouseUp}
//           onMouseLeave={onMouseLeave}
//           onMouseMove={onMouseMove}
//           onTouchStart={onTouchStart}
//           onTouchMove={onTouchMove}
//           onTouchEnd={onTouchEnd}
//           style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//         >
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="w-80 flex-shrink-0 cursor-pointer"
//               onClick={() => handleCardClick(product.id)}
//             >
//               <div className="bg-warm-ivory rounded-lg border border-cloud-grey  duration-300 overflow-hidden">
//                 <div className="p-6 flex flex-col items-center">
//                   <div
//                     className="w-full flex justify-center mb-4"
//                     style={{
//                       height: "180px",
//                       width: "180px",
//                       backgroundColor: "#fff",
//                     }}
//                   >
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="h-full w-full object-cover"
//                     />
//                   </div>

//                   <div className="text-center w-full">
//                     {product.rating && (
//                       <div className="inline-flex items-center gap-1 mb-2 bg-soft-gold text-xs rounded px-2 py-1 font-bold text-pure-black">
//                         <svg
//                           className="w-4 h-4 fill-current"
//                           viewBox="0 0 20 20"
//                           aria-hidden="true"
//                         >
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.286 3.97c.3.92-.755 1.688-1.538 1.118l-3.385-2.46a1 1 0 00-1.176 0l-3.385 2.46c-.783.57-1.838-.197-1.538-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.045 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
//                         </svg>
//                         <span>
//                           {product.rating} ({product.reviewCount || 0})
//                         </span>
//                       </div>
//                     )}

//                     <h3 className="text-deep-mocha font-semibold text-base mb-2 line-clamp-2">
//                       {product.name}
//                     </h3>

//                     <div className="flex items-center justify-center gap-3 flex-wrap">
//                       <span className="text-soft-gold text-xl font-bold">
//                         Rs {product.price.toLocaleString()}
//                       </span>
//                       {product.originalPrice && (
//                         <span className="text-sm text-cloud-grey line-through">
//                           Rs {product.originalPrice.toLocaleString()}
//                         </span>
//                       )}
//                       {product.discountPercent && (
//                         <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
//                           {product.discountPercent}% OFF
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <style jsx>{`
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Testimonials;


import { useRef } from "react";
import { products } from "../data/products";
import { useNavigate } from "react-router-dom";

const Testimonials = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const dragDistance = useRef(0);

  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeft.current = scrollContainerRef.current.scrollLeft;
    dragDistance.current = 0;
  };

  const onMouseLeave = () => {
    isDragging.current = false;
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = x - startX.current;
    dragDistance.current = Math.abs(walk);
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onTouchStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    scrollLeft.current = scrollContainerRef.current.scrollLeft;
    dragDistance.current = 0;
  };

  const onTouchMove = (e) => {
    if (!isDragging.current) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = x - startX.current;
    dragDistance.current = Math.abs(walk);
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onTouchEnd = () => {
    isDragging.current = false;
  };

  const handleCardClick = (productId) => {
    if (dragDistance.current < 8) {
      navigate(`/product/${productId}`);
    }
  };

  const scrollByAmount = (amount) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full relative bg-warm-ivory py-16">

      {/* ⭐ Top bar (Heading + View All Button) */}
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between mb-8">
        <h2 className="text-3xl font-extrabold text-deep-mocha">
          What Our Customers Say
        </h2>

        <button
          onClick={() => navigate("/products")}
          className="bg-black text-white px-4 py-2 rounded-md text-sm font-semibold 
                     hover:bg-deep-mocha hover:text-warm-ivory transition"
        >
          View All
        </button>
      </div>

      {/* Wrapper */}
      <div className="relative max-w-7xl mx-auto px-4">

        {/* Scroll Arrows */}
        <button
          aria-label="Scroll Left"
          onClick={() => scrollByAmount(-300)}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full p-2 shadow-lg hover:bg-deep-mocha hover:text-warm-ivory transition-colors z-20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          aria-label="Scroll Right"
          onClick={() => scrollByAmount(300)}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full p-2 shadow-lg hover:bg-deep-mocha hover:text-warm-ivory transition-colors z-20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Scroll Cards */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide flex gap-6 cursor-grab py-4"
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onMouseMove={onMouseMove}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-80 flex-shrink-0 cursor-pointer"
              onClick={() => handleCardClick(product.id)}
            >
              <div className="bg-warm-ivory rounded-lg border border-cloud-grey duration-300 overflow-hidden">
                <div className="p-6 flex flex-col items-center">

                  <div
                    className="w-full flex justify-center mb-4"
                    style={{
                      height: "180px",
                      width: "180px",
                      backgroundColor: "#fff",
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="text-center w-full">
                    {product.rating && (
                      <div className="inline-flex items-center gap-1 mb-2 bg-soft-gold text-xs rounded px-2 py-1 font-bold text-pure-black">
                        ⭐ {product.rating} ({product.reviewCount})
                      </div>
                    )}

                    <h3 className="text-deep-mocha font-semibold text-base mb-2 line-clamp-2">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-center gap-3 flex-wrap">
                      <span className="text-soft-gold text-xl font-bold">
                        Rs {product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-cloud-grey line-through">
                          Rs {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                      {product.discountPercent && (
                        <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
                          {product.discountPercent}% OFF
                        </span>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Testimonials;
