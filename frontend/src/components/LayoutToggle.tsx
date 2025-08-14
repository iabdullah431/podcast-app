import { useEffect, useRef, useState } from "react";

export default function LayoutToggle({
  layout,
  setLayout,
}: {
  layout: "grid" | "scroll" | "compact";
  setLayout: (v: "grid" | "scroll" | "compact") => void;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="text-white hover:text-purple-400 p-1"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-0 left-full ml-2 w-56 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded shadow-lg z-50 text-sm">
          <button
            onClick={() => {
              setLayout("grid");
              setOpen(false);
            }}
            className={`block w-full text-left px-4 py-2 hover:bg-purple-700 ${
              layout === "grid" ? "bg-purple-800" : ""
            }`}
          >
            Switch layout to Grid
          </button>
          <button
            onClick={() => {
              setLayout("scroll");
              setOpen(false);
            }}
            className={`block w-full text-left px-4 py-2 hover:bg-purple-700 ${
              layout === "scroll" ? "bg-purple-800" : ""
            }`}
          >
            Switch layout to Scroll
          </button>
          <button
            onClick={() => {
              setLayout("compact");
              setOpen(false);
            }}
            className={`block w-full text-left px-4 py-2 hover:bg-purple-700 ${
              layout === "compact" ? "bg-purple-800" : ""
            }`}
          >
            Switch layout to Compact
          </button>
        </div>
      )}
    </div>
  );
}
