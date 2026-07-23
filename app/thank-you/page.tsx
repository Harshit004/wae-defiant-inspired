"use client";

import React from "react";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function ThankYouPage() {
  return (
    <main className="relative min-h-screen bg-[#0F0F0F] text-white selection:bg-white selection:text-black overflow-x-hidden font-sans flex flex-col">
      {/* Dark background gradient */}
      <div
        className="absolute top-0 left-0 w-full pointer-events-none z-0"
        style={{
          background: "linear-gradient(160deg, #004063 4.52%, #0F0F0F 40%)",
          height: "100vh",
        }}
      />
      <div>
        <Header transparentBg />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center min-h-[calc(100vh)]">
        <div className="flex flex-col items-center justify-center">
          {/* Icon */}
          <div className="relative w-[80px] h-[80px]">
            <Image
              src="/Vector.png"
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
        </div>
      </div>

      <div className="z-10 relative">
        <Footer />
      </div>
    </main>
  );
}
