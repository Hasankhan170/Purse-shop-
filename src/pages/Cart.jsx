import { useState } from "react";
import { useCart } from "../hooks/useCart";
import CartItem from "../components/CartItem";

export default function Cart() {
  const cart = useCart((state) => state.cart);
  const totalPrice = useCart((state) => state.totalPrice);
  const clear = useCart((state) => state.clear);
  const [orderSent, setOrderSent] = useState(false);

  const handleCheckout = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);


    cart.forEach((item, idx) => {
      formData.append(`item_${idx + 1}_name`, item.name);
      formData.append(`item_${idx + 1}_qty`, item.qty);
      formData.append(`item_${idx + 1}_price`, item.price * item.qty);
    });
    formData.append("total", totalPrice());

    try {
      await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      setOrderSent(true);
      clear();
    } catch (err) {
      alert("Order failed. Try again.");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 bg-gradient-to-b from-white via-pink-50 to-pink-100 min-h-[70vh] mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Your cart is empty 👜
        </h2>
        <p className="text-gray-600">
          Add some stylish purses to your cart and make your day more elegant!
        </p>
      </div>
    );
  }

  return (
    <section className="relative bg-gradient-to-b from-white via-pink-50 to-pink-100 py-16 px-6 min-h-[90vh] pb-24 md:pb-32">
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">
          Your <span className="text-pink-600">Shopping Bag</span>
        </h1>

        <div className="bg-white/80 backdrop-blur-sm shadow-md rounded-2xl p-6 md:p-8 border border-pink-100">
          <div className="divide-y divide-pink-100">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="flex justify-between items-center mt-8 border-t border-pink-100 pt-6">
            <h3 className="text-xl font-semibold text-gray-800">Total</h3>
            <p className="text-2xl font-bold text-pink-600">
              ${totalPrice()}
            </p>
          </div>
        </div>

       
      </div>
    </section>
  );
}
