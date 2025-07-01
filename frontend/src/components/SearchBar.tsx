export default function SearchBar({
  onSearch,
}: {
  onSearch: (term: string) => void;
}) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="ابحث عن بودكاست..."
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch((e.target as HTMLInputElement).value);
          }
        }}
      />
    </div>
  );
}
