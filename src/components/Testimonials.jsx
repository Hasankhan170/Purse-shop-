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

  const onMouseLeave = () => (isDragging.current = false);
  const onMouseUp = () => (isDragging.current = false);

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

  const onTouchEnd = () => (isDragging.current = false);

  const handleCardClick = (id) => {
    if (dragDistance.current < 8) navigate(`/product/${id}`);
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

      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between mb-8 flex-nowrap">
        <h2 className="text-3xl font-extrabold text-deep-mocha max-[580px]:text-2xl">
          What Our Customers Say
        </h2>

        <button
          onClick={() => navigate("/products")}
          className="bg-black text-white px-4 py-2 rounded-md text-sm font-semibold 
                     hover:bg-deep-mocha hover:text-warm-ivory transition whitespace-nowrap flex-shrink-0 ml-4"
        >
          View All
        </button>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">

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


        <div
          ref={scrollContainerRef}
          className="
            flex overflow-x-auto scrollbar-hide cursor-grab gap-6 py-4
            snap-x snap-mandatory
          "
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
  onClick={() => handleCardClick(product.id)}
  className="
    bg-warm-ivory border border-[#3E2723] rounded-lg overflow-hidden
    snap-center cursor-pointer
    flex-shrink-0
    w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1rem)]
  "
>


              <div className="p-6 flex flex-col items-center">

                <div className="h-[180px] w-[180px] bg-white mb-4 flex justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="text-center">
                  {product.rating && (
                    <div className="inline-flex items-center gap-1 mb-2 bg-soft-gold text-xs rounded px-2 py-1 font-bold text-black">
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
