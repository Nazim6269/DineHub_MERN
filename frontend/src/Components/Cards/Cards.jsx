import { Search, ShoppingBag, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { setSelectProduct, addToCart } from "../../redux/actions/actionsCreator";

const Cards = () => {
  const { data } = useSelector((state) => state.fetchReducer);
  const { searchTerm } = useSelector((state) => state.filterReducer);
  const { profile } = useSelector((state) => state.profileReducer);
  const dispatch = useDispatch();

  if (!data) {
    return (
      <div className="h-[55vh] flex items-center justify-center bg-app-bg text-text-dim">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.CategoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="relative bg-app-bg py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        {!searchTerm && (
          <div className="mb-16 text-center">
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-text-main">
              Most <span className="text-brand-primary">Popular</span> Dishes
            </h2>
            <div className="h-1.5 w-20 bg-brand-primary mt-4 rounded-full mx-auto" />
          </div>
        )}

        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredData.map((item) => {
              const { _id, img, name, CategoryName, options } = item;
              return (
                <div
                  key={_id}
                  className="group relative bg-card-bg border border-border-thin rounded-md overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:border-brand-primary/30 hover:shadow-xl hover:shadow-text-main/5"
                >
                  {/* Card Image Wrapper */}
                  <div className="relative h-64 overflow-hidden">
                    <Link to={`/cardDetails/${_id}`} onClick={() => dispatch(setSelectProduct([item]))}>
                      <img
                        src={img}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </Link>
                    <div className="absolute top-5 right-5 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-md border border-border-strong flex items-center gap-1.5 shadow-sm">
                      <Star size={14} className="text-status-warning fill-current" />
                      <span className="text-xs font-black text-text-main">4.8</span>
                    </div>
                    <div className="absolute bottom-5 left-5 bg-brand-primary text-text-on-brand px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest shadow-lg">
                      {CategoryName}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-8">
                    <Link
                      to={`/cardDetails/${_id}`}
                      onClick={() => dispatch(setSelectProduct([item]))}
                      className="block mb-4"
                    >
                      <h3 className="text-xl font-black text-text-main uppercase tracking-tight line-clamp-1 group-hover:text-brand-primary transition-colors">
                        {name}
                      </h3>
                    </Link>

                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <p className="text-[10px] font-black text-text-dim uppercase tracking-[0.2em] mb-1">Starting from</p>
                        <p className="text-2xl font-black text-text-main tracking-tighter">
                          Tk {options[0].regular || options[0].large || options[0].small || options[0].half || options[0].full || options[0].single}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          if (!profile) {
                            toast.error("Please login to add item in cart");
                          } else {
                            dispatch(addToCart(item));
                            toast.success("Item added to cart");
                          }
                        }}
                        className="p-4 rounded-md bg-app-bg border border-border-thin text-text-main hover:bg-brand-primary hover:text-text-on-brand hover:border-transparent transition-all active:scale-90 shadow-sm"
                      >
                        <ShoppingBag size={20} />
                      </button>
                    </div>

                    <Link
                      to={`/cardDetails/${_id}`}
                      onClick={() => dispatch(setSelectProduct([item]))}
                      className="block w-full text-center py-4 rounded-md border-2 border-border-thin bg-transparent text-xs font-black uppercase tracking-[0.2em] text-text-dim hover:border-brand-primary hover:text-brand-primary transition-all"
                    >
                      Details View
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-32 bg-card-bg rounded-[3rem] border-2 border-dashed border-border-strong">
            <Search size={48} className="mx-auto text-text-dim/50 mb-6" />
            <h3 className="text-3xl font-black uppercase text-text-main mb-2">No results found</h3>
            <p className="text-text-sub font-bold uppercase text-xs tracking-widest">
              Try searching for something else
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cards;