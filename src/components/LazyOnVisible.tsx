import React, { useEffect, useRef, useState } from "react";

type LazyOnVisibleProps = {
  children: React.ReactNode;
  minHeight?: number | string;
  rootMargin?: string;
};

export default function LazyOnVisible({
  children,
  minHeight = 300,
  rootMargin = "200px",
}: LazyOnVisibleProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return; // already visible
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        });
      },
      { rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [visible, rootMargin]);

  return (
    <div ref={ref} style={{ minHeight }} className="w-full">
      {visible ? (
        children
      ) : (
        <div
          aria-hidden
          className="w-full h-full min-h-[1rem] animate-pulse bg-muted/30 rounded-md"
        />
      )}
    </div>
  );
}