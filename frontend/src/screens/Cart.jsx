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
            <div className="h-[55vh] flex flex-col justify-center items-center bg-app-bg">
                <div className="w-20 h-20 bg-card-bg rounded-full flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-text-dim/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-black text-text-main uppercase tracking-tight mb-2">Your cart is empty</h2>
                <p className="text-text-sub font-bold text-sm mb-8 uppercase tracking-widest">Time to add some delicious food!</p>
                <Link to="/" className="bg-brand-primary text-text-on-brand px-8 py-3 rounded-md font-black uppercase tracking-widest hover:scale-105 transition-all active:scale-95 shadow-lg shadow-brand-primary/20">
                    Browse Menu
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-app-bg text-text-main px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="w-full lg:w-2/3 bg-card-bg rounded-md p-6 sm:p-10 border border-border-thin shadow-md shadow-text-main/5">
                        <div className="flex items-center justify-between border-b border-border-strong pb-8 mb-8">
                            <h1 className="text-3xl font-black text-text-main uppercase tracking-tighter">
                                Shopping <span className="text-brand-primary">Cart</span>
                            </h1>
                            <span className="text-text-dim font-black uppercase tracking-widest text-xs">{amount} Items</span>
                        </div>

                        {/* Table headers - Desktop */}
                        <div className="hidden lg:grid grid-cols-12 gap-4 mb-6 text-[10px] uppercase font-black tracking-[0.2em] text-text-dim px-4">
                            <div className="col-span-6">Product Details</div>
                            <div className="col-span-2 text-center">Quantity</div>
                            <div className="col-span-2 text-center">Price</div>
                            <div className="col-span-2 text-right pr-4">Total</div>
                        </div>

                        <div className="space-y-4">
                            {cart.map((item) => {
                                const { _id, CategoryName, name, img, quantity } = item;
                                const price = item.options[0].full;

                                return (
                                    <div
                                        key={_id}
                                        className="group bg-app-bg border border-border-thin hover:border-brand-primary/30 rounded-md p-5 transition-all duration-300 shadow-sm"
                                    >
                                        <div className="flex flex-col sm:grid sm:grid-cols-12 items-center gap-4">
                                            {/* Product Info */}
                                            <div className="col-span-6 flex items-center gap-6 w-full">
                                                <div className="relative overflow-hidden rounded-md h-24 w-24 shrink-0 shadow-md">
                                                    <img
                                                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                        src={img}
                                                        alt={name}
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <h3 className="text-lg font-black text-text-main uppercase tracking-tight leading-tight">
                                                        {name}
                                                    </h3>
                                                    <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">
                                                        {CategoryName}
                                                    </span>
                                                    <button
                                                        onClick={() => dispatch(removeFromCart(_id))}
                                                        className="text-[10px] font-black text-status-error hover:opacity-80 transition mt-2 flex items-center gap-1 uppercase tracking-widest"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="col-span-2 flex items-center justify-center gap-4 bg-card-bg rounded-md p-1.5 border border-border-thin">
                                                <button
                                                    onClick={() => dispatch(decrementItem(_id))}
                                                    className="w-8 h-8 flex items-center justify-center text-text-dim hover:text-brand-primary transition"
                                                >
                                                    <svg className="w-3 h-3" viewBox="0 0 448 512" fill="currentColor">
                                                        <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                                    </svg>
                                                </button>
                                                <span className="font-black text-sm text-text-main w-4 text-center">
                                                    {quantity}
                                                </span>
                                                <button
                                                    onClick={() => dispatch(addToCart(item))}
                                                    className="w-8 h-8 flex items-center justify-center text-text-dim hover:text-brand-primary transition"
                                                >
                                                    <svg className="w-3 h-3" viewBox="0 0 448 512" fill="currentColor">
                                                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                                    </svg>
                                                </button>
                                            </div>

                                            {/* Price Info */}
                                            <div className="col-span-2 text-center font-black text-text-dim text-sm italic">
                                                Tk {price}
                                            </div>

                                            {/* Total Info */}
                                            <div className="col-span-2 text-right font-black text-text-main text-lg tracking-tighter pr-4">
                                                Tk {price * quantity}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Continue Shopping */}
                        <Link
                            to="/"
                            className="inline-flex items-center gap-3 mt-10 font-black text-xs text-text-dim hover:text-brand-primary uppercase tracking-widest transition-all"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 448 512" fill="currentColor">
                                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                            </svg>
                            Go back to Menu
                        </Link>
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-1/3 space-y-6">
                        <div className="bg-card-bg rounded-md p-10 border border-border-thin shadow-xl shadow-text-main/5">
                            <h2 className="text-2xl font-black mb-8 uppercase tracking-tighter text-text-main">
                                Order Summary
                            </h2>

                            <div className="space-y-5 mb-10">
                                <div className="flex justify-between items-center text-text-sub">
                                    <span className="text-xs font-black uppercase tracking-widest">Subtotal</span>
                                    <span className="font-black text-text-main text-lg">Tk {total - 10}</span>
                                </div>
                                <div className="flex justify-between items-center text-text-sub">
                                    <span className="text-xs font-black uppercase tracking-widest">Shipping</span>
                                    <span className="font-black text-text-main">Tk 10.00</span>
                                </div>
                                <div className="pt-6 border-t border-border-strong">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-black uppercase tracking-tighter">Total Price</span>
                                        <span className="text-3xl font-black text-brand-primary tracking-tighter">
                                            Tk {total}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-black text-text-dim uppercase tracking-[0.2em] mb-3 block">
                                        Voucher Code
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="TRY 'DINE50'"
                                            className="flex-1 bg-app-bg border border-border-strong rounded-md px-5 py-3 outline-none focus:border-brand-primary text-sm font-bold placeholder:text-text-dim/50"
                                        />
                                        <button className="px-6 py-3 bg-text-main hover:opacity-90 rounded-md text-xs font-black text-text-on-brand uppercase tracking-widest transition active:scale-95">
                                            Apply
                                        </button>
                                    </div>
                                </div>

                                <button className="w-full bg-brand-primary py-5 rounded-md font-black text-text-on-brand text-lg uppercase shadow-lg shadow-brand-primary/20 hover:scale-[1.02] active:scale-95 transition-all duration-300">
                                    Proceed to Checkout
                                </button>

                                <p className="text-center text-[10px] text-text-dim font-black uppercase tracking-widest mt-6">
                                    Secure 256-bit SSL processing
                                </p>
                            </div>
                        </div>

                        {/* Support Box */}
                        <div className="bg-app-bg rounded-md p-8 border border-border-thin shadow-sm">
                            <h4 className="font-black text-sm uppercase tracking-widest mb-2 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
                                Need help?
                            </h4>
                            <p className="text-xs text-text-sub font-bold leading-relaxed uppercase tracking-wider">
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
