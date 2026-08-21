"use client";

import React, { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { JOBS, JOB_CATEGORIES } from "@/data/jobs";

const containerClass = "mx-auto w-full max-w-[1440px] px-[24px] md:px-[7.5vw]";

interface SelectButtonProps {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

const SelectButton: FC<SelectButtonProps> = ({ children, selected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="transition-all duration-300 ease-in-out border hover:bg-white/10 flex-shrink-0 md:flex-1 h-[36px] md:h-[40px] px-[16px] md:px-0 flex items-center justify-center whitespace-nowrap"
    style={{
      borderColor: selected ? '#ffffff' : '#ffffff33',
      backgroundColor: selected ? '#ffffff' : 'transparent',
      color: selected ? '#000000' : '#ffffff',
      fontFamily: "'Inter Tight', sans-serif",
      fontWeight: 400,
      fontSize: '11px',
      lineHeight: '11px',
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
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const selectedCategory = JOB_CATEGORIES[selectedIndex];

  const jobs = Object.values(JOBS).filter((job) =>
    job.status === 'Live' &&
    (selectedCategory === 'VIEW ALL' || job.category === selectedCategory)
  );

  return (
    <main className="bg-[#0F0F0F] min-h-screen text-white font-sans selection:bg-white selection:text-black relative overflow-x-hidden">
      {/* Dark background gradient */}
      <div
        className="absolute top-0 left-0 w-full pointer-events-none z-0"
        style={{
          background: 'linear-gradient(160deg, #004063 4.52%, #0F0F0F 40%)',
          height: 'clamp(500px, 80vh, 875px)'
        }}
      />

      <div className="relative z-20">
        <Header transparentBg />
      </div>

      <section className="pt-[110px] md:pt-[235px] relative z-10">
        <div className={containerClass}>
          <div className="flex flex-col items-start">
            <h3 className="font-['Inter_Tight'] font-normal text-[12px] md:text-[24px] leading-none text-[#AEAEAE] mb-[12px] md:mb-[21px]">
              We are hiring
            </h3>
            <h1 className="font-['Inter_Tight'] font-normal text-[32px] md:text-[60px] leading-[1.1] text-white mb-[16px] md:mb-[21px]">
              Be part of our mission
            </h1>
            <p className="w-full md:w-[507px] font-['Manrope'] font-normal text-[12px] md:text-[14px] leading-[140%] md:leading-[1.3] text-[#AEAEAE] mb-[28px] md:mb-[88px]">
              We're looking for passionate people to join us on our mission. We value flat hierarchies, clear communication, and full ownership and responsibility.
            </p>

            {/* Category selection */}
            <div className="flex w-full overflow-x-auto gap-[8px] md:gap-[16px] mb-[36px] md:mb-[96px] pb-1 md:pb-0 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {JOB_CATEGORIES.map((cat, idx) => (
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

      <section className="relative z-10">
        <div className={containerClass}>
          <div className="flex flex-col">
            {jobs.map((job) => (
              <div key={job.id} className="flex flex-col">
                <div className="flex justify-between items-start md:items-center">
                  <div className="flex flex-col flex-1 pr-4">
                    <h2 className="font-['Inter_Tight'] font-normal text-[20px] md:text-[32px] leading-[1.1] text-white mb-[8px] md:mb-[18px]">
                      {job.title}
                    </h2>
                    <p className="font-['Manrope'] font-normal text-[12px] md:text-[16px] leading-[140%] md:leading-[1.3] text-[#AEAEAE] mb-[12px] md:mb-[14px]">
                      {job.shortDescription}
                    </p>
                    <div className="flex gap-[24px] md:gap-[42px] font-['Inter_Tight'] font-normal text-[12px] md:text-[14px] leading-none text-white">
                      <span>{job.type}</span>
                      <span>{job.time}</span>
                    </div>
                  </div>

                  <HoverButton href={`/join-wae/${job.id}`} className="px-[14px] py-[7px] md:px-0 md:py-0 md:w-[6.87vw] md:h-[2.43vw] md:min-w-[99px] md:min-h-[35px] flex-shrink-0">
                    {(hovered) => (
                      <div className="flex items-center justify-center gap-[6px] md:gap-[8px] whitespace-nowrap">
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
                <div className="w-full h-[1px] bg-[#FFFFFF33] mt-[24px] mb-[24px] md:mt-[68px] md:mb-[68px]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Great Place to Work Section */}
      <section className="relative z-10 pt-[24px] pb-[60px] md:pt-[32px] md:pb-[100px]">
        <div className={containerClass}>
          <div className="flex flex-col md:flex-row justify-between items-start">
            <h2 className="font-['Inter_Tight'] font-normal text-[36px] md:text-[64px] leading-[1.1] text-white mb-[20px] md:mb-0">
              Great Place<br />to Work
            </h2>
            <div className="w-full md:w-[23.54vw]">
              <p className="font-['Manrope'] md:font-['Inter_Tight'] font-normal text-[12px] md:text-[14px] leading-[140%] md:leading-[1.3] text-[#AEAEAE] mb-[32px] md:mb-0">
                More than a certification, it's a reflection of our people. Built on respect, inclusivity, and shared success, our workplace continues to be recognized among the best.
              </p>
              <div className="w-full mt-0 md:mt-[41px] flex items-center justify-start gap-[16px] md:justify-between md:gap-0">
                {[
                  "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/328dea5e-933c-4d22-7648-58fa383fcd00/public",
                  "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/fc64655e-82b3-415f-8f3c-051764640c00/public",
                  "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/5a5a770a-3e51-44f4-8d03-84c884f42d00/public"
                ].map((src, idx) => (
                  <div key={idx} className="relative w-[72px] md:w-[5.9vw] aspect-[85/154]">
                    <Image src={src} alt="Great Place to Work Badge" fill className="object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}

