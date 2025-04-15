"use client";

import { FC } from "react";
import Image from "next/image";
import Footer from "@/components/footer";
import RelatedCard from "@/components/related-card";

const Home: FC = () => {
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
    flex: 1,
    maxWidth: "16%",
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

  return (
    <main>
      {/* Normal Header */}
      <header className="w-full">
        <div className="mx-auto w-full max-w-[1440px] px-[140px] pt-[20px]">
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
              {["This Is Us", "Our Portfolio", "Reimagine Work"].map(
                (item, i) => (
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
                    {item}
                  </div>
                )
              )}
            </div>

            {/* ETCETERA Menu Items */}
            <div className="flex flex-col justify-center space-y-2">
              {["Sustainability", "The Activist Co.", "Blog"].map(
                (item, i) => (
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
                    {item}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative w-auto h-[656px]">
        <Image
          src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2359943f-dce7-4e87-3f16-629da74ecc00/public"
          alt="Hero background"
          layout="fill"
          objectFit="contain"
        />
      </section>

      {/* Buttons Section */}
      <section className="mx-auto max-w-[1440px] px-[140px]">
        {/* Gap of 120px after the hero */}
        <div style={{ height: "120px" }} />

        <div
          className="flex items-center gap-4"
          style={{ justifyContent: "flex-start" }}
        >
          {buttons.map((btn, index) => (
            <button
              key={index}
              style={{
                ...buttonStyle,
                backgroundColor: btn.background,
                color: btn.color,
              }}
            >
              <span className="flex items-center">
                {btn.label}
                {btn.label !== "FILTER BY" && (
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                )}
              </span>
            </button>
          ))}
        </div>

        {/* Gap of 12px before the horizontal rule */}
        <div style={{ height: "12px" }} />
        
        {/* Horizontal rule */}
        <hr style={{ borderColor: "#00000066" }} />
      </section>

      {/* Products Grid Section */}
      <section className="mx-[9.72%] mb-[9.72%]">
        {/* 80px gap after the horizontal rule */}
        <div style={{ height: "80px" }} />

        <div
          className="grid grid-cols-3"
          style={{
            rowGap: "120px",
            columnGap: "2.7%",
          }}
        >
          {products.map((product, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Wrap image in a container to apply the zoom effect */}
              <div className="overflow-hidden">
                <div className="transition-transform duration-1000 ease-in-out hover:scale-110">
                  <Image
                    src={product.src}
                    alt={product.name}
                    width={360}
                    height={360}
                  />
                </div>
              </div>
              {/* 24px gap before product name */}
              <div style={{ height: "24px" }} />
              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "140%",
                  letterSpacing: "0%",
                  textAlign: "center",
                  verticalAlign: "middle",
                  textTransform: "uppercase",
                }}
                className="related-card-title"
              >
                {product.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* More Products SECTION */}
      <section
        className="max-w-full px-[8.75rem] py-[7.5rem] bg-white"
        style={{
          position: "relative",
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
        }}
      >
        <h2 className="font-helvetica text-[3.63rem] leading-[110%] tracking-[0%] align-middle font-normal uppercase md:whitespace-nowrap mb-[2.5rem]">
          More Products
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
      `}</style>
    </main>
  );
};

export default Home;
