import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { useEffect, useState } from "react";

const LogoCarousel = () => {
  const [sliderSpeed, setSliderSpeed] = useState(40);
  const [sliderGap, setSliderGap] = useState(112);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setSliderSpeed(reduceMotion ? 18 : w < 640 ? 24 : 40);
      setSliderGap(w < 640 ? 64 : 112);
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section className="bg-background pb-16 md:pb-32">
      <div className="group relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center md:flex-row">
          <div className="md:max-w-44 md:border-r md:pr-6">
            <p className="text-end text-sm text-hero-secondary">Powering the best teams</p>
          </div>
          <div className="relative py-6 md:w-[calc(100%-11rem)]">
            <InfiniteSlider
              speedOnHover={Math.max(sliderSpeed - 10, 12)}
              speed={sliderSpeed}
              gap={sliderGap}
            >
              <div className="flex">
                <img
                  className="mx-auto h-5 w-fit filter invert"
                  src="https://html.tailus.io/blocks/customers/nvidia.svg"
                  alt="Nvidia Logo"
                  height="20"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="flex">
                <img
                  className="mx-auto h-4 w-fit filter invert"
                  src="https://html.tailus.io/blocks/customers/column.svg"
                  alt="Column Logo"
                  height="16"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              
              <div className="flex">
                <img
                  className="mx-auto h-4 w-fit filter invert"
                  src="https://html.tailus.io/blocks/customers/github.svg"
                  alt="GitHub Logo"
                  height="16"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              
              <div className="flex">
                <img
                  className="mx-auto h-5 w-fit filter invert"
                  src="https://html.tailus.io/blocks/customers/nike.svg"
                  alt="Nike Logo"
                  height="20"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              
              <div className="flex">
                <img
                  className="mx-auto h-5 w-fit filter invert"
                  src="https://html.tailus.io/blocks/customers/lemonsqueezy.svg"
                  alt="Lemon Squeezy Logo"
                  height="20"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              
              <div className="flex">
                <img
                  className="mx-auto h-4 w-fit filter invert"
                  src="https://html.tailus.io/blocks/customers/laravel.svg"
                  alt="Laravel Logo"
                  height="16"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              
              <div className="flex">
                <img
                  className="mx-auto h-7 w-fit filter invert"
                  src="https://html.tailus.io/blocks/customers/lilly.svg"
                  alt="Lilly Logo"
                  height="28"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="flex">
                <img
                  className="mx-auto h-6 w-fit filter invert"
                  src="https://html.tailus.io/blocks/customers/openai.svg"
                  alt="OpenAI Logo"
                  height="24"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </InfiniteSlider>

            <div className="bg-gradient-to-r from-background absolute inset-y-0 left-0 w-20"></div>
            <div className="bg-gradient-to-l from-background absolute inset-y-0 right-0 w-20"></div>
            
            <ProgressiveBlur
              className="pointer-events-none absolute left-0 top-0 h-full w-20"
              direction="left"
              blurIntensity={1}
            />
            <ProgressiveBlur
              className="pointer-events-none absolute right-0 top-0 h-full w-20"
              direction="right"
              blurIntensity={1}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoCarousel;