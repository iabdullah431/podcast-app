import { useState, useRef, useEffect } from "react";

export default function SearchBar({
  value,
  onChange,
  onSearch,
  onClear,
  history = [],
  onPickHistory,
}: {
  value: string;
  onChange: (v: string) => void;
  onSearch: (term: string) => void;
  onClear: () => void;
  history?: string[];
  onPickHistory?: (term: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mb-6 relative" ref={wrapperRef}>
      <div className="relative">
        <input
          type="text"
          value={value}
          placeholder="ابحث عن بودكاست..."
          className="w-full px-4 py-2 pr-10 rounded-lg border border-purple-500/40 
                     bg-[#1a1a2e] text-white placeholder-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch(value);
          }}
        />
        {value && (
          <button
            type="button"
            onClick={() => {
              onClear();
              setOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            aria-label="Clear"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {open && history.length > 0 && (
        <div
          className="absolute top-full mt-1 w-full bg-[#1a1a2e] border border-purple-500/40 
                        rounded-lg shadow-lg z-50"
        >
          {history.map((h, i) => (
            <button
              key={i}
              onClick={() => {
                onPickHistory?.(h);
                onSearch(h);
                setOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm 
                         text-gray-200 hover:bg-purple-600/30 hover:text-white"
            >
              {h}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
