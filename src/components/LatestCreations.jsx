import React from "react";
import { products } from "../data/products"; // Your products data
import { useNavigate } from "react-router-dom";

const LatestCreations = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-warm-ivory">
      
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-3xl md:text-5xl font-semibold text-deep-mocha">
          Explore Our <span className="text-soft-gold">Our Latest Creations</span>
        </h2>
        <p className="text-cloud-grey mt-4 max-w-2xl mx-auto">
           A visual collection of our most recent works - each piece crafted with intention, emotion, and style.
        </p>
      </div>

     


      <div className="flex flex-wrap justify-center mt-12 gap-4 max-w-7xl mx-auto max-[472px]:p-5">
  {products.map((product) => (
    <div
      key={product.id}
      className="relative group overflow-hidden rounded-lg cursor-pointer 
                 w-full sm:w-80 md:w-56 lg:w-72 xl:w-80"
      style={{ maxWidth: '460px' }} 
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 sm:h-80 md:h-56 lg:h-72 xl:h-80 object-cover object-top"
      />
      <div className="absolute inset-0 flex flex-col justify-end p-4 text-white bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <h1 className="text-xl font-medium">{product.name}</h1>
        <a href="#" className="flex items-center gap-1 text-sm text-white/70">
          Show More
          {/* SVG stays the same */}
        </a>
      </div>
    </div>
  ))}
</div>

    </section>
  );
};

export default LatestCreations;
