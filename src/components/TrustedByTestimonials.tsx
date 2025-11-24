import { cn, assetUrl } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import manifest from "@/data/imageManifest.json";

interface Testimonial {
  id: string;
  company: string;
  quote: string;
  image: string; // used as poster fallback
  tall?: boolean;
  videoMp4?: string;
  videoWebm?: string;
  poster?: string;
  captions?: string; // optional VTT captions file
  ariaLabel?: string; // accessibility label override
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    company: "TechFlow",
    quote: "This platform revolutionized our startup operations. The seamless integration and powerful automation tools helped us scale from 10 to 500+ customers in just 6 months.",
    image: "/lovable-uploads/f981eaec-cb54-4101-8f56-5fba15e25d3e.png",
    poster: "/lovable-uploads/f981eaec-cb54-4101-8f56-5fba15e25d3e.png",
    videoMp4: "/lovable-uploads/91d3772000767114aef2925548c98b85.mp4",
    tall: true
  },
  {
    id: "2", 
    company: "DataSync",
    quote: "The analytics and insights provided by this platform are game-changing. We've increased our conversion rates by 300% and reduced operational costs significantly.",
    image: "/lovable-uploads/4e58a34f-d074-43a0-b54b-099d372489eb.png",
    poster: "/lovable-uploads/4e58a34f-d074-43a0-b54b-099d372489eb.png",
    videoMp4: "/lovable-uploads/57dc7e18c62b33d62c835cf3a741967f_720w.mp4",
    tall: false
  },
  {
    id: "3",
    company: "CloudVision",
    quote: "Outstanding support and incredibly intuitive interface. Our team was up and running in minutes, not weeks. The ROI has been exceptional from day one.",
    image: "/lovable-uploads/freepik__create-an-image-with-a-bold-text-that-says-fashion__80562.jpg", 
    poster: "/lovable-uploads/freepik__create-an-image-with-a-bold-text-that-says-fashion__80562.jpg",
    videoMp4: "/lovable-uploads/b29a5201a81891ead4854e5517a00a77_720w.mp4",
    tall: true
  },
  {
    id: "4",
    company: "AI Labs",
    quote: "The best investment we've made for our startup. The platform's AI-driven features have automated 80% of our manual processes and improved our efficiency dramatically.",
    image: "/lovable-uploads/90458e21-6553-4a7c-aba0-cb090d345ccd.png",
    poster: "/lovable-uploads/90458e21-6553-4a7c-aba0-cb090d345ccd.png",
    videoMp4: "/lovable-uploads/966aaabb183b1ccea144d2cf2c745a87.mp4",
    tall: false
  },
  {
    id: "5",
    company: "NextGen Solutions",
    quote: "From prototype to market leader in record time. This platform provided everything we needed to validate, build, and scale our business successfully.",
    image: "/lovable-uploads/680eeff1-b618-46ab-adbc-a89323decb35.png",
    poster: "/lovable-uploads/680eeff1-b618-46ab-adbc-a89323decb35.png",
    videoMp4: "/lovable-uploads/d53c7c5bfe55bc3c9c7dbca70e645500.mp4",
    tall: true
  },
  {
    id: "6",
    company: "InnovateCorp",
    quote: "The comprehensive suite of tools and exceptional customer success team made our digital transformation seamless. We've seen 250% growth since implementation.",
    image: "/lovable-uploads/d2cf38f6-985d-425e-85cc-3376da831479.png",
    poster: "/lovable-uploads/d2cf38f6-985d-425e-85cc-3376da831479.png",
    videoMp4: "/lovable-uploads/f214638c6709c1eec351cc4ed7135b7d.mp4",
    tall: false
  }
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Lazy-load video sources only when card enters viewport
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { rootMargin: "120px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Hover behavior: play on enter, pause + reset on leave
  const handleMouseEnter = () => {
    setIsHovered(true);
    const v = videoRef.current;
    if (v) {
      // Ensure load has begun before play call
      v.play().catch(() => {/* ignore play errors */});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    const v = videoRef.current;
    if (v) {
      v.pause();
      try { v.currentTime = 0; } catch {/* ignore */}
    }
  };

  // Tap-to-play for touch devices
  const handleClick = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {/* ignore */});
      setIsHovered(true);
    } else {
      v.pause();
      try { v.currentTime = 0; } catch {/* ignore */}
      setIsHovered(false);
    }
  };

  const hasVideo = Boolean(testimonial.videoMp4 || testimonial.videoWebm);
  const showVideo = hasVideo && (isHovered || isInView);

  // Autoplay/pause when visibility changes
  useEffect(() => {
    if (!hasVideo) return;
    const v = videoRef.current;
    if (!v) return;
    if (showVideo) {
      v.play().catch(() => {/* ignore play errors */});
    } else {
      v.pause();
      try { v.currentTime = 0; } catch {/* ignore */}
    }
  }, [showVideo, hasVideo]);

  return (
    <div className={cn(
      "flex flex-col shrink-0 w-full sm:w-[320px] lg:w-[380px]",
      "mr-2 sm:mr-4 lg:mr-6"
    )}>
      <div
        ref={containerRef}
        className={cn(
          "relative overflow-hidden rounded-lg",
          testimonial.tall ? "h-[400px] sm:h-[450px] lg:h-[506px]" : "h-[240px] sm:h-[260px] lg:h-[285px]"
        )}
        onMouseEnter={hasVideo ? handleMouseEnter : undefined}
        onMouseLeave={hasVideo ? handleMouseLeave : undefined}
        onClick={hasVideo ? handleClick : undefined}
        role={hasVideo ? "button" : undefined}
        aria-label={testimonial.ariaLabel || `${testimonial.company} showcase video`}
      >
          {/* Poster image layer with responsive sources when available */}
          {(() => {
            const posterPath = assetUrl(testimonial.poster || testimonial.image);
            const basename = posterPath
              .replace(/^\/+/, "")
              .replace(/^lovable-uploads\//, "")
              .replace(/^public\/lovable-uploads\//, "")
              .replace(/\.(png|jpg|jpeg)$/i, "");
            const widths: number[] | undefined = (manifest as Record<string, number[]>)[basename];

            const sizes = "(max-width: 640px) 90vw, (max-width: 1024px) 320px, 380px";

            if (widths && widths.length) {
              const avifSrcSet = widths.map((w) => `${assetUrl(`/lovable-uploads/${basename}-${w}w.avif`)} ${w}w`).join(", ");
              const webpSrcSet = widths.map((w) => `${assetUrl(`/lovable-uploads/${basename}-${w}w.webp`)} ${w}w`).join(", ");
              return (
                <picture>
                  <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
                  <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
                  <img
                    src={posterPath}
                    alt={testimonial.company || "Company showcase"}
                    className={cn(
                      "absolute inset-0 w-full h-full object-cover",
                      hasVideo ? (showVideo ? "opacity-0" : "opacity-100") : "opacity-100",
                      "transition-opacity duration-300"
                    )}
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              );
            }

            return (
              <img
                src={posterPath}
                alt={testimonial.company || "Company showcase"}
                className={cn(
                  "absolute inset-0 w-full h-full object-cover",
                  hasVideo ? (showVideo ? "opacity-0" : "opacity-100") : "opacity-100",
                  "transition-opacity duration-300"
                )}
                loading="lazy"
                decoding="async"
              />
            );
          })()}

          {/* Video layer - lazy-injected sources when in view */}
          {hasVideo && (
            <video
              ref={videoRef}
              className={cn(
                "absolute inset-0 w-full h-full object-cover",
                showVideo ? "opacity-100" : "opacity-0",
                "transition-opacity duration-300"
              )}
              muted
              playsInline
              loop
              controls={false}
              preload="none"
              autoPlay={showVideo}
              poster={assetUrl(testimonial.poster || testimonial.image)}
            >
              {isInView && testimonial.videoWebm && (
                <source src={assetUrl(testimonial.videoWebm)} type="video/webm" />
              )}
              {isInView && testimonial.videoMp4 && (
                <source src={assetUrl(testimonial.videoMp4)} type="video/mp4" />
              )}
              {testimonial.captions && (
                <track kind="captions" src={testimonial.captions} />
              )}
              Your browser does not support HTML5 video.
            </video>
          )}
      </div>

      {/* Text content below thumbnails removed per request to keep slider minimal */}
    </div>
  );
}

export function TrustedByTestimonials() {
  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-12 sm:mb-16 lg:mb-20 px-4">
        <h2 className="text-foreground text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium leading-tight max-w-4xl mx-auto">
          Trusted by 18,000 businesses.
        </h2>
        
        {/* Logo placeholders */}
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 lg:gap-12 mt-8 sm:mt-12 lg:mt-16 max-w-2xl mx-auto">
          <span className="text-foreground text-lg sm:text-xl lg:text-2xl font-medium">Unique</span>
          <span className="text-foreground text-lg sm:text-xl lg:text-2xl font-medium">Bayt Travel</span>
          <span className="text-foreground text-lg sm:text-xl lg:text-2xl font-medium">Fashion</span>
          <span className="text-foreground text-lg sm:text-xl lg:text-2xl font-medium">Brand.Lyft</span>
          <span className="text-foreground text-lg sm:text-xl lg:text-2xl font-medium">Popup.FUND</span>
          <span className="text-foreground text-lg sm:text-xl lg:text-2xl font-medium">Pallet Ross</span>
        </div>
      </div>
      {/* Marquee Testimonials */}
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <div className="group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row [--duration:800s]">
          <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
            {[...Array(3)].map((_, setIndex) => (
              testimonials.map((testimonial) => (
                <TestimonialCard 
                  key={`${setIndex}-${testimonial.id}`}
                  testimonial={testimonial}
                />
              ))
            ))}
          </div>
          <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
            {[...Array(3)].map((_, setIndex) => (
              testimonials.map((testimonial) => (
                <TestimonialCard 
                  key={`duplicate-${setIndex}-${testimonial.id}`}
                  testimonial={testimonial}
                />
              ))
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
