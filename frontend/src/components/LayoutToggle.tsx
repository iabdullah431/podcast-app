import { useEffect, useRef, useState } from "react";

export default function LayoutToggle({
  layout,
  setLayout,
}: {
  layout: string;
  setLayout: (v: "grid" | "scroll" | "compact") => void;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close the menu when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !(menuRef.current as any).contains(e.target)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Toggle button (three vertical dots) */}
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

      {/* Dropdown menu aligned to the right of the toggle button */}
      {open && (
        <div className="absolute top-0 left-full ml-2 w-56 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded shadow-lg z-50 text-sm">
          {/* Grid option */}
          <button
            onClick={() => {
              setLayout("grid");
              setOpen(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-purple-700"
          >
            Switch layout to Grid
          </button>

          {/* Scroll option */}
          <button
            onClick={() => {
              setLayout("scroll");
              setOpen(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-purple-700"
          >
            Switch layout to Scroll
          </button>

          {/* Compact option */}
          <button
            onClick={() => {
              setLayout("compact");
              setOpen(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-purple-700"
          >
            Switch layout to Compact
          </button>
        </div>
      )}
    </div>
  );
}
