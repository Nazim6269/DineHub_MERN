import SkeletonPulse from "./SkeletonPulse";

const CardDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-app-bg pb-20">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <SkeletonPulse className="h-4 w-32" />
      </div>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Image */}
          <div className="lg:col-span-7">
            <SkeletonPulse className="w-full aspect-[4/3]" />
            <div className="grid grid-cols-3 gap-4 mt-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonPulse key={i} className="h-24" />
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex-1">
              {/* Title */}
              <SkeletonPulse className="h-12 w-full mb-2" />
              <SkeletonPulse className="h-12 w-2/3 mb-4" />

              {/* Status badges */}
              <div className="flex items-center gap-4 mb-8">
                <SkeletonPulse className="h-6 w-20 rounded-lg" />
                <SkeletonPulse className="h-4 w-40" />
              </div>

              {/* Description */}
              <div className="mb-10 border-l-4 border-border-strong pl-6 space-y-3">
                <SkeletonPulse className="h-4 w-full" />
                <SkeletonPulse className="h-4 w-5/6" />
                <SkeletonPulse className="h-4 w-4/6" />
              </div>

              {/* Pricing cards */}
              <div className="space-y-4 mb-10">
                <SkeletonPulse className="h-3 w-32 mb-2" />
                <div className="grid grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonPulse key={i} className="h-20" />
                  ))}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-4">
              <SkeletonPulse className="h-14 w-full" />
              <SkeletonPulse className="h-14 w-full" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CardDetailsSkeleton;
