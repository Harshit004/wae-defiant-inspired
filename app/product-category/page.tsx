"use client";

import { FC, useState } from "react";
import Image from "next/image";
import Footer from "@/components/footer";
import RelatedCard from "@/components/related-card";
import Link from "next/link"; // Import the Link component
import ContactSection from "@/components/contact-section";

const mountingOptions = [
  "Free-standing",
  "Floor-standing",
  "On Wall",
  "In Wall",
  "Outdoor",
  "Wall Hanging",
  "Under Counter",
  "Counter-top",
  "Open-skid",
  "Closed-skid",
];

const Home: FC = () => {
  const [showMountingDropdown, setShowMountingDropdown] = useState(false);

  // Common button style based on the typography instructions.
  const buttonStyle: React.CSSProperties = {
    padding: "16px",
    fontFamily: "'Inter Tight', sans-serif",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "12px",
    letterSpacing: "0%",
    textAlign: "center",
    textTransform: "uppercase",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  // Data for the 4 buttons along with their alternating background and text colors.
  const buttons = [
    { label: "FILTER BY", background: "#000", color: "#fff" },
    { label: "CATEGORY", background: "#f2f2f2", color: "#000" },
    { label: "MOUNTING TYPE", background: "#000", color: "#fff" },
    { label: "INSTALLATION TYPE", background: "#f2f2f2", color: "#000" },
  ];

  // Sample data for product grid
  const products = [
    {
      name: "VAR",
      src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/0026821b-7053-4120-f885-bdca17c8d800/public",
    },
    {
      name: "ENKI",
      src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/fe2b0283-da02-42aa-f25e-ab4e2539a200/public",
    },
    {
      name: "ROM GRANDE",
      src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/014b7943-c166-40b3-fdc4-6aaf851d6600/public",
    },
    {
      name: "ASSISTFLOW",
      src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ff43a14b-6822-4fc1-866c-31af48ae8e00/public",
    },
    {
      name: "TRX.TL",
      src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/3a7dbc8a-edd3-4a15-ee1d-aa8ecee81c00/public",
    },
    {
      name: "PIPER",
      src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4aee34c4-ed53-4d96-fde0-f5c2286b6b00/public",
    },
    {
      name: "ROBUSTO",
      src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/17d05e57-4f6c-4cae-75b0-c4a774c09400/public",
    },
    {
      name: "ROBUSTO",
      src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/349ed323-95cf-470a-55ca-98ba8093eb00/public",
    },
  ];

  // Arrays for menu items
  const productsItems = [
    { text: "This is Us", href: "/inside-wae" },
    { text: "Our Portfolio", href: "/our-portfolio" },
    { text: "Reimagine Work", href: "/careers" },
  ];
  const blueprintItems = [
    { text: "Sustainability", href: "#" },
    { text: "The Activist Co.", href: "#" },
    { text: "Blog", href: "/blogs2" },
  ];

  return (
    <main>
      {/* Normal Header */}
      <header className="w-full">
        <div className="mx-auto w-full max-w-[1440px] px-[140px] py-[20px]">
          {/* Top Row: Navigation */}
          <div
            className="grid grid-cols-5 items-center pb-2 uppercase"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontSize: "12px",
              lineHeight: "100%",
            }}
          >
            <div>IDENTITY</div>
            <div>ORIGIN</div>
            <div>OBJECTIVE</div>
            <div>INSIDE WAE</div>
            <div>ETCETERA</div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-[#D9D9DC] mb-4" />

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
              className="flex flex-col justify-center"
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
              className="flex flex-col justify-center"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "12px",
                lineHeight: "100%",
                color: "#00000066",
              }}
            >
              To lead the way in
              <br />
              sustainability ahead of the
              <br />
              rest
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
                  <Link href={item.href} className="c--anim-btn">
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
                  <Link href={item.href} className="c--anim-btn">
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
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative w-auto h-[656px] py-0 px-0 my-0 mx-0">
        <Image
          src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2359943f-dce7-4e87-3f16-629da74ecc00/public"
          alt="Hero background"
          layout="fill"
          objectFit="contain"
        />
      </section>

      {/* Product Category overview SECTION */}
      <section className="mx-[9.72%] my-[9.72%] flex md:justify-between items-start">
      {/* Left Side - Heading */}
      <div className="md:w-[31.8%]">
        <h2 className="font-inter-tight font-medium text-4xl leading-[110%] tracking-normal align-middle">
          DRINKING WATER STATIONS - BLUWAE Series
        </h2>
      </div>

      {/* Right Side - Paragraphs */}
      <div className="mt-8 md:mt-0 md:w-[37.7%]">
        <p className="font-inter-tight font-medium text-xs leading-none tracking-normal align-middle text-[#00000099]">
          Our Drinking Water Stations aren’t just another water dispenser—they’re a smarter way to hydrate. Powered by advanced RO technology, they deliver 99.99% pure, great-tasting water while cutting down on single-use plastics. Designed with sustainability at the core, these stations are energy-efficient, reliable, and built to minimize your environmental footprint. It’s hydration, but better for the planet.
        </p>
        <div className="my-5" /> {/* 20px gap using Tailwind's default my-5 */}
        <p className="font-inter-tight font-medium text-xs leading-none tracking-normal align-middle text-[#00000099]">
          Innovation drives everything we do. Our stations don’t just quench your thirst—they align with your values. By choosing our RO-powered dispensers, you’re making a conscious choice for a greener future. It’s more than just water; it’s a commitment to sustainability that doesn’t compromise on convenience or quality.
        </p>
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
      <div className="mt-8 md:mt-0 md:w-[37.7%]">
        
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
          <RelatedCard
            image="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b4d5a06d-b245-459f-4f81-32eb013a8000/public"
            title="DRINKING WATER STATION - BLUWAE Series"
            description="Information regarding awards received by the Hitachi Group in various fields and related announcements."
            width={272}
            height={270}
          />
          <RelatedCard
            image="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b4d5a06d-b245-459f-4f81-32eb013a8000/public"
            title="WATER DISPENSER (W/O RO) - TRUBLU Series"
            description="Information regarding awards received by the Hitachi Group in various fields and related announcements."
            width={272}
            height={270}
          />
          <RelatedCard
            image="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b4d5a06d-b245-459f-4f81-32eb013a8000/public"
            title="DRINKING WATER FAUCETS - WATERMATIC Series"
            description="Information regarding awards received by the Hitachi Group in various fields and related announcements."
            width={272}
            height={270}
          />
          <RelatedCard
            image="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b4d5a06d-b245-459f-4f81-32eb013a8000/public"
            title="WATER COOLER & FOUNTAINS - ZVR Series"
            description="Information regarding awards received by the Hitachi Group in various fields and related announcements."
            width={272}
            height={270}
          />
        </div>
      </section>

      {/* Contact Form */}
      <section className="pt-[140px] px-[9.72%] pb-0">
      <ContactSection />
      </section>

      {/* Footer Section */}
      <Footer />

      {/* Custom styles for RelatedCard titles and descriptions */}
      <style jsx>{`
        .related-card-title {
          font-family: "Inter Tight", sans-serif;
          font-weight: 400;
          font-size: 16px;
          line-height: 120%;
          letter-spacing: 0%;
          vertical-align: middle;
        }
        .related-card-description {
          font-family: "Inter Tight", sans-serif;
          font-weight: 400;
          font-size: 12px;
          line-height: 110%;
          letter-spacing: 0%;
          vertical-align: middle;
          color: #808080;
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
          margin-top: 0;
          transition: margin-top 0.5s;
        }
        .c--anim-btn:hover .c-anim-btn {
          margin-top: -12px;
        }
        .menu-arrow,
        .blueprint-arrow {
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
    </main>
  );
};

export default Home;
