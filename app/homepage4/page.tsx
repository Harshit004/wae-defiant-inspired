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
        <Link href="/homepage3">
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
            <div style={{fontFamily: 'Inter Tight', fontWeight: 600, fontSize: '10px', lineHeight: '100%', letterSpacing: '0px', textTransform: 'uppercase', marginBottom: 12}}>ORIGIN & OBJECTIVE</div>
            <div style={{fontFamily: 'Inter Tight', fontWeight: 500, fontSize: '10px', lineHeight: '100%', letterSpacing: '0%', verticalAlign: 'middle'}}>
              20.5937° N<br />78.9629° E
            </div>
          </div>
          <div>
            <div style={{fontFamily: 'Inter Tight', fontWeight: 600, fontSize: '10px', lineHeight: '100%', letterSpacing: '0px', textTransform: 'uppercase', marginBottom: 12}}>OBJECTIVE</div>
            <div style={{fontFamily: 'Inter Tight', fontWeight: 500, fontSize: '16px', lineHeight: '100%', letterSpacing: '0%', verticalAlign: 'middle'}}>
              To lead the way in sustainability<br />ahead of the next
            </div>
          </div>
        </div>
        <div className="w-full h-px bg-black/10 mb-2" />

        {/* INSIDE WAE SECTION - two-column grid */}
        <div className="grid mb-2" style={{ gridTemplateColumns: '40% 60%' }}>
          <div className="flex items-start mt-2">
            <div style={{fontFamily: 'Inter Tight', fontWeight: 400, fontSize: '10px', lineHeight: '100%', letterSpacing: '0px', textTransform: 'uppercase'}}>INSIDE WAE</div>
          </div>
          <div className="flex flex-col">
            {productsItems.map((item, i) => (
              <div key={i}>
                <Link href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="block py-2" style={{fontFamily: 'Inter Tight', fontWeight: 500, fontSize: '20px', lineHeight: '100%', letterSpacing: '0%', verticalAlign: 'middle'}}>
                  {item.text}
                </Link>
                {i < productsItems.length - 1 && <div className="w-full h-px bg-black/10" />}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-px bg-black/10 mt-[12px] mb-2" />

        {/* ETCETERA SECTION - two-column grid */}
        <div className="grid mb-2" style={{ gridTemplateColumns: '40% 60%' }}>
          <div className="flex items-start mt-2">
            <div style={{fontFamily: 'Inter Tight', fontWeight: 400, fontSize: '10px', lineHeight: '100%', letterSpacing: '0px', textTransform: 'uppercase'}}>ETCETERA</div>
          </div>
          <div className="flex flex-col">
            {blueprintItems.map((item, i) => (
              <div key={i}>
                <Link href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="block py-2" style={{fontFamily: 'Inter Tight', fontWeight: 500, fontSize: '20px', lineHeight: '100%', letterSpacing: '0%', verticalAlign: 'middle'}}>
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

  // State variables for combined carousel
  const [showCombinedLeftArrow, setShowCombinedLeftArrow] = useState(false);
  const [showCombinedRightArrow, setShowCombinedRightArrow] = useState(false);
  const combinedCarouselRef = useRef<HTMLDivElement>(null);

  // Update scroll function
  const scrollCombinedCarousel = (direction: 'left' | 'right') => {
    if (combinedCarouselRef.current) {
      const scrollAmount = combinedCarouselRef.current.offsetWidth;
      combinedCarouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Update useEffect for arrow visibility
  useEffect(() => {
    const checkScroll = () => {
      if (combinedCarouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = combinedCarouselRef.current;
        setShowCombinedLeftArrow(scrollLeft > 0);
        setShowCombinedRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
      }
    };

    const carousel = combinedCarouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', checkScroll);
      checkScroll();
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener('scroll', checkScroll);
      }
    };
  }, []);

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
                <Link href="/homepage3"> {/* Updated href to /homepage3 */}
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
          style={{ top: "5%", zIndex: 1100, opacity: logoOpacity }} // Framer Motion opacity + CSS Sticky
          className="pointer-events-none flex justify-center pt-[180px]" // snap-start removed
        >
          <div className="max-w-[19.375rem] max-h-[19.375rem]"> {/* Fixed size container for the logo */}
            <Image
              src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/9626af87-4cf5-4192-397c-3f4284787400/public"
              alt="Center Logo"
              width={200}
              height={200}
              className="opacity-80"
            />
          </div>
        </motion.div>

        {/* Combined Purpose and About WAE Section */}
        <section className="flex items-center justify-center relative mobile-purpose-zindex mt-[-300px]">
          <motion.div className="w-full max-w-screen-xl mx-[4.44%] md:mx-8 lg:mx-36">
            <div className="relative">
              <div 
                ref={combinedCarouselRef}
                className="flex overflow-x-scroll snap-x snap-mandatory pb-4 -mx-4 px-4 hide-scrollbar"
              >
                {/* Purpose Slide */}
                <div className="flex-shrink-0 snap-center w-full">
                  <h2 className="font-[Inter Tight] font-medium text-[32px] leading-[110%] mb-[300px] lg:text-6xl lg:leading-tight lg:mb-0 text-center lg:text-left">
                Purpose
              </h2>
                  <div className="flex flex-col items-center mx-[4.44%]">
                    <p className="w-full font-[Inter Tight] text-[10px] text-center leading-[130%] mb-5 lg:text-[12px] lg:leading-[110%] lg:mb-0 text-black/60">
                  Being sustainable -The Underlying natural order
                  of the universe - circular continuity of the
                  natural world. Undifferentiated, endlessly self-
                  replenishing, immensely powerful and
                  impassively generous.
                </p>
                    <p className="w-full font-[Inter Tight] text-[10px] text-center leading-[130%] mb-[40px] lg:text-[12px] lg:leading-[110%] lg:mb-0 text-black/60">
                  Our purpose brings together the company,
                  employees, clients and our stakeholders and
                  reconciles economic performance witha
                  positive impact on people and the planet.
                </p>
                <Link href="/purpose" className="contents">
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

                {/* About WAE Slide */}
                <div className="flex-shrink-0 snap-center w-full">
                  <h2 className="font-[Inter Tight] font-medium text-[32px] leading-[110%] mb-[300px] lg:text-6xl lg:leading-tight lg:mb-0 text-center lg:text-left">
                About WAE
              </h2>
                  <div className="flex flex-col items-center mx-[4.44%]">
                    <p className="w-full font-[Inter Tight] text-[10px] text-center leading-[130%] mb-5 lg:text-[12px] lg:leading-[110%] lg:mb-0 text-black/60">
                  WAE captures the heart of Indian innovation by seamlessly blending time-honoured ideals with the latest technology.
                  We are driven by the mission to build a brand that not only saves the planet but also creates a potent impact on future generations,
                  strengthening community resilience and showcasing India's intellectual capital on the world stage.
                </p>
                <Link href="/about-wae" className="contents">
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
                    </div>

              {/* Navigation Arrows */}
              {showCombinedLeftArrow && (
                <button
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 ml-[6%] md:ml-4 bg-transparent hover:bg-white/10 rounded-full transition-all duration-300 flex items-center justify-center"
                  onClick={() => scrollCombinedCarousel('left')}
                  aria-label="Previous slide"
                >
                      <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/65c77dc9-8867-4c14-2e26-180c14b84e00/public"
                    alt="Left Arrow"
                    width={40}
                    height={40}
                    className="transform hover:scale-110 transition-transform duration-300"
                  />
                </button>
              )}
              {showCombinedRightArrow && (
                <button
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 mr-[6%] md:mr-4 bg-transparent hover:bg-white/10 rounded-full transition-all duration-300 flex items-center justify-center"
                  onClick={() => scrollCombinedCarousel('right')}
                  aria-label="Next slide"
                >
                <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/58b7fb95-62e5-4cc5-5dc1-d798af2bdf00/public"
                    alt="Right Arrow"
                    width={40}
                    height={40}
                    className="transform hover:scale-110 transition-transform duration-300"
                  />
                </button>
              )}
                    </div>
          </motion.div>
        </section>

        {/* Products Section */}
        <div className="relative bg-[#f2f2f2] md:bg-white flex items-center justify-center py-[60px] md:py-[140px] px-4 md:px-[140px]" style={{ zIndex: 1200 }}>
          {/* Mobile Products Carousel */}
          <div className="md:hidden flex flex-col w-full max-w-sm mx-auto relative">
            <h2 className="font-[Inter Tight] text-[32px] leading-[120%] tracmking-0 px-[4.44%] mb-8">Products</h2>

            {/* Carousel Track */}
            <div
              ref={productsCarouselRef}
              className="flex overflow-x-scroll snap-x snap-mandatory pb-4 -mx-4 px-4 hide-scrollbar"
            >
              {/* Drinking Water Station */}
              <Link
                href="/product-category/drinking-water-stations"
                className="flex-shrink-0 snap-center w-full flex flex-col items-center bg-[#f2f2f2] md:bg-white rounded-lg p-4"
              >
                <div className="relative w-full h-[224px]">
                      <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/cb5b28fb-e10e-41fb-f579-31168d065400/public"
                    alt="Drinking Water Station"
                    fill
                    className="object-cover"
                  />
                  </div>
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
                  Drinking Water Station
                    </span>
                </Link>

              {/* Water Dispenser */}
              <Link
                href="/product-category/water-dispenser"
                className="flex-shrink-0 snap-center w-full flex flex-col items-center bg-[#f2f2f2] md:bg-white rounded-lg p-4"
              >
                <div className="relative w-full h-[224px]">
                <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/3effd7ed-3da5-4efa-d6a6-f359ccf5a900/public"
                  alt="Water Dispenser"
                    fill
                    className="object-cover"
                  />
                    </div>
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
                  Water Dispenser
                    </span>
                </Link>

              {/* Drinking Water Faucets */}
              <Link
                href="/product-category/drinking-water-faucets"
                className="flex-shrink-0 snap-center w-full flex flex-col items-center bg-[#f2f2f2] md:bg-white rounded-lg p-4"
              >
                <div className="relative w-full h-[224px]">
                <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b7cebb58-40fb-413c-aee2-8e1f2a115400/public"
                    alt="Drinking Water Faucets"
                    fill
                    className="object-cover"
                  />
                    </div>
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
                  Drinking Water Faucets
                    </span>
                </Link>

              {/* Water Cooler & Fountains */}
              <Link
                href="/product-category/water-coolers-fountains"
                className="flex-shrink-0 snap-center w-full flex flex-col items-center bg-[#f2f2f2] md:bg-white rounded-lg p-4"
              >
                <div className="relative w-full h-[224px]">
                <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/5e5ece3c-611b-48c9-9e44-6e500681f000/public"
                    alt="Water Cooler & Fountains"
                    fill
                    className="object-cover"
                  />
                    </div>
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
                  Water Cooler & Fountains
                    </span>
                </Link>

              {/* Commercial/Industrial Plants */}
                <Link
                href="/product-category/commercial-industrial-plants"
                className="flex-shrink-0 snap-center w-full flex flex-col items-center bg-[#f2f2f2] md:bg-white rounded-lg p-4"
                >
                <div className="relative w-full h-[224px]">
                  <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b472f793-efd0-4176-da60-6de183f5c300/public"
                    alt="Commercial/Industrial Plants"
                    fill
                    className="object-cover"
                  />
                </div>
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
                  Commercial/Industrial Plants
                  </span>
                </Link>
            </div>

            {/* Navigation Arrows */}
            {showProductsLeftArrow && (
              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 ml-[6%] md:ml-4 bg-transparent hover:bg-white/10 rounded-full transition-all duration-300 flex items-center justify-center"
                onClick={() => scrollProductsCarousel('left')}
                aria-label="Previous slide"
              >
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/65c77dc9-8867-4c14-2e26-180c14b84e00/public"
                  alt="Left Arrow"
                  width={40}
                  height={40}
                  className="transform hover:scale-110 transition-transform duration-300"
                />
              </button>
            )}
            {showProductsRightArrow && (
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 mr-[6%] md:mr-4 bg-transparent hover:bg-white/10 rounded-full transition-all duration-300 flex items-center justify-center"
                onClick={() => scrollProductsCarousel('right')}
                aria-label="Next slide"
              >
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/58b7fb95-62e5-4cc5-5dc1-d798af2bdf00/public"
                  alt="Right Arrow"
                  width={40}
                  height={40}
                  className="transform hover:scale-110 transition-transform duration-300"
                />
              </button>
            )}
          </div>

          {/* Desktop Products Grid */}
          <table className="product-grid hidden md:table">
            {/* ... existing desktop table code ... */}
          </table>
        </div>

        {/* Solution Section */}
        <div className="relative bg-[#f2f2f2] md:bg-white flex items-center justify-center py-[60px] md:py-[140px] px-4 md:px-[140px]" style={{ zIndex: 1200 }}>
          {/* Mobile Solutions Carousel */}
          <div className="md:hidden flex flex-col w-full max-w-sm mx-auto relative">
            <h2 className="font-[Inter Tight] text-[32px] leading-[120%] tracmking-0 px-[4.44%] mb-8">Solutions</h2>
            {/* Carousel Track */}
            <div
              ref={carouselRef}
              className="flex overflow-x-scroll snap-x snap-mandatory pb-4 -mx-4 px-4 hide-scrollbar"
            >
              {/* Water Reuse */}
              <Link
                href="/water-reuse"
                className="flex-shrink-0 snap-center w-full flex flex-col items-center bg-[#f2f2f2] md:bg-white rounded-lg p-4"
              >
                <div className="relative w-full h-[224px]">
                      <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4b59b030-d423-4eb7-b043-0ced41d9e400/public"
                    alt="Water Reuse"
                    fill
                    className="object-cover"
                  />
                  </div>
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
                  Water Reuse
                    </span>
                </Link>
              {/* Water Treatment */}
              <Link
                href="/water-treatment"
                className="flex-shrink-0 snap-center w-full flex flex-col items-center bg-[#f2f2f2] md:bg-white rounded-lg p-4"
              >
                <div className="relative w-full h-[224px]">
                <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/f1d2bd75-8fdf-4add-5daa-4aff9ba71300/public"
                    alt="Water Treatment"
                    fill
                    className="object-cover"
                  />
                    </div>
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
                  Water Treatment
                    </span>
                </Link>
              {/* Water as a Service */}
                <Link
                href="/water-as-a-service"
                className="flex-shrink-0 snap-center w-full flex flex-col items-center bg-[#f2f2f2] md:bg-white rounded-lg p-4"
                >
                <div className="relative w-full h-[224px]">
                  <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/10031863-ef19-4dc7-bde9-11555b439200/public"
                    alt="Water as a Service"
                    fill
                    className="object-cover"
                  />
                </div>
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
                  Water as a Service
                  </span>
                </Link>
            </div>
            {/* Navigation Arrows */}
            {showLeftArrow && (
              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 ml-[6%] md:ml-4 bg-transparent hover:bg-white/10 rounded-full transition-all duration-300 flex items-center justify-center"
                onClick={() => scrollCarousel('left')}
                aria-label="Previous slide"
              >
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/65c77dc9-8867-4c14-2e26-180c14b84e00/public"
                  alt="Left Arrow"
                  width={40}
                  height={40}
                  className="transform hover:scale-110 transition-transform duration-300"
                />
              </button>
            )}
            {showRightArrow && (
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 mr-[6%] md:mr-4 bg-transparent hover:bg-white/10 rounded-full transition-all duration-300 flex items-center justify-center"
                onClick={() => scrollCarousel('right')}
                aria-label="Next slide"
              >
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/58b7fb95-62e5-4cc5-5dc1-d798af2bdf00/public"
                  alt="Right Arrow"
                  width={40}
                  height={40}
                  className="transform hover:scale-110 transition-transform duration-300"
                />
              </button>
            )}
          </div>
          {/* Desktop Solutions Grid */}
          <table className="solutions-grid hidden md:table">
            {/* ... existing desktop table code ... */}
          </table>
        </div>

        {/* Made in India Section - Mobile Only */}
        <div className="md:hidden mt-8">
                  <h2
                    className="w-full inline-block text-[32px] leading-[110%] text-center px-auto pb-[40px] md:text-[58px] md:leading-[110%]"
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 500,
                    color: "#000",
                  }}
                >
                  Make In India
                </h2>
          <div className="relative w-full h-[133px]">
            <Image
              src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/65e95d19-5da4-472d-67c7-755dd69be700/public"
              alt="Make In India"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* wrapping these in a div to get them to overlap the sticky logo */}
        <div className="bg-[#f2f2f2]" style={{ position: "relative", zIndex: 1200, borderRadius: "0" }}>
          {/* Make in INDIA Section */}
          <section className="pt-[20px] flex items-center justify-center relative px-8 md:px-[9.72%]">
            <motion.div className="w-full max-w-screen-xl">
              <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between h-[115px]">
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                  
                <div className="relative w-full h-auto md:w-[432px] md:h-[229px]" style={{ zIndex: 1200 }}>
                  <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/65e95d19-5da4-472d-67c7-755dd69be700/public"
                    alt="Make In India"
                    fill
                    className="object-contain md:pl-[-2.875%] md:pr-[9.725%] md:pb-[25px]"
                  />
                </div>
              </div>
                <div className="flex flex-col w-full md:w-64 items-center lg:items-start text-center lg:text-left">
                  <p className="w-full font-[Inter Tight] font-medium text-[10px] leading-[130%] mb-[40px] md:w-[270px] md:text-[12px] md:leading-[110%] md:mb-0 text-black/60">
                  WAE captures the heart of Indian innovation by seamlessly blending the 
                  time-honoured ideals with the latest technology. We are driven by the 
                  mission to build a brand that not only saves the planet but also creates a 
                  potent impact on future generations for the country's advancements, 
                  integrity & innovation. Our approach strengthens community resilience 
                  while showcasing India's intellectual capital on the world stage.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Sustainability Section */}
          <section className="flex items-center justify-center relative px-8 pt-20 md:py-0 md:px-[9.72%]">
            <motion.div className="w-full max-w-screen-xl flex flex-col lg:flex-row justify-between items-center lg:items-start text-center lg:text-left">
              <h2
                className="inline-block text-[32px] leading-[110%] mb-[40px] md:text-[58px] md:leading-[110%]"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  color: "#000",
                }}
              >
                Sustainability
              </h2>
              <div className="flex flex-col gap-8 md:gap-20 items-center lg:items-start">
                {/* Statistic 1 */}
                <div className="flex flex-col items-center lg:items-start">
                  <p className="font-[Inter Tight] font-bold text-[32px] leading-[140%] uppercase md:text-2xl md:font-normal md:leading-snug">
                    1,012,120.25
                  </p>
                  <div className="w-full px-[4.44%] my-3 md:hidden">
                    <div className="w-full h-[1px] bg-black/20"></div>
                  </div>
                  <p className="font-[Inter Tight] font-normal text-[12px] leading-[24px] md:text-xs md:leading-wide text-black/70 tracking-wide">
                    TONNES CO2 EMISSIONS SAVED
                  </p>
                </div>
                {/* Statistic 2 */}
                <div className="flex flex-col items-center lg:items-start">
                  <p className="font-[Inter Tight] font-bold text-[32px] leading-[140%] uppercase md:text-2xl md:font-normal md:leading-snug">
                    12,185.4325
                  </p>
                  <div className="w-full px-[4.44%] my-3 md:hidden">
                    <div className="w-full h-[1px] bg-black/20"></div>
                  </div>
                  <p className="font-[Inter Tight] font-normal text-[12px] leading-[24px] md:text-xs md:leading-wide text-black/70 tracking-wide">
                    MILLION GALLONS WATER SAVED
                  </p>
                </div>
                {/* Statistic 3 */}
                <div className="flex flex-col mb-[40px] md:mb-0 items-center lg:items-start">
                  <p className="font-[Inter Tight] font-bold text-[32px] leading-[140%] uppercase md:text-2xl md:font-normal md:leading-snug">
                    22,253.65
                  </p>
                  <div className="w-full px-[4.44%] my-3 md:hidden">
                    <div className="w-full h-[1px] bg-black/20"></div>
                  </div>
                  <p className="font-[Inter Tight] font-normal text-[12px] leading-[24px] md:text-xs md:leading-wide text-black/70 tracking-wide">
                    TONNES PLASTIC REMOVED
                  </p>
                  <Link href="/sustainability" className="mt-6 md:mt-10">
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
          className="max-w-full px-[4.44%] py-[60px] md:px-[8.75rem] md:py-[120px] bg-[#f2f2f2]" // px-4 (16px left/right) for mobile
          style={{ position: "relative", zIndex: 1200, borderRadius: "0" }}
        >
          <h2 className="font-helvetica font-normal text-[32px] leading-[110%] mb-[40px] md:text-[3.625rem] md:leading-[110%] md:mb-[2.5rem]"> {/* Adjusted for explicit mobile font size (32px) and gap (40px) */}
            Blogs
          </h2>
          {/* Main carousel container: flex, scroll, snap, and gap */}
          <div className="relative"> {/* Added relative positioning for arrow buttons */}
            <div 
              ref={blogsCarouselRef}
              className="flex flex-col gap-8 md:grid md:grid-cols-4 md:gap-8"
              style={{ position: 'relative', zIndex: 1 }}
            >
              {/* Water Conservation */}
              <div className="w-full bg-[#f2f2f2] rounded-lg overflow-hidden shadow-sm">
                <div className="relative w-full h-[125px]">
                  <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/1de1d21f-1dec-4cc3-8720-f73efae23400/public"
                    alt="Water Conservation"
                    fill
                    className="object-cover grayscale"
                />
              </div>
                <div className="py-6">
                  <h3 className="font-[Inter_Tight] font-bold text-[18px] leading-[140%] uppercase align-middle">Water Conservation</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Information regarding awards received by the Hitachi Group in various fields and related announcements.
                  </p>
              </div>
              </div>

              {/* Policy */}
              <div className="w-full bg-[#f2f2f2] rounded-lg overflow-hidden shadow-sm">
                <div className="relative w-full h-[125px]">
                  <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/8d76afb3-cd7f-4723-33df-bbabf4cbc900/public"
                    alt="Policy"
                    fill
                    className="object-cover grayscale"
                />
              </div>
                <div className="py-6">
                  <h3 className="font-[Inter_Tight] font-bold text-[18px] leading-[140%] uppercase align-middle">Policy</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Information regarding awards received by the Hitachi Group in various fields and related announcements.
                  </p>
              </div>
            </div>

              {/* Climate Change & Water */}
              <div className="w-full bg-[#f2f2f2] rounded-lg overflow-hidden shadow-sm">
                <div className="relative w-full h-[125px]">
                  <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/022af5b3-ff4f-4da2-59f8-91dcf8a99700/public"
                    alt="Climate Change & Water"
                    fill
                    className="object-cover grayscale"
                  />
                </div>
                <div className="py-6">
                  <h3 className="font-[Inter_Tight] font-bold text-[18px] leading-[140%] uppercase align-middle">Climate Change & Water</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Information regarding awards received by the Hitachi Group in various fields and related announcements.
                  </p>
                </div>
              </div>

              {/* Industry Impacts and Solutions */}
              <div className="w-full bg-[#f2f2f2] rounded-lg overflow-hidden shadow-sm">
                <div className="relative w-full h-[125px]">
                  <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/57ca2c2e-56ee-484e-2d71-21e2e5fa4a00/public"
                    alt="Industry Impacts and Solutions"
                    fill
                    className="object-cover"
                  />
            </div>
                <div className="py-6">
                  <h3 className="font-[Inter_Tight] font-bold text-[18px] leading-[140%] uppercase align-middle">Industry Impacts and Solutions</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Information regarding awards received by the Hitachi Group in various fields and related announcements.
                  </p>
                </div>
              </div>
            </div>

            {/* Remove mobile navigation arrows since we're using stacked layout */}
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
      `}</style>
    </main>
  );
};

export default Home;