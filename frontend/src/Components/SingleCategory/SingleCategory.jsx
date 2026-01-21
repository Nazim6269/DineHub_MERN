import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import RangeFilter from "../RangeFilter/RangeFilter";
import { setSearchTerm } from "../../redux/actions/actionsCreator";

const SingleCategory = () => {
    const { data } = useSelector((state) => state.fetchReducer);
    const { id } = useParams();
    const { searchTerm, filteredRange } = useSelector((state) => state.filterReducer);

    const [sortBy, setSortBy] = useState("default");
    const [itemsToShow, setItemsToShow] = useState(20);
    const dispatch = useDispatch();

    // Reset search and range when switching categories to show all items initially
    useEffect(() => {
        dispatch(setSearchTerm(""));
    }, [id, dispatch]);

    const filteredData = useMemo(() => {
        if (!data) return [];

        let result = data.filter(
            (item) => item.CategoryName.toLowerCase() === id.toLowerCase()
        );

        // Filter by Price Range
        result = result.filter((item) => {
            const price = item.options[0].half || item.options[0].full;
            return price >= filteredRange.minValue && price <= filteredRange.maxValue;
        });

        // Filter by Search Term
        if (searchTerm) {
            result = result.filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sorting
        if (sortBy === "lowToHigh") {
            result.sort((a, b) => (a.options[0].half || a.options[0].full) - (b.options[0].half || b.options[0].full));
        } else if (sortBy === "highToLow") {
            result.sort((a, b) => (b.options[0].half || b.options[0].full) - (a.options[0].half || a.options[0].full));
        } else if (sortBy === "nameAZ") {
            result.sort((a, b) => a.name.localeCompare(b.name));
        }

        return result.slice(0, itemsToShow);
    }, [data, id, searchTerm, filteredRange, sortBy, itemsToShow]);

    if (!data) {
        return (
            <div className="h-[55vh] flex items-center justify-center bg-app-bg text-xl sm:text-3xl text-text-dim">
                <div className="animate-pulse font-black uppercase tracking-tighter text-brand-primary">
                    Loading {id}...
                </div>
            </div>
        );
    }

    return (
        <section className="relative min-h-screen bg-app-bg text-text-main pb-20">
            <div className="relative container mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-1/4 space-y-6">
                        <div className="bg-card-bg border border-border-thin rounded-md p-8 shadow-sm">
                            <h3 className="text-sm font-black uppercase tracking-widest text-text-dim mb-8">Filter by Price</h3>
                            <RangeFilter />
                        </div>

                        <div className="bg-card-bg border border-border-thin rounded-md p-8 shadow-sm">
                            <h3 className="text-sm font-black uppercase tracking-widest text-brand-primary mb-6">Availability</h3>
                            <div className="space-y-4">
                                {['In Stock', 'Direct Order', 'Pre-order'].map((option) => (
                                    <label key={option} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            className="w-5 h-5 rounded-lg border-border-strong bg-app-bg text-brand-primary focus:ring-brand-primary/20"
                                            defaultChecked={option === 'In Stock'}
                                        />
                                        <span className="text-sm font-bold text-text-sub group-hover:text-brand-primary transition uppercase tracking-wider">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="w-full lg:w-3/4 space-y-8">
                        {/* Header / Active Filters */}
                        <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-app-bg border border-border-thin rounded-md p-8 shadow-sm shadow-text-main/5">
                            <div>
                                <h2 className="text-4xl font-black text-text-main uppercase tracking-tighter">
                                    <span className="text-brand-primary">{id}</span> Selection
                                </h2>
                                <p className="text-text-dim text-xs font-black uppercase tracking-widest mt-2">
                                    Found {filteredData.length} premium results
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-6">
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-black text-text-dim uppercase tracking-widest">Sort By</span>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="rounded-md px-4 py-2 text-xs font-bold bg-card-bg border border-border-thin text-text-main focus:border-brand-primary outline-none transition appearance-none cursor-pointer"
                                    >
                                        <option value="default">Default</option>
                                        <option value="lowToHigh">L-H Price</option>
                                        <option value="highToLow">H-L Price</option>
                                        <option value="nameAZ">Name A-Z</option>
                                    </select>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-black text-text-dim uppercase tracking-widest">Limit</span>
                                    <select
                                        value={itemsToShow}
                                        onChange={(e) => setItemsToShow(Number(e.target.value))}
                                        className="rounded-md px-4 py-2 text-xs font-bold bg-card-bg border border-border-thin text-text-main focus:border-brand-primary outline-none transition appearance-none cursor-pointer"
                                    >
                                        <option value={20}>20</option>
                                        <option value={30}>30</option>
                                        <option value={50}>50</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        {filteredData.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                {filteredData.map((item) => (
                                    <div
                                        key={item._id}
                                        className="group bg-card-bg border border-border-thin rounded-md overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-brand-primary/30 hover:shadow-xl hover:shadow-text-main/5"
                                    >
                                        <div className="h-60 overflow-hidden relative">
                                            <Link to={`/cardDetails/${item._id}`}>
                                                <img
                                                    src={item.img}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                            </Link>
                                            <div className="absolute top-4 right-4 bg-app-bg/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-border-thin font-black text-text-main text-sm shadow-xl">
                                                Tk {item.options[0].half || item.options[0].full}
                                            </div>
                                        </div>

                                        <div className="p-8">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-dim">
                                                    {item.CategoryName}
                                                </span>
                                                <div className="flex items-center gap-1.5 text-status-warning">
                                                    <span className="text-xs font-black">4.8</span>
                                                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                                </div>
                                            </div>

                                            <Link to={`/cardDetails/${item._id}`}>
                                                <h3 className="text-xl font-black text-text-main mb-6 uppercase tracking-tight group-hover:text-brand-primary transition-colors line-clamp-1">
                                                    {item.name}
                                                </h3>
                                            </Link>

                                            <Link
                                                to={`/cardDetails/${item._id}`}
                                                className="block w-full text-center py-4 rounded-2xl bg-app-bg border border-border-thin font-extrabold text-[10px] uppercase tracking-[0.2em] text-text-dim transition-all hover:bg-brand-primary hover:text-text-on-brand hover:border-transparent hover:shadow-lg hover:shadow-brand-primary/20"
                                            >
                                                Details View
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-32 bg-card-bg border-2 border-dashed border-border-strong rounded-[3rem]">
                                <div className="w-24 h-24 rounded-full bg-app-bg flex items-center justify-center mb-8 shadow-sm">
                                    <svg className="w-12 h-12 text-text-dim/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-black text-text-main uppercase tracking-tighter mb-2">No matches found</h3>
                                <p className="text-text-dim font-bold uppercase text-[10px] tracking-widest max-w-sm text-center">
                                    Try adjusting your filters to find something delicious.
                                </p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="mt-10 bg-text-main text-text-on-brand px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </section>
    );
};

export default SingleCategory;
