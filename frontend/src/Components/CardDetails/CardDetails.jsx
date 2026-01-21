import { ChevronLeft, Info, MessageSquare, ShoppingBag, Star, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { setLocalSeclectedProduct } from "../../helpers/setLocalStorage";
import { addToCart, setSelectProduct } from "../../redux/actions/actionsCreator";
import Question from "../Question/Question";
import RecentView from "../RecentView/RecentView";
import RelatedItem from "../RelatedItem/RelatedItem";
import Review from "../Review/Review";

const CardDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: allData } = useSelector((state) => state.fetchReducer);
    const [selectedOption, setSelectedOption] = useState(0);

    // Find the specific item from allData
    const product = allData?.find((item) => item._id === id);

    useEffect(() => {
        if (product) {
            dispatch(setSelectProduct([product]));
            setLocalSeclectedProduct([product]);
        }
    }, [product, dispatch]);

    if (!product) {
        return (
            <div className="h-[70vh] flex items-center justify-center bg-app-bg text-text-sub">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
                    <p className="text-xl font-medium">Preparing your delicious details...</p>
                </div>
            </div>
        );
    }

    const { img, description, name, CategoryName, options } = product;

    return (
        <div className="min-h-screen bg-app-bg text-text-main pb-20">
            {/* Navigation Breadcrumb */}
            <div className="container mx-auto px-4 py-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-text-sub hover:text-brand-primary transition-colors font-black uppercase text-xs tracking-widest"
                >
                    <ChevronLeft size={20} />
                    <span>Back to Menu</span>
                </button>
            </div>

            {/* Main Product Section */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left: Product Image */}
                    <div className="lg:col-span-7">
                        <div className="relative rounded-md overflow-hidden border border-border-thin bg-card-bg shadow-xl group">
                            <img
                                src={img}
                                alt={name}
                                className="w-full aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute top-6 left-6 flex flex-col gap-2">
                                <span className="bg-brand-primary text-text-on-brand text-xs font-black uppercase tracking-tighter px-4 py-2 rounded-full shadow-lg">
                                    {CategoryName}
                                </span>
                                <div className="bg-app-bg/80 backdrop-blur-md text-text-main text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 border border-border-strong">
                                    <Star size={14} className="text-status-warning fill-current" />
                                    <span>4.9 (120+ reviews)</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-4 mt-8">
                            <div className="bg-card-bg border border-border-thin p-6 rounded-3xl text-center">
                                <TrendingUp size={24} className="text-brand-primary mx-auto mb-2" />
                                <p className="text-xs font-bold text-text-dim uppercase">Popular</p>
                                <p className="text-sm font-bold text-text-main mt-1">#1 in Category</p>
                            </div>
                            <div className="bg-card-bg border border-border-thin p-6 rounded-3xl text-center">
                                <MessageSquare size={24} className="text-brand-secondary mx-auto mb-2" />
                                <p className="text-xs font-bold text-text-dim uppercase">Feedback</p>
                                <p className="text-sm font-bold text-text-main mt-1">98% Satisfied</p>
                            </div>
                            <div className="bg-card-bg border border-border-thin p-6 rounded-3xl text-center">
                                <Info size={24} className="text-brand-accent mx-auto mb-2" />
                                <p className="text-xs font-bold text-text-dim uppercase">Portion</p>
                                <p className="text-sm font-bold text-text-main mt-1">Standard Size</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Order Configuration */}
                    <div className="lg:col-span-5 flex flex-col">
                        <div className="flex-1">
                            <h1 className="text-4xl sm:text-5xl font-black text-text-main tracking-tight mb-2 uppercase">
                                {name}
                            </h1>

                            <div className="flex items-center gap-4 mb-8">
                                <div className="px-3 py-1 bg-status-success/10 text-status-success text-xs font-bold rounded-lg border border-status-success/20">
                                    IN STOCK
                                </div>
                                <span className="text-text-dim text-sm font-medium uppercase tracking-wider">Cooking time: 15-20 min</span>
                            </div>

                            <p className="text-lg text-text-sub leading-relaxed mb-10 border-l-4 border-brand-primary pl-6 italic">
                                &quot;{description}&quot;
                            </p>

                            {/* Pricing Cards */}
                            <div className="space-y-4 mb-10">
                                <p className="text-xs font-black text-text-dim uppercase tracking-widest pl-1">Choose Portion Size</p>
                                <div className="grid grid-cols-2 gap-4">
                                    {options.map((opt, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedOption(idx)}
                                            className={`p-6 rounded-md border-2 text-left transition-all relative overflow-hidden group ${selectedOption === idx
                                                ? 'border-brand-primary bg-brand-primary/5'
                                                : 'border-border-thin bg-app-bg hover:border-border-strong'
                                                }`}
                                        >
                                            <span className={`block text-xs font-black uppercase mb-1 ${selectedOption === idx ? 'text-brand-primary' : 'text-text-dim'
                                                }`}>
                                                {Object.keys(opt)[0]}
                                            </span>
                                            <span className="text-2xl font-black text-text-main">
                                                Tk {opt[Object.keys(opt)[0]]}
                                            </span>
                                            {selectedOption === idx && (
                                                <div className="absolute top-4 right-4 text-brand-primary">
                                                    <Star size={18} fill="currentColor" />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-4">
                            <button
                                onClick={() => dispatch(addToCart(product))}
                                className="w-full py-5 bg-brand-primary text-text-on-brand font-black text-lg rounded-md shadow-md shadow-brand-primary/20 hover:scale-105 transition-all flex items-center justify-center gap-3 active:scale-95"
                            >
                                <ShoppingBag size={24} />
                                ADD TO BASKET — TK {options[selectedOption][Object.keys(options[selectedOption])[0]]}
                            </button>

                            <Link
                                to="/cart"
                                className="w-full py-5 text-center bg-text-main text-text-on-brand font-black text-lg rounded-md hover:opacity-90 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-lg shadow-text-main/10"
                            >
                                GO TO CHECKOUT
                            </Link>
                        </div>

                        <p className="text-center text-[10px] text-text-dim mt-6 font-black uppercase tracking-[0.1em]">
                            Free Delivery on orders above Tk 500 • Secure Payment • Fast Service
                        </p>
                    </div>
                </div>

                {/* Extended Details Section */}
                <div className="mt-24 pt-24 border-t border-border-thin">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-8 space-y-12">
                            <div className="bg-card-bg border border-border-thin rounded-md p-10">
                                <h3 className="text-2xl font-black mb-8 flex items-center gap-3 uppercase tracking-tight">
                                    <MessageSquare className="text-brand-primary" size={28} />
                                    Customer Inquiries
                                </h3>
                                <Question />
                            </div>

                            <div className="bg-card-bg border border-border-thin rounded-md p-10">
                                <h3 className="text-2xl font-black mb-8 flex items-center gap-3 uppercase tracking-tight">
                                    <Star className="text-status-warning fill-current" size={28} />
                                    Honest Reviews
                                </h3>
                                <Review />
                            </div>
                        </div>

                        <div className="lg:col-span-4 space-y-8">
                            <div className="sticky top-24 space-y-8">
                                <div className="bg-brand-primary/5 border border-brand-primary/10 rounded-md p-8">
                                    <h3 className="text-xl font-black mb-6 text-brand-primary uppercase tracking-wider">Recommended</h3>
                                    <RelatedItem />
                                </div>

                                <div className="bg-card-bg border border-border-thin rounded-md p-8">
                                    <h3 className="text-xl font-black mb-6 uppercase tracking-wider">Recently Viewed</h3>
                                    <RecentView />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CardDetails;
