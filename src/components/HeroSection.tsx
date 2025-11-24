import { Button } from "@/components/ui/button";
import { SparklesCore } from "@/components/ui/sparkles";
import { motion } from "framer-motion";
import AnimatedTextCycle from "@/components/AnimatedTextCycle";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { assetUrl } from "@/lib/utils";

const HeroSection = () => {
  const [sparkDensity, setSparkDensity] = useState(100);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setSparkDensity(w < 640 ? 40 : w < 1024 ? 80 : 120);
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section id="home" className="relative min-h-[70vh] sm:min-h-[75vh] lg:min-h-[80vh] flex flex-col items-center justify-center px-6 lg:px-12 text-center overflow-hidden">
      {/* Top-left hero logo overlay: white on black, responsive, non-interactive */}
      <div className="absolute top-0 left-0 z-20 pointer-events-none m-0 p-0 leading-none bg-black flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9">
        <img
          src={assetUrl('/lovable-uploads/Striking Minimalist Wordmark Logo for Atid.jpg')}
          alt="Atid Logo"
          className="block w-full h-full object-contain"
          loading="eager"
          decoding="async"
          width={36}
          height={36}
          style={{ filter: 'brightness(0) invert(1)' }}
        />
      </div>
      {/* Background sparkles effect */}
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="hero-sparkles"
          background="transparent"
          minSize={0.6}
          maxSize={2}
          particleDensity={sparkDensity}
          className="w-full h-full"
          particleColor="#ffffff"
          speed={0.9}
        />
      </div>

      {/* Background overlays */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      <div className="absolute inset-0 bg-gradient-radial"></div>
      
      {/* Content */}
      <motion.div 
        className="relative z-10 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        

        {/* Main Title with enhanced animation */}
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-hero-primary mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Designing tomorrow's{" "}
          <br className="hidden lg:block" />
          <span className="animate-pulse">
            <AnimatedTextCycle
              words={["Web", "Digital", "Brand"]}
              duration={0.5}
              ease="easeInOut"
              className="bg-gradient-to-r from-hero-primary via-hero-secondary to-hero-primary bg-clip-text text-transparent font-medium"
              ariaPrefix="Designing tomorrow's"
              ariaSuffix="experience today"
            />
            <span className="bg-gradient-to-r from-hero-primary via-hero-secondary to-hero-primary bg-clip-text text-transparent">
              {" "}experience today
            </span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="text-base sm:text-lg md:text-xl text-hero-secondary mb-8 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          From idea to market in weeks, not months. Everything you need to build, launch, and scale your startup successfully.
        </motion.p>

        {/* CTA Button with glass morphism and enhanced animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              asChild
              variant="hero-outline"
              size="lg"
              aria-label="Get Started"
              className="hero-cta relative overflow-hidden rounded-full px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg text-white border border-white/20 bg-white/20 backdrop-blur-hero shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)] hover:bg-white/25 hover:shadow-[0_12px_36px_-12px_rgba(0,0,0,0.55)] transition-[background-color,box-shadow,transform] duration-300 ease-out touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-0"
            >
              <Link to="/contact" aria-label="Go to Contact Us">
              {/* Floating points (navbar-style) */}
              <div className="points_wrapper">
                <i className="point"></i>
                <i className="point"></i>
                <i className="point"></i>
                <i className="point"></i>
                <i className="point"></i>
                <i className="point"></i>
                <i className="point"></i>
                <i className="point"></i>
                <i className="point"></i>
                <i className="point"></i>
              </div>
              <span className="relative z-10">Get Started</span>
              <style>{`
                /* Hero CTA scoped animations */
                .hero-cta { position: relative; }

                /* Scoped floating points to avoid global selector collisions */
                .hero-cta .points_wrapper {
                  overflow: hidden;
                  width: 100%;
                  height: 100%;
                  pointer-events: none;
                  position: absolute;
                  z-index: 1;
                }

                .hero-cta .points_wrapper .point {
                  bottom: -10px;
                  position: absolute;
                  animation: floating-points-hero infinite ease-in-out;
                  pointer-events: none;
                  width: 2px;
                  height: 2px;
                  background-color: #e5e7eb;
                  border-radius: 9999px;
                }

                @keyframes floating-points-hero {
                  0% { transform: translateY(0); opacity: 1; }
                  85% { opacity: 0; }
                  100% { transform: translateY(-55px); opacity: 0; }
                }

                .hero-cta .points_wrapper .point:nth-child(1)  { left: 10%; opacity: 1;   animation-duration: 2.35s; animation-delay: 0.2s; }
                .hero-cta .points_wrapper .point:nth-child(2)  { left: 30%; opacity: 0.7; animation-duration: 2.5s;  animation-delay: 0.5s; }
                .hero-cta .points_wrapper .point:nth-child(3)  { left: 25%; opacity: 0.8; animation-duration: 2.2s;  animation-delay: 0.1s; }
                .hero-cta .points_wrapper .point:nth-child(4)  { left: 44%; opacity: 0.6; animation-duration: 2.05s; }
                .hero-cta .points_wrapper .point:nth-child(5)  { left: 50%; opacity: 1;   animation-duration: 1.9s; }
                .hero-cta .points_wrapper .point:nth-child(6)  { left: 75%; opacity: 0.5; animation-duration: 1.5s;  animation-delay: 1.5s; }
                .hero-cta .points_wrapper .point:nth-child(7)  { left: 88%; opacity: 0.9; animation-duration: 2.2s;  animation-delay: 0.2s; }
                .hero-cta .points_wrapper .point:nth-child(8)  { left: 58%; opacity: 0.8; animation-duration: 2.25s; animation-delay: 0.2s; }
                .hero-cta .points_wrapper .point:nth-child(9)  { left: 98%; opacity: 0.6; animation-duration: 2.6s;  animation-delay: 0.1s; }
                .hero-cta .points_wrapper .point:nth-child(10) { left: 65%; opacity: 1;   animation-duration: 2.5s;  animation-delay: 0.2s; }

                /* Respect reduced motion */
                @media (prefers-reduced-motion: reduce) {
                  .hero-cta .points_wrapper .point { animation: none !important; opacity: 0.6; }
                }
              `}</style>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Subtle radial mask to soften edges while keeping sparkles prominent */}
      <div className="absolute inset-0 w-full h-full bg-background [mask-image:radial-gradient(90%_90%_at_center,transparent_10%,black_90%)] pointer-events-none opacity-30"></div>
    </section>
  );
};

export default HeroSection;
