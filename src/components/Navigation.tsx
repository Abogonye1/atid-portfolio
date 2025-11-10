import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet";
import { scrollToId } from "@/lib/smoothScroll";
import { Link, useLocation, useNavigate } from "react-router-dom";
// Logo switched to div background from lovable-uploads to preserve aspect ratio

const Navigation = () => {
  const [activeHash, setActiveHash] = useState<string>("#home");
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "Projects", href: "#projects" },
    { label: "Services", href: "#services" },
  ];

  const animateToId = (id: string, opts?: { duration?: number; offset?: number; highlight?: boolean }) => {
    const el = document.getElementById(id)
    if (!el) return
    scrollToId(id, { duration: Math.min(Math.max(opts?.duration ?? 500, 0), 2000), offset: opts?.offset ?? 0 }).then(() => {
      if (opts?.highlight) {
        el.classList.add("ring-2", "ring-hero-primary/60", "ring-offset-2", "ring-offset-background")
        setTimeout(() => {
          el.classList.remove("ring-2", "ring-hero-primary/60", "ring-offset-2", "ring-offset-background")
        }, 800)
      }
    })
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.slice(1);

    if (location.pathname === "/") {
      animateToId(id, { duration: 500, offset: 0, highlight: true });
      try {
        history.pushState(null, "", href);
      } catch {
        /* intentionally swallow history errors on some browsers */
        void 0
      }
      setActiveHash(href);
    } else {
      navigate(`/${href}`);
      setMenuOpen(false);
    }
  };

  // When landing on home with a hash, scroll to that section
  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const id = location.hash.slice(1);
      // slight delay to ensure section elements exist
      setTimeout(() => {
        animateToId(id, { duration: 500, offset: 0, highlight: true });
      }, 100);
    }
  }, [location.pathname, location.hash]);

  // Observe sections to update active nav state and URL hash
  useEffect(() => {
    if (typeof window === "undefined") return;
    const ids = ["home", "features", "projects", "services"];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    let lastHash = "";

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort(
              (a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top)
            );
          const topEntry = visible[0];
          if (topEntry) {
            const id = (topEntry.target as HTMLElement).id;
            const hash = `#${id}`;
            setActiveHash(hash);
            if (hash !== lastHash) {
              lastHash = hash;
              try {
                history.replaceState(null, "", hash);
              } catch {
                /* intentionally swallow history errors on some browsers */
                void 0
              }
            }
          }
        },
        { rootMargin: "0px 0px -60% 0px", threshold: [0.25, 0.6] }
      );
      elements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }

    const onScroll = () => {
      let current: HTMLElement | null = null;
      let minDist = Infinity;
      elements.forEach((el) => {
        const dist = Math.abs(el.getBoundingClientRect().top);
        if (dist < minDist) {
          minDist = dist;
          current = el;
        }
      });
      if (current) {
        const hash = `#${current.id}`;
        setActiveHash(hash);
        try {
          history.replaceState(null, "", hash);
        } catch {
          /* intentionally swallow history errors on some browsers */
          void 0
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="w-full h-16 sm:h-20 md:h-24 flex items-center justify-between px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24 relative z-50 max-w-screen-2xl mx-auto">
      {/* Logo */}
      <div className="flex items-center space-x-2 min-w-0 flex-shrink-0">
        <div
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 bg-center bg-no-repeat bg-contain flex-shrink-0"
          style={{ backgroundImage: 'url("/lovable-uploads/Striking Minimalist Wordmark Logo for Atid.jpg")' }}
          role="img"
          aria-label="Atid Logo"
        />
        <span className="text-lg sm:text-xl lg:text-2xl font-bold text-hero-primary truncate">ATID</span>
      </div>

      {/* Center Navigation */}
      <div className="hidden lg:flex items-center justify-center flex-1 max-w-3xl mx-4 lg:mx-8">
        <div className="flex items-center bg-hero-badge/30 border border-hero-badge-border backdrop-blur-hero rounded-full p-1 w-full max-w-lg">
          {navItems.map((item) => {
            const isActive = activeHash === item.href;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                aria-label={`Navigate to ${item.label} section`}
                aria-current={isActive ? "page" : undefined}
                className={`flex-1 text-center px-2 md:px-3 lg:px-5 xl:px-6 py-2 lg:py-3 text-sm md:text-sm lg:text-base xl:text-lg font-medium rounded-full transition-colors ${
                  isActive
                    ? "text-hero-primary bg-hero-badge/20"
                    : "text-hero-secondary hover:text-hero-primary hover:bg-hero-badge/20"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </div>

      {/* Desktop Contact Us Button */}
      <div className="hidden lg:flex items-center flex-shrink-0">
        <Link to="/contact" aria-label="Go to Contact Us" className="button navbar-contact-cta shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]">
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
          <span className="inner">Contact Us</span>
          <style>{`
            .button {
              cursor: pointer;
              position: relative;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
              transition: all 0.25s ease;
              background: radial-gradient(65.28% 65.28% at 50% 100%,
                  rgba(23, 23, 23, 0.6) 0%,
                  rgba(23, 23, 23, 0) 100%),
                linear-gradient(0deg, #171717, #262626);
              border-radius: 0.75rem;
              border: none;
              outline: none;
              padding: 12px 18px;
              min-height: 44px;
              min-width: 102px;
              touch-action: manipulation;
              z-index: 10;
            }

            /* Scoped overrides for desktop navbar Contact Us CTA */
            .navbar-contact-cta {
              background: #FFFFFF;
              color: #000000;
            }
            .navbar-contact-cta .inner {
              color: #000000;
            }
            .navbar-contact-cta .points_wrapper .point {
              background-color: #000000;
            }
            /* Keep hover/active interactions but preserve white background */
            .navbar-contact-cta:hover {
              background: #FFFFFF !important;
            }
            .navbar-contact-cta:hover::after {
              background: #FFFFFF !important;
            }
            .navbar-contact-cta:hover::before {
              background: rgba(0, 0, 0, 0.06) !important;
            }

            /* Remove gradient overlays on hover while preserving transitions */
            .button:hover {
              background: #262626;
            }
            .button:hover::after {
              background: #262626;
            }
            .button:hover::before {
              background: rgba(255, 255, 255, 0.06);
            }

            @media (max-width: 640px) {
              .button {
                min-height: 48px;
                padding: 14px 20px;
              }
            }

            /* Desktop-only enlargement for visual balance */
            @media (min-width: 1024px) {
              .button {
                min-height: 52px;
                padding: 16px 24px;
                min-width: 120px;
              }
              .inner {
                font-size: 18px;
              }
            }

            .button::before,
            .button::after {
              content: "";
              position: absolute;
              transition: all 0.5s ease-in-out;
              z-index: 0;
            }

            .button::before {
              inset: 1px;
              background: linear-gradient(177.95deg,
                  rgba(255, 255, 255, 0.08) 0%,
                  rgba(255, 255, 255, 0) 100%);
              border-radius: calc(0.75rem - 1px);
            }

            .button::after {
              inset: 2px;
              background: radial-gradient(65.28% 65.28% at 50% 100%,
                  rgba(23, 23, 23, 0.6) 0%,
                  rgba(23, 23, 23, 0) 100%),
                linear-gradient(0deg, #171717, #262626);
              border-radius: calc(0.75rem - 2px);
            }

            /* Ensure white base for this specific CTA */
            .navbar-contact-cta::after {
              background: #FFFFFF !important;
            }
            .navbar-contact-cta::before {
              background: rgba(0, 0, 0, 0.06) !important;
            }

            .button:active {
              transform: scale(0.95);
            }

            /* Wider variant for mobile drawer CTA */
            .button--wide {
              width: 100%;
            }

            .points_wrapper {
              overflow: hidden;
              width: 100%;
              height: 100%;
              pointer-events: none;
              position: absolute;
              z-index: 1;
            }

            .points_wrapper .point {
              bottom: -10px;
              position: absolute;
              animation: floating-points infinite ease-in-out;
              pointer-events: none;
              width: 2px;
              height: 2px;
              background-color: #e5e7eb;
              border-radius: 9999px;
            }

            @keyframes floating-points {
              0% {
                transform: translateY(0);
              }

              85% {
                opacity: 0;
              }

              100% {
                transform: translateY(-55px);
                opacity: 0;
              }
            }

            .points_wrapper .point:nth-child(1) {
              left: 10%;
              opacity: 1;
              animation-duration: 2.35s;
              animation-delay: 0.2s;
            }

            .points_wrapper .point:nth-child(2) {
              left: 30%;
              opacity: 0.7;
              animation-duration: 2.5s;
              animation-delay: 0.5s;
            }

            .points_wrapper .point:nth-child(3) {
              left: 25%;
              opacity: 0.8;
              animation-duration: 2.2s;
              animation-delay: 0.1s;
            }

            .points_wrapper .point:nth-child(4) {
              left: 44%;
              opacity: 0.6;
              animation-duration: 2.05s;
            }

            .points_wrapper .point:nth-child(5) {
              left: 50%;
              opacity: 1;
              animation-duration: 1.9s;
            }

            .points_wrapper .point:nth-child(6) {
              left: 75%;
              opacity: 0.5;
              animation-duration: 1.5s;
              animation-delay: 1.5s;
            }

            .points_wrapper .point:nth-child(7) {
              left: 88%;
              opacity: 0.9;
              animation-duration: 2.2s;
              animation-delay: 0.2s;
            }

            .points_wrapper .point:nth-child(8) {
              left: 58%;
              opacity: 0.8;
              animation-duration: 2.25s;
              animation-delay: 0.2s;
            }

            .points_wrapper .point:nth-child(9) {
              left: 98%;
              opacity: 0.6;
              animation-duration: 2.6s;
              animation-delay: 0.1s;
            }

            .points_wrapper .point:nth-child(10) {
              left: 65%;
              opacity: 1;
              animation-duration: 2.5s;
              animation-delay: 0.2s;
            }

            .inner {
              z-index: 2;
              gap: 6px;
              position: relative;
              width: 100%;
              color: #f4f4f5;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              font-size: 16px;
              font-weight: 500;
              line-height: 1.5;
              transition: color 0.2s ease-in-out;
            }
          `}</style>
        </Link>
      </div>

      {/* Mobile Menu + Get Started Button */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 lg:hidden">
        {/* Mobile menu trigger */}
        <div>
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-haspopup="menu"
                onClick={() => setMenuOpen(true)}
                className="inline-flex items-center justify-center rounded-md p-2 text-hero-primary hover:bg-hero-badge/30 border border-hero-badge-border transition-colors touch-manipulation"
              >
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </SheetTrigger>
            <SheetContent id="mobile-menu" side="right" className="bg-background border-border mobile-menu-content w-[92vw] sm:w-[420px] max-h-[92vh] rounded-bl-[12px] origin-top-right" accessibleTitle="Mobile Menu">
              <div className="px-4 sm:px-6 py-4 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-lg font-semibold text-hero-primary">Menu</span>
                  <SheetClose asChild>
                    <button className="rounded-md p-2 text-hero-secondary hover:bg-accent/30 transition-colors touch-manipulation">
                      Close
                    </button>
                 </SheetClose>
               </div>
               <div className="flex flex-col gap-1 mobile-menu-list" role="menu" aria-label="Primary">
                 {navItems.map((item, index) => {
                   const isActive = activeHash === item.href;
                   return (
                     <SheetClose asChild key={item.label}>
                       <a
                          href={item.href}
                          role="menuitem"
                          onClick={(e) => handleNavClick(e, item.href)}
                          aria-label={`Navigate to ${item.label} section`}
                          aria-current={isActive ? "page" : undefined}
                          className={`px-4 py-3 text-base font-medium rounded-lg transition-all touch-manipulation animate-fade-in motion-reduce:animate-none ${
                            isActive
                              ? "text-hero-primary bg-hero-badge/20"
                              : "text-hero-secondary hover:text-hero-primary hover:bg-hero-badge/20"
                          }`}
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          {item.label}
                        </a>
                      </SheetClose>
                    );
                  })}
                </div>
                <div className="mt-6 pt-6 border-t border-hero-badge-border animate-fade-in motion-reduce:animate-none" style={{ animationDelay: `${navItems.length * 100}ms` }}>
                  <SheetClose asChild>
                    <Link to="/contact" aria-label="Go to Contact Us" className="button navbar-contact-cta button--wide shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] touch-manipulation">
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

                    <span className="inner">Contact Us</span>
                    <style>{`
                      .button {
                        cursor: pointer;
                        position: relative;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        overflow: hidden;
                        transition: all 0.25s ease;
                        background: radial-gradient(65.28% 65.28% at 50% 100%,
                            rgba(23, 23, 23, 0.6) 0%,
                            rgba(23, 23, 23, 0) 100%),
                          linear-gradient(0deg, #171717, #262626);
                        border-radius: 0.75rem;
                        border: none;
                        outline: none;
                        padding: 12px 18px;
                        min-height: 44px;
                        min-width: 102px;
                        touch-action: manipulation;
                      }

                      /* Remove gradient overlays on hover while preserving transitions */
                      .button:hover {
                        background: #262626;
                      }
                      .button:hover::after {
                        background: #262626;
                      }
                      .button:hover::before {
                        background: rgba(255, 255, 255, 0.06);
                      }

                      @media (max-width: 640px) {
                        .button {
                          min-height: 48px;
                          padding: 14px 20px;
                        }
                      }

                      /* Desktop-only enlargement for visual balance */
                      @media (min-width: 1024px) {
                        .button {
                          min-height: 52px;
                          padding: 16px 24px;
                          min-width: 120px;
                        }
                        .inner {
                          font-size: 18px;
                        }
                      }

                      .button::before,
                      .button::after {
                        content: "";
                        position: absolute;
                        transition: all 0.5s ease-in-out;
                        z-index: 0;
                      }

                      .button::before {
                        inset: 1px;
                        background: linear-gradient(177.95deg,
                            rgba(255, 255, 255, 0.08) 0%,
                            rgba(255, 255, 255, 0) 100%);
                        border-radius: calc(0.75rem - 1px);
                      }

                      .button::after {
                        inset: 2px;
                        background: radial-gradient(65.28% 65.28% at 50% 100%,
                            rgba(23, 23, 23, 0.6) 0%,
                            rgba(23, 23, 23, 0) 100%),
                          linear-gradient(0deg, #171717, #262626);
                        border-radius: calc(0.75rem - 2px);
                      }

                      .button:active {
                        transform: scale(0.95);
                      }

                      /* Wider variant for mobile drawer CTA */
                      .button--wide {
                        width: 100%;
                      }

                      /* Scoped overrides for mobile drawer Contact Us CTA to match desktop */
                      .navbar-contact-cta {
                        background: #FFFFFF;
                        color: #000000;
                      }
                      .navbar-contact-cta .inner {
                        color: #000000;
                      }
                      .navbar-contact-cta .points_wrapper .point {
                        background-color: #000000;
                      }

                      /* Keep hover/active interactions but preserve white base */
                      .navbar-contact-cta:hover {
                        background: #FFFFFF !important;
                      }
                      .navbar-contact-cta:hover::after {
                        background: #FFFFFF !important;
                      }
                      .navbar-contact-cta:hover::before {
                        background: rgba(0, 0, 0, 0.06) !important;
                      }

                      /* Ensure white base layers */
                      .navbar-contact-cta::after {
                        background: #FFFFFF !important;
                      }
                      .navbar-contact-cta::before {
                        background: rgba(0, 0, 0, 0.06) !important;
                      }

                      /* Visible focus ring for accessibility */
                      .navbar-contact-cta:focus-visible {
                        outline: 2px solid #000000;
                        outline-offset: 2px;
                      }

                      .points_wrapper {
                        overflow: hidden;
                        width: 100%;
                        height: 100%;
                        pointer-events: none;
                        position: absolute;
                        z-index: 1;
                      }

                      .points_wrapper .point {
                        bottom: -10px;
                        position: absolute;
                        animation: floating-points infinite ease-in-out;
                        pointer-events: none;
                        width: 2px;
                        height: 2px;
                        background-color: #e5e7eb;
                        border-radius: 9999px;
                      }

                      @keyframes floating-points {
                        0% {
                          transform: translateY(0);
                        }

                        85% {
                          opacity: 0;
                        }

                        100% {
                          transform: translateY(-55px);
                          opacity: 0;
                        }
                      }

                      .points_wrapper .point:nth-child(1) {
                        left: 10%;
                        opacity: 1;
                        animation-duration: 2.35s;
                        animation-delay: 0.2s;
                      }

                      .points_wrapper .point:nth-child(2) {
                        left: 30%;
                        opacity: 0.7;
                        animation-duration: 2.5s;
                        animation-delay: 0.5s;
                      }

                      .points_wrapper .point:nth-child(3) {
                        left: 25%;
                        opacity: 0.8;
                        animation-duration: 2.2s;
                        animation-delay: 0.1s;
                      }

                      .points_wrapper .point:nth-child(4) {
                        left: 44%;
                        opacity: 0.6;
                        animation-duration: 2.05s;
                      }

                      .points_wrapper .point:nth-child(5) {
                        left: 50%;
                        opacity: 1;
                        animation-duration: 1.9s;
                      }

                      .points_wrapper .point:nth-child(6) {
                        left: 75%;
                        opacity: 0.5;
                        animation-duration: 1.5s;
                        animation-delay: 1.5s;
                      }

                      .points_wrapper .point:nth-child(7) {
                        left: 88%;
                        opacity: 0.9;
                        animation-duration: 2.2s;
                        animation-delay: 0.2s;
                      }

                      .points_wrapper .point:nth-child(8) {
                        left: 58%;
                        opacity: 0.8;
                        animation-duration: 2.25s;
                        animation-delay: 0.2s;
                      }

                      .points_wrapper .point:nth-child(9) {
                        left: 98%;
                        opacity: 0.6;
                        animation-duration: 2.6s;
                        animation-delay: 0.1s;
                      }

                      .points_wrapper .point:nth-child(10) {
                        left: 65%;
                        opacity: 1;
                        animation-duration: 2.5s;
                        animation-delay: 0.2s;
                      }

                      .inner {
                        z-index: 2;
                        gap: 6px;
                        position: relative;
                        width: 100%;
                        color: #f4f4f5;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 16px;
                        font-weight: 500;
                        line-height: 1.5;
                        transition: color 0.2s ease-in-out;
                      }
                    `}</style>
                    </Link>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </nav>
  );
};

export default Navigation;