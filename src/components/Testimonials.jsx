
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { products } from "../data/products";
import { useNavigate } from "react-router-dom";

const Testimonials = () => {
  const navigate = useNavigate();

  return (
    <>
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          background: black !important;
          color: white !important;
          width: 48px !important;
          height: 48px !important;
          border-radius: 50% !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
          z-index: 100 !important;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: #3e2723 !important;
        }

        .swiper-button-next {
          right: -60px !important; /* more outside */
        }

        .swiper-button-prev {
          left: -60px !important; /* more outside */
        }

        /* Hide arrows on small screens */
        @media (max-width: 640px) {
          .swiper-button-next,
          .swiper-button-prev {
            display: none !important;
          }
        }
      `}</style>

      <div className="w-full bg-warm-ivory py-16">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between mb-8">
          <h2 className="text-3xl max-[482px]:text-2xl max-[410px]:text-xl font-extrabold text-deep-mocha">
            What Our Customers Say
          </h2>

          <button
            onClick={() => navigate("/products")}
            className="bg-deep-mocha text-white px-4 py-2 rounded-md text-sm font-semibold 
                  transition"
          >
            View All
          </button>
        </div>

        {/* Slider Container */}
        <div className="max-w-7xl mx-auto px-4 relative">
          <Swiper
            modules={[Navigation]}
            navigation={true}
            spaceBetween={28}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 28 },
            }}
            loop={true}
            className="pb-10"
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
                  <div className="p-6 flex flex-col items-center">
                    <div
                      className="h-[180px] w-[180px]  mb-4 flex justify-center 
                      rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.07)]"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover rounded-xl"
                      />
                    </div>

                    <div className="text-center">
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
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Testimonials;
