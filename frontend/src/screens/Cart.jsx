import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setLocalCart } from "../helpers/setLocalStorage";
import {
  addToCart,
  decrementItem,
  removeFromCart,
} from "../redux/actions/actionsCreator";

const Cart = () => {
  const { cart } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);

  // Save cart to localStorage and update amount
  useEffect(() => {
    setLocalCart(cart);
    setAmount(cart.length);
  }, [cart]);

  // Calculate total
  const total = useMemo(() => {
    return (
      cart.reduce(
        (sum, item) => sum + item.options[0].full * item.quantity,
        0
      ) + 10
    );
  }, [cart]);

  if (!cart.length) {
    return (
      <div className="h-[55vh] flex justify-center items-center text-2xl font-semibold text-gray-300 bg-background-dark">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-dark text-text-primary px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="w-full lg:w-2/3 bg-background-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
              <h1 className="text-3xl font-extrabold bg-primary-cyan bg-clip-text text-transparent">
                Shopping Cart
              </h1>
              <span className="text-text-secondary font-medium">{amount} Items</span>
            </div>

            {/* Table headers - Desktop */}
            <div className="hidden lg:grid grid-cols-12 gap-4 mb-6 text-xs uppercase font-bold tracking-widest text-text-muted px-4">
              <div className="col-span-6">Product Details</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Total</div>
            </div>

            <div className="space-y-6">
              {cart.map((item) => {
                const { _id, CategoryName, name, img, quantity } = item;
                const price = item.options[0].full;

                return (
                  <div
                    key={_id}
                    className="group bg-white/5 border border-white/5 hover:border-(--color-accent-cyan)/30 rounded-2xl p-4 transition-all duration-300"
                  >
                    <div className="flex flex-col sm:grid sm:grid-cols-12 items-center gap-4">
                      {/* Product Info */}
                      <div className="col-span-6 flex items-center gap-4 w-full">
                        <div className="relative overflow-hidden rounded-xl h-20 w-20 shrink-0">
                          <img
                            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                            src={img}
                            alt={name}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <h3 className="text-lg font-bold text-text-primary capitalize leading-tight">
                            {name}
                          </h3>
                          <span className="text-xs text-text-muted capitalize">
                            {CategoryName}
                          </span>
                          <button
                            onClick={() => dispatch(removeFromCart(_id))}
                            className="text-xs font-semibold text-red-400 hover:text-red-300 transition mt-1 flex items-center gap-1"
                          >
                            Remove Item
                          </button>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="col-span-2 flex items-center justify-center gap-4 bg-white/5 rounded-xl p-1 border border-white/5">
                        <button
                          onClick={() => dispatch(decrementItem(_id))}
                          className="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-(--color-accent-cyan) transition"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 448 512" fill="currentColor">
                            <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                          </svg>
                        </button>
                        <span className="font-bold text-sm w-4 text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => dispatch(addToCart(item))}
                          className="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-(--color-accent-cyan) transition"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 448 512" fill="currentColor">
                            <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                          </svg>
                        </button>
                      </div>

                      {/* Price Info */}
                      <div className="col-span-2 text-center font-medium text-text-secondary">
                        ${price}
                      </div>

                      {/* Total Info */}
                      <div className="col-span-2 text-center font-bold text-(--color-accent-cyan)">
                        ${price * quantity}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Continue Shopping */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 mt-10 font-bold text-sm text-text-muted hover:text-(--color-accent-cyan) transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 448 512" fill="currentColor">
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Go back to Menu
            </Link>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3 space-y-6">
            <div className="bg-background-card rounded-3xl p-8 border border-white/10 shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                Order Summary
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-text-secondary">
                  <span className="font-medium">Subtotal ({amount} items)</span>
                  <span className="font-bold text-text-primary text-lg">${total - 10}</span>
                </div>
                <div className="flex justify-between items-center text-text-secondary">
                  <span className="font-medium">Shipping Cost</span>
                  <span className="font-bold text-text-primary">$10.00</span>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-2xl font-extrabold text-(--color-accent-cyan)">
                      ${total}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 block">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-(--color-accent-cyan) text-sm"
                    />
                    <button className="px-4 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition">
                      Apply
                    </button>
                  </div>
                </div>

                <button className="w-full bg-primary-cyan py-4 rounded-2xl font-black text-black text-lg uppercase shadow-[0_0_30px_rgba(0,217,192,0.3)] hover:shadow-[0_0_40px_rgba(0,217,192,0.5)] transition-all duration-300">
                  Proceed to Checkout
                </button>

                <p className="text-center text-xs text-text-muted px-4">
                  By proceeding, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>

            {/* Support Box */}
            <div className="bg-background-card/50 rounded-3xl p-6 border border-white/5">
              <h4 className="font-bold mb-1">Need help?</h4>
              <p className="text-xs text-text-muted">
                Our support team is available 24/7 for any questions regarding your order.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
