import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedTextCycleProps {
  words: string[];
  interval?: number; // time between word changes in ms
  className?: string;
  duration?: number; // transition duration in seconds
  ease?: "easeInOut" | "easeIn" | "easeOut" | "linear";
  ariaPrefix?: string; // e.g., "Designing tomorrow's"
  ariaSuffix?: string; // e.g., "experience today"
}

/**
 * AnimatedTextCycle
 * - Smoothly morphs between provided words with blur/scale crossfade
 * - Measures word width to avoid layout shifts
 * - Includes an ARIA live region for screen readers with full phrase
 */
export default function AnimatedTextCycle({
  words,
  interval = 3500,
  className = "",
  duration = 0.5,
  ease = "easeInOut",
  ariaPrefix,
  ariaSuffix,
}: AnimatedTextCycleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState<string | number>("auto");
  const measureRef = useRef<HTMLDivElement>(null);

  // Advance word on interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [interval, words.length]);

  // Measure current word width to keep container stable
  useEffect(() => {
    if (!measureRef.current) return;
    const el = measureRef.current.children[currentIndex] as HTMLElement | undefined;
    if (el) {
      const rect = el.getBoundingClientRect();
      setWidth(`${rect.width}px`);
    }
  }, [currentIndex]);

  // Variants for a subtle morph-like crossfade
  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 4,
      filter: "blur(4px)",
      scale: 0.98,
      transition: { duration, ease },
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: { duration, ease },
    },
    exit: {
      opacity: 0,
      y: -4,
      filter: "blur(4px)",
      scale: 0.98,
      transition: { duration, ease },
    },
  } as const;

  // Compose full phrase for screen readers
  const currentWord = words[currentIndex];
  const ariaPhrase = [ariaPrefix, currentWord, ariaSuffix].filter(Boolean).join(" ");

  return (
    <>
      {/* Offscreen measurement to compute widths without flashing */}
      <div
        ref={measureRef}
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none"
        style={{ visibility: "hidden" }}
      >
        {words.map((w, i) => (
          <span key={i} className={`inline-block ${className}`} style={{ whiteSpace: "nowrap" }}>
            {w}
          </span>
        ))}
      </div>

      {/* Live region for screen readers conveying the full phrase */}
      <span className="sr-only" aria-live="polite" aria-atomic="true">{ariaPhrase}</span>

      {/* Visible animated word (presentation only) */}
      <motion.span
        className="relative inline-block align-baseline"
        aria-hidden="true"
        animate={{
          width,
          transition: { type: "tween", duration, ease },
        }}
        style={{
          whiteSpace: "nowrap",
          overflow: "visible",
          lineHeight: "1.35em",
          paddingBottom: "0.1em",
          willChange: "transform, filter",
          backfaceVisibility: "hidden",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentIndex}
            className={`inline-block ${className}`}
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {currentWord}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
}