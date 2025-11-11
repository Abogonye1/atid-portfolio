'use client';
import { cn } from '@/lib/utils';
import { useMotionValue, animate, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import useMeasure from 'react-use-measure';

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
  speed?: number;
  speedOnHover?: number;
};

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = 'horizontal',
  reverse = false,
  className,
  speed = 25,
  speedOnHover,
}: InfiniteSliderProps) {
  const [currentDuration, setCurrentDuration] = useState(speed || duration);
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Respect OS-level reduced motion preference
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    // Prefer modern addEventListener; fallback to legacy addListener where necessary
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', update);
    } else if ('addListener' in mq) {
      // Legacy MediaQueryList API (deprecated)
      const legacyMq = mq as MediaQueryList & {
        addListener: (listener: (ev: MediaQueryListEvent) => void) => void;
        removeListener: (listener: (ev: MediaQueryListEvent) => void) => void;
      };
      legacyMq.addListener(update);
    }
    return () => {
      if (typeof mq.removeEventListener === 'function') {
        mq.removeEventListener('change', update);
      } else if ('removeListener' in mq) {
        const legacyMq = mq as MediaQueryList & {
          addListener: (listener: (ev: MediaQueryListEvent) => void) => void;
          removeListener: (listener: (ev: MediaQueryListEvent) => void) => void;
        };
        legacyMq.removeListener(update);
      }
    };
  }, []);

  useEffect(() => {
    let controls;
    const size = direction === 'horizontal' ? width : height;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    // If reduced motion is enabled, stop animating and keep static layout
    if (reducedMotion) {
      translation.set(0);
      return;
    }

    if (isTransitioning) {
      controls = animate(translation, [translation.get(), to], {
        ease: 'linear',
        duration:
          currentDuration * Math.abs((translation.get() - to) / contentSize),
        onComplete: () => {
          setIsTransitioning(false);
          setKey((prevKey) => prevKey + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: 'linear',
        duration: currentDuration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
        onRepeat: () => {
          translation.set(from);
        },
      });
    }

    return controls?.stop;
  }, [
    key,
    translation,
    currentDuration,
    width,
    height,
    gap,
    isTransitioning,
    direction,
    reverse,
    reducedMotion,
  ]);

  const hoverProps = (!reducedMotion && (speedOnHover || durationOnHover))
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentDuration(speedOnHover || durationOnHover || speed);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentDuration(speed || duration);
        },
      }
    : {};

  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        className='flex w-max'
        style={{
          ...(reducedMotion
            ? (direction === 'horizontal' ? { x: 0 } : { y: 0 })
            : (direction === 'horizontal' ? { x: translation } : { y: translation })),
          gap: `${gap}px`,
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
        }}
        ref={ref}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}