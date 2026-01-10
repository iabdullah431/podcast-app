import { useCallback } from "react";

interface UseScrollHandlersProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  thumbRef: React.RefObject<HTMLDivElement | null>;
  trackRef: React.RefObject<HTMLDivElement | null>;
  isDragging: React.MutableRefObject<boolean>;
  updateThumbPosition: () => void;
}

export function useScrollHandlers({
  containerRef,
  thumbRef,
  trackRef,
  isDragging,
  updateThumbPosition,
}: UseScrollHandlersProps) {
  const handleScroll = useCallback(() => {
    if (!isDragging.current) {
      updateThumbPosition();
    }
  }, [isDragging, updateThumbPosition]);

  const handleWheel = useCallback((e: WheelEvent) => {
    const container = containerRef.current;
    if (!container) return;

    if (e.deltaY !== 0 && e.deltaX === 0) {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    }
  }, [containerRef]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      const container = containerRef.current;
      const track = trackRef.current;
      const thumb = thumbRef.current;
      if (!container || !track || !thumb) return;

      isDragging.current = true;
      const trackRect = track.getBoundingClientRect();
      const maxScroll = container.scrollWidth - container.clientWidth;
      const startX = e.clientX;
      const startScroll = Math.abs(container.scrollLeft);

      thumb.style.backgroundColor = "#7c3aed";
      document.body.style.userSelect = "none";
      document.body.style.cursor = "grabbing";

      const handleMouseMove = (e: MouseEvent) => {
        const deltaX = e.clientX - startX;
        const scrollDelta = (deltaX / trackRect.width) * maxScroll;
        const newScroll = Math.max(
          0,
          Math.min(maxScroll, startScroll - scrollDelta)
        );

        container.scrollLeft = -newScroll;

        const thumbWidth = Math.max(
          (container.clientWidth / container.scrollWidth) * 100,
          8
        );
        const progress = newScroll / maxScroll;
        const thumbRight = progress * (100 - thumbWidth);

        thumb.style.width = `${thumbWidth}%`;
        thumb.style.right = `${thumbRight}%`;
        thumb.style.left = "auto";
      };

      const handleMouseUp = () => {
        isDragging.current = false;
        thumb.style.backgroundColor = "#9333ea";
        document.body.style.userSelect = "";
        document.body.style.cursor = "";
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [containerRef, thumbRef, trackRef, isDragging]
  );

  const handleTrackClick = useCallback(
    (e: React.MouseEvent) => {
      const container = containerRef.current;
      const track = trackRef.current;
      const thumb = thumbRef.current;
      if (!container || !track || e.target === thumb) return;

      const rect = track.getBoundingClientRect();
      const clickX = rect.right - e.clientX;
      const progress = clickX / rect.width;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const targetScroll = progress * maxScroll;

      container.scrollTo({
        left: -targetScroll,
        behavior: "smooth",
      });
    },
    [containerRef, thumbRef, trackRef]
  );

  return {
    handleScroll,
    handleWheel,
    handleMouseDown,
    handleTrackClick,
  };
}
