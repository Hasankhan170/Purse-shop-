import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { products } from "../data/products";
import { useCart } from "../hooks/useCart";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../Firebase";
import {
  FaArrowLeft,
  FaArrowRight,
  FaStar,
  FaShoppingCart,
  FaBolt,
  FaHeart,
  FaShare,
  FaCheck,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaClock,
  FaChevronDown,
  FaChevronUp,
  FaChevronRight,
} from "react-icons/fa";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id.toString() === id);

  const addToCart = useCart((state) => state.addToCart || state.add);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product ? product.price : 0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: "", rating: 5, comment: "" });
  const [loading, setLoading] = useState(false);

  // Mobile screen detection
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [openSections, setOpenSections] = useState({
    description: false, 
    specifications: false,
    features: false,
    shipping: false,
    returns: false,
  });

  const allImages = product
    ? [product.image, ...(product.extraImages || [])]
    : [];

  useEffect(() => {
    if (!product) return;
    const q = query(
      collection(db, "products", product.id.toString(), "reviews"),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(list);
    });
    return () => unsubscribe();
  }, [product]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.comment) return;

    setLoading(true);
    try {
      await addDoc(
        collection(db, "products", product.id.toString(), "reviews"),
        {
          name: form.name,
          rating: Number(form.rating),
          comment: form.comment,
          timestamp: serverTimestamp(),
        }
      );
      setForm({ name: "", rating: 5, comment: "" });
    } catch (err) {
      console.error("Error adding review:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (product) setTotalPrice((product.price * quantity).toFixed(2));
  }, [quantity, product]);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (!product) {
    return (
      <div className="text-center py-20 text-gray-600 text-xl">
        Product not found.
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/checkout");
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const CollapsibleSection = ({
    title,
    children,
    isOpen,
    onToggle,
    icon: Icon,
  }) => (
    <div className="border border-gray-200 rounded-2xl mb-3 overflow-hidden transition-all duration-300 hover:shadow-md">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 md:p-5 bg-warm-ivory hover:bg-gray-50 transition-all duration-300 text-left"
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="text-[#C7A87B] text-sm md:text-base" />}
          <h3 className="text-base md:text-lg font-semibold text-gray-900">
            {title}
          </h3>
        </div>
        {isOpen ? (
          <FaChevronUp className="text-gray-500 text-sm md:text-base transition-transform duration-300" />
        ) : (
          <FaChevronDown className="text-gray-500 text-sm md:text-base transition-transform duration-300" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 md:px-5 pb-4 md:pb-5 bg-white animate-fadeIn">
          <div className="text-sm md:text-base text-gray-600 leading-relaxed">
            {children}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <section className="bg-warm-ivory min-h-screen py-4 md:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Main Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-12">
          {/* Image Gallery Section */}
          <div className="lg:col-span-7">
            <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
              
{allImages.length > 1 && (
 <div
  className="
    grid grid-flow-col auto-cols-max gap-2
    overflow-x-auto
    lg:grid lg:grid-flow-row lg:auto-rows-max
    lg:gap-3
    lg:overflow-x-visible
    lg:overflow-y-auto
    custom-scrollbar
    lg:max-h-[500px]
    order-2
    lg:order-1
    py-2
    px-2
    max-[1024px]:w-full
      mx-auto
  "
>
  {allImages.map((image, index) => (
    <button
      key={index}
      onClick={() => setSelectedImageIndex(index)}
      className={`
        w-16 h-16
        max-[1024px]:w-49 max-[1024px]:h-30
        max-[811px]:w-46 max-[811px]:h-30
        max-[603px]:w-34 max-[603px]:h-30
        max-[462px]:w-25 



        rounded-lg
        
        md:rounded-xl
        mx-auto
        overflow-hidden
        transition-all
        duration-300
        hover:scale-105
        ${selectedImageIndex === index }
      `}
    >
      <img
        src={image}
        alt={`${product.name} view ${index + 1}`}
        className="w-full h-full object-cover"
      />
    </button>
  ))}
</div>
)}

              
<div className="flex-1 order-1 lg:order-2">
  <div className="lg:p-2">
    <div className="relative group">
      <div className="w-full h-auto rounded-xl md:rounded-2xl overflow-hidden ">
        <img
          src={allImages[selectedImageIndex]}
          alt={product.name}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 "
          style={{
            width: "100%",
            objectFit: "contain",
          }}
        />
        
        {/* Arrows on top of the image */}
       {allImages.length > 1 && (
  <>
    <button
      onClick={prevImage}
      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/95 hover:bg-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 border border-gray-200 z-10"
    >
      <FaArrowLeft className="text-gray-800 text-lg md:text-xl" />
    </button>

    <button
      onClick={nextImage}
      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/95 hover:bg-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 border border-gray-200 z-10"
    >
      <FaArrowRight className="text-gray-800 text-lg md:text-xl" />
    </button>
  </>
)}
      </div>

      {/* Image Dots */}
      {allImages.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full z-10">
          {allImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                selectedImageIndex === index
                  ? "w-2 h-2 md:w-2.5 md:h-2.5 bg-[#C7A87B]"
                  : "w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-400 hover:bg-[#C7A87B]"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  </div>
</div>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg md:shadow-2xl p-4 md:p-6 lg:p-8">
              {/* Header with Actions */}
              <div className="flex justify-between items-start mb-4 md:mb-6">
                <div className="flex-1 pr-2">
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                    {product.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3">
                    <div className="flex text-[#C7A87B] text-sm md:text-base">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar key={star} className="fill-current" />
                      ))}
                    </div>
                    <span className="text-xs md:text-sm text-gray-500">
                      (128 reviews)
                    </span>
                    <span className="text-xs md:text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
                      In Stock
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={toggleWishlist}
                    className={`p-2 md:p-3 rounded-lg md:rounded-xl transition-all duration-300 hover:scale-105 ${
                      isWishlisted
                        ? "bg-red-50 text-red-500 shadow-md"
                        : "bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-500"
                    }`}
                  >
                    <FaHeart
                      className={`text-sm md:text-base ${
                        isWishlisted ? "fill-current" : ""
                      }`}
                    />
                  </button>
                  <button className="p-2 md:p-3 rounded-lg md:rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                    <FaShare className="text-sm md:text-base" />
                  </button>
                </div>
              </div>

              {/* Pricing - Mobile First Eye-catching */}
              <div className="mb-4 md:mb-6 p-3 md:p-4 bg-gradient-to-r from-[#F8F5F0] to-[#F0EBE2] rounded-xl md:rounded-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-gray-900">
                      ${totalPrice}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm md:text-base text-gray-500 line-through">
                        ${(product.price * 1.2).toFixed(2)}
                      </p>
                      <span className="bg-[#C7A87B] text-white text-xs md:text-sm font-medium px-2 py-1 rounded-full">
                        SAVE 20%
                      </span>
                    </div>
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 bg-white/70 px-3 py-1.5 rounded-lg">
                    <span className="font-semibold text-[#C7A87B]">FREE</span>
                    <br />
                    Shipping
                  </div>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between mb-6 p-3 md:p-4 bg-gray-50 rounded-xl md:rounded-2xl">
                <span className="text-base md:text-lg font-medium text-gray-900">
                  Qty
                </span>
                <div className="flex items-center rounded-lg md:rounded-xl overflow-hidden bg-white shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2.5 md:px-5 md:py-3 text-base font-semibold hover:bg-gray-100 active:scale-95 transition-all text-gray-700"
                  >
                    −
                  </button>
                  <span className="px-4 py-2.5 md:px-6 md:py-3 text-base md:text-lg font-semibold bg-white select-none min-w-10 md:min-w-12 text-center border-l border-r border-gray-200">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2.5 md:px-5 md:py-3 text-base font-semibold hover:bg-gray-100 active:scale-95 transition-all text-gray-700"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons - Prominent on Mobile */}
              <div className="flex flex-col gap-3 mb-6 md:mb-8">
                <button
                  onClick={handleBuyNow}
                  className="w-full flex items-center justify-center gap-3 px-6 py-3.5 md:py-4 bg-[#C7A87B] text-white rounded-xl md:rounded-2xl text-base md:text-lg font-semibold shadow-lg hover:bg-gray-900 hover:text-white hover:-translate-y-0.5 hover:shadow-xl active:scale-95 transition-all duration-300 group"
                >
                  <FaBolt className="group-hover:scale-110 transition-transform" />
                  Buy Now - Only ${totalPrice}
                </button>

                <button
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center gap-3 px-6 py-3 md:py-3.5 bg-gray-900 text-white rounded-xl md:rounded-2xl text-base md:text-lg font-semibold shadow-lg hover:bg-[#C7A87B] hover:text-gray-900 hover:-translate-y-0.5 hover:shadow-xl active:scale-95 transition-all duration-300 group"
                >
                  <FaShoppingCart className="group-hover:scale-110 transition-transform" />
                  Add to Cart
                </button>
              </div>

             

              {/* Collapsible Sections - Compact on Mobile */}
              <div className="space-y-3">
                {/* Description Section */}
                <CollapsibleSection
                  title="Description"
                  isOpen={openSections.description}
                  onToggle={() => toggleSection("description")}
                  icon={FaChevronRight}
                >
                  <p className="text-sm md:text-base">
                    {product.description ||
                      "Premium quality product with excellent craftsmanship and attention to detail. Designed for durability and style."}
                  </p>
                </CollapsibleSection>

                {/* Specifications Section */}
                <CollapsibleSection
                  title="Specs"
                  isOpen={openSections.specifications}
                  onToggle={() => toggleSection("specifications")}
                  icon={FaChevronRight}
                >
                  <div className="grid grid-cols-1 gap-2 text-xs md:text-sm">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Material</span>
                      <span className="font-medium text-gray-900">
                        {product.material || "Premium Leather"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Color</span>
                      <span className="font-medium text-gray-900">
                        {product.color || "Tan"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Style</span>
                      <span className="font-medium text-gray-900">
                        {product.style || "Modern"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Warranty</span>
                      <span className="font-medium text-gray-900">
                        {product.warranty || "1 Year"}
                      </span>
                    </div>
                  </div>
                </CollapsibleSection>

                {/* Features Section */}
                {/* <CollapsibleSection
                  title="Features"
                  isOpen={openSections.features}
                  onToggle={() => toggleSection("features")}
                  icon={FaChevronRight}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C7A87B]"></div>
                      <span className="text-sm">Premium quality materials</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C7A87B]"></div>
                      <span className="text-sm">Water resistant</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C7A87B]"></div>
                      <span className="text-sm">Easy maintenance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C7A87B]"></div>
                      <span className="text-sm">Comfortable design</span>
                    </div>
                  </div>
                </CollapsibleSection> */}

                {/* Shipping Info */}
                {/* <CollapsibleSection
                  title="Shipping"
                  isOpen={openSections.shipping}
                  onToggle={() => toggleSection("shipping")}
                  icon={FaTruck}
                >
                  <div className="space-y-2 text-xs md:text-sm">
                    <p className="font-medium">• Free Standard: 3-5 days</p>
                    <p className="font-medium">• Express: 2-3 days - $9.99</p>
                    <p className="font-medium">• Overnight: Next day - $19.99</p>
                    <p className="text-gray-500 mt-2">
                      Orders before 2 PM ship same day
                    </p>
                  </div>
                </CollapsibleSection> */}

                {/* Returns Info */}
                <CollapsibleSection
                  title="Returns"
                  isOpen={openSections.returns}
                  onToggle={() => toggleSection("returns")}
                  icon={FaUndo}
                >
                  <div className="space-y-2 text-xs md:text-sm">
                    <p className="font-medium">• 30-Day return policy</p>
                    <p className="font-medium">• Free return shipping</p>
                    <p className="font-medium">• Full refund in 5-7 days</p>
                    <p className="text-gray-500 mt-2">
                      Must be unused with original packaging
                    </p>
                  </div>
                </CollapsibleSection>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section - Optimized for Mobile */}
        <div className="mt-8 md:mt-12 bg-white rounded-2xl md:rounded-3xl shadow-lg md:shadow-2xl overflow-hidden">
          <div className="p-4 md:p-6 lg:p-8">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-center">
              Customer Reviews
            </h2>

            {/* Review Form - Compact on Mobile */}
            <form
              onSubmit={handleReviewSubmit}
              className="flex flex-col gap-4 md:gap-6 mb-8 md:mb-12 bg-gradient-to-br from-gray-50 to-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-lg"
            >
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                Share Your Experience
              </h3>

              <div className="grid grid-cols-1 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg md:rounded-xl p-3 md:p-4 focus:outline-none focus:ring-2 focus:ring-[#C7A87B] text-gray-900 bg-white text-sm md:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Rating
                  </label>
                  <div className="flex items-center justify-between bg-white p-3 md:p-4 rounded-lg md:rounded-xl border border-gray-200">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setForm({ ...form, rating: star })}
                          className={`text-lg md:text-xl transition-all duration-200 hover:scale-110 ${
                            star <= form.rating
                              ? "text-[#C7A87B] scale-110"
                              : "text-gray-300 hover:text-[#C7A87B]"
                          }`}
                        >
                          <FaStar />
                        </button>
                      ))}
                    </div>
                    <span className="text-gray-700 font-medium text-sm md:text-base">
                      {form.rating}/5
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Review
                  </label>
                  <textarea
                    placeholder="Share your experience..."
                    value={form.comment}
                    onChange={(e) =>
                      setForm({ ...form, comment: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-lg md:rounded-xl p-3 md:p-4 focus:outline-none focus:ring-2 focus:ring-[#C7A87B] text-gray-900 bg-white text-sm md:text-base min-h-[80px] md:min-h-[120px]"
                    rows="3"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="self-start flex items-center gap-2 bg-[#C7A87B] text-white px-5 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-semibold text-sm md:text-base shadow-lg hover:bg-gray-900 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed group"
              >
                {loading ? "Submitting..." : "Post Review"}
                <FaCheck className="group-hover:scale-110 transition-transform" />
              </button>
            </form>

            {/* Reviews List - Compact on Mobile */}
            {reviews.length === 0 ? (
              <div className="text-center py-8 md:py-12">
                <div className="text-5xl md:text-6xl text-gray-300 mb-4">💬</div>
                <p className="text-gray-600 text-base md:text-lg mb-3">
                  No reviews yet. Be the first!
                </p>
                <p className="text-gray-500 text-sm md:text-base">
                  Your review helps others decide
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.slice(0, isMobile ? 3 : 10).map((r) => (
                  <div
                    key={r.id}
                    className="bg-gradient-to-br from-white to-gray-50 p-4 rounded-xl md:rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex flex-col gap-2 mb-3">
                      <div className="flex justify-between items-start">
                        <p className="font-semibold text-gray-900 text-sm md:text-base">
                          {r.name}
                        </p>
                        <div className="flex items-center gap-1 md:gap-2">
                          <div className="flex text-[#C7A87B] text-xs md:text-sm">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <FaStar
                                key={s}
                                className={`${
                                  s <= r.rating
                                    ? "fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs md:text-sm text-gray-500">
                        {r.timestamp?.toDate().toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                      {r.comment}
                    </p>
                  </div>
                ))}
                
                {isMobile && reviews.length > 3 && (
                  <button
                    onClick={() => navigate(`/product/${id}/reviews`)}
                    className="w-full py-3 text-center text-[#C7A87B] font-medium border border-[#C7A87B] rounded-xl hover:bg-[#C7A87B] hover:text-white transition-all duration-300"
                  >
                    View All {reviews.length} Reviews →
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
  
  /* Mobile पर छोटी images एक लाइन में display करने के लिए */
  @media (max-width: 768px) {
    .thumbnail-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 8px;
      overflow-x: visible;
      padding-bottom: 0;
    }
    
    .thumbnail-button {
      flex: 0 0 calc(33.333% - 8px);
      max-width: calc(33.333% - 8px);
    }
  }
  
  .custom-scrollbar::-webkit-scrollbar {
    height: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 10px;
  }
  
  @media (min-width: 1024px) {
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
      height: auto;
    }
  }
`}</style>
    </section>
  );
}