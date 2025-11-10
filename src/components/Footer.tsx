import { Button } from "@/components/ui/button";
import { SparklesCore } from "@/components/ui/sparkles";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative min-h-[500px] flex flex-col items-center justify-center px-6 lg:px-12 text-center overflow-hidden">
      {/* Background sparkles effect */}
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="footer-sparkles"
          background="transparent"
          minSize={0.8}
          maxSize={2.5}
          particleDensity={150}
          className="w-full h-full"
          particleColor="#ffffff"
          speed={1.0}
        />
      </div>

      {/* Background overlays */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      <div className="absolute inset-0 bg-gradient-radial"></div>
      
      {/* Content */}
      <motion.div 
        className="relative z-10 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {/* Main Title */}
        <motion.h2 
          className="text-4xl md:text-5xl lg:text-6xl font-medium text-hero-primary mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Ready to{" "}
          <span className="bg-gradient-to-r from-hero-primary via-hero-secondary to-hero-primary bg-clip-text text-transparent">
            transform
          </span>{" "}
          your startup?
        </motion.h2>

        {/* Subtitle */}
        <motion.p 
          className="text-lg md:text-xl text-hero-secondary mb-8 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          Join thousands of startups who have already accelerated their growth with our AI-powered platform.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mb-12"
        >
          <Button asChild variant="hero" size="lg" className="px-8 py-6 text-lg hover:shadow-lg transition-all duration-300">
            <Link to="/contact" aria-label="Go to Contact Us">Get Started Today</Link>
          </Button>
        </motion.div>

        {/* Footer Links */}
        <motion.div 
          className="flex flex-wrap justify-center gap-8 text-sm text-hero-secondary/80"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          viewport={{ once: true }}
        >
          <a href="#" className="hover:text-hero-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-hero-primary transition-colors">Terms of Service</a>
          <Link to="/contact" className="hover:text-hero-primary transition-colors">Contact</Link>
          <a href="#" className="hover:text-hero-primary transition-colors">Support</a>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          className="mt-8 pt-8 border-t border-hero-secondary/20 text-sm text-hero-secondary/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          viewport={{ once: true }}
        >
          © 2024 StartupHub. All rights reserved.
        </motion.div>
      </motion.div>

      {/* Subtle radial mask */}
      <div className="absolute inset-0 w-full h-full bg-background [mask-image:radial-gradient(90%_90%_at_center,transparent_10%,black_90%)] pointer-events-none opacity-30"></div>
    </footer>
  );
};

export default Footer;