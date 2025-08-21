"use client";

import { FC, useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer"; // Still used for Hero InView
import RelatedCard from "@/components/related-card"; // Assuming this component exists
import Footer from "@/components/footer"; // Assuming this component exists
import Link from "next/link";
import { useRouter } from 'next/navigation'; // Added useRouter for MobileHeader (if needed)


// --- MOBILE HEADER COMPONENT (Copied from the first page) ---
interface MobileHeaderProps {
  productsItems: { text: string; href: string }[];
  blueprintItems: { text: string; href: string; }[];
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ productsItems, blueprintItems }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = ''; // Cleanup on unmount
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Fixed Mobile Header Bar (Visible only on small screens) */}
      <div className="fixed top-0 left-0 w-screen z-50 pt-[20px] pb-[10px] px-4 flex justify-between items-center bg-transparent md:hidden">
        {/* Mobile Logo */}
        <Link href="/">
          <Image
            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/34074342-7005-4a25-9763-86933d6e7700/public"
            alt="WAE Logo Mobile"
            width={40}
            height={40}
          />
        </Link>
        {/* Hamburger Menu Icon */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex flex-col justify-center items-center w-8 h-8 relative z-50 focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          {/* Top bar */}
          <span
            className={`block absolute h-0.5 w-6 bg-black transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45' : ''}`}
            style={{ top: '18px', left: '8px', transform: isMobileMenuOpen ? 'rotate(45deg)' : 'translateY(-4px)' }}
          ></span>
          {/* Bottom bar */}
          <span
            className={`block absolute h-0.5 w-6 bg-black transition-all duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45' : ''}`}
            style={{ top: '18px', left: '8px', transform: isMobileMenuOpen ? 'rotate(-45deg)' : 'translateY(4px)' }}
          ></span>
        </button>
      </div>

      {/* Mobile Menu Overlay (Slides in from right) */}
      <div
        className={`fixed inset-0 bg-white z-40 flex flex-col pt-[80px] px-4 md:hidden transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ color: '#000' }}
      >
        <div className="w-full h-px bg-black/10 mt[8px] mb-[30px]" />
        {/* ORIGIN & OBJECTIVE ROW */}
        <div className="grid mb-4" style={{ gridTemplateColumns: '40% 60%' }}>
          <div>
            <div style={{fontFamily: 'Inter Tight', fontWeight: 600, fontSize: 12, lineHeight: '100%', letterSpacing: 0, textTransform: 'uppercase', marginBottom: 12}}>ORIGIN</div>
            <div style={{fontFamily: 'Inter Tight', fontWeight: 500, fontSize: 14, lineHeight: '100%', letterSpacing: 0, verticalAlign: 'middle'}}>
              20.5937° N<br />78.9629° E
            </div>
          </div>
          <div>
            <div style={{fontFamily: 'Inter Tight', fontWeight: 600, fontSize: 12, lineHeight: '100%', letterSpacing: 0, textTransform: 'uppercase', marginBottom: 12}}>OBJECTIVE</div>
            <div style={{fontFamily: 'Inter Tight', fontWeight: 500, fontSize: 14, lineHeight: '100%', letterSpacing: 0, verticalAlign: 'middle'}}>
              To lead the way in sustainability<br />ahead of the next
            </div>
          </div>
        </div>
        <div className="w-full h-px bg-black/10 mb-2" />

        {/* INSIDE WAE SECTION - two-column grid */}
        <div className="grid mb-2" style={{ gridTemplateColumns: '40% 60%' }}>
          <div className="flex items-start mt-2">
            <div style={{fontFamily: 'Inter Tight', fontWeight: 600, fontSize: 12, lineHeight: '100%', letterSpacing: 0, textTransform: 'uppercase'}}>INSIDE WAE</div>
          </div>
          <div className="flex flex-col">
          {productsItems.map((item, i) => (
              <div key={i}>
                <Link href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="block text-[16px] font-normal py-2" style={{fontFamily: 'Inter Tight', fontWeight: 500, fontSize: 16, lineHeight: '100%', letterSpacing: 0, verticalAlign: 'middle'}}>
              {item.text}
            </Link>
                <div className="w-full h-px bg-black/10" />
              </div>
          ))}
        </div>
        </div>
        <div className="w-full h-px bg-black/10 mt-[12px] mb-2" />

        {/* ETCETERA SECTION - two-column grid */}
        <div className="grid mb-2" style={{ gridTemplateColumns: '40% 60%' }}>
          <div className="flex items-start mt-2">
            <div style={{fontFamily: 'Inter Tight', fontWeight: 600, fontSize: 12, lineHeight: '100%', letterSpacing: 0, textTransform: 'uppercase'}}>ETCETERA</div>
          </div>
          <div className="flex flex-col">
          {blueprintItems.map((item, i) => (
              <div key={i}>
                <Link href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="block text-[16px] font-normal py-2" style={{fontFamily: 'Inter Tight', fontWeight: 500, fontSize: 16, lineHeight: '100%', letterSpacing: 0, verticalAlign: 'middle'}}>
              {item.text}
            </Link>
                <div className="w-full h-px bg-black/10" />
              </div>
          ))}
          </div>
        </div>
      </div>
    </>
  );
};
// --- END MOBILE HEADER COMPONENT ---

interface HoverButtonProps {
  children: (hovered: boolean) => React.ReactNode;
}

/**
 * Reusable hover button component.
 */
const HoverButton: FC<HoverButtonProps> = ({ children }) => {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <button
      type="button"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-fit px-4 py-3 transition-all duration-650 ease"
      style={{
        pointerEvents: "auto",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        fontFamily: "'Inter Tight', sans-serif", // Note: Inline style for font
        fontWeight: 500,
        fontSize: "10px",
        lineHeight: "100%",
        textTransform: "uppercase",
        backgroundColor: hovered ? "#000" : "#f2f2f2",
        border: "1px solid #000",
        cursor: "pointer",
        color: hovered ? "#fff" : "#000",
      }}
    >
      {children(hovered)}
    </button>
  );
};

const Home: FC = () => {
  // State and refs
  const [activeSection, setActiveSection] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<string>(""); // State is declared but not used in the provided snippets
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const [heroRef, heroInView] = useInView({ threshold: 0.5 });
  const [taglineVisible, setTaglineVisible] = useState<boolean>(true); // State is declared but not used for conditional rendering in provided snippets
  const prevScrollY = useRef<number>(0); // Used for tagline visibility logic
  const [headerHeroScale, setHeaderHeroScale] = useState<number>(1); // State is declared and updated, but not applied to an element's style/transform in provided snippets
  const headerHeroRef = useRef<HTMLDivElement>(null); // Ref for the fixed header/hero container

  const [isMobile, setIsMobile] = useState(false); // Declare isMobile state

  const sections = ["hero"]; // Extendable for additional sections - used only to set active section based on heroInView

  const containerRef = useRef<HTMLDivElement>(null); // Ref is declared but not applied to an element

  // Effect to determine if the current view is mobile and update video source
  useEffect(() => {
    const checkScreenSize = () => {
        // Adjust 768 to your desired breakpoint (e.g., common breakpoint for 'md' screens in Tailwind CSS)
        setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize(); // Set initial state
    window.addEventListener('resize', checkScreenSize); // Listen for resizes

    return () => {
        window.removeEventListener('resize', checkScreenSize); // Clean up on unmount
    };
  }, []); // Empty dependency array means this effect runs once on mount and unmount


   // --- ADDED: Explicitly scroll to top on mount ---
   useEffect(() => {
       requestAnimationFrame(() => {
           window.scrollTo(0, 0);
       });
   }, []);
   // --- END ADDED CODE ---


  // Update tagline visibility on scroll (logic present, but taglineVisible state not used)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setTaglineVisible(currentScrollY < prevScrollY.current);
      prevScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update current time (India Time) every minute (logic present, but currentTime state not used)
  useEffect(() => {
    const updateIndiaTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      };
      setCurrentTime(new Date().toLocaleTimeString("en-US", options));
    };

    updateIndiaTime();
    const interval = setInterval(updateIndiaTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Set active section when hero is in view (logic present, but activeSection state not used)
  useEffect(() => {
    if (heroInView) setActiveSection(0);
  }, [heroInView]);

  // Measure header height to offset hero section (logic present, headerHeight state used)
  useEffect(() => {
    if (headerRef.current) setHeaderHeight(headerRef.current.clientHeight);
  }, [headerRef]);

  // Scroll-driven header/hero scaling effect (logic present, headerHeroScale state updated, but state not applied)
  useEffect(() => {
    const handleScroll = () => {
      if (!headerHeroRef.current) return;
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const maxScroll = viewportHeight * 0.8;
      const minScale = 0; // Scaling down to 0 might make it disappear abruptly

      if (scrollPosition <= 100) {
        setHeaderHeroScale(1);
      } else if (scrollPosition >= maxScroll) {
        setHeaderHeroScale(minScale);
      } else {
        const scrollRange = maxScroll - 100;
        const scrollProgress = (scrollPosition - 100) / scrollRange;
        setHeaderHeroScale(1 - scrollProgress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Framer Motion scroll-driven animations (Keeping logo opacity as it seems unrelated to section snap)
  const { scrollYProgress } = useScroll(); // Tracks scroll progress of the window by default
  const logoOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 1]); // Logo opacity linked to scroll

  // --- POTENTIAL TROUBLESHOOTING AREA (Declared but not used/Incorrect Syntax) ---
  // These useTransform calls have incorrect syntax and are not used in the provided code structure.
  // They were potentially intended for scroll animations now replaced by scroll-snap.
  const purposeY = useTransform(scrollYProgress, [0.05, 0.25], ["100%", "0%"]);
  const purposeOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);
  const purposeVanish = useTransform(scrollYProgress, [0.25, 0.35], [1, 0]);
  const finalPurposeOpacity = useTransform(
    [purposeOpacity, purposeVanish] as any,
    ([pO, pV]: any) => pO * pV
  );

  const indiaY = useTransform(scrollYProgress, [0.35, 0.55], ["100%", "0%"]);
  const indiaOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  const indiaVanish = useTransform(scrollYProgress, [0.55, 0.65], [1, 0]);
  const finalIndiaOpacity = useTransform(
    [indiaOpacity, indiaVanish] as any,
    ([iO, iV]: any) => iO * iV
  );
  // --- END POTENTIAL TROUBLESHOOTING AREA ---


  // Menu items arrays
  const productsItems = [
    { text: "This Is Us", href: "/inside-wae" },
    { text: "Our Portfolio", href: "/our-portfolio" },
    { text: "Reimagine Work", href: "/careers" },
  ];
  const blueprintItems = [
    { text: "Sustainability", href: "/sustainability" },
    { text: "The Activist Co.", href: "#" }, // Note: href="#"
    { text: "Blog", href: "/blogs2" },
  ];
  const lineCount = Math.min(productsItems.length, blueprintItems.length); // Declared but not used

  // Tagline words split for animation (logic present, but taglineWords1/2 not used for animation in provided code)
  const taglineLine1 = "To lead the way in sustainability"; // Declared but not used
  const taglineLine2 = "ahead of the rest"; // Declared but not used
  const taglineWords1 = taglineLine1.split(" "); // Declared but not used
  const taglineWords2 = taglineLine2.split(" "); // Declared but not used

  // Framer Motion animation variants (declared but not applied in provided code)
  const containerVariants = { // Declared but not used
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.05, ease: "easeInOut" },
    },
  };
  const childVariants = { // Declared but not used
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { ease: "easeInOut", duration: 1 } },
  };

  // --- NEW: Ref and state for carousel navigation ---
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true); // Assuming it starts on the first slide
  // --- END NEW ---

  // --- NEW: Data for your Products Carousel ---
  const productsData = [
    {
      href: "/product-category/drinking-water-stations",
      imgSrc: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/27917d14-ea56-4a80-93b9-c66ba9642400/public",
      altText: "Drinking Water Station",
      title: "Drinking Water Stations",
    },
    {
      href: "/product-category/drinking-water-faucets",
      imgSrc: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/685750d6-ec8e-491b-a214-24f13cfcb600/public",
      altText: "Water Faucet",
      title: "Drinking Water Faucets",
    },
    {
      href: "/product-category/water-dispenser",
      imgSrc: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6b05d64d-0248-4aaf-b8c3-e8d7afccea00/public",
      altText: "Water Dispenser",
      title: "Drinking Water Dispensers",
    },
    {
      href: "/product-category/water-cooler",
      imgSrc: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/bf2a2e6e-9e0b-464a-c2ff-1a16cb1f9900/public",
      altText: "Water Cooler",
      title: "Water Coolers & Fountains",
    },
    {
      href: "/product-category/public-utility-systems",
      imgSrc: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/54ccac68-6261-4097-e41c-cfa35c992100/public",
      altText: "Public Utility",
      title: "Public Utility Systems",
    },
    {
      href: "/product-category/commercial-industrial-plants",
      imgSrc: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/f1de8f36-85d7-4958-a678-0702ece63a00/public",
      altText: "Commercial Plant",
      title: "Commercial/Industrial Plants",
    },
  ];
  // --- END Products Data ---

  // --- NEW: Ref and state for PRODUCTS carousel navigation ---
  const productsCarouselRef = useRef<HTMLDivElement>(null);
  const [showProductsLeftArrow, setShowProductsLeftArrow] = useState(false);
  const [showProductsRightArrow, setShowProductsRightArrow] = useState(true); // Assuming starts on first slide

  // --- NEW: Products Carousel scroll logic (similar to solutions, but for productsRef) ---
  const handleProductsScroll = useCallback(() => {
    if (productsCarouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = productsCarouselRef.current;
      const scrollThreshold = 5;
      setShowProductsLeftArrow(scrollLeft > scrollThreshold);
      setShowProductsRightArrow(scrollLeft + clientWidth < scrollWidth - scrollThreshold);
    }
  }, []);

  const scrollProductsCarousel = (direction: 'left' | 'right') => {
    if (productsCarouselRef.current) {
      const slideWidth = productsCarouselRef.current.clientWidth;
      const scrollAmount = direction === 'right' ? slideWidth : -slideWidth;
      productsCarouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const carousel = productsCarouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleProductsScroll);
      handleProductsScroll(); // Initial check on mount
    }
    return () => {
      if (carousel) {
        carousel.removeEventListener('scroll', handleProductsScroll);
      }
    };
  }, [handleProductsScroll]);
  // --- END NEW PRODUCTS CAROUSEL LOGIC ---

  // ---Data for your Solutions Carousel ---
  const solutionsData = [
    {
      href: "/water-reuse",
      imgSrc: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/8c357479-5a25-4527-7fde-a434fa498b00/public",
      altText: "Water Reuse Image",
      title: "Water Reuse",
    },
    {
      href: "/water-treatment",
      imgSrc: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c399819d-976c-49aa-332f-02a9db708200/public",
      altText: "Water Treatment Image",
      title: "Water Treatment",
    },
    {
      href: "/water-as-a-service",
      imgSrc: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/16ca1b89-cf24-442f-0a41-3e3ad0c6cf00/public",
      altText: "Water as a Service Image",
      title: "Water as a Service",
    },
    // Add more solution objects here following the same structure
  ];
  // --- END Data for your Solutions Carousel ---

  // --- NEW: Carousel scroll logic ---
  const handleScroll = useCallback(() => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      const scrollThreshold = 5; // A small threshold to account for potential floating point inaccuracies

      // Show left arrow if we've scrolled past the beginning
      setShowLeftArrow(scrollLeft > scrollThreshold);

      // Show right arrow if we're not at the very end of the scrollable content
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - scrollThreshold);
    }
  }, []);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.clientWidth; // Get the visible width of the carousel container (which is also the slide width)
      const scrollAmount = direction === 'right' ? slideWidth : -slideWidth;

      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth', // Smooth scrolling animation
      });
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      // Attach scroll event listener
      carousel.addEventListener('scroll', handleScroll);
      // Perform initial check on mount to set arrow visibility
      handleScroll();
    }
    // Clean up event listener on unmount
    return () => {
      if (carousel) {
        carousel.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]); // Re-run effect if handleScroll memoization changes (unlikely here)
  // --- END NEW ---

  // --- NEW: Ref and state for BLOGS carousel navigation ---
  const blogsCarouselRef = useRef<HTMLDivElement>(null);
  const [showBlogsLeftArrow, setShowBlogsLeftArrow] = useState(false);
  const [showBlogsRightArrow, setShowBlogsRightArrow] = useState(true);

  // --- NEW: Blogs Carousel scroll logic ---
  const handleBlogsScroll = useCallback(() => {
    if (blogsCarouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = blogsCarouselRef.current;
      const scrollThreshold = 5;
      setShowBlogsLeftArrow(scrollLeft > scrollThreshold);
      setShowBlogsRightArrow(scrollLeft + clientWidth < scrollWidth - scrollThreshold);
    }
  }, []);

  const scrollBlogsCarousel = (direction: 'left' | 'right') => {
    if (blogsCarouselRef.current) {
      const slideWidth = blogsCarouselRef.current.clientWidth;
      const scrollAmount = direction === 'right' ? slideWidth : -slideWidth;
      blogsCarouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const carousel = blogsCarouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleBlogsScroll);
      handleBlogsScroll(); // Initial check on mount
    }
    return () => {
      if (carousel) {
        carousel.removeEventListener('scroll', handleBlogsScroll);
      }
    };
  }, [handleBlogsScroll]);
  // --- END NEW BLOGS CAROUSEL LOGIC ---

  return (
    <main className="relative">
      {/* RENDER MOBILE HEADER COMPONENT HERE */}
      <MobileHeader productsItems={productsItems} blueprintItems={blueprintItems} />

      {/* HEADER AND HERO SECTION */}
      {/* This div is fixed and covers the initial viewport height. */}
      <div ref={headerHeroRef} className="fixed top-0 left-0 w-full h-screen z-0"> {/* Note: z-index 0 on a fixed element might cause issues */}
        {/* DESKTOP HEADER (Hidden on small screens) */}
        <header ref={headerRef} className="w-full bg-white relative z-10 mb-0 hidden md:block"> {/* Added hidden md:block */}
          <div className="mx-auto w-full max-w-[1440px] px-[140px]">
            {/* Top Row: Navigation */}
            <div
              className="grid grid-cols-5 items-center pt-[30px] pb-[10px] uppercase"
              style={{
                fontFamily: "'Inter Tight', sans-serif", // Inline style
                fontWeight: 500,
                fontSize: "12px",
                lineHeight: "100%",
                letterSpacing: "0px",
              }}
            >
              <div>
                <Link href="#">IDENTITY</Link> {/* Note: href="#" */}
              </div>
              <div>
                <Link href="#">ORIGIN</Link> {/* Note: href="#" */}
              </div>
              <div>
                <Link href="#">OBJECTIVE</Link> {/* Note: href="#" */}
              </div>
              <div>
                <Link href="#">INSIDE WAE</Link> {/* Note: href="#" */}
              </div>
              <div>
                <Link href="#">ETCETERA</Link> {/* Note: href="#" */}
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[#D9D9DC] mb-[10px]" />

            {/* Bottom Row: Logo, Coordinates, Tagline, Menu Items */}
            <div className="grid grid-cols-5 items-start">
              {/* Logo */}
              <div className="flex flex-col justify-center">
                <Link href="/">
                  <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/34074342-7005-4a25-9763-86933d6e7700/public"
                    alt="WAE Logo"
                    width={78}
                    height={82}
                  />
                </Link>
              </div>

              {/* Coordinates */}
              <div
                className="flex flex-col justify-center inline-block mr-1"
                style={{
                  fontFamily: "'Inter Tight', sans-serif", // Inline style
                  fontWeight: 500,
                  fontSize: "11px",
                  lineHeight: "100%",
                  color: "#000000",
                }}
              >
                20.5937° N
                <br />
                78.9629° E
              </div>

              {/* Tagline */}
              <div
                className="flex flex-col justify-center inline-block mr-1"
                style={{
                  fontFamily: "'Inter Tight', sans-serif", // Inline style
                  fontWeight: 500,
                  fontSize: "11px",
                  lineHeight: "100%",
                  color: "#000000",
                }}
              >
                To lead the way in<br />sustainability ahead of the<br />rest
              </div>

              {/* Inside WAE Menu Items */}
              <div className="flex flex-col justify-center space-y-2">
                {productsItems.map((item, i) => (
                  <div
                    key={i}
                    className="pb-2 border-b border-[#D9D9DC] last:border-0"
                    style={{
                      fontFamily: "'Inter Tight', sans-serif", // Inline style
                      fontWeight: 500,
                      fontSize: "11px",
                      lineHeight: "110%",
                    }}
                  >
                    <Link href={item.href} className="contents"> {/* className="contents" might affect layout/hover */}
                      <div className="c--anim-btn"> {/* Custom CSS class for hover animation */}
                        <div className="text-container"> {/* Custom CSS class */}
                          <span className="c-anim-btn">{item.text}</span> {/* Custom CSS class */}
                          <span className="block">{item.text}</span>
                        </div>
                        <span className="menu-arrow"> {/* Custom CSS class for arrow animation */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              {/* ETCETERA Menu Items */}
              <div className="flex flex-col justify-center space-y-2">
                {blueprintItems.map((item, i) => (
                  <div
                    key={i}
                    className="pb-2 border-b border-[#D9D9DC] last:border-0"
                    style={{
                      fontFamily: "'Inter Tight', sans-serif", // Inline style
                      fontWeight: 500,
                      fontSize: "11px",
                      lineHeight: "110%",
                    }}
                  >
                    <Link href={item.href} className="contents"> {/* className="contents" might affect layout/hover */}
                      <div className="c--anim-btn"> {/* Custom CSS class for hover animation */}
                        <div className="text-container"> {/* Custom CSS class */}
                          <span className="c-anim-btn">{item.text}</span> {/* Custom CSS class */}
                          <span className="block">{item.text}</span>
                        </div>
                        <span className="menu-arrow blueprint-arrow"> {/* Custom CSS class for arrow animation + rotation */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* HERO SECTION */}
        <section
          id="hero"
          ref={heroRef}
          className="relative h-screen w-full overflow-hidden"
          style={{ marginTop: `-${headerHeight}px`, paddingTop: "70px" }} // Added paddingTop for mobile
        >
          <video
          // --- CHANGE HERE: Conditionally set the src based on isMobile ---
          src={isMobile ? "/MicrosoftTeams-video (1).mp4" : "/93af6227858930534ba0ecad01b7f3f02b655c7d.mp4"}
          autoPlay
          // loop // Loop is commented out
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          // --- ADD THIS: Key prop helps React re-mount the video element when src changes ---
          key={isMobile ? 'mobile-video' : 'desktop-video'}
        />
          {/* Scroll for more text - Adjusted for mobile from previous page */}
          <div
            className="absolute uppercase text-[#00000099]"
            style={{ // Inline styles for positioning and typography
              bottom: "5%", // From previous page's mobile hero
              left: "1rem", // From previous page's mobile hero (16px)
              // width: "104px", // Removed fixed width for better responsiveness if text changes
              // height: "12px", // Removed fixed height
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontSize: "0.625rem", // From previous page's mobile hero (10px)
              lineHeight: "100%",
            }}
          >
            Scroll for more ⤵︎ {/* Static text */}
          </div>
        </section>
      </div>

      {/* SCROLL-DRIVEN CONTAINER */}
      {/* This container provides the main scrollable content below the initial fixed header/hero.
          NOTE: scroll-snap-type for this effect is applied to the html/body element in global CSS.
          snap-y snap-mandatory classes are removed from this div. */}
      {/* The min-height should accommodate the total height of all content */}
      <motion.div
        className="min-h-[400vh] relative bg-[#F2F2F2] mt-screen" // Increased min-height to better accommodate full-screen sections + other content
        style={{ marginTop: "100vh" }} // Explicitly pushing content down by viewport height
      >
        {/* Sticky Logo Overlay */}
        {/* This element is positioned sticky inside the scrollable container. */}
        {/* snap-start class is REMOVED */}
        {/* NOTE: If you want the logo div itself to be a snap point, add snap-center here */}
        <motion.div
          style={{ position: "sticky", top: "5%", zIndex: 1100, opacity: logoOpacity }} // Framer Motion opacity + CSS Sticky
          className="pointer-events-none flex justify-center pt-[180px]" // snap-start removed
        >
          <div className="max-w-[19.375rem] max-h-[19.375rem]"> {/* Fixed size container for the logo */}
            <Image
              src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/9626af87-4cf5-4192-397c-3f4284787400/public"
              alt="Center Logo"
              width={250}
              height={250}
              className="opacity-80"
            />
          </div>
        </motion.div>

        {/* Purpose Section */}
        <section className="h-screen bg-[#f2f2f2] flex items-center justify-center relative snap-center mobile-purpose-zindex">
          <motion.div
            className="w-full max-w-screen-xl mx-8 lg:mx-36"
          >
            <div className="flex flex-col lg:flex-row items-start justify-between">
              <h2 className="font-[Inter Tight] font-medium text-[32px] leading-[110%] mb-[40px] lg:text-6xl lg:leading-tight lg:mb-0"> {/* Mobile heading styles + bottom margin */}
                Purpose
              </h2>
              <div className="flex flex-col w-64"> {/* Removed gap-5 here */}
                <p className="w-[270px] font-[Inter Tight] text-[10px] leading-[130%] lg:text-[12px] lg:leading-[110%] text-black/60" style={{ marginBottom: "20px" }}> {/* Removed mb-5 */}
                  Being sustainable -The Underlying natural order
                  of the universe - circular continuity of the
                  natural world. Undifferentiated, endlessly self-
                  replenishing, immensely powerful and
                  impassively generous.
                </p>
                <p className="w-[270px] font-[Inter Tight] text-[10px] leading-[130%] lg:text-[12px] lg:leading-[110%] text-black/60" style={{ marginBottom: "40px" }}> {/* Removed mb-[40px] */}
                  Our purpose brings together the company,
                  employees, clients and our stakeholders and
                  reconciles economic performance witha
                  positive impact on people and the planet.
                </p>
                <Link href="/purpose" className="purpose-know-more-link">
                  <HoverButton>
                    {(hovered) => (
                      <>
                        Know More
                        <div className="relative inline-block w-4 h-4">
                          <Image
                            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                            alt="icon default"
                            width={16}
                            height={16}
                          />
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: hovered ? 1 : 0 }}
                            transition={{ delay: hovered ? 0.3 : 0, duration: 0.5 }}
                            className="absolute top-0 left-0"
                          >
                            <Image
                              src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public"
                              alt="icon hover"
                              width={16}
                              height={16}
                            />
                          </motion.div>
                        </div>
                      </>
                    )}
                  </HoverButton>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        {/* About WAE Section - Apply the exact same class modifications here */}
        <section className="h-screen bg-[#f2f2f2] flex items-center justify-center relative snap-center mobile-purpose-zindex">
          <motion.div
            className="w-full max-w-screen-xl mx-8 lg:mx-36"
          >
            <div className="flex flex-col lg:flex-row items-start justify-between">
              <h2 className="font-[Inter Tight] font-medium text-[32px] leading-[110%] mb-[40px] lg:text-6xl lg:leading-tight lg:mb-0"> {/* Mobile heading styles + bottom margin */}
                About WAE
              </h2>
              <div className="flex flex-col w-64"> {/* Removed gap-5 here */}
                <p className="w-[270px] font-[Inter Tight] text-[10px] leading-[130%] lg:text-[12px] lg:leading-[110%] text-black/60" style={{ marginBottom: "40px" }}> {/* Removed mb-5 */}
                  WAE captures the heart of Indian innovation by seamlessly blending time-honoured ideals with the latest technology.
                  We are driven by the mission to build a brand that not only saves the planet but also creates a potent impact on future generations,
                  strengthening community resilience and showcasing India's intellectual capital on the world stage.
                </p>
                <Link href="/about-wae" className="aboutwae-know-more-link">
                  <HoverButton>
                    {(hovered) => (
                      <>
                        Know More
                        <div className="relative inline-block w-4 h-4">
                          <Image
                            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                            alt="icon default"
                            width={16}
                            height={16}
                          />
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: hovered ? 1 : 0 }}
                            transition={{ delay: hovered ? 0.3 : 0, duration: 0.5 }}
                            className="absolute top-0 left-0"
                          >
                            <Image
                              src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public"
                              alt="icon hover"
                              width={16}
                              height={16}
                            />
                          </motion.div>
                        </div>
                      </>
                    )}
                  </HoverButton>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Products Section */}
        <div className="relative bg-white flex items-center justify-center py-[60px] md:py-[140px] px-4 md:px-[140px]" style={{ zIndex: 1200 }}>
          {/* Uses a table for layout, with fixed sizes defined in custom CSS */}
          {/* Hide on mobile, use flexbox alternative */}
          <table className="product-grid hidden md:table"> {/* Custom CSS class + hidden md:table */}
            <tr>
              <td colSpan={2} className="product-title whitespace-nowrap"> {/* Custom CSS class */}
                Products
              </td>
              <td className="product-cell transition  cursor-pointer duration-500 hover:scale-110 relative z-10"> {/* Custom CSS class + Tailwind hover scale */}
                <Link href="/product-category/drinking-water-stations" className="contents">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="product-category">DRINKING WATER<br />STATIONS</span>
                    </div>
                    <span className="absolute right-0 top-1/2 transform -translate-y-1/2">
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/adce5fa8-f9f5-4cab-0656-920dda8ca800/public"
                        alt="Right arrow"
                        width={24}
                        height={24}
                      />
                    </span>
                  </div>
                </Link>
              </td>
              <td className="product-cell"> {/* Custom CSS class */}
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/27917d14-ea56-4a80-93b9-c66ba9642400/public"
                  alt="Drinking Water Station"
                  className="placeholder-img filter grayscale hover:grayscale-0 transition duration-500 object-cover w-[232px] h-[232px]"
                  width={232}
                  height={232}
                />
              </td>
              <td className="product-cell bg-white-override"></td> {/* Custom CSS class + Tailwind override */}
            </tr>
            <tr>
              <td className="product-cell"> {/* Custom CSS class */}
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/685750d6-ec8e-491b-a214-24f13cfcb600/public"
                  alt="Water Faucet"
                  className="placeholder-img filter grayscale hover:grayscale-0 transition duration-500 object-cover w-[232px] h-[232px]"
                  width={232}
                  height={232}
                />
              </td>
              {/* DRINKING WATER FAUCETS with left and down arrows */}
              <td className="product-cell transition cursor-pointer duration-500 hover:scale-110 relative z-10"> {/* Custom CSS class + Tailwind hover scale */}
                <Link href="/product-category/drinking-water-faucets" className="contents">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="product-category">DRINKING WATER<br />FAUCETS</span>
                    </div>
                    <span className="absolute left-0 top-1/2 transform -translate-y-1/2">
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/907338d4-a5ff-4fdc-e4b3-c1b257b2d100/public"
                        alt="Left arrow"
                        width={24}
                        height={24}
                      />
                    </span>
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-2">
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c1592737-4cb5-4079-b1ea-9073ebbc4500/public"
                        alt="Down arrow"
                        width={24}
                        height={24}
                      />
                    </span>
                  </div>
                </Link>
              </td>
              <td className="product-cell"> {/* Custom CSS class */}
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6b05d64d-0248-4aaf-b8c3-e8d7afccea00/public"
                  alt="Water Dispenser"
                  className="placeholder-img filter grayscale hover:grayscale-0 transition duration-500 object-cover w-[232px] h-[232px]"
                  width={232}
                  height={232}
                />
              </td>
              {/* DRINKING WATER DISPENSERS with left and right arrows */}
              <td className="product-cell transition cursor-pointer duration-500 hover:scale-110 relative z-10"> {/* Custom CSS class + Tailwind hover scale */}
                <Link href="/product-category/water-dispenser" className="contents">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="product-category">DRINKING WATER<br />DISPENSERS</span>
                    </div>
                    <span className="absolute left-0 top-1/2 transform -translate-y-1/2">
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/907338d4-a5ff-4fdc-e4b3-c1b257b2d100/public"
                        alt="Left arrow"
                        width={24}
                        height={24}
                      />
                    </span>
                    <span className="absolute right-0 top-1/2 transform -translate-y-1/2">
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/adce5fa8-f9f5-4cab-0656-920dda8ca800/public"
                        alt="Right arrow"
                        width={24}
                        height={24}
                      />
                    </span>
                  </div>
                </Link>
              </td>
              <td className="product-cell"> {/* Custom CSS class */}
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/76c4a14e-2e09-4da6-c363-84bae0088400/public"
                  alt="Water Dispenser"
                  className="placeholder-img filter grayscale hover:grayscale-0 transition duration-500 object-cover w-[232px] h-[232px]"
                  width={232}
                  height={232}
                />
              </td>
            </tr>
            <tr>
              <td className="product-cell bg-white-override"></td> {/* Custom CSS class + Tailwind override */}
              <td className="product-cell"> {/* Custom CSS class */}
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/bf2a2e6e-9e0b-464a-c2ff-1a16cb1f9900/public"
                  alt="Water Cooler"
                  className="placeholder-img filter grayscale hover:grayscale-0 transition duration-500 object-cover w-[232px] h-[232px]"
                  width={232}
                  height={232}
                />
              </td>
              {/* WATER COOLERS & FOUNTAINS with right and down arrows */}
              <td className="product-cell transition cursor-pointer duration-500 hover:scale-110 relative z-10"> {/* Custom CSS class + Tailwind hover scale */}
                <Link href="/product-category/water-cooler" className="contents">
                  <div className="relative w-full h-full">
                    {/* Centered Text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="product-category">WATER COOLERS &amp;<br />FOUNTAINS</span>
                    </div>
                    {/* Right Arrow flush at right */}
                    <span className="absolute right-0 top-1/2 transform -translate-y-1/2">
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/adce5fa8-f9f5-4cab-0656-920dda8ca800/public"
                        alt="Right arrow"
                        width={24}
                        height={24}
                      />
                    </span>
                  </div>
                </Link>
              </td>
              <td className="product-cell"> {/* Custom CSS class */}
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/d9688872-6e63-4d68-26e9-aec6cf1f3a00/public"
                  alt="Water Fountain"
                  className="placeholder-img filter grayscale hover:grayscale-0 transition duration-500 object-cover w-[232px] h-[232px]"
                  width={232}
                  height={232}
                />
              </td>
              <td className="product-cell bg-white-override"></td> {/* Custom CSS class + Tailwind override */}
            </tr>
            <tr>
              <td className="product-cell"> {/* Custom CSS class */}
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/54ccac68-6261-4097-e41c-cfa35c992100/public"
                  alt="Public Utility"
                  className="placeholder-img filter grayscale hover:grayscale-0 transition duration-500 object-cover w-[232px] h-[232px]"
                  width={232}
                  height={232}
                />
              </td>
              {/* PUBLIC UTILITY SYSTEMS with left arrow */}
              <td className="product-cell transition cursor-pointer duration-500 hover:scale-110 relative z-10"> {/* Custom CSS class + Tailwind hover scale */}
                <Link href="/product-category/public-utility-systems" className="contents">
                  <div className="relative w-full h-full">
                    {/* Centered Text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="product-category">PUBLIC UTILITY<br />SYSTEMS</span>
                    </div>
                    {/* Left Arrow flush at left */}
                    <span className="absolute left-0 top-1/2 transform -translate-y-1/2">
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/907338d4-a5ff-4fdc-e4b3-c1b257b2d100/public"
                        alt="Left arrow"
                        width={24}
                        height={24}
                      />
                    </span>
                  </div>
                </Link>
              </td>
              <td className="product-cell"> {/* Custom CSS class */}
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/f1de8f36-85d7-4958-a678-0702ece63a00/public"
                  alt="Commercial Plant"
                  className="placeholder-img filter grayscale hover:grayscale-0 transition duration-500 object-cover w-[232px] h-[232px]"
                  width={232}
                  height={232}
                />
              </td>
              {/* COMMERCIAL/INDUSTRIAL PLANTS with right arrow */}
              <td className="product-cell transition cursor-pointer duration-500 hover:scale-110 relative z-10"> {/* Custom CSS class + Tailwind hover scale */}
                <Link href="/product-category/commercial-industrial-plants" className="contents">
                  <div className="relative w-full h-full">
                    {/* Centered Text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="product-category">COMMERCIAL/<br />INDUSTRIAL PLANTS</span>
                    </div>
                    {/* Right Arrow flushat right */}
                    <span className="absolute right-0 top-1/2 transform -translate-y-1/2">
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/adce5fa8-f9f5-4cab-0656-920dda8ca800/public"
                        alt="Right arrow"
                        width={24}
                        height={24}
                      />
                    </span>
                  </div>
                </Link>
              </td>
              <td className="product-cell"> {/* Custom CSS class */}
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/a0490312-e31b-44b0-2272-8645b0d0ef00/public"
                  alt="Industrial Plant"
                  className="placeholder-img filter grayscale hover:grayscale-0 transition duration-500 object-cover w-[232px] h-[232px]"
                  width={232}
                  height={232}
                />
              </td>
            </tr>
          </table>

          {/* --- NEW: MOBILE PRODUCT CAROUSEL (Tailwind CSS Scroll Snap) --- */}
          {/* Added 'relative' to the parent container for absolute positioning of arrows */}
          <div className="md:hidden flex flex-col w-full max-w-sm mx-auto relative">
            <h2 className="font-[Inter Tight] text-[32px] leading-[120%] px-[4.44%] mb-8">Products</h2>

            {/* Carousel Track: Flex container with horizontal scrolling and scroll snap */}
            <div
              ref={productsCarouselRef} // Attach the NEW ref here
              className="flex overflow-x-scroll snap-x snap-mandatory pb-4 -mx-4 px-4 hide-scrollbar"
            >
              {productsData.map((product, index) => (
                <Link
                  key={index}
                  href={product.href}
                  className="flex-shrink-0 snap-center w-full flex flex-col items-center bg-[#fff] rounded-lg p-4" // Ensure consistency with solutions section
                >
                  <Image
                    src={product.imgSrc}
                    alt={product.altText}
                    width={316} // Specified 316px width
                    height={316} // Specified 316px height
                    className="object-cover"
                  />
                  <div style={{ height: '20px' }} /> {/* 20px gap below image */}
                  <span
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "140%",
                      letterSpacing: "0%",
                      textAlign: "center",
                      textTransform: "uppercase",
                    }}
                    className="text-black"
                  >
                    {product.title}
                  </span>
                </Link>
              ))}
            </div>

            {/* --- Navigation Arrows for Products --- */}
            {showProductsLeftArrow && (
              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 p-2 ml-[4.44%] md:ml-4 bg-transparent"
                onClick={() => scrollProductsCarousel('left')}
                aria-label="Previous product"
              >
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/5ccb5886-74f3-436a-b9de-b9bf3945b400/public"
                  alt="Left Arrow"
                  width={24}
                  height={24}
                />
              </button>
            )}
            {showProductsRightArrow && (
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 p-2 mr-[4.44%] md:mr-4 bg-transparent"
                onClick={() => scrollProductsCarousel('right')}
                aria-label="Next product"
              >
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/71db80ef-81f2-4210-48ee-18d5da045300/public"
                  alt="Right Arrow"
                  width={24}
                  height={24}
                />
              </button>
            )}
            {/* --- END Navigation Arrows for Products --- */}
          </div>
          {/* --- END NEW MOBILE PRODUCT CAROUSEL --- */}
        </div>

        {/* Solution Section */}
        <div className="relative bg-white flex items-center justify-center py-[60px] md:py-[140px] px-4 md:px-[140px]" style={{ zIndex: 1200 }}>
          {/* Uses a table for layout, with fixed sizes defined in custom CSS */}
          {/* Hide on mobile, use flexbox alternative */}
          <table className="solutions-grid hidden md:table"> {/* Custom CSS class + hidden md:table */}
            <tr>
              <td colSpan={2} className="product-title whitespace-nowrap"> {/* Custom CSS class */}
                Solutions
              </td>
              <td className="product-cell transition cursor-pointer duration-500 hover:scale-110 relative z-10"> {/* Custom CSS class + Tailwind hover scale */}
                <Link href="/water-reuse" className="contents">
                  <div className="relative w-full h-full">
                    {/* Centered Text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="product-category">WATER REUSE</span>
                    </div>
                    {/* Right Arrow flush at right */}
                    <span className="absolute right-0 top-1/2 transform -translate-y-1/2">
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/adce5fa8-f9f5-4cab-0656-920dda8ca800/public"
                        alt="Right arrow"
                        width={24}
                        height={24}
                      />
                    </span>
                  </div>
                </Link>
              </td>
              <td className="product-cell"> {/* Custom CSS class */}
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/8c357479-5a25-4527-7fde-a434fa498b00/public"
                  alt="WATER REUSE"
                  className="placeholder-img filter grayscale hover:grayscale-0 transition duration-500 object-cover w-[232px] h-[232px]"
                  width={232}
                  height={232}
                />
              </td>
              <td className="product-cell bg-white-override"></td> {/* Custom CSS class + Tailwind override */}
            </tr>
            <tr>
              <td className="product-cell"> {/* Custom CSS class */}
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c399819d-976c-49aa-332f-02a9db708200/public"
                  alt="WATER TREATMENT LEFT"
                  className="placeholder-img filter grayscale hover:grayscale-0 transition duration-500 object-cover w-[232px] h-[232px]"
                  width={232}
                  height={232}
                />
              </td>
              {/* DRINKING WATER FAUCETS with left and down arrows */}
              <td className="product-cell transition cursor-pointer duration-500 hover:scale-110 relative z-10"> {/* Custom CSS class + Tailwind hover scale */}
                <Link href="/water-treatment" className="contents">
                  <div className="relative w-full h-full">
                    {/* Centered Text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="product-category">WATER TREATMENT</span>
                    </div>
                    {/* Left Arrow flush at left */}
                    <span className="absolute left-0 top-1/2 transform -translate-y-1/2">
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/907338d4-a5ff-4fdc-e4b3-c1b257b2d100/public"
                        alt="Left arrow"
                        width={24}
                        height={24}
                      />
                    </span>
                    {/* Down Arrow flush at bottom */}
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-2">
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c1592737-4cb5-4079-b1ea-9073ebbc4500/public"
                        alt="Down arrow"
                        width={24}
                        height={24}
                      />
                    </span>
                  </div>
                </Link>
              </td>
              <td className="product-cell"> {/* Custom CSS class */}
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/16ca1b89-cf24-442f-0a41-3e3ad0c6cf00/public"
                  alt="WATER AS A SERVICE LEFT"
                  className="placeholder-img filter grayscale hover:grayscale-0 transition duration-500 object-cover w-[232px] h-[232px]"
                  width={232}
                  height={232}
                />
              </td>
              {/* DRINKING WATER DISPENSERS with left and right arrows */}
              <td className="product-cell transition cursor-pointer duration-500 hover:scale-110 relative z-10"> {/* Custom CSS class + Tailwind hover scale */}
                <Link href="/water-as-a-service" className="contents">
                  <div className="relative w-full h-full">
                    {/* Centered Text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="product-category">WATER AS A SERVICE</span>
                    </div>
                    {/* Left Arrow flush at left */}
                    <span className="absolute left-0 top-1/2 transform -translate-y-1/2">
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/907338d4-a5ff-4fdc-e4b3-c1b257b2d100/public"
                        alt="Left arrow"
                        width={24}
                        height={24}
                      />
                    </span>
                    {/* Right Arrow flush at right */}
                    <span className="absolute right-0 top-1/2 transform -translate-y-1/2">
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/adce5fa8-f9f5-4cab-0656-920dda8ca800/public"
                        alt="Right arrow"
                        width={24}
                        height={24}
                      />
                    </span>
                  </div>
                </Link>
              </td>
              <td className="product-cell"> {/* Custom CSS class */}
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/1374b15c-0e9d-4dbf-6524-c4b6ff10f900/public"
                  alt="WATER AS A SERVICE RIGHT "
                  className="placeholder-img filter grayscale hover:grayscale-0 transition duration-500 object-cover w-[232px] h-[232px]"
                  width={232}
                  height={232}
                />
              </td>
            </tr>
            <tr>
              <td className="product-cell bg-white-override"></td> {/* Custom CSS class + Tailwind override */}
              <td className="product-cell"> {/* Custom CSS class */}
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4f492758-88ca-4c25-4a00-1a122cd22200/public"
                  alt="WATER TREATMENT DOWN"
                  className="placeholder-img filter grayscale hover:grayscale-0 transition duration-500 object-cover w-[232px] h-[232px]"
                  width={232}
                  height={232}
                />
              </td>
              {/* empty white box */}
              <td className="bg-white"> {/* Custom CSS class + Tailwind hover scale */}
                <Link href="/product-category/water-coolers-fountains" className="contents">
                  <div className="relative w-full h-full">
                    {/* Centered Text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="product-category"></span>
                    </div>
                  </div>
                </Link>
              </td>
              <td className="product-cell"> {/* Custom CSS class */}
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2e9e2498-7134-4994-642f-e95e90e1aa00/public"
                  alt="WATER AS A SERVICE DOWN"
                  className="placeholder-img filter grayscale hover:grayscale-0 transition duration-500 object-cover w-[232px] h-[232px]"
                  width={232}
                  height={232}
                />
              </td>
              <td className="product-cell bg-white-override"></td> {/* Custom CSS class + Tailwind override */}
            </tr>
          </table>

          {/* --- NEW: MOBILE SOLUTION CAROUSEL (Tailwind CSS Scroll Snap) --- */}
          {/* Added 'relative' to the parent container for absolute positioning of arrows */}
          <div className="md:hidden flex flex-col w-full max-w-sm mx-auto relative">
            <h2 className="font-[Inter Tight] text-[32px] leading-[120%] tracmking-0 px-[4.44%] mb-8">Solutions</h2>

            {/* Carousel Track: Flex container with horizontal scrolling and scroll snap */}
            <div
              ref={carouselRef} // Attach the ref here
              className="flex overflow-x-scroll snap-x snap-mandatory pb-4 -mx-4 px-4 hide-scrollbar"
            >
              {solutionsData.map((solution, index) => (
                <Link
                  key={index}
                  href={solution.href}
                  className="flex-shrink-0 snap-center w-full flex flex-col items-center bg-[#fff] rounded-lg p-4"
                >
                  <Image
                    src={solution.imgSrc}
                    alt={solution.altText}
                    width={316} // Specified 316px width
                    height={316} // Specified 316px height
                    className="object-cover"
                  />
                  <div style={{ height: '20px' }} />
                  <span
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "140%",
                      letterSpacing: "0%",
                      textAlign: "center",
                      textTransform: "uppercase",
                    }}
                    className="text-black"
                  >
                    {solution.title}
                  </span>
                </Link>
              ))}
            </div>

            {/* --- Navigation Arrows --- */}
            {showLeftArrow && (
              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 p-2 ml-[4.44%] md:ml-4 bg-transparent"
                onClick={() => scrollCarousel('left')}
                aria-label="Previous slide" // Important for accessibility
              >
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/5ccb5886-74f3-436a-b9de-b9bf3945b400/public"
                  alt="Left Arrow"
                  width={24}
                  height={24}
                />
              </button>
            )}
            {showRightArrow && (
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 p-2 mr-[4.44%] md:mr-4 bg-transparent"
                onClick={() => scrollCarousel('right')}
                aria-label="Next slide" // Important for accessibility
              >
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/71db80ef-81f2-4210-48ee-18d5da045300/public"
                  alt="Right Arrow"
                  width={24}
                  height={24}
                />
              </button>
            )}
            {/* --- END Navigation Arrows --- */}
          </div>
          {/* --- END NEW MOBILE SOLUTION CAROUSEL --- */}
        </div>

      {/* wrapping these in a div to get them to overlap the sticky logo */}
        <div className="bg-[#f2f2f2]"
        style={{ position: "relative", zIndex: 1200, borderRadius: "0" }}
        >
        {/* Make in INDIA Section */}
        <section className="h-screen flex items-center justify-center relative snap-center px-8 md:px-[9.72%]">
          <motion.div
            className="w-full max-w-screen-xl"
          >
            <div className="flex flex-col lg:flex-row items-start justify-between h-[115px]">
              <div className="flex flex-col items-start"> {/* Removed gap-5 here */}
                <h2
                  className="inline-block text-[32px] leading-[110%] mb-[40px] md:text-[58px] md:leading-[110%]"
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 500,
                    color: "#000",
                  }}
                >
                  Make In India
                </h2>
                <div className="relative w-full h-auto md:w-[432px] md:h-[229px]" style={{ zIndex: 1200 }}>
                  <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/65e95d19-5da4-472d-67c7-755dd69be700/public"
                    alt="Make In India"
                    fill
                    className="object-contain md:pl-[-2.875%] md:pr-[9.725%] md:pb-[25px]"
                  />
                </div>
              </div>
              <div className="flex flex-col w-full md:w-64"> {/* Fixed width text container. Made width full on mobile */}
                <p className="w-full font-[Inter Tight] font-medium text-[10px] leading-[130%] mb-[40px] md:w-[270px] md:text-[12px] md:leading-[110%] md:mb-0 text-black/60"> {/* Mobile description styles + bottom margin, reset for desktop */}
                  WAE captures the heart of Indian innovation by seamlessly blending the 
                  time-honoured ideals with the latest technology. We are driven by the 
                  mission to build a brand that not only saves the planet but also creates a 
                  potent impact on future generations for the country's advancements, 
                  integrity & innovation. Our approach strengthens community resilience 
                  while showcasing India's intellectual capital on the world stage.
                </p>
                {/* If you add a button here, the mb-[40px] on the paragraph will create the gap */}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Sustainability Section */}
         {/* Parallax motion.div wrapper and related hooks removed for scroll-snap priority */}
         {/* Changed to h-screen and centered content vertically, removed padding */}
        {/* <motion.div ref={sustainabilityScrollRef} style={{ y: sustainabilityY }}> // Removed outer motion.div */}
        <section className="h-screen flex items-center justify-center relative snap-center px-8 md:px-[9.72%]"> {/* Changed height, removed padding, changed flex alignment. Added px-4 for mobile */}
            <motion.div
              // Removed initial and whileInView animation props for opacity
              // initial={{ opacity: 0 }}
              // whileInView={{ opacity: 1 }}
              // transition={{ duration: 0.8, delay: 0.5 }}
              // viewport={{ once: true }}
              className="w-full max-w-screen-xl flex flex-col lg:flex-row justify-between" // This content will be centered
            >
              <h2
                className="inline-block text-[32px] leading-[110%] mb-[40px] md:text-[58px] md:leading-[110%]" // Adjusted for mobile font size, line height, and bottom margin
                style={{ // Inline styles for typography (font-family, font-weight, color are kept here)
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  color: "#000",
                }}
              >
                Sustainability
              </h2>
              {/* Adjusted gap for mobile, and added bottom margin for the last item */}
              <div className="flex flex-col gap-8 md:gap-20">
                {/* Statistic 1 */}
                <div className="flex flex-col">
                  <p className="font-[Inter Tight] font-bold text-[32px] leading-[140%] uppercase md:text-2xl md:font-normal md:leading-snug"> {/* Adjusted font size, weight, line height, and text transform for mobile */}
                    1,012,120.25
                  </p>
                  {/* Horizontal Rule */}
                  <div className="w-full h-[1px] bg-black/20 my-3 md:hidden"></div> {/* Added for mobile only */}
                  <p className="font-[Inter Tight] font-normal text-[12px] leading-[24px] md:text-xs md:leading-wide text-black/70 tracking-wide"> {/* Adjusted font size and line height for mobile */}
                    TONNES CO2 EMISSIONS SAVED
                  </p>
                </div>
                {/* Statistic 2 */}
                <div className="flex flex-col">
                  <p className="font-[Inter Tight] font-bold text-[32px] leading-[140%] uppercase md:text-2xl md:font-normal md:leading-snug"> {/* Adjusted font size, weight, line height, and text transform for mobile */}
                    12,185.4325
                  </p>
                  {/* Horizontal Rule */}
                  <div className="w-full h-[1px] bg-black/20 my-3 md:hidden"></div> {/* Added for mobile only */}
                  <p className="font-[Inter Tight] font-normal text-[12px] leading-[24px] md:text-xs md:leading-wide text-black/70 tracking-wide"> {/* Adjusted font size and line height for mobile */}
                    MILLION GALLONS WATER SAVED
                  </p>
                </div>
                {/* Statistic 3 */}
                <div className="flex flex-col mb-[40px] md:mb-0"> {/* Added bottom margin for mobile, reset for desktop */}
                  <p className="font-[Inter Tight] font-bold text-[32px] leading-[140%] uppercase md:text-2xl md:font-normal md:leading-snug"> {/* Adjusted font size, weight, line height, and text transform for mobile */}
                    22,253.65
                  </p>
                  {/* Horizontal Rule */}
                  <div className="w-full h-[1px] bg-black/20 my-3 md:hidden"></div> {/* Added for mobile only */}
                  <p className="font-[Inter Tight] font-normal text-[12px] leading-[24px] md:text-xs md:leading-wide text-black/70 tracking-wide"> {/* Adjusted font size and line height for mobile */}
                    TONNES PLASTIC REMOVED
                  </p>
                  <Link href="/sustainability" className="mt-6 md:mt-10"> {/* Adjusted mt for mobile */}
                  <HoverButton>
                    {(hovered) => (
                      <>
                        Know More
                        <div className="relative inline-block w-4 h-4">
                          <Image
                            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                            alt="icon default"
                            width={16}
                            height={16}
                          />
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: hovered ? 1 : 0 }}
                            transition={{ delay: hovered ? 0.3 : 0, duration: 0.5 }}
                            className="absolute top-0 left-0"
                          >
                            <Image
                              src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public"
                              alt="icon hover"
                              width={16}
                              height={16}
                            />
                          </motion.div>
                        </div>
                      </>
                    )}
                  </HoverButton>
                </Link>
                </div>
              </div>
            </motion.div>
          </section>
        </div>

        {/* RELATED INFORMATION SECTION */}
        {/* This section has a white background and higher z-index */}
         {/* NOTE: If you want this section to be a scroll-snap point, add snap-center here */}
         {/* NOTE: Adjust padding/margins if this section's height + content interferes with snapping */}
         <section
          className="max-w-full px-[4.44%] py-[60px] md:px-[8.75rem] md:py-[120px] bg-white" // px-4 (16px left/right) for mobile
          style={{ position: "relative", zIndex: 1200, borderRadius: "0" }}
        >
          <h2 className="font-helvetica font-normal text-[32px] leading-[110%] mb-[40px] md:text-[3.625rem] md:leading-[110%] md:mb-[2.5rem]"> {/* Adjusted for explicit mobile font size (32px) and gap (40px) */}
            Blogs
          </h2>
          {/* Main carousel container: flex, scroll, snap, and gap */}
          <div className="relative"> {/* Added relative positioning for arrow buttons */}
            <div 
              ref={blogsCarouselRef}
              className="flex overflow-x-scroll snap-x snap-mandatory gap-4 md:grid md:grid-cols-4 md:gap-8"
              style={{ position: 'relative', zIndex: 1 }}
            >
            {/* Wrap each RelatedCard in a div with the carousel/sizing classes */}
              <div className="flex-none w-[calc(100vw-32px)] snap-start md:w-auto" style={{ position: 'relative', zIndex: 1 }}>
              <RelatedCard
                  image="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/1de1d21f-1dec-4cc3-8720-f73efae23400/public"
                  title="Water Conservation"
                description="Information regarding awards received by the Hitachi Group in various fields and related announcements."
                  width={316}
                  height={316}
              />
            </div>
              <div className="flex-none w-[calc(100vw-32px)] snap-start md:w-auto" style={{ position: 'relative', zIndex: 1 }}>
              <RelatedCard
                  image="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/8d76afb3-cd7f-4723-33df-bbabf4cbc900/public"
                title="Policy"
                description="Information regarding awards received by the Hitachi Group in various fields and related announcements."
                  width={316}
                  height={316}
              />
            </div>
              <div className="flex-none w-[calc(100vw-32px)] snap-start md:w-auto" style={{ position: 'relative', zIndex: 1 }}>
              <RelatedCard
                  image="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/022af5b3-ff4f-4da2-59f8-91dcf8a99700/public"
                title="Climate Change & Water"
                description="Information regarding awards received by the Hitachi Group in various fields and related announcements."
                  width={316}
                  height={316}
              />
            </div>
              <div className="flex-none w-[calc(100vw-32px)] snap-start md:w-auto" style={{ position: 'relative', zIndex: 1 }}>
              <RelatedCard
                  image="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/57ca2c2e-56ee-484e-2d71-21e2e5fa4a00/public"
                title="Industry Impacts and Solutions"
                description="Information regarding awards received by the Hitachi Group in various fields and related announcements."
                  width={316}
                  height={316}
                />
              </div>
            </div>

            {/* --- Navigation Arrows for Blogs (Mobile Only) --- */}
            <div className="md:hidden" style={{ position: 'absolute', top: '158px', left: 0, right: 0, zIndex: 100 }}>
              {showBlogsLeftArrow && (
                <button
                  className="absolute left-0 w-10 h-10 p-2 ml-[4.44%] bg-black/25 backdrop-blur-sm rounded-full shadow-sm flex items-center justify-center"
                  onClick={() => scrollBlogsCarousel('left')}
                  aria-label="Previous blog"
                >
                  <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/5ccb5886-74f3-436a-b9de-b9bf3945b400/public"
                    alt="Left Arrow"
                    width={14}
                    height={14}
                  />
                </button>
              )}
              {showBlogsRightArrow && (
                <button
                  className="absolute right-0 w-10 h-10 p-2 mr-[4.44%] bg-black/25 backdrop-blur-sm rounded-full shadow-sm flex items-center justify-center"
                  onClick={() => scrollBlogsCarousel('right')}
                  aria-label="Next blog"
                >
                  <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/71db80ef-81f2-4210-48ee-18d5da045300/public"
                    alt="Right Arrow"
                    width={14}
                    height={14}
                  />
                </button>
              )}
            </div>
          </div>
        </section>
        
        {/* FOOTER SECTION */}
        {/* Footer likely appears at the very bottom */}
        {/* NOTE: If you want this section to be a scroll-snap point, add snap-center here */}
        {/* NOTE: Adjust padding/margins if this section's height + content interferes with snapping */}
        <div className="pt-20 bg-[#f2f2f2]" style={{ position: "relative", zIndex: 1200 }}> {/* z-index to appear above the gray background */}
          {/* Assuming Footer is a valid component */}
          <Footer />
        </div>
      </motion.div>

      {/* INLINE STYLES */}
      {/* Custom CSS for specific elements and animations */}
      <style jsx>{`
        /* These classes were for a different scroll-snap setup and are likely not needed with global html/body snap */
        /*
        .container {
          scroll-snap-type: y mandatory;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          height: 200vh;
        }

        .section {
          scroll-snap-align: start;
          width: 100%;
          flex-shrink: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        */

        /* Product Grid Table Styles */
        /* Hide on mobile, use flexbox alternative */
        .product-grid, .solutions-grid {
          /* width: 1160px; */ /* Fixed width, removed for responsiveness */
          /* height: 928px; */ /* Fixed height, removed for responsiveness */
          border-collapse: collapse;
          /* Default to display: none and then md:table for desktop */
          display: none;
        }
        @media (min-width: 768px) { /* md breakpoint */
          .product-grid {
            display: table;
            width: 1160px; /* Fixed width for desktop */
            height: 928px; /* Fixed height for desktop */
          }
          .solutions-grid {
            display: table;
            width: 1160px; /* Fixed width for desktop */
            height: 696px; /* Fixed height for desktop */
          }
        }


        .product-title {
          font-family: "Inter Tight", sans-serif;
          font-weight: 500;
          font-size: 48px;
          line-height: 110%;
          letter-spacing: 0px;
          vertical-align: middle;
          text-align: center;
          width: calc(232px * 2); /* Fixed width based on cell size */
          height: 232px; /* Fixed height */
          box-sizing: border-box;
        }
        .product-cell {
          font-family: "Inter Tight", sans-serif;
          font-weight: 400;
          font-size: 14px;
          line-height: 100%;
          letter-spacing: 0px;
          text-align: center;
          vertical-align: middle;
          text-transform: uppercase;
          color: #1e1e1e;
          background-color: #f2f2f2; /* Default background for most cells */
          width: 232px; /* Fixed width */
          height: 232px; /* Fixed height */
          padding: 0px;
          box-sizing: border-box;
        }
         /* Corrected invalid CSS */
         .bg-white-override { /* Changed back to class name */
             background-color: #fff !important;
         }


        .placeholder-img {
          object-fit: cover;
          /* Potential issue: no explicit max-width/height, might overflow fixed cell */
        }

        /* Custom Button Hover Animation Styles */
        .c--anim-btn {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .text-container {
          height: 12px; /* Fixed height */
          overflow: hidden; /* Hides the second text span by default */
        }
        .c-anim-btn {
          display: block;
          transition: margin-top 0.5s; /* Animates the text moving up */
        }
        .c--anim-btn:hover .c-anim-btn {
          margin-top: -12px; /* Moves the first text span up by its height */
        }
        .menu-arrow {
          display: inline-block;
          opacity: 0; /* Hidden by default */
          transform: translateX(-10px); /* Starts off-position */
          transition: transform 0.5s ease, opacity 0.5s ease; /* Animates movement and fade */
        }
        .c--anim-btn:hover .menu-arrow {
          transform: translateX(0); /* Moves arrow into position */
          opacity: 1; /* Fades arrow in */
        }
        .blueprint-arrow {
          transform: rotate(-45deg) translateX(-10px); /* Additional rotation + initial position */
        }
        .c--anim-btn:hover .blueprint-arrow {
          transform: rotate(-45deg) translateX(0);
          opacity: 1;
        }
        .purpose-know-more-link {
          display: block;
        }
        .aboutwae-know-more-link {
          display: block;
        }
        @media (min-width: 768px) {
          .purpose-know-more-link {
            margin-top: 60px;
          }
          .aboutwae-know-more-link {
            margin-top: 60px;
          }
        }
      `}</style>
    </main>
  );
};

export default Home;