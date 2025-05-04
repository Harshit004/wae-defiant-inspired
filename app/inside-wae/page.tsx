"use client";

import { FC, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Footer from "@/components/footer";
import Link from "next/link";

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
  const productsItems = [
    { text: "This Is Us", href: "/inside-wae" },
    { text: "Our Portfolio", href: "/our-portfolio" },
    { text: "Reimagine Work", href: "/careers" },
  ];
  const blueprintItems = [
    { text: "Sustainability", href: "#" },
    { text: "The Activist Co.", href: "/the-activist-co" },
    { text: "Blog", href: "/blogs2" },
  ];
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

  // ULTRA-SMOOTH SCROLL INERTIA EFFECT
useEffect(() => {
  let lastScrollY = window.scrollY;
  let lastTimestamp = performance.now();
  let velocity = 0;
  let inertiaFrame: number | null = null;
  let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
  let isScrolling = false;
  const velocityReadings: number[] = [];
  const DISTANCE_MULTIPLIER = 2.5;

  const onScroll = () => {
    if (scrollTimeout) clearTimeout(scrollTimeout);

    const now = performance.now();
    const currentY = window.scrollY;
    const deltaTime = now - lastTimestamp;

    if (deltaTime > 5) {
      const newV = (currentY - lastScrollY) / deltaTime;
      velocityReadings.push(newV);
      if (velocityReadings.length > 6) velocityReadings.shift();

      // weighted average
      let wSum = 0, weightSum = 0;
      velocityReadings.forEach((v, i) => {
        const w = Math.pow(2, i);
        wSum += v * w;
        weightSum += w;
      });
      velocity = weightSum ? wSum / weightSum : 0;
    }

    lastScrollY = currentY;
    lastTimestamp = now;
    isScrolling = true;

    scrollTimeout = setTimeout(() => {
      isScrolling = false;
      velocity *= DISTANCE_MULTIPLIER;
      startInertia();
    }, 50);
  };

  const startInertia = () => {
    if (inertiaFrame !== null) cancelAnimationFrame(inertiaFrame);
    if (Math.abs(velocity) < 0.01) return;

    const initialV = velocity;
    const startTime = performance.now();
    const duration = 2800; // Let's try a slightly longer duration
    let lastV = initialV;
    let lastFrameTime = startTime;

    // Easing function (Cubic Bezier - you can experiment with different values)
    const easeOutCubic = (t: number) => (--t) * t * t + 1;

    const animate = (t: number) => {
      if (isScrolling) return;
      const elapsed = t - startTime;
      const progress = Math.min(elapsed / duration, 1);
      lastFrameTime = t;

      const easedProgress = easeOutCubic(progress); // Apply easing to the progress

      // Combine friction and easing to control velocity
      const friction = Math.pow(1 - progress, 2);
      const velocityFactor = 1 - easedProgress; // Velocity decreases as easedProgress increases

      lastV = lastV * (0.9 + 0.1 * velocityFactor) + initialV * friction * 0.02; // Adjusted velocity update
      const delta = lastV * (t - lastFrameTime);

      window.scrollBy(0, delta);

      if (progress < 1 && Math.abs(lastV) > 0.000001) {
        inertiaFrame = requestAnimationFrame(animate);
      }
    };

    inertiaFrame = requestAnimationFrame(animate);
  };

  window.addEventListener("scroll", onScroll, { passive: true });

  return () => {
    window.removeEventListener("scroll", onScroll);
    if (inertiaFrame !== null) cancelAnimationFrame(inertiaFrame);
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
              <div>
                <Link href="#">IDENTITY</Link>
              </div>
              <div>
                <Link href="#">ORIGIN</Link>
              </div>
              <div>
                <Link href="#">OBJECTIVE</Link>
              </div>
              <div>
                <Link href="#">INSIDE WAE</Link>
              </div>
              <div>
                <Link href="#">ETCETERA</Link>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[#D9D9DC] mb-[10px]" />

            {/* Bottom Row: Logo, Coordinates, Tagline and Menu Items */}
            <div className="grid grid-cols-5 items-start">
              {/* Logo */}

<div className="flex flex-col justify-center">

  <Link href="/homepage3" passHref>

    <Image

      src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/34074342-7005-4a25-9763-86933d6e7700/public"

      alt="WAE Logo"

      width={78}

      height={82}

      style={{ cursor: 'pointer' }}

    />

  </Link>

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
                    <Link href={item.href} className="contents">
                      <div className="c--anim-btn">
                        <div className="text-container">
                          <span className="c-anim-btn">{item.text}</span>
                          <span className="block">{item.text}</span>
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
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 500,
                      fontSize: "12px",
                      lineHeight: "100%",
                    }}
                  >
                    <Link href={item.href} className="contents">
                      <div className="c--anim-btn">
                        <div className="text-container">
                          <span className="c-anim-btn">{item.text}</span>
                          <span className="block">{item.text}</span>
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nunc purus, posuere in placerat a, porttitor ac est. Proin nec maximus lectus, ac varius massa.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Vision and Mission Section */}
        <section className="flex items-end justify-center relative mb-[300px] px-[9.72%]">
          <motion.div className="w-full">
            <div className="flex flex-col lg:flex-row items-start justify-between">
              <h2 className="font-[Inter Tight] font-medium text-4xl lg:text-6xl leading-tight">
                Vision and<br />Mission
              </h2>
              <div className="flex flex-col gap-10 w-64">
                <p className="w-[270px] font-[Inter Tight] text-[12px] leading-[110%] text-black/70">
                  Life at WAE is vibrant and inspiring. Our culture is a tapestry of collaboration, inclusivity, and continuous learning. Here, your professional growth is as important as your personal well-being. Enjoy a work environment that fosters creativity, supports balance, and celebrates every success. At WAE, your journey is our story.
                </p>
                <Link href="/vision-mission" className="contents">
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

        {/* People & Culture Section */}
        <section className="flex items-end justify-center relative mb-[300px] px-[9.72%]">
          <motion.div className="w-full">
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
                <Link href="/people-culture" className="contents">
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
                          <motion.div>
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

        {/* Leadership Team Section */}
        <section className="flex items-end justify-center relative mb-[300px] px-[9.72%]">
          <motion.div className="w-full">
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
                <Link href="/leadership" className="contents">
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
                          <motion.div>
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

        {/* Sustainability Section */}
        <section className="flex items-end justify-center relative px-[9.72%] mb-[55px]">
          <motion.div className="w-full ">
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
                <Link href="/sustainability" className="contents">
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
                          <motion.div>
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
        .contents {
          display: contents; /* Prevent Link from interfering with button styles */
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