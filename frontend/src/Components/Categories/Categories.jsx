import Category from "../Category/Category";

const Categories = () => {
 return (
 <section
 className="
 relative overflow-hidden
 bg-background-dark
 text-text-primary
 px-4 sm:px-6 lg:px-8
 py-16
 "
 >
 {/* Subtle background glow */}
 <div
 className="
 pointer-events-none absolute inset-0
 bg-(--background-image-gradient-mesh)
 opacity-40
 "
 />

 <div className="relative container mx-auto">
 <Category />
 </div>
 </section>
 );
};

export default Categories;
