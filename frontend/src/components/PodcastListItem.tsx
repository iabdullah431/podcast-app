"use client";

import { useEffect, useRef, useState } from "react";
import { Podcast } from "@/types/podcast";

export default function PodcastListItem({ podcast }: { podcast: Podcast }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    if (showMenu) {
      window.addEventListener("mousedown", handleClickOutside);
    } else {
      window.removeEventListener("mousedown", handleClickOutside);
    }
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  return (
    <div className="relative flex items-start bg-[#1a1a28] hover:bg-[#232334] transition rounded-lg p-4 gap-4 shadow">
      <img
        src={podcast.image}
        alt={podcast.name}
        className="w-20 h-20 rounded-md object-cover flex-shrink-0"
      />

      <div className="flex-1 overflow-hidden">
        <h3 className="text-sm font-bold text-white truncate">
          {podcast.name}
        </h3>
        <p className="text-xs text-purple-400 truncate">{podcast.artist}</p>
      </div>

      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setShowMenu((prev) => !prev)}
          className="text-gray-400 hover:text-white p-1 rounded transition-colors duration-200"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-2 w-36 bg-gradient-to-br from-purple-700 to-indigo-800 rounded-lg shadow-lg z-50 overflow-hidden">
            <a
              href={podcast.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 hover:bg-purple-600 text-white transition-colors text-sm whitespace-nowrap"
              onClick={() => setShowMenu(false)}
            >
              Go to Podcast
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
