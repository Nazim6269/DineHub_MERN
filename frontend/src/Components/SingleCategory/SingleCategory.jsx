import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
    // Optionally reset range too: dispatch(setRangeValue([0, 1000]));
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
      result.sort((a, b) => a.options[0].half - b.options[0].half);
    } else if (sortBy === "highToLow") {
      result.sort((a, b) => b.options[0].half - a.options[0].half);
    } else if (sortBy === "nameAZ") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result.slice(0, itemsToShow);
  }, [data, id, searchTerm, filteredRange, sortBy, itemsToShow]);

  if (!data) {
    return (
      <div className="h-[55vh] flex items-center justify-center bg-background-dark text-xl sm:text-3xl text-text-secondary">
        <div className="animate-pulse">Loading delicious food...</div>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen bg-background-dark text-text-primary">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 bg-(--background-image-gradient-mesh) opacity-20" />

      <div className="relative container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4 space-y-6">
            <div className="bg-background-card border border-white/10 rounded-2xl p-6 shadow-xl">
              <RangeFilter />
            </div>

            <div className="bg-background-card border border-white/10 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold mb-4 text-(--color-accent-cyan)">Availability</h3>
              <div className="space-y-3">
                {['In Stock', 'Upcoming'].map((option) => (
                  <label key={option} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-white/10 bg-white/5 text-(--color-accent-cyan) focus:ring-(--color-accent-cyan)" />
                    <span className="text-text-secondary group-hover:text-text-primary transition">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="w-full lg:w-3/4 space-y-8">
            {/* Header / Active Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-background-card border border-white/10 rounded-2xl p-6 shadow-xl">
              <div>
                <h2 className="text-3xl font-extrabold bg-linear-to-r from-(--color-primary-cyan) to-(--color-primary-blue) bg-clip-text text-transparent">
                  {id}
                </h2>
                <p className="text-text-secondary text-sm font-medium mt-1">
                  Showing {filteredData.length} delicious results
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-text-muted uppercase">Sort By</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded-xl px-4 py-2 text-sm bg-background-dark border border-white/10 text-text-primary focus:border-(--color-accent-cyan) outline-none transition"
                  >
                    <option value="default">Default View</option>
                    <option value="lowToHigh">Price: Low to High</option>
                    <option value="highToLow">Price: High to Low</option>
                    <option value="nameAZ">Name: A to Z</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-text-muted uppercase">Show</span>
                  <select
                    value={itemsToShow}
                    onChange={(e) => setItemsToShow(Number(e.target.value))}
                    className="rounded-xl px-4 py-2 text-sm bg-background-dark border border-white/10 text-text-primary focus:border-(--color-accent-cyan) outline-none transition"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredData.map((item) => (
                  <div
                    key={item._id}
                    className="group bg-background-card border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-(--color-accent-cyan) hover:shadow-[0_0_50px_rgba(0,217,192,0.2)]"
                  >
                    <div className="h-56 overflow-hidden relative">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 right-4 bg-background-dark/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 font-bold text-(--color-accent-cyan) text-sm shadow-xl">
                        Tk {item.options[0].half}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-black uppercase tracking-widest text-text-muted">
                          {item.CategoryName}
                        </span>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <span className="text-sm font-bold">4.8</span>
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-text-primary mb-4 group-hover:text-(--color-accent-cyan) transition-colors">
                        {item.name}
                      </h3>

                      <button className="w-full py-3 rounded-2xl bg-white/5 border border-white/10 font-bold text-sm transition-all hover:bg-(--color-accent-cyan) hover:text-black hover:border-transparent">
                        View Item Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 bg-background-card rounded-3xl border border-dashed border-white/10">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-text-muted opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-2">No matches found</h3>
                <p className="text-text-secondary max-w-sm text-center">
                  We couldn't find any delicious food matching those filters. Try adjusting your search or price range.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-8 text-(--color-accent-cyan) font-bold hover:underline"
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
