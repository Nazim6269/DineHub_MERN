const Question = () => {
    return (
        <section className="text-text-main">
            <div className="container mx-auto">
                <div className="flex flex-col gap-6">
                    <div className="bg-app-bg p-8 rounded-md border border-border-thin shadow-sm">
                        <p className="text-text-dim font-bold uppercase text-[10px] tracking-[0.2em] mb-4">
                            Customer Service
                        </p>
                        <h4 className="text-xl font-black text-text-main mb-6 uppercase tracking-tight">
                            Any queries about this dish?
                        </h4>

                        <div className="flex flex-col gap-4">
                            <textarea
                                className="w-full rounded-md border border-border-thin bg-card-bg px-6 py-4 text-sm text-text-main placeholder:text-text-dim/50 focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary/50 transition-all font-bold"
                                placeholder="Ask us anything (e.g. ingredients, allergens)..."
                                rows={3}
                            ></textarea>

                            <button className="w-full sm:w-max inline-flex justify-center items-center text-text-on-brand bg-brand-primary py-4 px-10 rounded-md hover:scale-105 active:scale-95 text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-brand-primary/20">
                                Submit Inquiry
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Question;
