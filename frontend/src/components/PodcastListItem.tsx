"use client";

import { useEffect, useRef, useState } from "react";
import { Podcast } from "@/types/podcast";

export default function PodcastListItem({ podcast }: { podcast: Podcast }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
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
      {/* Podcast Image */}
      <img
        src={podcast.image}
        alt={podcast.name}
        className="w-20 h-20 rounded-md object-cover flex-shrink-0"
      />

      {/* Podcast Info */}
      <div className="flex-1 overflow-hidden">
        <h3 className="text-sm font-bold text-white truncate">
          {podcast.name}
        </h3>
        <p className="text-xs text-purple-400 truncate">{podcast.artist}</p>
      </div>

      {/* Toggle Button */}
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

        {/* Dropdown Menu */}
        {showMenu && (
          <div className="absolute left-0 lt-2 w-44 bg-gradient-to-br from-purple-500 to-indigo-600 rounded shadow-lg z-50 text-sm overflow-hidden">
            <a
              href={podcast.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 hover:bg-purple-700 hover:text-white transition-colors"
              onClick={() => setShowMenu(false)} // close menu on link click
            >
              Go to Podcast
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
