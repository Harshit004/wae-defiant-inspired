"use client";

import React, { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

const containerClass = "mx-auto w-full max-w-[1440px] px-[7.5vw]";

interface SelectButtonProps {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

const SelectButton: FC<SelectButtonProps> = ({ children, selected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="transition-all duration-300 ease-in-out border hover:bg-white/10 flex-1 h-[40px] flex items-center justify-center whitespace-nowrap"
    style={{
      borderColor: selected ? '#ffffff' : '#ffffff33',
      backgroundColor: selected ? '#ffffff' : 'transparent',
      color: selected ? '#000000' : '#ffffff',
      fontFamily: "'Inter Tight', sans-serif",
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '12px',
      textTransform: 'uppercase',
      cursor: 'pointer',
      borderRadius: '0px'
    }}
  >
    {children}
  </button>
);

interface HoverButtonProps {
  children: (hovered: boolean) => React.ReactNode;
  className?: string;
  href?: string;
}

const HoverButton: FC<HoverButtonProps> = ({ children, className = "", href }) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const commonProps = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    className: `transition-all duration-300 ease flex items-center justify-center border border-white text-white ${className}`,
    style: {
      backgroundColor: hovered ? "#fff" : "transparent",
      color: hovered ? "#000" : "#fff",
    }
  };

  if (href) {
    return (
      <Link href={href} {...commonProps}>
        {children(hovered)}
      </Link>
    );
  }

  return (
    <button {...commonProps}>
      {children(hovered)}
    </button>
  );
};

export default function JoinWaePage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

  const categories = [
    "VIEW ALL",
    "DEVELOPMENT",
    "DESIGN",
    "MARKETING",
    "CUSTOMER SERVICE",
    "OPERATION",
    "FINANCE",
    "MANAGEMENT"
  ];

  const jobs = [1, 2, 3, 4, 5, 6].map((i) => ({
    title: "Product Designer",
    description: "We're looking for mid-level product designer to join our team.",
    type: "On-site",
    time: "Full time",
    id: i
  }));

  return (
    <main className="bg-[#0F0F0F] min-h-screen text-white font-sans selection:bg-white selection:text-black relative overflow-x-hidden">
      <Header />

      <section className="pt-[235px] relative z-10">
        <div className={containerClass}>
          <div className="flex flex-col items-start">
            <h3 className="font-['Inter_Tight'] font-normal text-[24px] leading-none text-[#AEAEAE] mb-[21px]">We are hiring</h3>
            <h1 className="font-['Inter_Tight'] font-normal text-[60px] leading-[1.1] text-white mb-[21px]">
              Be part of our mission
            </h1>
            <p className="w-[507px] font-['Manrope'] font-normal text-[14px] leading-none text-[#AEAEAE] mb-[88px]">
              We're looking for passionate people to join us on our mission. We value flat hierarchies, clear communication, and full ownership and responsibility.
            </p>

            <div className="flex w-full justify-between gap-[16px] mb-[96px]">
              {categories.map((cat, idx) => (
                <SelectButton
                  key={cat}
                  selected={selectedIndex === idx}
                  onClick={() => setSelectedIndex(idx)}
                >
                  {cat}
                </SelectButton>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 pb-[32px]">
        <div className={containerClass}>
          <div className="flex flex-col">
            {jobs.map((job) => (
              <div key={job.id} className="flex flex-col">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <h2 className="font-['Inter_Tight'] font-normal text-[32px] leading-[1.1] text-white mb-[18px]">{job.title}</h2>
                    <p className="font-['Manrope'] font-normal text-[16px] leading-none text-[#AEAEAE] mb-[14px]">
                      {job.description}
                    </p>
                    <div className="flex gap-[42px] font-['Inter_Tight'] font-normal text-[14px] leading-none text-white">
                      <span>{job.type}</span>
                      <span>{job.time}</span>
                    </div>
                  </div>

                  <HoverButton className="w-[6.87vw] h-[2.43vw] min-w-[99px] min-h-[35px]">
                    {(hovered) => (
                      <div className="flex items-center justify-center gap-[8px]">
                        <span className="font-['Manrope'] font-medium text-[10px] leading-none">Know More</span>
                        <div className="relative inline-block w-3 h-3 overflow-hidden">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-300 ${hovered ? 'translate-x-full -translate-y-full' : 'translate-x-0 translate-y-0'}`}>
                            <line x1="5" y1="19" x2="19" y2="5" />
                            <polyline points="12 5 19 5 19 12" />
                          </svg>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`absolute top-0 left-0 transition-transform duration-300 ${hovered ? 'translate-x-0 translate-y-0' : '-translate-x-full translate-y-full'}`}>
                            <line x1="5" y1="19" x2="19" y2="5" />
                            <polyline points="12 5 19 5 19 12" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </HoverButton>
                </div>
                <div className="w-full h-[1px] bg-[#FFFFFF33] mt-[68px] mb-[68px]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Great Place to Work Section */}
      <div className={`${containerClass} relative z-10`}>
        <div className="flex justify-between items-start pt-[66px] pb-[100px]">
          <h2 className="font-['Inter_Tight'] font-normal text-[64px] leading-[1.1] text-white">
            Great Place<br />to Work
          </h2>
          <div className="w-[23.54vw]">
            <p className="font-['Inter_Tight'] font-normal text-[14px] leading-none text-[#AEAEAE]">
              More than a certification, it's a reflection of our people. Built on respect, inclusivity, and shared success, our workplace continues to be recognized among the best.
            </p>
            <div className="w-full mt-[41px] flex justify-between items-center">
              {[1, 2, 3].map((_, idx) => (
                <div key={idx} className="relative w-[5.9vw] aspect-[85/154]">
                  <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/328dea5e-933c-4d22-7648-58fa383fcd00/public" alt="Great Place to Work Badge" fill className="object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
