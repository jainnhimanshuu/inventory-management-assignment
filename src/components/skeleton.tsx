function SkeletonItem() {
  return (
    <div className="flex gap-2 p-4 bg-slate-400 rounded-lg">
      <div className="h-8 w-8 bg-gray-700 animate-pulse rounded-lg mb-2"></div>
      <div className="w-full">
        <div className="h-2 bg-gray-700 animate-pulse rounded-lg mb-2 w-4/12"></div>
        <div className="h-6 bg-gray-700 animate-pulse rounded-lg"></div>
      </div>
    </div>
  );
}

export default function Skeleton() {
  return (
    <div className="p-4">
      <div className="h-8 bg-gray-700 w-4/12 animate-pulse rounded-lg mb-2"></div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2 mb-4">
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
      </div>
      <div className="flex flex-col space-y-4 p-4 mb-4 bg-slate-400 rounded-lg">
        <div className="h-8 bg-gray-700 animate-pulse rounded-lg"></div>
        <div className="h-8 bg-gray-700 animate-pulse rounded-lg"></div>
        <div className="h-8 bg-gray-700 animate-pulse rounded-lg"></div>
        <div className="h-8 bg-gray-700 animate-pulse rounded-lg"></div>
      </div>
    </div>
  );
}
