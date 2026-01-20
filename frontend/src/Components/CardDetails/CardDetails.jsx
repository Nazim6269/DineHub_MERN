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
      <div className="h-[70vh] flex items-center justify-center bg-background-dark text-text-secondary">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-cyan mx-auto mb-4"></div>
          <p className="text-xl font-medium">Preparing your delicious details...</p>
        </div>
      </div>
    );
  }

  const { img, description, name, CategoryName, options } = product;

  return (
    <div className="min-h-screen bg-background-dark text-text-primary pb-20">
      {/* Navigation Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-text-muted hover:text-primary-cyan transition-colors"
        >
          <ChevronLeft size={20} />
          <span className="font-semibold text-sm">Back to Menu</span>
        </button>
      </div>

      {/* Main Product Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left: Product Image */}
          <div className="lg:col-span-7">
            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/5 bg-background-card shadow-2xl group">
              <img
                src={img}
                alt={name}
                className="w-full aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <span className="bg-primary-cyan text-black text-xs font-black uppercase tracking-tighter px-4 py-2 rounded-full shadow-xl">
                  {CategoryName}
                </span>
                <div className="bg-black/40 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 border border-white/10">
                  <Star size={14} className="text-yellow-400 fill-current" />
                  <span>4.9 (120+ reviews)</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="bg-background-card border border-white/5 p-6 rounded-3xl text-center">
                <TrendingUp size={24} className="text-primary-cyan mx-auto mb-2" />
                <p className="text-xs font-bold text-text-muted uppercase">Popular</p>
                <p className="text-sm font-bold text-text-primary mt-1">#1 in Category</p>
              </div>
              <div className="bg-background-card border border-white/5 p-6 rounded-3xl text-center">
                <MessageSquare size={24} className="text-blue-400 mx-auto mb-2" />
                <p className="text-xs font-bold text-text-muted uppercase">Feedback</p>
                <p className="text-sm font-bold text-text-primary mt-1">98% Satisfied</p>
              </div>
              <div className="bg-background-card border border-white/5 p-6 rounded-3xl text-center">
                <Info size={24} className="text-purple-400 mx-auto mb-2" />
                <p className="text-xs font-bold text-text-muted uppercase">Portion</p>
                <p className="text-sm font-bold text-text-primary mt-1">Standard Size</p>
              </div>
            </div>
          </div>

          {/* Right: Order Configuration */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex-1">
              <h1 className="text-4xl sm:text-5xl font-black text-text-primary tracking-tight mb-2">
                {name}
              </h1>

              <div className="flex items-center gap-4 mb-8">
                <div className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded-lg border border-green-500/20">
                  IN STOCK
                </div>
                <span className="text-text-muted text-sm font-medium">Cooking time: 15-20 min</span>
              </div>

              <p className="text-lg text-text-secondary leading-relaxed mb-10 border-l-4 border-primary-cyan pl-6 italic">
                "{description}"
              </p>

              {/* Pricing Cards */}
              <div className="space-y-4 mb-10">
                <p className="text-xs font-black text-text-muted uppercase tracking-widest pl-1">Choose Portion Size</p>
                <div className="grid grid-cols-2 gap-4">
                  {options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedOption(idx)}
                      className={`p-6 rounded-[2rem] border-2 text-left transition-all relative overflow-hidden group ${selectedOption === idx
                          ? 'border-primary-cyan bg-primary-cyan/5'
                          : 'border-white/5 bg-background-card hover:border-white/20'
                        }`}
                    >
                      <span className={`block text-xs font-black uppercase mb-1 ${selectedOption === idx ? 'text-primary-cyan' : 'text-text-muted'
                        }`}>
                        {Object.keys(opt)[0]}
                      </span>
                      <span className="text-2xl font-black text-text-primary">
                        Tk {opt[Object.keys(opt)[0]]}
                      </span>
                      {selectedOption === idx && (
                        <div className="absolute top-4 right-4 text-primary-cyan">
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
                className="w-full py-5 bg-primary-cyan text-black font-black text-lg rounded-[2rem] shadow-[0_20px_40px_rgba(0,217,192,0.2)] hover:shadow-[0_25px_50px_rgba(0,217,192,0.3)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                <ShoppingBag size={24} />
                ADD TO BASKET — TK {options[selectedOption][Object.keys(options[selectedOption])[0]]}
              </button>

              <Link
                to="/cart"
                className="w-full py-5 text-center bg-gray-800 text-white font-black text-lg rounded-[2rem] border border-gray-700 hover:bg-gray-700 transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                GO TO CHECKOUT
              </Link>
            </div>

            <p className="text-center text-xs text-text-muted mt-6 font-medium">
              Free Delivery on orders above Tk 500 • Secure Payment • Fast Service
            </p>
          </div>
        </div>

        {/* Extended Details Section */}
        <div className="mt-24 pt-24 border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-12">
              <div className="bg-background-card border border-white/5 rounded-[3rem] p-10">
                <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                  <MessageSquare className="text-primary-cyan" />
                  Customer Inquiries
                </h3>
                <Question />
              </div>

              <div className="bg-background-card border border-white/5 rounded-[3rem] p-10">
                <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                  <Star className="text-yellow-400 fill-current" />
                  Honest Reviews
                </h3>
                <Review />
              </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
              <div className="sticky top-24 space-y-8">
                <div className="bg-primary-cyan/5 border border-primary-cyan/20 rounded-[3rem] p-8">
                  <h3 className="text-xl font-black mb-6 text-primary-cyan">Recommended with This</h3>
                  <RelatedItem />
                </div>

                <div className="bg-background-card border border-white/5 rounded-[3rem] p-8">
                  <h3 className="text-xl font-black mb-6">Recently Viewed</h3>
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
