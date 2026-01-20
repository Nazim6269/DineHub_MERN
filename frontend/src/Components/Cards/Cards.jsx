import { Search, ShoppingBag, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setSelectProduct, addToCart } from "../../redux/actions/actionsCreator";

const Cards = () => {
  const { data } = useSelector((state) => state.fetchReducer);
  const { searchTerm } = useSelector((state) => state.filterReducer);
  const dispatch = useDispatch();

  if (!data) {
    return (
      <div className="h-[55vh] flex items-center justify-center bg-background-dark text-text-secondary">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-cyan"></div>
      </div>
    );
  }

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.CategoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="relative bg-background-dark py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        {!searchTerm && (
          <div className="mb-16">
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-text-primary">
              Most <span className="text-primary-cyan">Popular</span> Dishes
            </h2>
            <div className="h-1.5 w-20 bg-primary-cyan mt-4 rounded-full" />
          </div>
        )}

        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredData.map((item) => {
              const { _id, img, name, CategoryName, options } = item;
              return (
                <div
                  key={_id}
                  className="group relative bg-background-card border border-white/5 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:border-primary-cyan/30 hover:shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
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
                    <div className="absolute top-5 right-5 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-1.5 shadow-xl">
                      <Star size={14} className="text-yellow-400 fill-current" />
                      <span className="text-xs font-black text-white">4.8</span>
                    </div>
                    <div className="absolute bottom-5 left-5 bg-primary-cyan text-black px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl">
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
                      <h3 className="text-xl font-black text-text-primary uppercase tracking-tight line-clamp-1 group-hover:text-primary-cyan transition-colors">
                        {name}
                      </h3>
                    </Link>

                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-1">Price starting from</p>
                        <p className="text-2xl font-black text-text-primary tracking-tighter">
                          Tk {options[0].half || options[0].full}
                        </p>
                      </div>
                      <button
                        onClick={() => dispatch(addToCart(item))}
                        className="p-4 rounded-2xl bg-white/5 border border-white/5 text-text-primary hover:bg-primary-cyan hover:text-black hover:border-transparent transition-all active:scale-90"
                      >
                        <ShoppingBag size={20} />
                      </button>
                    </div>

                    <Link
                      to={`/cardDetails/${_id}`}
                      onClick={() => dispatch(setSelectProduct([item]))}
                      className="block w-full text-center py-4 rounded-2xl border-2 border-white/5 bg-transparent text-xs font-black uppercase tracking-[0.2em] text-text-muted hover:border-primary-cyan hover:text-primary-cyan transition-all"
                    >
                      Details View
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-32 bg-background-card rounded-[3rem] border-2 border-dashed border-white/5">
            <Search size={48} className="mx-auto text-text-muted mb-6 opacity-20" />
            <h3 className="text-3xl font-black uppercase text-text-primary mb-2">No results found</h3>
            <p className="text-text-secondary font-bold uppercase text-xs tracking-widest">
              Try searching for something else
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cards;
