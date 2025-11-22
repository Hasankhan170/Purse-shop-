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
      <div className="min-h-screen flex items-center justify-center bg-warm-ivory p-6">
        <div className="bg-warm-ivory p-8 rounded-lg border border-cloud-grey shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-deep-mocha">Thank You!</h2>
          <p className="text-deep-mocha">Your order has been submitted successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-ivory flex items-start justify-center py-16 px-4">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-warm-ivory p-6 rounded-lg border border-cloud-grey hover:shadow-md transition">
          <h2 className="text-2xl font-bold mb-4 text-deep-mocha">Order Summary</h2>
          <div className="divide-y divide-cloud-grey">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between py-2">
                <div>
                  <h4 className="font-medium text-deep-mocha">{item.name}</h4>
                  <p className="text-sm text-deep-mocha">
                    {item.qty} x ${item.price}
                  </p>
                </div>
                <p className="font-semibold text-deep-mocha">${item.qty * item.price}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-bold text-lg mt-4 text-deep-mocha">
            <span>Total:</span>
            <span>${totalPrice()}</span>
          </div>
        </div>

       <form
  onSubmit={handleSubmit}
  className="bg-warm-ivory p-6 rounded-lg border border-cloud-grey hover:shadow-md transition flex flex-col gap-4"
>
  <h2 className="text-2xl font-bold mb-4 text-deep-mocha">Shipping Info</h2>

  <input
    type="text"
    name="name"
    placeholder="Full Name"
    required
    className="border border-cloud-grey rounded-lg p-3 focus:ring-2 focus:ring-soft-gold focus:outline-none text-deep-mocha"
  />
  <input
    type="email"
    name="email"
    placeholder="Email"
    required
    className="border border-cloud-grey rounded-lg p-3 focus:ring-2 focus:ring-soft-gold focus:outline-none text-deep-mocha"
  />
  <input
    type="text"
    name="address"
    placeholder="Address"
    required
    className="border border-cloud-grey rounded-lg p-3 focus:ring-2 focus:ring-soft-gold focus:outline-none text-deep-mocha"
  />
  <input
    type="text"
    name="city"
    placeholder="City"
    required
    className="border border-cloud-grey rounded-lg p-3 focus:ring-2 focus:ring-soft-gold focus:outline-none text-deep-mocha"
  />
  <input
    type="text"
    name="zip"
    placeholder="Zip Code"
    required
    className="border border-cloud-grey rounded-lg p-3 focus:ring-2 focus:ring-soft-gold focus:outline-none text-deep-mocha"
  />

  {cart.map((item, index) => (
    <div key={item.id}>
      <input
        type="hidden"
        name={`products[${index}][name]`}
        value={item.name}
      />
      <input
        type="hidden"
        name={`products[${index}][qty]`}
        value={item.qty}
      />
      <input
        type="hidden"
        name={`products[${index}][price]`}
        value={item.price}
      />
    </div>
  ))}

  {error && <p className="text-red-600">{error}</p>}

  <button
    type="submit"
    disabled={loading}
    className="bg-soft-gold text-deep-mocha py-3 rounded-lg font-semibold hover:bg-deep-mocha hover:text-warm-ivory transition"
  >
    {loading ? "Submitting..." : "Place Order"}
  </button>
</form>

      </div>
    </div>
  );
}
