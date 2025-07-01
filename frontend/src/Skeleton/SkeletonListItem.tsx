export default function SkeletonListItem() {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg animate-pulse">
      <div className="w-20 h-20 bg-gray-600 rounded-md" />
      <div className="flex-1 space-y-3 py-1">
        <div className="h-4 bg-gray-600 rounded w-3/4" />
        <div className="h-3 bg-gray-600 rounded w-1/2" />
      </div>
      <div className="w-6 h-6 bg-gray-600 rounded" />
    </div>
  );
}
