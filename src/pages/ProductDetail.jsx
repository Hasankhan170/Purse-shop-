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

  // Collapsible sections state
  const [openSections, setOpenSections] = useState({
    description: true,
    specifications: true,
    features: true,
    shipping: false,
    returns: false,
  });

  // Combine main image with extra images
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
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
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
    // Add your wishlist logic here
  };

  // Collapsible Section Component
  const CollapsibleSection = ({ title, children, isOpen, onToggle, icon: Icon }) => (
    <div className="border border-gray-200 rounded-2xl mb-4 overflow-hidden ">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 bg-warm-ivory hover:bg-gray-50 transition-all duration-300 text-left"
      >
        <div className="flex items-center gap-4">
          {Icon && <Icon className="text-[#C7A87B] text-lg" />}
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        </div>
        {isOpen ? (
          <FaChevronUp className="text-gray-500 transition-transform duration-300" />
        ) : (
          <FaChevronDown className="text-gray-500 transition-transform duration-300" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-6 bg-white animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <section className="bg-warm-ivory min-h-screen py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Image Gallery Section */}
          <div className="lg:col-span-7 ">
            <div className="flex flex-col lg:flex-row gap-6 ">
              {/* Thumbnail Gallery - Vertical on left side */}
              {allImages.length > 1 && (
             <div
  className="
    flex
    justify-center        /* 👈 mobile (below 768px) */
    md:justify-center     /* 👈 tablet */
    lg:justify-start      /* 👈 desktop (left side) */
    lg:flex-col
    gap-3
    overflow-x-auto
    lg:overflow-x-visible
    lg:overflow-y-auto
    custom-scrollbar
    lg:max-h-[500px]
    order-2
    lg:order-1
  "
>


                  {allImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105  ${
                        selectedImageIndex === index
                          ? " shadow-lg scale-105"
                          : "border-none"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover "
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Main Image Container */}
              <div className="flex-1 order-1 lg:order-2">
                <div className="lg:p-4">
                  <div className="relative group">
                    <div className="w-full h-auto max-h-[500px] rounded-2xl overflow-hidden">
                      <img
                        src={allImages[selectedImageIndex]}
                        alt={product.name}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                        style={{
                          maxHeight: "500px",
                          width: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>

                    {allImages.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/95 hover:bg-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-125 border border-gray-200"
                        >
                          <FaArrowLeft className="text-gray-800 text-2xl" />
                        </button>

                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/95 hover:bg-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-125 border border-gray-200"
                        >
                          <FaArrowRight className="text-gray-800 text-2xl" />
                        </button>
                      </>
                    )}

                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm font-medium">
                      {selectedImageIndex + 1} / {allImages.length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-8">
              {/* Header with Actions */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex text-[#C7A87B]">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar key={star} className="fill-current" />
                      ))}
                    </div>
                    <span className="text-gray-500 text-sm">(128 reviews)</span>
                    <span className="text-green-600 text-sm font-medium bg-green-50 px-2 py-1 rounded-full">
                      In Stock
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={toggleWishlist}
                    className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
                      isWishlisted
                        ? "bg-red-50 text-red-500 shadow-lg"
                        : "bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-500"
                    }`}
                  >
                    <FaHeart className={isWishlisted ? "fill-current" : ""} />
                  </button>
                  <button className="p-3 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all duration-300 hover:scale-110">
                    <FaShare />
                  </button>
                </div>
              </div>
               {/* Quantity Selector */}
              <div className="flex items-center justify-between mb-8 p-4 bg-gray-50 rounded-2xl">
                <span className="text-lg font-medium text-gray-900">
                  Quantity
                </span>
                <div className="flex items-center rounded-xl overflow-hidden bg-white shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-5 py-3 text-lg font-semibold hover:bg-gray-100 active:scale-95 transition-all text-gray-700"
                  >
                    −
                  </button>
                  <span className="px-6 py-3 text-lg font-semibold bg-white select-none min-w-12 text-center border-l border-r border-gray-200">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-5 py-3 text-lg font-semibold hover:bg-gray-100 active:scale-95 transition-all text-gray-700"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-2xl text-lg font-semibold shadow-lg hover:bg-[#C7A87B] hover:text-gray-900 hover:-translate-y-1 hover:shadow-xl active:scale-95 transition-all duration-300 group"
                >
                  <FaShoppingCart className="group-hover:scale-110 transition-transform" />
                  Add to Cart
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-[#C7A87B] text-white rounded-2xl text-lg font-semibold shadow-lg hover:bg-gray-900 hover:text-white hover:-translate-y-1 hover:shadow-xl active:scale-95 transition-all duration-300 group"
                >
                  <FaBolt className="group-hover:scale-110 transition-transform" />
                  Buy Now
                </button>
              </div>

              {/* Pricing */}
              <div className="mb-6 mt-6 p-4 bg-gradient-to-r from-[#F8F5F0] to-[#F0EBE2] rounded-2xl">
                <div className="flex items-center gap-4">
                  <p className="text-4xl font-bold text-gray-900">
                    ${totalPrice}
                  </p>
                  <div className="flex flex-col">
                    <p className="text-gray-500 line-through text-lg">
                      ${(product.price * 1.2).toFixed(2)}
                    </p>
                    <span className="bg-[#C7A87B] text-white text-sm font-medium px-3 py-1 rounded-full">
                      20% OFF
                    </span>
                  </div>
                </div>
              </div>

              

              {/* Collapsible Sections */}
              <div className="space-y-4 mb-8">
                {/* Description Section */}
                <CollapsibleSection
                  title="Product Description"
                  isOpen={openSections.description}
                  onToggle={() => toggleSection('description')}
                  icon={FaChevronRight}
                >
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {product.description ||
                      "A luxurious handcrafted item that blends elegance and durability, designed to elevate your look for any occasion."}
                  </p>
                </CollapsibleSection>

                {/* Specifications Section */}
                <CollapsibleSection
                  title="Specifications"
                  isOpen={openSections.specifications}
                  onToggle={() => toggleSection('specifications')}
                  icon={FaChevronRight}
                >
                  <div className="grid grid-cols-1 gap-3 text-sm">
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600">Material</span>
                      <span className="font-medium text-gray-900">
                        {product.material || "Premium Leather"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600">Color</span>
                      <span className="font-medium text-gray-900">
                        {product.color || "Tan"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600">Style</span>
                      <span className="font-medium text-gray-900">
                        {product.style || "Biker / Modern"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-600">Warranty</span>
                      <span className="font-medium text-gray-900">
                        {product.warranty || "1 Year"}
                      </span>
                    </div>
                  </div>
                </CollapsibleSection>

                {/* Features Section */}
                <CollapsibleSection
                  title="Features & Benefits"
                  isOpen={openSections.features}
                  onToggle={() => toggleSection('features')}
                  icon={FaChevronRight}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-gray-700 p-3 rounded-xl bg-gray-50">
                      <FaTruck className="text-[#C7A87B] text-lg" />
                      <span className="text-sm font-medium">Free Shipping</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700 p-3 rounded-xl bg-gray-50">
                      <FaShieldAlt className="text-[#C7A87B] text-lg" />
                      <span className="text-sm font-medium">2 Year Warranty</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700 p-3 rounded-xl bg-gray-50">
                      <FaUndo className="text-[#C7A87B] text-lg" />
                      <span className="text-sm font-medium">30-Day Returns</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700 p-3 rounded-xl bg-gray-50">
                      <FaClock className="text-[#C7A87B] text-lg" />
                      <span className="text-sm font-medium">Fast Delivery</span>
                    </div>
                  </div>
                </CollapsibleSection>

                {/* Shipping Info */}
                <CollapsibleSection
                  title="Shipping Information"
                  isOpen={openSections.shipping}
                  onToggle={() => toggleSection('shipping')}
                  icon={FaTruck}
                >
                  <div className="space-y-3 text-gray-600">
                    <p><strong>Free Standard Shipping</strong> on all orders</p>
                    <p><strong>Express Shipping:</strong> 2-3 business days - $9.99</p>
                    <p><strong>Overnight Shipping:</strong> Next business day - $19.99</p>
                    <p>Orders placed before 2 PM EST are processed the same day</p>
                  </div>
                </CollapsibleSection>

                {/* Returns Info */}
                <CollapsibleSection
                  title="Returns & Exchanges"
                  isOpen={openSections.returns}
                  onToggle={() => toggleSection('returns')}
                  icon={FaUndo}
                >
                  <div className="space-y-3 text-gray-600">
                    <p><strong>30-Day Return Policy:</strong> Easy returns within 30 days of delivery</p>
                    <p><strong>Free Returns:</strong> We provide free return shipping</p>
                    <p><strong>Condition:</strong> Items must be unused and in original packaging</p>
                    <p><strong>Process:</strong> Refunds processed within 5-7 business days</p>
                  </div>
                </CollapsibleSection>
              </div>

             
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8 lg:p-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-10 text-center">
              Customer Reviews
            </h2>

            {/* Review Form */}
            <form
              onSubmit={handleReviewSubmit}
              className="flex flex-col gap-6 mb-12 bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl shadow-lg"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                Share Your Experience
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#C7A87B] text-gray-900 bg-white transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Rating
                  </label>
                  <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setForm({ ...form, rating: star })}
                          className={`text-2xl transition-all duration-200 hover:scale-110 ${
                            star <= form.rating
                              ? "text-[#C7A87B] scale-110"
                              : "text-gray-300 hover:text-[#C7A87B]"
                          }`}
                        >
                          <FaStar />
                        </button>
                      ))}
                    </div>
                    <span className="text-gray-700 font-medium">
                      {form.rating} / 5
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review
                </label>
                <textarea
                  placeholder="Share your detailed experience with this product..."
                  value={form.comment}
                  onChange={(e) =>
                    setForm({ ...form, comment: e.target.value })
                  }
                  className="w-full border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#C7A87B] text-gray-900 bg-white min-h-[120px] transition-all duration-300"
                  rows="4"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="self-start flex items-center gap-3 bg-[#C7A87B] text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:bg-gray-900 hover:-translate-y-1 active:scale-95 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed group"
              >
                {loading ? "Submitting..." : "Post Review"}
                <FaCheck className="group-hover:scale-110 transition-transform" />
              </button>
            </form>

            {/* Reviews List */}
            {reviews.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-8xl text-gray-300 mb-6">💬</div>
                <p className="text-gray-600 text-xl mb-4">
                  No reviews yet. Be the first to share your thoughts!
                </p>
                <p className="text-gray-500">
                  Your review will help other customers make better decisions.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {reviews.map((r) => (
                  <div
                    key={r.id}
                    className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 gap-3">
                      <p className="font-semibold text-gray-900 text-lg">
                        {r.name}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="flex text-[#C7A87B]">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <FaStar
                              key={s}
                              className={`text-sm ${
                                s <= r.rating ? "fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-gray-500 text-sm">
                          {r.timestamp?.toDate().toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
}