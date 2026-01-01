// import { Link } from "react-router-dom";
// import Testimonials from "../components/Testimonials";
// import LatestCreations from "../components/LatestCreations";
// import Products from "./Products";

// export default function Hero() {
//   return (
//     <>
//       <section className="relative w-full bg-warm-ivory text-sm pb-[120px] px-0">
//         <div className="absolute inset-0 bg-gradient-to-b from-warm-ivory/90 via-warm-ivory/60 to-soft-gold/30"></div>

//         <div className="relative z-10 text-center max-w-3xl mx-auto pt-32 px-6">
//           <div className="flex items-center gap-2 border border-cloud-grey/50 hover:border-soft-gold rounded-full w-max mx-auto px-4 py-2 mb-6 bg-warm-ivory/70 backdrop-blur-sm transition-all">
//             <span className="text-deep-mocha">✨ New Arrivals are here!</span>

//             <Link
//               to="/products"
//               className="flex items-center gap-1 font-medium text-soft-gold hover:text-deep-mocha transition"
//             >
//               <span>Shop Now</span>
//               <svg
//                 width="19"
//                 height="19"
//                 viewBox="0 0 19 19"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M3.959 9.5h11.083m0 0L9.501 3.958M15.042 9.5l-5.541 5.54"
//                   stroke="#C7A87B"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </Link>
//           </div>

//           <h1 className="text-4xl md:text-7xl font-semibold text-deep-mocha leading-tight">
//             Luxury <span className="text-soft-gold">Purses</span> for Every
//             Occasion
//           </h1>

//           <p className="text-base md:text-lg text-cloud-grey mt-6 max-w-2xl mx-auto">
//             Discover timeless elegance and modern style with our curated
//             collection of designer handbags, crafted with love for every woman.
//           </p>

//           <div className="mx-auto flex items-center justify-center gap-3 mt-8">
//             <Link
//               to="/products"
//               className="bg-soft-gold hover:bg-deep-mocha text-pure-black px-8 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-soft-gold"
//             >
//               👜 Explore Collection
//             </Link>

//             <Link
//               to="/about"
//               className="flex items-center gap-2 border border-cloud-grey hover:bg-warm-ivory rounded-full px-8 py-3 font-medium text-deep-mocha transition"
//             >
//               <span>Learn More</span>
//               <svg
//                 width="6"
//                 height="8"
//                 viewBox="0 0 6 8"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M1.25.5 4.75 4l-3.5 3.5"
//                   stroke="#C7A87B"
//                   strokeOpacity=".7"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </Link>
//           </div>
//         </div>

//         <div className="absolute top-0 left-0 w-72 h-72 bg-soft-gold rounded-full blur-3xl opacity-40 animate-pulse"></div>
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-soft-gold rounded-full blur-3xl opacity-30 animate-pulse"></div>
//       </section>

//       <Testimonials />
//       <Products />
//       <LatestCreations />
//     </>
//   );
// }

import { useState, useEffect, useRef } from "react";
import Testimonials from "../components/Testimonials";
import ScheduleBuilder from "../components/Clender";
import Board from "../components/Bord";
import Products from "./Products";
import { Link } from "react-router-dom";

const images = [
  "https://media.istockphoto.com/id/2204715822/photo/luxury-stylish-womens-female-red-brown-leather-hand-bag.webp?a=1&b=1&s=612x612&w=0&k=20&c=OR87QlWWT74tkSkPbupjWcEmE2J6HLyoJnttKsW-OQs=",
  "https://media.istockphoto.com/id/2096125232/photo/close-up-of-different-leather-bags-on-market-modern-colorful-bags-for-sale-womanly-accessories.webp?a=1&b=1&s=612x612&w=0&k=20&c=Wt-ETKzaS6pz2OjS20hdc0AA9Jg6-IjBCHJ7yjapzn4=",
  "https://media.istockphoto.com/id/2186975393/photo/fashionable-woman-in-red-outfit-holding-a-stylish-woven-handbag.webp?a=1&b=1&s=612x612&w=0&k=20&c=wJoFiR_4x-8So-bGkJCKAjaBCf8PtsdG_LXXUZqRTJk=",
  "https://media.istockphoto.com/id/2150602295/photo/close-up-of-a-woman-holding-leather-bag.webp?a=1&b=1&s=612x612&w=0&k=20&c=0wUSQcu9mclEH-RGt3jDs6CqxIHj1JCIRY4_M3XRwqs=",
  "https://media.istockphoto.com/id/2088503599/photo/fashionable-woman.webp?a=1&b=1&s=612x612&w=0&k=20&c=J2foY8j4ofbtZ6RbYFK_kmA5wpYOGDJFyfHdeYL1m8c=",
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
   const [selectedCategory, setSelectedCategory] = useState(null); // <-- add this
  const sliderRef = useRef(null);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  }, [currentSlide]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <>
      <section className="relative w-full h-[91vh] overflow-hidden ">
        <div
          ref={sliderRef}
          className="flex h-full w-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {images.map((src, index) => (
            <div key={index} className="h-full w-full flex-shrink-0">
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="h-full w-full object-cover object-center [image-rendering:auto]"
              />
            </div>
          ))}
        </div>

        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 w-3 rounded-full transition-all ${
                currentSlide === index ? "bg-white w-8" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center  px-6">
          <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg text-white">
            Luxury <span className="text-soft-gold">Purses</span> for Every
            Occasion
          </h1>
          <p className="mt-4 max-w-xl text-lg drop-shadow-md text-white">
            Discover timeless elegance with our curated collection.
          </p>
          <Link
            to="/products"
            className="mt-6 rounded-full bg-deep-mocha px-8 py-3 font-semibold text-white shadow-lg hover:bg-warm-ivory hover:text-black transition"
          >
            👜 Explore Collection
          </Link>
        </div>
      </section>

      <Testimonials />
      <Products/>
      {/* <ScheduleBuilder /> */}
      {/* <Board/> */}

      {/* <LatestCreations /> */}
    </>
  );
}
