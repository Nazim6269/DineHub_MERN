import { Star } from "lucide-react";

const RelatedItem = ({ items = [] }) => {
  return (
    <section className="text-text-main">
      <div className="container mx-auto">
        <div className="flex flex-col gap-4">
          {items.length ? (
            items.map((item) => (
              <div
                key={item._id}
                className="group flex gap-4 bg-app-bg p-4 rounded-2xl border border-border-thin hover:border-brand-primary/20 hover:shadow-xl hover:shadow-text-main/5 transition-all duration-300"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl overflow-hidden border border-border-thin shadow-sm">
                  <img
                    src={item.img || ""}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="text-text-main text-sm font-black uppercase tracking-tight group-hover:text-brand-primary transition-colors line-clamp-1">
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Star size={12} className="text-status-warning fill-current" />
                    <span className="text-[10px] font-black text-text-dim uppercase tracking-widest">4.8 Rating</span>
                  </div>
                  <span className="font-black text-brand-primary text-sm sm:text-lg mt-1">
                    Tk {item.options[0]?.full || "0.00"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center bg-card-bg/50 rounded-3xl border border-dashed border-border-thin">
              <p className="text-text-dim font-bold uppercase text-[10px] tracking-[0.2em]">
                No matches found
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RelatedItem;
