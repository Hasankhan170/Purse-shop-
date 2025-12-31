import React, { useState } from "react";
import { useCart } from "../hooks/useCart";

export default function Checkout() {
  const cart = useCart((state) => state.cart);
  const totalPrice = useCart((state) => state.totalPrice);
  const clearCart = useCart((state) => state.clear);

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target);

    try {
      const response = await fetch("https://formspree.io/f/mqageaoo", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        clearCart();
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-ivory py-20 px-6">
        <div className="bg-warm-ivory p-10 rounded-xl border-2 shadow-lg text-center"
             style={{ borderColor: "#3E2723" }}>
          <h2 className="text-3xl font-bold mb-3 text-deep-mocha">Thank You!</h2>
          <p className="text-deep-mocha">Your order has been submitted successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-ivory flex justify-center py-20 px-4">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10">

        {/* ORDER SUMMARY */}
        <div
          className="p-8 rounded-xl shadow-md bg-warm-ivory transition"
          style={{ border: "2px solid #3E2723" }}
        >
          <h2 className="text-3xl font-bold mb-6 text-deep-mocha">Order Summary</h2>

          <div className="divide-y" style={{ borderColor: "#3E2723" }}>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between py-4">
                <div>
                  <h4 className="font-semibold text-deep-mocha text-lg">{item.name}</h4>
                  <p className="text-sm text-deep-mocha opacity-70">
                    {item.qty} × ${item.price}
                  </p>
                </div>
                <p className="font-bold text-deep-mocha text-lg">
                  ${item.qty * item.price}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-between font-bold text-2xl mt-6 text-deep-mocha">
            <span>Total:</span>
            <span>${totalPrice()}</span>
          </div>
        </div>

        {/* SHIPPING FORM */}
        <form
          onSubmit={handleSubmit}
          className="p-8 rounded-xl shadow-md bg-warm-ivory flex flex-col gap-5"
          style={{ border: "2px solid #3E2723" }}
        >
          <h2 className="text-3xl font-bold mb-4 text-deep-mocha">Shipping Info</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="border rounded-lg p-3 text-deep-mocha text-lg"
            style={{ borderColor: "#3E2723" }}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="border rounded-lg p-3 text-deep-mocha text-lg"
            style={{ borderColor: "#3E2723" }}
          />

          <input
            type="text"
            name="address"
            placeholder="Street Address"
            required
            className="border rounded-lg p-3 text-deep-mocha text-lg"
            style={{ borderColor: "#3E2723" }}
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            required
            className="border rounded-lg p-3 text-deep-mocha text-lg"
            style={{ borderColor: "#3E2723" }}
          />

          <input
            type="text"
            name="zip"
            placeholder="Zip Code"
            required
            className="border rounded-lg p-3 text-deep-mocha text-lg"
            style={{ borderColor: "#3E2723" }}
          />

          {/* Hidden Product Fields */}
          {cart.map((item, index) => (
            <div key={item.id}>
              <input type="hidden" name={`products[${index}][name]`} value={item.name} />
              <input type="hidden" name={`products[${index}][qty]`} value={item.qty} />
              <input type="hidden" name={`products[${index}][price]`} value={item.price} />
            </div>
          ))}

          {error && <p className="text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="py-3 mt-2 text-lg font-semibold rounded-lg transition 
           bg-deep-mocha text-white shadow-md 
           hover:bg-[#3E2723] hover:!text-white"

          >
            {loading ? "Submitting..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
}
