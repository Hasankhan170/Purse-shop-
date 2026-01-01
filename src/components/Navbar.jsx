import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBagIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useCart } from "../hooks/useCart";

export default function Navbar() {
  const cart = useCart((state) => state.cart);
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = useCart((state) => state.totalPrice)();
  const { updateQty, remove } = useCart();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [cartOpen, setCartOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 bg-warm-ivory border-b border-[#3E2723]">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-16 py-4">
        <Link to="/" className="text-2xl font-bold text-deep-mocha">
          PurseShop
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium text-deep-mocha">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>

          <button
            onClick={() => setCartOpen(true)}
            className="relative hover:text-soft-gold transition"
          >
            <ShoppingBagIcon className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#2c2218] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md border border-deep-mocha">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Icons */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => setCartOpen(true)}
            className="relative hover:text-soft-gold transition"
          >
            <ShoppingBagIcon className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-deep-mocha text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl text-deep-mocha focus:outline-none"
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
     <div
  className={`fixed top-0 right-0 h-full w-64 sm:w-72 bg-warm-ivory shadow-xl
  transform transition-transform z-40 border-l border-cloud-grey
  ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
>

        <div className="flex justify-between items-center p-4 border-b border-cloud-grey">
          <h2 className="text-xl font-semibold text-deep-mocha">Menu</h2>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-deep-mocha text-xl"
          >
            ✖
          </button>
        </div>
        <div className="flex flex-col gap-4 p-4 font-medium text-deep-mocha">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/products" onClick={() => setMenuOpen(false)}>
            Products
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
        </div>
      </div>

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 sm:w-96 bg-warm-ivory shadow-xl transform transition-transform
        ${cartOpen ? "translate-x-0" : "translate-x-full"} flex flex-col z-50 border-l border-cloud-grey`}
      >
        <div className="flex justify-between items-center p-4 border-b border-cloud-grey">
          <h2 className="text-xl font-semibold text-deep-mocha">Your Cart</h2>
          <button
            onClick={() => setCartOpen(false)}
            className="text-deep-mocha text-xl"
          >
            ✖
          </button>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-cloud-grey p-4">
          {cart.length === 0 ? (
            <p className="text-deep-mocha text-center mt-4">
              Your cart is empty
            </p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-4">
                <div className="flex gap-4 items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-cloud-grey"
                  />
                  <div className="flex flex-col">
                    <h4 className="font-medium text-deep-mocha text-sm sm:text-base">{item.name}</h4>
                    <p className="text-xs sm:text-sm text-deep-mocha">${item.price} each</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}
                        className="w-6 h-6 flex items-center justify-center border border-cloud-grey rounded hover:bg-cloud-grey transition"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-deep-mocha text-sm sm:text-base">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="w-6 h-6 flex items-center justify-center border border-cloud-grey rounded hover:bg-cloud-grey transition"
                      >
                        +
                      </button>
                      <button
                        onClick={() => remove(item.id)}
                        className="ml-2 text-soft-gold hover:text-deep-mocha transition"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
                <p className="font-semibold text-deep-mocha text-sm sm:text-base">
                  ${item.price * item.qty}
                </p>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 border-t border-cloud-grey">
            <p className="text-lg font-bold mb-4 text-deep-mocha">Total: ${totalPrice}</p>
            <Link
              to="/checkout"
              className="block bg-deep-mocha text-white py-2 sm:py-3 rounded-lg text-center font-semibold border border-cloud-grey 
              hover:bg-deep-mocha hover:text-warm-ivory hover:border-soft-gold 
              transform hover:-translate-y-1 transition-all duration-200 text-sm sm:text-base"
              onClick={() => setCartOpen(false)}
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
