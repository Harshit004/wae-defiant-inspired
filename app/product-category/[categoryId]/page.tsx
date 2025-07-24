"use client";

import { FC, useState, useEffect } from "react";
import Image from "next/image";
import Footer from "@/components/footer";
import RelatedCard from "@/components/related-card";
import Link from "next/link"; // Import the Link component
import ContactSection from "@/components/contact-section";
import { motion } from "framer-motion";
import { productCategories } from "@/data/product-categories";
import { notFound } from "next/navigation";
import ConnectWithUs from "@/components/connect-with-us";

// Shared container class for consistent margins and max-width
const containerClass = "mx-auto w-full px-[9.72%]"

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
        fontSize: "12px",
        lineHeight: "100%",
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

// --- MOBILE HEADER COMPONENT (Copied from our-products2) ---
interface MobileHeaderProps {
  productsItems: { text: string; href: string }[];
  blueprintItems: { text: string; href: string; }[];
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ productsItems, blueprintItems }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <div className="fixed top-0 left-0 w-screen z-50 pt-[20px] pb-[10px] px-4 flex justify-between items-center bg-transparent md:hidden">
        <Link href="/homepage3">
          <Image
            src={isMobileMenuOpen
              ? "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/34074342-7005-4a25-9763-86933d6e7700/public"
              : "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ce113ad4-0a6b-43dd-066c-26769520d000/public"
            }
            alt="WAE Logo Mobile"
            width={40}
            height={40}
          />
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex flex-col justify-center items-center w-8 h-8 relative z-50 focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          <span
            className={`block absolute h-0.5 w-6 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'bg-black' : 'bg-white'} ${isMobileMenuOpen ? 'rotate-45' : ''}`}
            style={{ top: '18px', left: '8px', transform: isMobileMenuOpen ? 'rotate(45deg)' : 'translateY(-4px)' }}
          ></span>
          <span
            className={`block absolute h-0.5 w-6 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'bg-black' : 'bg-white'} ${isMobileMenuOpen ? '-rotate-45' : ''}`}
            style={{ top: '18px', left: '8px', transform: isMobileMenuOpen ? 'rotate(-45deg)' : 'translateY(4px)' }}
          ></span>
        </button>
      </div>
      <div
        className={`fixed inset-0 bg-white z-40 flex flex-col pt-[80px] px-4 md:hidden transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ color: '#000' }}
      >
        <div className="w-full h-px bg-black/10 mt[8px] mb-[30px]" />
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

const Home: FC<{ params: { categoryId: string } }> = ({ params }) => {
  const [showMountingDropdown, setShowMountingDropdown] = useState(false);

  const category = productCategories[params.categoryId];
  if (!category) {
    notFound();
  }

  // Arrays for menu items
  const productsItems = [
    { text: "This is Us", href: "/inside-wae" },
    { text: "Our Portfolio", href: "/our-portfolio" },
    { text: "Reimagine Work", href: "/careers" },
  ];
  const blueprintItems = [
    { text: "Sustainability", href: "/sustainability" },
    { text: "The Activist Co.", href: "/the-activist-co" },
    { text: "Blog", href: "/blogs2" },
  ];

  return (
    <main className="relative pb-[40px]">
      {/* RENDER MOBILE HEADER COMPONENT HERE (only on small screens) */}
      <MobileHeader productsItems={productsItems} blueprintItems={blueprintItems} />

      {/* DESKTOP HEADER (Hidden on small screens) */}
      <header className={`w-full relative z-10 bg-[#fff] hidden md:block`}>
        <div className={containerClass}>
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

          {/* Bottom Row: Logo, Tagline and Menu Items */}
          <div className="grid grid-cols-5 items-start">
            {/* Logo */}
            <div className="flex flex-col justify-center">
              <Link href="/homepage3">
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
                fontFamily: "'Inter Tight', sans-serif",
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
                fontFamily: "'Inter Tight', sans-serif",
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
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 500,
                    fontSize: "11px",
                    lineHeight: "110%",
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
                    fontSize: "11px",
                    lineHeight: "110%",
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

      {/* Hero section */}
      <section
          id="hero"
          className="relative w-full overflow-hidden mb-[140px]"
        >
          {/* Dynamic Hero Video or Fallback Image */}
          {category.heroVideo ? (
            <video
              src={`/${category.heroVideo.replace(/^app\//, "")}`}
              autoPlay
              muted
              loop
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          ) : (
            <Image
              src={"https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/cad8ebce-9713-4fa1-bf99-25684ba4cb00/public"}
              alt={`Hero image for ${category.title}`}
              width={1440}
              height={656}
              className="object-cover w-full h-full"
            />
          )}

          {/*
          <div
            className="absolute"
            style={{
              bottom: "33%",
              left: "calc(4.16666%)",
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontSize: "48px",
              lineHeight: "110%",
              color: "#fff",
            }}
          >
            {category.title}
          </div>
          <div
            className="absolute uppercase"
            style={{
              bottom: "30%",
              left: "calc(4.16666%)",
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
          */}
        </section>

      {/* Product Category overview SECTION */}
      <section className="mx-[9.72%] my-[9.72%] flex md:justify-between items-start">
        {/* Left Side - Heading */}
        <div className="md:w-[31.8%]">
          <h2 className="font-inter-tight font-medium text-4xl leading-[110%] tracking-normal align-middle">
            {category.subtitle}
          </h2>
        </div>

        {/* Right Side - Paragraphs */}
        <div className="mt-8 md:mt-0 md:w-[37.7%]">
          {category.description.map((paragraph, index) => (
            <p 
              key={index}
              className="font-inter-tight font-medium text-xs leading-[130%] tracking-normal align-middle text-[#00000099]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Features SECTION */}
      <section className="mx-[9.72%] mb-[9.72%] flex md:justify-between items-start">
        {/* Left Side - Heading */}
        <div className="md:w-[31.8%]">
          <h2 className="font-inter-tight font-medium text-4xl leading-[110%] tracking-normal align-middle">
            FEATURES
          </h2>
        </div>

        {/* Right Side - Feature Details */}
        <div className="mt-8 md:mt-0 md:w-[37.7%] space-y-5">
          {category.features.map((feature, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-black rounded-full" />
                <h3
                  className="font-inter-tight font-normal text-sm leading-none tracking-normal align-middle uppercase"
                >
                  {feature.headline}
                </h3>
              </div>
              <p className="font-inter-tight font-normal text-xs leading-[24px] tracking-normal align-middle">
                {feature.subtext}
              </p>
            </div>
          ))}
          <div className="mt-15" style={{ marginTop: "60px" }}>
          <Link href={`/category-listing3?category=${params.categoryId}`} passHref>
            <HoverButton>
              {(hovered) => (
                <>
                  View All Products
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
      </section>

      {/* Browse by Product Type SECTION */}
      <section className="mx-[9.72%] mb-[9.72%]">
        <h2
          className="font-inter-tight font-medium text-[48px] leading-[110%] tracking-[0%] align-middle uppercase"
        >
          Browse by Product Type
        </h2>
        <div className="mt-[80px] flex justify-between">
          {category.mountingTypes.map((mountingType) => (
            <Link
            key={mountingType.id}
            href={`/category-listing3?category=${params.categoryId}&mounting=${mountingType.id}`}
            className="flex flex-col items-center"
          >
              <div className="relative w-[480px] h-[480px] overflow-hidden cursor-pointer">
                <Image
                  src={mountingType.image}
                  alt={mountingType.name}
                  fill
                  className="object-contain transition-transform duration-1000 ease-in-out hover:scale-110"
                />
              </div>
              <p
                className="mt-[24px] font-inter-tight font-normal text-[14px] leading-[140%] tracking-[0%] text-center uppercase"
              >
                {mountingType.name}
              </p>
          </Link>
            
          ))}
        </div>
      </section>

      {/* Explore Other Products SECTION */}
      <section
        className="max-w-full px-[8.75rem] py-[7.5rem] bg-white"
        style={{
          position: "relative",
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
        }}
      >
        <h2 className="font-helvetica text-[3.63rem] leading-[110%] tracking-[0%] align-middle font-normal uppercase md:whitespace-nowrap mb-[2.5rem]">
          Explore Other Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">

        {/* Card 1 - Using <a> tag */}
        <a href="/product-category/drinking-water-stations" key="drinking-water-stations"> {/* Corrected path */}
        <div> {/* Keep the div if needed for styling */}
            <RelatedCard
            image="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2906d7ca-fcf2-48a0-99d8-7f584fce1600/public" // Ensure image URLs are correct
            title="Drinking Water Station - BLUWAE Series"
            description="Water dispensers with inbuilt purification —pure, safe water delivered efficiently. Designed to reduce plastic waste and energy consumption, making sustainability easy."
            width={272}
            height={270}
            />
        </div>
        </a>

        {/* Card 2 - Using <a> tag */}
        <a href="/product-category/water-dispenser" key="water-dispenser"> {/* Corrected path */}
        <div> {/* Keep the div if needed for styling */}
            <RelatedCard
            image="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/793725fe-6912-4073-982d-dcb813491f00/public" // Ensure image URLs are correct
            title="Water Dispenser (W/O RO) - TRUBLU Series"
            description="Stainless steel water dispensers give you fresh, clean water anytime. Compact, energy-efficient, and perfect for spaces where RO water is not readily available."
            width={272}
            height={270}
            />
        </div>
        </a>

        {/* Card 3 - Using <a> tag */}
        <a href="/product-category/drinking-water-faucets" key="drinking-water-faucets"> {/* Corrected path */}
        <div> {/* Keep the div if needed for styling */}
            <RelatedCard
            image="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2b501f50-e174-490b-1ea4-526449d56800/public" // Ensure image URLs are correct
            title="Drinking Water Faucets - WATERMATIC Series"
            description="Drinking water faucets with under the counter storage units to make access to fresh water simple. Precision-engineered for smooth flow, with a focus on reducing waste and energy use."
            width={272}
            height={270}
            />
        </div>
        </a>

        {/* Card 4 - Using <a> tag */}
        <a href="/product-category/water-cooler" key="water-cooler"> {/* Corrected path */}
        <div> {/* Keep the div if needed for styling */}
            <RelatedCard
            image="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/08a355dd-6233-4b12-1cf5-fee8716cca00/public" // Ensure image URLs are correct
            title="Water Cooler & Fountains - ZVR Series"
            description="Water coolers cum bubblers provide chilled water on demand. Built to be energy-efficient, they're ideal for public spaces, reducing both costs and plastic waste."
            width={272}
            height={270}
            />
        </div>
        </a>

        {/* Add other hardcoded cards here following the same pattern */}

    </div>
      </section>



      {/* Contact Form */}

      <section className="pt-[140px] px-[9.72%] pb-0">

        <ContactSection />

      </section>




      {/* Footer Section */}
      <Footer />

      {/* Add missing global/inline styles for hover/button effects to match our-products2 */}
      <style jsx>{`
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
          margin-top: 0;
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
      <style jsx global>{`
        html {
        }
        body {
            margin: 0;
            padding: 0;
        }
      `}</style>
    </main>
  );
};

export default Home;