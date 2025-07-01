"use client";

import type React from "react";
import { useState, useRef, useEffect, useCallback } from "react";

interface OverviewScrollProps {
  children: React.ReactNode;
  className?: string;
}

export function OverviewScroll({
  children,
  className = "",
}: OverviewScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  const [isHovering, setIsHovering] = useState(false);

  // Check if RTL
  const isRTL = () => {
    if (typeof window === "undefined") return false;
    return (
      document.documentElement.dir === "rtl" || document.body.dir === "rtl"
    );
  };

  // Direct thumb position calculation - no state delays
  const updateThumbPosition = useCallback(() => {
    const container = containerRef.current;
    const thumb = thumbRef.current;
    const track = trackRef.current;

    if (!container || !thumb || !track) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    if (scrollWidth <= clientWidth) {
      thumb.style.width = "100%";
      thumb.style.left = "0%";
      return;
    }

    const thumbWidth = Math.max((clientWidth / scrollWidth) * 100, 8);
    const maxScroll = scrollWidth - clientWidth;

    let normalizedScrollLeft = scrollLeft;

    // RTL scroll normalization
    if (isRTL()) {
      if (scrollLeft <= 0) {
        normalizedScrollLeft = Math.abs(scrollLeft);
      } else {
        normalizedScrollLeft = maxScroll - scrollLeft;
      }
    }

    let thumbLeft =
      maxScroll > 0
        ? (normalizedScrollLeft / maxScroll) * (100 - thumbWidth)
        : 0;

    // Flip thumb position for RTL
    if (isRTL()) {
      thumbLeft = 100 - thumbWidth - thumbLeft;
    }

    // Direct DOM manipulation - no React state
    thumb.style.width = `${thumbWidth}%`;
    thumb.style.left = `${thumbLeft}%`;
  }, []);

  // Zero-delay scroll handler
  const handleScroll = useCallback(() => {
    if (!isDragging.current) {
      updateThumbPosition();
    }
  }, [updateThumbPosition]);

  // Native wheel behavior - no preventDefault unless necessary
  const handleWheel = useCallback((e: WheelEvent) => {
    const container = containerRef.current;
    if (!container) return;

    // Only handle horizontal scrolling or convert vertical to horizontal
    if (e.deltaX !== 0) {
      // Natural horizontal scroll - don't interfere
      return;
    }

    if (e.deltaY !== 0) {
      // Convert vertical to horizontal
      e.preventDefault();

      if (isRTL()) {
        const { scrollWidth, clientWidth } = container;
        const maxScroll = scrollWidth - clientWidth;
        let currentScroll = container.scrollLeft;

        // Normalize current scroll for RTL
        if (currentScroll <= 0) {
          currentScroll = Math.abs(currentScroll);
        } else {
          currentScroll = maxScroll - currentScroll;
        }

        const newScroll = Math.max(
          0,
          Math.min(maxScroll, currentScroll + e.deltaY)
        );

        // Set scroll for RTL
        if (container.scrollLeft <= 0) {
          container.scrollLeft = -newScroll;
        } else {
          container.scrollLeft = maxScroll - newScroll;
        }
      } else {
        container.scrollLeft += e.deltaY;
      }
    }
  }, []);

  // Ultra-fast drag handler - zero delay
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const container = containerRef.current;
    const track = trackRef.current;
    const thumb = thumbRef.current;

    if (!container || !track || !thumb) return;

    // Set drag state immediately
    isDragging.current = true;

    // Cache all values upfront to avoid recalculation
    const trackRect = track.getBoundingClientRect();
    const trackWidth = trackRect.width;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const startX = e.clientX;

    let startScrollLeft = container.scrollLeft;

    // Normalize start scroll for RTL
    if (isRTL()) {
      if (startScrollLeft <= 0) {
        startScrollLeft = Math.abs(startScrollLeft);
      } else {
        startScrollLeft = maxScroll - startScrollLeft;
      }
    }

    // Immediate visual feedback - no delays
    thumb.style.backgroundColor = "#7c3aed";
    thumb.style.transition = "none"; // Remove all transitions during drag
    document.body.style.userSelect = "none";
    document.body.style.cursor = "grabbing";

    // Ultra-fast mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      // Direct calculation - no conditionals or state checks
      let deltaX = e.clientX - startX;

      // Reverse delta for RTL
      if (isRTL()) {
        deltaX = -deltaX;
      }

      const scrollRatio = maxScroll / trackWidth;
      const newScrollLeft = Math.max(
        0,
        Math.min(maxScroll, startScrollLeft + deltaX * scrollRatio)
      );

      // Direct DOM updates - bypass everything
      if (isRTL()) {
        if (container.scrollLeft <= 0) {
          container.scrollLeft = -newScrollLeft;
        } else {
          container.scrollLeft = maxScroll - newScrollLeft;
        }
      } else {
        container.scrollLeft = newScrollLeft;
      }

      // Update thumb position directly without function calls
      const thumbWidth = Math.max(
        (container.clientWidth / container.scrollWidth) * 100,
        8
      );
      let thumbLeft =
        maxScroll > 0 ? (newScrollLeft / maxScroll) * (100 - thumbWidth) : 0;

      // Flip thumb position for RTL
      if (isRTL()) {
        thumbLeft = 100 - thumbWidth - thumbLeft;
      }

      thumb.style.width = `${thumbWidth}%`;
      thumb.style.left = `${thumbLeft}%`;
    };

    const handleMouseUp = () => {
      isDragging.current = false;

      // Restore transitions
      thumb.style.transition = "height 0.15s ease, background-color 0.1s ease";
      thumb.style.backgroundColor = "#9333ea";
      document.body.style.userSelect = "";
      document.body.style.cursor = "";

      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    // Add listeners immediately
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, []);

  // Track click for jumping
  const handleTrackClick = useCallback((e: React.MouseEvent) => {
    const container = containerRef.current;
    const track = trackRef.current;
    const thumb = thumbRef.current;

    if (!container || !track || e.target === thumb) return;

    const rect = track.getBoundingClientRect();
    let clickX = e.clientX - rect.left;

    // Flip click position for RTL
    if (isRTL()) {
      clickX = rect.width - clickX;
    }

    const scrollRatio = clickX / rect.width;
    const targetScroll =
      scrollRatio * (container.scrollWidth - container.clientWidth);

    if (isRTL()) {
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft <= 0) {
        container.scrollLeft = -targetScroll;
      } else {
        container.scrollLeft = maxScroll - targetScroll;
      }
    } else {
      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Passive listeners for maximum performance
    container.addEventListener("scroll", handleScroll, { passive: true });
    container.addEventListener("wheel", handleWheel, { passive: false });

    // Initial position
    updateThumbPosition();

    const handleResize = () => updateThumbPosition();
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
      container.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleScroll, handleWheel, updateThumbPosition]);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Native scrolling container */}
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

      {/* Always visible custom scrollbar */}
      <div
        ref={trackRef}
        className={`relative mt-2 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer ${
          isHovering ? "h-3" : "h-1.5"
        }`}
        style={{ transition: "height 0.15s ease" }}
        onMouseDown={handleTrackClick}
      >
        <div
          ref={thumbRef}
          className={`absolute top-0 bg-purple-600 rounded-full cursor-grab ${
            isHovering ? "h-3" : "h-1.5"
          }`}
          style={{
            minWidth: "20px",
            transition: "height 0.15s ease", // Only transition height, not background
            backgroundColor: "#9333ea", // Set initial color directly
          }}
          onMouseDown={handleMouseDown}
        />
      </div>
    </div>
  );
}
