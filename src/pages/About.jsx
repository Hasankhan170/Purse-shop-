import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      <section className="overflow-hidden pt-20 pb-12 lg:pt-[120px] lg:pb-[90px] bg-warm-ivory">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center justify-between -mx-4">
            {/* Images Section */}
            <div className="w-full px-4 lg:w-6/12">
              <div className="flex items-center -mx-3 sm:-mx-4">
                <div className="w-full px-3 sm:px-4 xl:w-1/2 space-y-4">
                  <div className="py-3 sm:py-4">
                    <img
                      src="https://cdn.tailgrids.com/assets/images/marketing/about/about-01/image-1.jpg"
                      alt="Luxury Purse 1"
                      className="w-full max-w-md rounded-2xl mx-auto"
                    />
                  </div>
                  <div className="py-3 sm:py-4">
                    <img
                      src="https://cdn.tailgrids.com/assets/images/marketing/about/about-01/image-2.jpg"
                      alt="Luxury Purse 2"
                      className="w-full max-w-md rounded-2xl mx-auto"
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                  <div className="relative z-10 my-4">
                    <img
                      src="https://cdn.tailgrids.com/assets/images/marketing/about/about-01/image-3.jpg"
                      alt="Luxury Purse 3"
                      className="w-full max-w-md rounded-2xl mx-auto"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Text Section */}
            <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
              <div className="mt-10 lg:mt-0">
                <span className="block mb-4 text-lg font-semibold text-soft-gold">
                  Why Choose Our Purses
                </span>
                <h2 className="mb-5 text-3xl font-bold text-deep-mocha sm:text-[40px]/[48px]">
                  Handcrafted Elegance for Every Occasion
                </h2>
                <p className="mb-5 text-base text-deep-mocha">
                  Discover our range of luxury purses designed for style and durability. Every piece is carefully crafted to complement your unique fashion sense.
                </p>
                <p className="mb-8 text-base text-deep-mocha">
                  From classic designs to modern trends, our purses combine functionality with sophistication. Make a statement wherever you go.
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center py-3 text-base font-medium text-center text-white border border-transparent rounded-md px-7 bg-deep-mocha hover:bg-soft-gold"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
