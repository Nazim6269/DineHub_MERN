import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Category = () => {
    const { data } = useSelector((state) => state.fetchReducer);

    if (!data) {
        return (
            <div className="h-[55vh] flex items-center justify-center bg-app-bg text-xl sm:text-3xl text-text-dim">
                <div className="animate-pulse font-black uppercase tracking-tighter text-brand-primary">
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
        <section className="relative py-24 bg-app-bg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="mb-16 text-center">
                    <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-text-main mb-4">
                        Explore <span className="text-brand-primary">Categories</span>
                    </h2>
                    <p className="text-text-sub font-bold max-w-2xl mx-auto uppercase text-[10px] tracking-[0.4em]">
                        Authentic flavors delivered to your doorstep
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
                    {categories.map((item) => (
                        <Link
                            key={item._id}
                            to={`/category/${item.CategoryName}`}
                            className="group relative rounded-md bg-card-bg border border-border-thin p-10 flex flex-col items-center transition-all duration-500 hover:-translate-y-2 hover:border-brand-primary/30 hover:shadow-xl hover:shadow-text-main/5 overflow-hidden active:scale-95"
                        >
                            <div className="absolute inset-0 bg-brand-primary opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500" />

                            {/* Image Container */}
                            <div className="mb-8 w-32 h-32 sm:w-44 sm:h-44 rounded-full overflow-hidden border-[6px] border-app-bg bg-app-bg shadow-xl transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6">
                                <img
                                    src={item.img}
                                    alt={item.CategoryName}
                                    className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-500"
                                />
                            </div>

                            {/* Title */}
                            <h3 className="text-lg sm:text-xl font-black uppercase tracking-[0.1em] text-text-main group-hover:text-brand-primary transition-colors text-center">
                                {item.CategoryName}
                            </h3>

                            <div className="mt-5 h-1.5 w-0 bg-brand-primary transition-all duration-500 group-hover:w-16 rounded-full" />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Category;
