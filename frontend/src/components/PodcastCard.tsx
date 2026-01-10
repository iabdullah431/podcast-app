import { Podcast } from "@/types/podcast";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function PodcastCard({ podcast }: { podcast: Podcast }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative bg-[#1e1e2f] rounded-2xl hover:bg-[#292940] transition p-4 w-full max-w-[260px] flex flex-col items-center">
      <div className="w-[220px] h-[220px] rounded-xl overflow-hidden relative shadow-none">
        <Image
          src={podcast.image}
          alt={podcast.name}
          fill
          style={{ objectFit: "cover" }}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2UyZTJlMiIvPjwvc3ZnPg=="
          draggable={false}
          sizes="220px"
          className="select-none"
        />
      </div>

      <div className="mt-4 w-full px-2">
        <div className="flex justify-between items-center">
          <div className="flex flex-col flex-grow mr-4 min-w-0">
            <h3
              title={podcast.name}
              className="text-lg font-semibold text-white truncate hover:underline cursor-pointer transition"
            >
              {podcast.name}
            </h3>
            <p
              title={podcast.artist}
              className="text-sm text-purple-400 truncate mt-1"
            >
              {podcast.artist}
            </p>
          </div>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowMenu((prev) => !prev)}
              className="text-gray-400 hover:text-white p-1 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Open menu"
              type="button"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="5" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="12" cy="19" r="2" />
              </svg>
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-36 bg-gradient-to-br from-purple-700 to-indigo-800 text-white rounded-lg shadow-lg z-50 overflow-hidden">
                <a
                  href={podcast.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 hover:bg-purple-600 transition-colors text-sm whitespace-nowrap"
                  onClick={() => setShowMenu(false)}
                >
                  Go to Podcast
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
