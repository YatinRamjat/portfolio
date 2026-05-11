export function LoadingSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl bg-white shadow-sm overflow-hidden">
      <div className="aspect-[3/4] bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-16 rounded bg-gray-200" />
        <div className="h-4 w-3/4 rounded bg-gray-200" />
        <div className="h-3 w-24 rounded bg-gray-200" />
        <div className="flex gap-2">
          <div className="h-5 w-16 rounded bg-gray-200" />
          <div className="h-5 w-12 rounded bg-gray-200" />
        </div>
        <div className="flex gap-1.5">
          <div className="h-4 w-4 rounded-full bg-gray-200" />
          <div className="h-4 w-4 rounded-full bg-gray-200" />
          <div className="h-4 w-4 rounded-full bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <LoadingSkeleton key={i} />
      ))}
    </div>
  );
}
