"use client";

import { useState, useEffect } from "react";
import { useScrollbar } from "@/hooks/useScrollbar";
import { useScrollHandlers } from "@/hooks/useScrollHandlers";

interface OverviewScrollProps {
  children: React.ReactNode;
  className?: string;
}

export function OverviewScroll({
  children,
  className = "",
}: OverviewScrollProps) {
  const [isHovering, setIsHovering] = useState(false);

  const { containerRef, thumbRef, trackRef, isDragging, updateThumbPosition } =
    useScrollbar();

  const { handleScroll, handleWheel, handleMouseDown, handleTrackClick } =
    useScrollHandlers({
      containerRef,
      thumbRef,
      trackRef,
      isDragging,
      updateThumbPosition,
    });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const initScroll = () => updateThumbPosition();
    setTimeout(initScroll, 100);

    container.addEventListener("scroll", handleScroll, { passive: true });
    container.addEventListener("wheel", handleWheel, { passive: false });

    const handleResize = () => updateThumbPosition();
    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      container.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
    };
  }, [containerRef, handleScroll, handleWheel, updateThumbPosition]);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        ref={containerRef}
        className="overflow-x-auto overflow-y-hidden"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="flex gap-4 pb-4" style={{ width: "max-content" }}>
          {children}
        </div>
      </div>

      <div
        ref={trackRef}
        className={`relative mt-2 bg-gray-700 rounded-full cursor-pointer transition-all ${
          isHovering ? "h-3" : "h-1.5"
        }`}
        onMouseDown={handleTrackClick}
      >
        <div
          ref={thumbRef}
          className={`absolute top-0 bg-purple-600 rounded-full cursor-grab transition-all ${
            isHovering ? "h-3" : "h-1.5"
          }`}
          style={{
            minWidth: "20px",
            backgroundColor: "#9333ea",
          }}
          onMouseDown={handleMouseDown}
        />
      </div>
    </div>
  );
}
