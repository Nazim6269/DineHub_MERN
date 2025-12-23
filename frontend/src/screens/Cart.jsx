import React, { useEffect, useState } from "react";
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
  const [amount, setAmount] = useState("");
  const [total, setTotal] = useState("");
  const dispatch = useDispatch();

  // Function to calculate the total amount
  const calculateTotal = () => {
    let totalPrice = 0;
    cart.forEach((item) => {
      if (item && typeof item === "object") {
        totalPrice += item.options[0].full * item.quantity;
      }
    });
    return totalPrice + 10;
  };

  useEffect(() => {
    setLocalCart(cart);
    setAmount(cart.length);
    setTotal(calculateTotal());
  }, [cart]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-6 shadow-md rounded-lg bg-white p-4 sm:p-6">
        {/* carts details part */}
        <div className="w-full lg:w-2/3">
          {/* heading  */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4 gap-2">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
          </div>
          {/* sub heading */}
          <div className="hidden lg:flex mt-3 text-xs uppercase text-gray-600">
            <h3 className="font-semibold w-2/5">Product Details</h3>
            <h3 className="font-semibold text-center w-1/5">Quantity</h3>
            <h3 className="font-semibold text-center w-1/5">Price</h3>
            <h3 className="font-semibold text-center w-1/5">Total</h3>
          </div>
          {/* carts menu */}

          {cart.map((item) => {
            if (!item || typeof item !== "object") {
              return null;
            }
            let { _id, CategoryName, img, quantity } = item;

            const { full } = item.options[0];

            return (
              <div
                key={_id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 py-4 border-b"
              >
                <div className="flex items-center gap-4 sm:flex-1">
                  <div className="w-20 flex-shrink-0">
                    <img className="h-18 w-full object-cover rounded" src={img} alt={CategoryName} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-red-500 font-bold text-md capitalize">
                      {CategoryName}
                    </span>
                    <button
                      onClick={() => dispatch(removeFromCart(_id))}
                      className="font-semibold text-gray-500 text-xs hover:text-red-500 self-start"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:justify-center sm:w-1/5">
                  <button
                    className="p-2 text-gray-600 hover:text-gray-800"
                    onClick={() => dispatch(decrementItem(_id))}
                    aria-label="Decrease quantity"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 448 512" fill="currentColor">
                      <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>
                  </button>

                  <div className="px-3 py-1 border rounded text-center min-w-[3rem]">
                    {quantity}
                  </div>

                  <button
                    className="p-2 text-gray-600 hover:text-gray-800"
                    onClick={() => dispatch(addToCart(item))}
                    aria-label="Increase quantity"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 448 512" fill="currentColor">
                      <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-wrap sm:flex-nowrap sm:items-center gap-4 sm:gap-6 sm:w-2/5">
                  <span className="text-center sm:text-left font-semibold text-sm flex-1">
                    ${full}
                  </span>
                  <span className="text-center sm:text-left font-semibold text-sm flex-1">
                    ${full * quantity}
                  </span>
                </div>
              </div>
            );
          })}

          {/* footer button */}
          <Link
            to="/"
            className="flex items-center font-semibold text-pink-600 text-sm mt-6 gap-2 hover:text-pink-700"
          >
            <svg
              className="fill-current text-pink-600 w-4"
              viewBox="0 0 448 512"
            >
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            Continue Shopping
          </Link>
        </div>

        {/* summary part */}
        <div id="summary" className="w-full lg:w-1/3 px-2 sm:px-4 lg:px-6 py-6 bg-gray-50 rounded-lg border">
          <h1 className="font-semibold text-2xl border-b pb-4">
            Order Summary
          </h1>
          <div className="flex font-bold text-md uppercase justify-between my-4">
            <span>Items</span>
            <span>{amount}</span>
          </div>
          <div className="space-y-2">
            <label className="font-medium inline-block text-sm uppercase">
              Shipping
            </label>
            <select className="block p-2 text-gray-600 w-full text-sm border rounded">
              <option>Standard shipping - $10.00</option>
            </select>
          </div>
          <div className="py-6">
            <label
              htmlFor="promo"
              className="font-semibold inline-block text-sm uppercase"
            >
              Promo Code
            </label>
            <input
              type="text"
              id="promo"
              placeholder="Enter your code"
              className="p-2 text-sm w-full border rounded mt-2"
            />
          </div>
          <button className="w-full bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase rounded">
            Apply
          </button>
          <div className="border-t mt-6">
            <div className="flex font-bold justify-between py-4 text-md uppercase">
              <span>Total cost</span>
              <span>{total}$</span>
            </div>
            <button className="w-full bg-pink-500 font-semibold hover:bg-pink-600 py-3 text-sm text-white uppercase rounded">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
