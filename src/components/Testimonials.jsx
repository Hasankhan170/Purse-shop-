import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { products } from "../data/products";
import { useNavigate } from "react-router-dom";

const Testimonials = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-warm-ivory py-16 px-5">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between mb-8">
        <h2 className="text-3xl max-[482px]:text-2xl max-[449px]:text-xl  font-extrabold text-deep-mocha">
          What Our Customers Say
        </h2>

        <button
          onClick={() => navigate("/products")}
          className="bg-deep-mocha text-white px-4 py-2 rounded-md text-sm font-semibold transition hover:bg-brown-800"
        >
          View All
        </button>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center relative">
          
          <div className="w-full relative">
          <Swiper
  modules={[Navigation, Pagination]}
  navigation={{
    nextEl: ".swiper-button-next-custom",
    prevEl: ".swiper-button-prev-custom",
  }}
  pagination={{
    clickable: true,
    el: ".custom-pagination",
    bulletClass: "swiper-pagination-bullet-custom",
    bulletActiveClass: "swiper-pagination-bullet-active-custom",
  }}
  spaceBetween={28}
  loop
  className="!pb-16"
  breakpoints={{
    0: { 
      slidesPerView: 1.5, // show 1 slide + tiny peek of next
      spaceBetween: 16,
    },
    640: { 
      slidesPerView: 2.4, // 2 slides + peek of 3rd
      spaceBetween: 24,
    },
    1024: { 
      slidesPerView: 3.3, // 3 slides + peek of 4th
      spaceBetween: 28,
    },
  }}
>
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <div
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="
                      bg-[#3E2723]
                      rounded-2xl
                      shadow-[0_4px_12px_rgba(0,0,0,0.08)]
                      hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)]
                      transition-all duration-300
                      cursor-pointer
                      overflow-hidden
                      flex flex-col h-full
                    "
                  >
                    <div className="w-full h-[220px] bg-[#f7f3ea] flex items-center justify-center overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-6 text-center">
                      {product.rating && (
                        <div className="inline-flex items-center gap-1 mb-2 bg-soft-gold text-xs rounded px-2 py-1 font-bold text-white">
                          ⭐ {product.rating} ({product.reviewCount})
                        </div>
                      )}

                      <h3 className="text-white font-semibold text-base mb-2 line-clamp-2">
                        {product.name}
                      </h3>

                      <div className="flex items-center justify-center gap-3 flex-wrap">
                        <span className="text-white text-xl font-bold">
                          Rs {product.price.toLocaleString()}
                        </span>

                        {product.originalPrice && (
                          <span className="text-sm text-white line-through">
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
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="custom-pagination flex justify-center flex-wrap items-center gap-2  sm:mt-2"></div>
          </div>

         
        </div>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet-custom {
          width: 6px;  /* smaller on mobile */
          height: 6px;
          background-color: #000000;
          opacity: 0.4;
          border-radius: 50%;
          display: inline-block;
          margin: 0 3px; /* reduce gap on mobile */
          cursor: pointer;
          transition: opacity 0.3s ease;
        }
        
        .swiper-pagination-bullet-active-custom {
          opacity: 1;
        }

        @media (min-width: 640px) {
          .swiper-pagination-bullet-custom {
            width: 8px;
            height: 8px;
            margin: 0 4px;
          }
        }
      `}</style>
    </div>
  );
};

export default Testimonials;
