"use client";

import { FC, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Footer from "@/components/footer";

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
        fontFamily: "'Inter Tight', sans-serif",
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
  const [currentTime, setCurrentTime] = useState<string>("");
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const [heroRef, heroInView] = useInView({ threshold: 0.5 });
  const [taglineVisible, setTaglineVisible] = useState<boolean>(true);
  const prevScrollY = useRef<number>(0);
  const [headerHeroScale, setHeaderHeroScale] = useState<number>(1);
  const headerHeroRef = useRef<HTMLDivElement>(null);

  // (Existing) Update tagline visibility on scroll
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setTaglineVisible(currentScrollY < prevScrollY.current);
          prevScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // (Existing) Update current time (India Time) every minute
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

  // (Existing) Set active section when hero is in view
  useEffect(() => {
    if (heroInView) setActiveSection(0);
  }, [heroInView]);

  // (Existing) Measure header height to offset hero section and update on window resize
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.clientHeight);
      }
    };
    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

  // (Existing) Scroll-driven header/hero scaling effect
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (headerHeroRef.current) {
            const scrollPosition = window.scrollY;
            const viewportHeight = window.innerHeight;
            const maxScroll = viewportHeight * 0.8;
            const minScale = 0;
            if (scrollPosition <= 100) {
              setHeaderHeroScale(1);
            } else if (scrollPosition >= maxScroll) {
              setHeaderHeroScale(minScale);
            } else {
              const scrollRange = maxScroll - 100;
              const scrollProgress = (scrollPosition - 100) / scrollRange;
              setHeaderHeroScale(1 - scrollProgress);
            }
            ticking = false;
          }
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // (Existing) Framer Motion scroll-driven animations
  const { scrollYProgress } = useScroll();
  const logoOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 1]);
  const purposeY = useTransform(scrollYProgress, [0.05, 0.25], ["100%", "0%"]);
  const purposeOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);
  const purposeVanish = useTransform(scrollYProgress, [0.25, 0.35], [1, 0]);
  const finalPurposeOpacity = useTransform(
    [purposeOpacity, purposeVanish],
    ([pO, pV]) => pO * pV
  );
  const indiaY = useTransform(scrollYProgress, [0.35, 0.55], ["100%", "0%"]);
  const indiaOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  const indiaVanish = useTransform(scrollYProgress, [0.55, 0.65], [1, 0]);
  const finalIndiaOpacity = useTransform(
    [indiaOpacity, indiaVanish],
    ([iO, iV]) => iO * iV
  );

  // Menu items arrays and tagline words (for animation if needed)
  const productsItems = ["This Is Us", "Our Portfolio", "Reimagine Work"];
  const blueprintItems = ["Sustainability", "The Activist Co.", "Blog"];
  const taglineLine1 = "To lead the way in sustainability";
  const taglineLine2 = "ahead of the rest";
  const taglineWords1 = taglineLine1.split(" ");
  const taglineWords2 = taglineLine2.split(" ");

  // Framer Motion animation variants (if used elsewhere)
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.05, ease: "easeInOut" },
    },
  };
  const childVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { ease: "easeInOut", duration: 1 } },
  };

  // ENHANCED: Ultra-smooth scroll inertia with 1.8x distance and extremely gradual ending
    useEffect(() => {
      let lastScrollY = window.scrollY;
      let lastTimestamp = performance.now();
      let velocity = 0;
      let inertiaFrame: number;
      let scrollTimeout: NodeJS.Timeout;
      let isScrolling = false;
      let velocityReadings: number[] = [];
      
      // Distance multiplier - this controls how far the page scrolls after user stops
      const DISTANCE_MULTIPLIER = 2.5;

      const onScroll = () => {
        // Clear any existing timeout to reset the timer
        if (scrollTimeout) clearTimeout(scrollTimeout);
        
        const now = performance.now();
        const currentScrollY = window.scrollY;
        const deltaTime = now - lastTimestamp;
        
        // Calculate velocity with improved smoothing
        if (deltaTime > 5) {
          const newVelocity = (currentScrollY - lastScrollY) / deltaTime;
          
          // Store recent velocity readings for better average
          velocityReadings.push(newVelocity);
          if (velocityReadings.length > 6) {
            velocityReadings.shift(); // Keep only the most recent 6 readings
          }
          
          // Calculate a weighted average of recent velocities
          let weightedSum = 0;
          let weightSum = 0;
          velocityReadings.forEach((v, i) => {
            // Exponential weighting for even smoother transitions
            const weight = Math.pow(2, i); // Exponential weights: 1, 2, 4, 8, 16, 32
            weightedSum += v * weight;
            weightSum += weight;
          });
          
          velocity = weightSum > 0 ? weightedSum / weightSum : 0;
        }
        
        lastScrollY = currentScrollY;
        lastTimestamp = now;
        isScrolling = true;
        
        // Reset the detection timeout
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
          
          // Apply the distance multiplier to the final velocity to achieve 1.8x distance
          velocity *= DISTANCE_MULTIPLIER;
          
          startInertia();
        }, 50);
      };

      const startInertia = () => {
        // Cancel any existing animation
        if (inertiaFrame) cancelAnimationFrame(inertiaFrame);
        
        // Skip inertia if velocity is too low
        if (Math.abs(velocity) < 0.01) return;
        
        // Store initial values for the animation
        const initialVelocity = velocity;
        const startTime = performance.now();
        const duration = 2000; // Extended duration for ultra-smooth ending
        
        let lastFrameTime = startTime;
        let lastVelocity = initialVelocity; // Track the last velocity for smoothing
        
        const animate = (timestamp: number) => {
          // Exit if user has started scrolling again
          if (isScrolling) return;
          
          const elapsed = timestamp - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const frameTime = timestamp - lastFrameTime;
          lastFrameTime = timestamp;
          
          // Ultra-smooth deceleration curve - extremely gradual at the end
          // This custom curve is very gentle, especially in the final 30%
          let frictionCurve;
          
          if (progress < 0.7) {
            // First 70%: Standard smooth curve
            frictionCurve = Math.pow(1 - progress, 2.2);
          } else {
            // Final 30%: Extra gentle curve with logarithmic tail
            // This creates an extremely gradual fadeout
            const endProgress = (progress - 0.7) / 0.3; // Normalize 0.7-1.0 to 0-1
            const baseDeceleration = Math.pow(1 - progress, 2.2);
            const gentleTail = 0.3 * Math.pow(1 - endProgress, 3); // Very gentle tail
            frictionCurve = baseDeceleration + gentleTail;
          }
          
          // Calculate target velocity using our custom friction curve
          let targetVelocity = initialVelocity * frictionCurve;
          
          // Apply secondary smoothing to velocity changes for even smoother transitions
          // This prevents any sudden changes in acceleration
          lastVelocity = lastVelocity * 0.85 + targetVelocity * 0.15;
          
          // Calculate scroll amount for this frame
          const scrollAmount = lastVelocity * frameTime;
          
          // Apply the scroll
          window.scrollBy(0, scrollAmount);
          
          // Continue animation if not finished and still has meaningful velocity
          // Extremely low threshold for ultra-smooth ending
          if (progress < 1 && Math.abs(lastVelocity) > 0.0005) {
            inertiaFrame = requestAnimationFrame(animate);
          } else if (Math.abs(lastVelocity) > 0.0005) {
            // If we've reached the end of our duration but still have velocity,
            // continue with a final fadeout phase
            const finalFadeout = () => {
              if (isScrolling) return;
              
              const now = performance.now();
              const frameTime = now - lastFrameTime;
              lastFrameTime = now;
              
              // Reduce velocity very gradually
              lastVelocity *= 0.95;
              
              const scrollAmount = lastVelocity * frameTime;
              window.scrollBy(0, scrollAmount);
              
              if (Math.abs(lastVelocity) > 0.0001) {
                inertiaFrame = requestAnimationFrame(finalFadeout);
              }
            };
            
            inertiaFrame = requestAnimationFrame(finalFadeout);
          }
        };
        
        inertiaFrame = requestAnimationFrame(animate);
      };

      // Add passive listener for better performance
      window.addEventListener("scroll", onScroll, { passive: true });
      
      return () => {
        window.removeEventListener("scroll", onScroll);
        if (inertiaFrame) cancelAnimationFrame(inertiaFrame);
        if (scrollTimeout) clearTimeout(scrollTimeout);
      };
    }, []);

  return (
    <main className="relative">
      {/* HEADER AND HERO SECTION */}
      <div ref={headerHeroRef} className="fixed top-0 left-0 w-full z-0">
        <header ref={headerRef} className="w-full bg-[#f2f2f2] relative z-10 mb-[20px]">
          <div className="mx-auto w-full max-w-[1440px] px-[9.72%]">
            {/* Top Row: Navigation */}
            <div
              className="grid grid-cols-5 items-center pt-[30px] pb-[10px] uppercase"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "12px",
                lineHeight: "100%",
                letterSpacing: "0px",
              }}
            >
              <div>IDENTITY</div>
              <div>ORIGIN</div>
              <div>OBJECTIVE</div>
              <div>INSIDE WAE</div>
              <div>ETCETERA</div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[#D9D9DC] mb-[10px]" />

            {/* Bottom Row: Logo, Coordinates, Tagline and Menu Items */}
            <div className="grid grid-cols-5 items-start">
              {/* Logo */}
              <div className="flex flex-col justify-center">
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/34074342-7005-4a25-9763-86933d6e7700/public"
                  alt="WAE Logo"
                  width={78}
                  height={82}
                />
              </div>

              {/* Coordinates */}
              <div
                className="flex flex-col justify-center inline-block mr-1"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  lineHeight: "100%",
                  color: "#00000066",
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
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  lineHeight: "100%",
                  color: "#00000066",
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
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 500,
                      fontSize: "12px",
                      lineHeight: "100%",
                    }}
                  >
                    <div className="c--anim-btn">
                      <div className="text-container">
                        <span className="c-anim-btn">{item}</span>
                        <span className="block">{item}</span>
                      </div>
                      <span className="menu-arrow">
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
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 500,
                      fontSize: "12px",
                      lineHeight: "100%",
                    }}
                  >
                    <div className="c--anim-btn">
                      <div className="text-container">
                        <span className="c-anim-btn">{item}</span>
                        <span className="block">{item}</span>
                      </div>
                      <span className="menu-arrow blueprint-arrow">
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
        >
          <video
            src="/3f6940f6f51b6c16ee6d8104dc1d4344a4633a81.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Replacing the text with the provided image */}
          <div
            className="absolute"
            style={{
              bottom: "30%",
              right: "3.473%",
              width: "393px",
              height: "159px",
            }}
          >
            <Image
              src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/baae1906-6288-4ad1-dac7-226c1109fb00/public"
              alt="Disrupting the status quo"
              width={393}
              height={159}
              className="object-contain"
            />
          </div>
          <div
            className="absolute"
            style={{
              bottom: "33%",
              left: "4.16666%",
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontSize: "48px",
              lineHeight: "110%",
              color: "#fff",
            }}
          >
            This Is Us
          </div>
          <div
            className="absolute uppercase"
            style={{
              bottom: "30%",
              left: "4.16666%",
              width: "104px",
              height: "12px",
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontSize: "10px",
              lineHeight: "100%",
              color: "#fff",
            }}
          >
            Scroll for more ⤵︎
          </div>
        </section>
      </div>

      {/* SCROLL-DRIVEN CONTAINER */}
      <motion.div
        className="relative bg-[#F2F2F2] mt-screen"
        style={{ marginTop: "100vh" }}
      >
        {/* Sticky Logo Overlay */}
        <motion.div
          style={{ position: "sticky", top: "5%", zIndex: 1100, opacity: logoOpacity }}
          className="pointer-events-none flex justify-center pt-[180px]"
        >
          <div className="max-w-[19.375rem] max-h-[19.375rem]">
            <Image
              src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/9626af87-4cf5-4192-397c-3f4284787400/public"
              alt="Center Logo"
              width={250}
              height={250}
              className="opacity-80"
            />
          </div>
        </motion.div>

        {/* About WAE Section */}
        <section className="flex items-end justify-center relative mb-[250px]">
          <motion.div
            initial={{ y: "50%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-screen-xl mx-8 lg:mx-36 mb-20"
          >
            <div className="flex flex-col lg:flex-row items-start justify-between">
              <h2 className="font-[Inter Tight] font-normal text-4xl lg:text-6xl leading-tight">About WAE</h2>
              <div className="flex flex-col gap-5 w-64">
                <p className="w-[290px] font-[Inter Tight] text-[12px] leading-[110%] text-black/70">
                  WAE captures the heart of Indian innovation by seamlessly blending the time-honoured ideals with the latest technology. We are driven by the mission to build a brand that not only saves the planet but also creates a potent impact on future generations for the country’s advancements, integrity & innovation. Our approach strengthens community resilience while showcasing India’s Intellectual capital on the world stage.
                </p>
                <p className="w-[290px] font-[Inter Tight] text-[12px] leading-[110%] text-black/70">
                  WAE captures the heart of Indian innovation by seamlessly blending the time-honoured ideals with the latest technology. We are driven by the mission to build a brand that not only saves the planet but also creates a potent impact on future generations for the country’s advancements, integrity & innovation. Our approach strengthens community resilience while showcasing India’s Intellectual capital on the world stage.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Vision and Mission Section */}
        <section className="flex items-end justify-center relative mb-[300px]">
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full max-w-screen-xl mx-8 lg:mx-36 mb-20"
          >
            <div className="flex flex-col lg:flex-row items-start justify-between">
              <h2 className="font-[Inter Tight] font-medium text-4xl lg:text-6xl leading-tight">
                Vision and<br />Mission
              </h2>
              <div className="flex flex-col gap-10 w-64">
                <p className="w-[270px] font-[Inter Tight] text-[12px] leading-[110%] text-black/70">
                  Life at WAE is vibrant and inspiring. Our culture is a tapestry of collaboration, inclusivity, and continuous learning. Here, your professional growth is as important as your personal well-being. Enjoy a work environment that fosters creativity, supports balance, and celebrates every success. At WAE, your journey is our story.
                </p>
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
              </div>
            </div>
          </motion.div>
        </section>

        {/* People & Culture Section */}
        <section className="flex items-end justify-center relative mb-[300px] px-[9.72%]">
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full max-w-screen-xl mb-20"
          >
            <div className="flex flex-col lg:flex-row items-start justify-between h-[115px]">
              <div className="flex flex-col gap-5 items-start">
                <h2 className="inline-block font-[Inter Tight] font-medium text-[58px] leading-[1.1] w-[23.5%] whitespace-nowrap">
                  People and<br />Culture
                </h2>
              </div>
              <div className="flex flex-col gap-5 w-64">
                <p className="w-[270px] font-[Inter Tight] text-[12px] leading-[110%] text-black/70">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nunc purus, posuere in placerat a, porttitor ac est. Proin nec maximus lectus, ac varius massa.
                </p>
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
              </div>
            </div>
          </motion.div>
        </section>

        {/* Leadership Team Section */}
        <section className="flex items-end justify-center relative mb-[300px] px-[9.72%]">
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full max-w-screen-xl mb-20"
          >
            <div className="flex flex-col lg:flex-row items-start justify-between h-[115px]">
              <div className="flex flex-col gap-5 items-start">
                <h2 className="inline-block font-[Inter Tight] font-medium text-[58px] leading-[1.1] w-[23.5%] whitespace-nowrap">
                  Leadership<br />Team
                </h2>
              </div>
              <div className="flex flex-col gap-5 w-64">
                <p className="w-[270px] font-[Inter Tight] text-[12px] leading-[110%] text-black/70">
                  Life at WAE is vibrant and inspiring. Our culture is a tapestry of collaboration, inclusivity, and continuous learning. Here, your professional growth is as important as your personal well-being. Enjoy a work environment that fosters creativity, supports balance, and celebrates every success. At WAE, your journey is our story.
                </p>
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
              </div>
            </div>
          </motion.div>
        </section>

        {/* Code of Conduct Section */}
        <section className="flex items-end justify-center relative mb-[300px] px-[9.72%]">
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full max-w-screen-xl mb-20"
          >
            <div className="flex flex-col lg:flex-row items-start justify-between h-[115px]">
              <div className="flex flex-col gap-5 items-start">
                <h2 className="inline-block font-[Inter Tight] font-medium text-[58px] leading-[1.1] w-[23.5%] whitespace-nowrap">
                  Code of<br />Conduct
                </h2>
              </div>
              <div className="flex flex-col gap-5 w-64">
                <p className="w-[270px] font-[Inter Tight] text-[12px] leading-[110%] text-black/70">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nunc purus, posuere in placerat a, porttitor ac est. Proin nec maximus lectus, ac varius massa.
                </p>
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
              </div>
            </div>
          </motion.div>
        </section>

        {/* Sustainability Section */}
        <section className="flex items-end justify-center relative px-[9.72%]">
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full max-w-screen-xl mb-20"
          >
            <div className="flex flex-col lg:flex-row items-start justify-between h-[115px]">
              <div className="flex flex-col gap-5 items-start">
                <h2 className="inline-block font-[Inter Tight] font-medium text-[58px] leading-[1.1] w-[23.5%] whitespace-nowrap">
                  Sustainability
                </h2>
              </div>
              <div className="flex flex-col gap-5 w-64">
                <p className="w-[270px] font-[Inter Tight] text-[12px] leading-[110%] text-black/70">
                  Life at WAE is vibrant and inspiring. Our culture is a tapestry of collaboration, inclusivity, and continuous learning. Here, your professional growth is as important as your personal well-being. Enjoy a work environment that fosters creativity, supports balance, and celebrates every success. At WAE, your journey is our story.
                </p>
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
              </div>
            </div>
          </motion.div>
        </section>

        {/* FOOTER SECTION */}
        <div style={{ position: "relative", zIndex: 1200 }}>
          <Footer />
        </div>
      </motion.div>

      {/* INLINE STYLES */}
      <style jsx>{`
        .product-grid {
          width: 1160px;
          height: 928px;
          border-collapse: collapse;
        }
        .product-title {
          font-family: "Inter Tight", sans-serif;
          font-weight: 500;
          font-size: 48px;
          line-height: 110%;
          letter-spacing: 0px;
          vertical-align: middle;
          text-align: center;
          width: calc(232px * 2);
          height: 232px;
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
          background-color: #f2f2f2;
          width: 232px;
          height: 232px;
          padding: 0px;
          box-sizing: border-box;
        }
        .placeholder-img {
          object-fit: cover;
        }
        .c--anim-btn {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .text-container {
          height: 12px;
          overflow: hidden;
        }
        .c-anim-btn {
          display: block;
          transition: margin-top 0.5s;
        }
        .c--anim-btn:hover .c-anim-btn {
          margin-top: -12px;
        }
        .menu-arrow {
          display: inline-block;
          opacity: 0;
          transform: translateX(-10px);
          transition: transform 0.5s ease, opacity 0.5s ease;
        }
        .c--anim-btn:hover .menu-arrow {
          transform: translateX(0);
          opacity: 1;
        }
        .blueprint-arrow {
          transform: rotate(-45deg) translateX(-10px);
        }
        .c--anim-btn:hover .blueprint-arrow {
          transform: rotate(-45deg) translateX(0);
          opacity: 1;
        }
      `}</style>

      {/* Global Styles */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </main>
  );
};

export default Home;
