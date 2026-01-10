import { useRef, useCallback } from "react";

export function useScrollbar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updateThumbPosition = useCallback(() => {
    const container = containerRef.current;
    const thumb = thumbRef.current;
    if (!container || !thumb) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    if (scrollWidth <= clientWidth) {
      thumb.style.width = "100%";
      thumb.style.right = "0";
      return;
    }

    const thumbWidth = Math.max((clientWidth / scrollWidth) * 100, 8);
    const maxScroll = scrollWidth - clientWidth;
    const progress = Math.abs(scrollLeft) / maxScroll;
    const thumbRight = progress * (100 - thumbWidth);

    thumb.style.width = `${thumbWidth}%`;
    thumb.style.right = `${thumbRight}%`;
    thumb.style.left = "auto";
  }, []);

  return {
    containerRef,
    thumbRef,
    trackRef,
    isDragging,
    updateThumbPosition,
  };
}
