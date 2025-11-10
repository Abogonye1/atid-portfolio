import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import { Suspense, lazy } from "react";
import LazyOnVisible from "@/components/LazyOnVisible";
const LogoCarousel = lazy(() => import("@/components/LogoCarousel"));
const Features = lazy(() => import("@/components/Features").then(m => ({ default: m.Features })));
const TrustedByTestimonials = lazy(() => import("@/components/TrustedByTestimonials").then(m => ({ default: m.TrustedByTestimonials })));
const FeaturesSections = lazy(() => import("@/components/FeaturesSections").then(m => ({ default: m.FeaturesSections })));
const FeaturesGrid = lazy(() => import("@/components/FeaturesGrid").then(m => ({ default: m.FeaturesGrid })));
const AnimatedTestimonials = lazy(() => import("@/components/ui/testimonials-columns-1"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  return (
  <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <div id="features">
      <LazyOnVisible minHeight={140}>
        <Suspense fallback={<div className="h-[140px] animate-pulse bg-muted/30" />}> 
          <LogoCarousel />
        </Suspense>
      </LazyOnVisible>
      </div>
      <LazyOnVisible minHeight={560}>
        <Suspense fallback={<div className="h-[560px] animate-pulse bg-muted/30" />}> 
          <Features />
        </Suspense>
      </LazyOnVisible>
      <div id="projects">
      <LazyOnVisible minHeight={620}>
        <Suspense fallback={<div className="h-[620px] animate-pulse bg-muted/30" />}> 
          <TrustedByTestimonials />
        </Suspense>
      </LazyOnVisible>
      </div>
      <LazyOnVisible minHeight={620}>
        <Suspense fallback={<div className="h-[620px] animate-pulse bg-muted/30" />}> 
          <FeaturesSections />
        </Suspense>
      </LazyOnVisible>
      <div id="services">
      <LazyOnVisible minHeight={620}>
        <Suspense fallback={<div className="h-[620px] animate-pulse bg-muted/30" />}> 
          <FeaturesGrid />
        </Suspense>
      </LazyOnVisible>
      </div>
      <LazyOnVisible minHeight={560}>
        <Suspense fallback={<div className="h-[560px] animate-pulse bg-muted/30" />}>
          <AnimatedTestimonials />
        </Suspense>
      </LazyOnVisible>
      <LazyOnVisible minHeight={240}>
        <Suspense fallback={<div className="h-[240px] animate-pulse bg-muted/30" />}>
          <Footer />
        </Suspense>
      </LazyOnVisible>
    </div>
  );
};

export default Index;
