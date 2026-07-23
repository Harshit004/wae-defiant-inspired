"use client";

import React, { FC, useState } from "react";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";
import { motion } from "framer-motion";

interface HoverButtonProps {
  children: (hovered: boolean) => React.ReactNode;
  href?: string;
  variant?: "default" | "inverted";
  download?: boolean;
  onClick?: () => void;
}

const HoverButton: FC<HoverButtonProps> = ({ children, href, variant = "default", download, onClick }) => {
  const [hovered, setHovered] = useState<boolean>(false);

  const isDefault = variant === "default";

  const buttonContent = (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-fit transition-all duration-650 ease"
      style={{
        pointerEvents: "auto",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.55vw", padding: "10.5px 16px",
        fontFamily: "'Manrope', sans-serif",
        fontWeight: 500,
        fontSize: "10px",
        lineHeight: "100%",
        backgroundColor: isDefault
          ? (hovered ? "#000" : "#f2f2f2")
          : (hovered ? "#fff" : "transparent"),
        border: isDefault
          ? "1px solid #000"
          : "1px solid #fff",
        cursor: "pointer",
        color: isDefault
          ? (hovered ? "#fff" : "#000")
          : (hovered ? "#000" : "#fff"),
      }}
    >
      {children(hovered)}
    </button>
  );

  return href ? (
    href.startsWith('#') || download ? (
      <a href={href} className="contents" style={{ textDecoration: 'none', color: 'inherit' }} download={download ? true : undefined}>{buttonContent}</a>
    ) : (
      <Link href={href} className="contents">{buttonContent}</Link>
    )
  ) : buttonContent;
};

export default function ThankYouPage() {
  return (
    <main className="relative min-h-screen bg-[#0F0F0F] text-white selection:bg-white selection:text-black overflow-x-hidden font-sans flex flex-col">
      {/* Dark background gradient */}

      <div className="mb-[125px]">
        <Header transparentBg />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center min-h-[calc(100vh)]">
        <div className="flex flex-col items-center justify-center">
          {/* Icon */}
          <div className="relative w-[80px] h-[80px]">
            <Image
              src="/tick-icon.png"
              alt="Success Icon"
              fill
              className="object-contain"
            />
          </div>

          <div className="h-[30px]" />

          {/* Heading */}
          <h1 className="font-['Inter_Tight'] font-normal text-[64px] leading-[105%] text-center text-white m-0 p-0">
            Thank you
          </h1>

          <div className="h-[30px]" />

          {/* Subtext */}
          <p className="font-['Inter_Tight'] font-light text-[16px] leading-[130%] text-center text-white m-0 p-0">
            Your Enquiry has <br />
            been successfully submitted
          </p>

          <div className="h-[64px]" />

          <HoverButton href="/" variant="inverted">
            {(hovered) => (
              <>
                Back to home
                <div className="relative inline-block w-4 h-4">
                  <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                    alt="icon default"
                    width={16}
                    height={16}
                    className={hovered ? "filter-wae-blue" : "brightness-0 invert"}
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
                      className={hovered ? "filter-wae-blue" : "brightness-0 invert"}
                    />
                  </motion.div>
                </div>
              </>
            )}
          </HoverButton>
        </div>
      </div>

      <div className="z-10 relative">
        <Footer />
      </div>
    </main>
  );
}
