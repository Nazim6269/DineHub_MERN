import SkeletonPulse from "./SkeletonPulse";

const SkeletonCategoryCard = () => (
  <div className="bg-card-bg border border-border-thin rounded-md overflow-hidden">
    <SkeletonPulse className="h-60 rounded-none" />
    <div className="p-8">
      <div className="flex items-center justify-between mb-3">
        <SkeletonPulse className="h-3 w-20" />
        <SkeletonPulse className="h-3 w-12" />
      </div>
      <SkeletonPulse className="h-6 w-3/4 mb-6" />
      <SkeletonPulse className="h-12 w-full" />
    </div>
  </div>
);

const SingleCategorySkeleton = () => {
  return (
    <section className="relative min-h-screen bg-app-bg pb-20">
      <div className="relative container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4 space-y-6">
            <div className="bg-card-bg border border-border-thin rounded-md p-8 shadow-sm">
              <SkeletonPulse className="h-4 w-32 mb-8" />
              <SkeletonPulse className="h-8 w-full" />
              <SkeletonPulse className="h-4 w-full mt-4" />
            </div>
            <div className="bg-card-bg border border-border-thin rounded-md p-8 shadow-sm">
              <SkeletonPulse className="h-4 w-24 mb-6" />
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <SkeletonPulse className="h-5 w-5" />
                    <SkeletonPulse className="h-4 w-24" />
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="w-full lg:w-3/4 space-y-8">
            <div className="bg-app-bg border border-border-thin rounded-md p-8 shadow-sm shadow-text-main/5">
              <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                <div>
                  <SkeletonPulse className="h-10 w-64 mb-2" />
                  <SkeletonPulse className="h-3 w-40" />
                </div>
                <div className="flex items-center gap-6">
                  <SkeletonPulse className="h-8 w-28" />
                  <SkeletonPulse className="h-8 w-20" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCategoryCard key={i} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default SingleCategorySkeleton;
