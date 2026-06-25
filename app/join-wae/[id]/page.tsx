"use client";

import React, { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { JOBS } from "@/data/jobs";

const containerClass = "mx-auto w-full max-w-[1440px] px-[7.5vw]";

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

export default function JobDescriptionPage() {
  const params = useParams();
  const id = params.id as string;
  const job = JOBS[id];

  if (!job || job.status !== 'Live') {
    return (
      <main className="bg-[#0F0F0F] min-h-screen text-white flex items-center justify-center">
        <h1 className="text-2xl font-['Inter_Tight']">Job Not Found</h1>
      </main>
    );
  }

  return (
    <main className="bg-[#0F0F0F] min-h-screen text-white font-sans selection:bg-white selection:text-black relative overflow-x-hidden">
      {/* Dark background gradient */}
      <div
        className="absolute top-0 left-0 w-full pointer-events-none"
        style={{
          background: 'linear-gradient(160deg, #004063 4.52%, #0F0F0F 40%)', height: 'clamp(500px, 80vh, 875px)'
        }}
      />

      <Header />

      <section className="pt-[254px] relative z-10">
        <div className={containerClass}>
          {/* Header section of JD */}
          <div className="flex justify-between items-start mb-[28px]">
            <h1 className="font-['Inter_Tight'] font-normal text-[46px] leading-[1.1] text-white">
              {job.title}
            </h1>
            <HoverButton href={`mailto:hr2@waecorp.com?subject=Application - ${job.title}`} className="w-[6.87vw] h-[2.43vw] min-w-[99px] min-h-[35px]">
              {(hovered) => (
                <div className="flex items-center justify-center gap-[8px]">
                  <span className="font-['Manrope'] font-medium text-[10px] leading-none uppercase">Apply Now</span>
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

          <p className="font-['Manrope'] font-normal text-[16px] leading-normal text-[#AEAEAE] mb-[20px]">
            {job.shortDescription}
          </p>

          <div className="flex gap-[42px] font-['Inter_Tight'] font-normal text-[24px] leading-normal text-white mb-[62px]">
            <span>{job.type}</span>
            <span>{job.time}</span>
          </div>

          <div className="w-full border-b border-[#FFFFFF4D] mb-[62px]" />

          <div className="w-full max-w-[62.71vw]">
            {/* Job Summary */}
            <h2 className="font-['Inter_Tight'] font-normal text-[24px] leading-[1.1] text-white mb-[38px]">
              Job Summary
            </h2>
            <div className="font-['Manrope'] font-normal text-[14px] leading-normal text-[#AEAEAE] mb-[50px] space-y-4">
              {job.summaryParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* What you'll do */}
            <h3 className="font-['Manrope'] font-medium text-[14px] leading-normal text-white mb-[30px]">
              What you'll do
            </h3>
            <ul className="list-disc pl-5 font-['Manrope'] font-normal text-[14px] leading-[1.8] text-[#AEAEAE] mb-[50px]">
              {job.whatYouWillDo.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            {/* What you'll own */}
            <h3 className="font-['Manrope'] font-medium text-[14px] leading-normal text-white mb-[30px]">
              What you'll own
            </h3>
            <ul className="list-disc pl-5 font-['Manrope'] font-normal text-[14px] leading-[1.8] text-[#AEAEAE] mb-[50px]">
              {job.whatYouWillOwn.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            {/* Who are we looking for */}
            <h3 className="font-['Manrope'] font-medium text-[14px] leading-normal text-white mb-[30px]">
              Who are we looking for
            </h3>
            <ul className="list-disc pl-5 font-['Manrope'] font-normal text-[14px] leading-[1.8] text-[#AEAEAE] mb-[62px]">
              {job.whoWeAreLookingFor.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="w-full border-b border-[#FFFFFF4D]" />
        </div>
      </section>

      {/* Great Place to Work Section */}
      <div className={`${containerClass} relative z-10`}>
        <div className="flex justify-between items-start pt-[100px] pb-[100px]">
          <h2 className="font-['Inter_Tight'] font-normal text-[64px] leading-[1.1] text-white">
            Great Place<br />to Work
          </h2>
          <div className="w-[23.54vw]">
            <p className="font-['Inter_Tight'] font-normal text-[14px] leading-[1.3] text-[#AEAEAE]">
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
