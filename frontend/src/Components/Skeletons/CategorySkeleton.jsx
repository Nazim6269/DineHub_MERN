import SkeletonPulse from "./SkeletonPulse";

const SkeletonCategoryTile = () => (
  <div className="bg-card-bg border border-border-thin rounded-md p-10 flex flex-col items-center">
    <SkeletonPulse className="mb-8 w-32 h-32 sm:w-44 sm:h-44 rounded-full" />
    <SkeletonPulse className="h-6 w-28" />
    <SkeletonPulse className="mt-5 h-1.5 w-16 rounded-full" />
  </div>
);

const CategorySkeleton = () => {
  return (
    <section className="relative py-24 bg-app-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <SkeletonPulse className="h-12 w-96 mx-auto mb-4" />
          <SkeletonPulse className="h-3 w-64 mx-auto" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCategoryTile key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySkeleton;
