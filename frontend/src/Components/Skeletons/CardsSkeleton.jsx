import SkeletonPulse from "./SkeletonPulse";

const SkeletonCard = () => (
  <div className="bg-card-bg border border-border-thin rounded-md overflow-hidden">
    <SkeletonPulse className="h-64 rounded-none" />
    <div className="p-8">
      <SkeletonPulse className="h-6 w-3/4 mb-4" />
      <div className="flex items-center justify-between mb-8">
        <div>
          <SkeletonPulse className="h-3 w-16 mb-2" />
          <SkeletonPulse className="h-8 w-24" />
        </div>
        <SkeletonPulse className="h-12 w-12" />
      </div>
      <SkeletonPulse className="h-12 w-full" />
    </div>
  </div>
);

const CardsSkeleton = () => {
  return (
    <section className="relative bg-app-bg py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <SkeletonPulse className="h-12 w-80 mx-auto mb-4" />
          <SkeletonPulse className="h-1.5 w-20 mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardsSkeleton;
