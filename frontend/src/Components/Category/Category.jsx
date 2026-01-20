import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Category = () => {
  const { data } = useSelector((state) => state.fetchReducer);

  if (!data) {
    return (
      <div className="h-[55vh] flex items-center justify-center bg-background-dark text-xl sm:text-3xl text-text-secondary">
        <div className="animate-pulse font-black uppercase tracking-tighter text-primary-cyan">
          Loading Menu...
        </div>
      </div>
    );
  }

  // Get unique categories
  const categories = Array.from(new Set(data.map(item => item.CategoryName))).map(name => {
    return data.find(item => item.CategoryName === name);
  });

  return (
    <section className="relative py-24 bg-background-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-text-primary mb-4">
            Explore <span className="text-primary-cyan">Categories</span>
          </h2>
          <p className="text-text-secondary font-bold max-w-2xl mx-auto uppercase text-xs tracking-[0.3em]">
            Authentic flavors delivered to your doorstep
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {categories.map((item) => (
            <Link
              key={item._id}
              to={`/category/${item.CategoryName}`}
              className="group relative rounded-[2.5rem] bg-background-card border border-white/5 p-8 flex flex-col items-center transition-all duration-500 hover:-translate-y-2 hover:border-primary-cyan/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden active:scale-95"
            >
              <div className="absolute inset-0 bg-primary-cyan opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500" />

              {/* Image */}
              <div className="mb-6 w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white/5 bg-background-dark shadow-2xl transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6">
                <img
                  src={item.img}
                  alt={item.CategoryName}
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-black uppercase tracking-widest text-text-primary group-hover:text-primary-cyan transition-colors text-center">
                {item.CategoryName}
              </h3>

              <div className="mt-4 h-1 w-0 bg-primary-cyan transition-all duration-500 group-hover:w-12 rounded-full" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
