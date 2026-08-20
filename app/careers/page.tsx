"use client";

import { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

const containerClass = "mx-auto w-full max-w-[1440px] px-[24px] md:px-[7.5vw]";

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

export default function CareersPage() {
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

      {/* HERO SECTION */}
      <section className="pt-[110px] md:pt-[235px] pb-[40px] md:pb-0 relative z-10">
        <div className={containerClass}>
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="mb-[28px] md:mb-0">
              <h3
                className="font-['Inter_Tight'] font-normal text-[12px] md:text-[24px] leading-none text-[#AEAEAE] mb-[12px] md:mb-[15px]"
                style={{ letterSpacing: "0%" }}
              >
                Join WAE
              </h3>
              <h1
                className="font-['Inter_Tight'] font-normal text-[32px] md:text-[60px] leading-[1.1] text-white"
                style={{ letterSpacing: "0%" }}
              >
                Ready to challenge the<br className="hidden md:block" /> status quo?
              </h1>
            </div>
            <div className="w-full md:w-[30.27vw] font-['Manrope'] font-normal text-[12px] md:text-[14px] leading-[140%] md:leading-normal text-[#AEAEAE]">
              <p className="mb-4 md:mb-6">
                We don't hire people to fit into a culture. We build a culture around people who dare to think differently. Here, engineers collaborate with storytellers, designers learn from scientists, and every perspective adds a new dimension to innovation. We celebrate individuality, nurture curiosity, and lead with empathy because the best solutions are born when diverse minds feel empowered to contribute.
              </p>
              <p>
                Mistakes become lessons, ideas become movements, and work becomes purpose. If you're looking for a place where your voice matters, your growth is intentional, and your work leaves a lasting impact on people and the planet, you'll feel at home at WAE.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-[24px] md:mx-[7.5vw] border-b border-[#333] md:mt-[92px]"></div>

      {/* Why WAE Section */}
      <section className="relative z-10 pt-[40px] pb-[40px] md:pt-[92px] md:pb-[92px]">
        <div className={containerClass}>
          <div className="flex flex-col md:grid md:grid-cols-12 md:gap-0">
            {/* Left Column / Mobile Header */}
            <div className="w-full md:col-span-4 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start pr-0 md:pr-8 mb-[28px] md:mb-0">
              <div>
                <h2 className="font-['Inter_Tight'] font-normal text-[20px] md:text-[36px] leading-[1.1] text-white">Why WAE</h2>
                <p className="font-['Inter_Tight'] font-normal text-[12px] md:text-[14px] leading-none text-[#AEAEAE] mt-[4px] md:mt-[22px]">Think Different</p>
              </div>

              <HoverButton href="/profile" className="mt-0 md:mt-[68px] px-[16px] py-[8px] md:py-[10.5px] w-fit">
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

            {/* Right Column / Content */}
            <div className="w-full md:col-span-8 border-l-0 md:border-l border-[#333] pl-0 md:pl-[3.47vw]">
              <h2 className="font-['Inter_Tight'] font-normal text-[22px] md:text-[38px] leading-[1.15] md:leading-[1.05] text-white mb-[20px] md:mb-[62px]">
                Why spend your career following change<br className="hidden md:block" /> when you can create it?
              </h2>
              <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-[3.47vw] font-['Manrope'] font-normal text-[12px] md:text-[14px] leading-[140%] md:leading-[1.3] text-[#AEAEAE] mb-[28px] md:mb-[60px]">
                <p className="flex-1">
                  At WAE, we believe the best work happens when people care deeply about what they do and who they do it with. You'll work alongside passionate minds from different backgrounds, united by a shared desire to solve meaningful challenges and create solutions that make a real difference.
                </p>
                <p className="flex-1">
                  What makes WAE special isn't just the work, it's the people. We celebrate individuality, encourage fresh thinking, and lead with empathy. Here, you'll find the freedom to explore ideas, the support to grow, and a culture that values collaboration over hierarchy, making every contribution count.
                </p>
              </div>
              <div className="w-full aspect-[714/400] md:aspect-[714/323] relative">
                <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/506b5538-f8a1-4939-283f-d4247ef42700/public" alt="Why WAE" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-[24px] md:mx-[7.5vw] border-b border-[#333]"></div>

      {/* Life @ WAE Section */}
      <section className="relative z-10 pt-[40px] pb-[40px] md:pt-[92px] md:pb-[92px]">
        <div className={containerClass}>
          <div className="flex flex-col md:grid md:grid-cols-12 md:gap-0">
            {/* Left Column / Mobile Header */}
            <div className="w-full md:col-span-4 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start pr-0 md:pr-8 mb-[28px] md:mb-0">
              <div>
                <h2 className="font-['Inter_Tight'] font-normal text-[20px] md:text-[36px] leading-[1.1] text-white">Life @ WAE</h2>
                <p className="font-['Inter_Tight'] font-normal text-[12px] md:text-[14px] leading-none text-[#AEAEAE] mt-[4px] md:mt-[22px]">People first</p>
              </div>

              <HoverButton href="/life-at-wae" className="mt-0 md:mt-[68px] px-[16px] py-[8px] md:py-[10.5px] w-fit">
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

            {/* Right Column / Content */}
            <div className="w-full md:col-span-8 border-l-0 md:border-l border-[#333] pl-0 md:pl-[3.47vw]">
              <h2 className="font-['Inter_Tight'] font-normal text-[22px] md:text-[38px] leading-[1.15] md:leading-[1.05] text-white mb-[20px] md:mb-[62px]">
                Life at WAE is where meaningful work<br className="hidden md:block" /> meets people, purpose, and joy.
              </h2>
              <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-[3.47vw] font-['Manrope'] font-normal text-[12px] md:text-[14px] leading-[140%] md:leading-[1.3] text-[#AEAEAE] mb-[28px] md:mb-[60px]">
                <p className="flex-1">
                  The best part of any workplace is the people, and that's what makes life here special. A diverse community of thinkers, creators, engineers, dreamers, and doers come together with different stories, experiences, and perspectives. Every day brings fresh ideas, shared laughter, continuous learning, and the opportunity to build something meaningful together.
                </p>
                <p className="flex-1">
                  Life here extends beyond meetings, projects, and deadlines. It lives in celebrations, team outings, festive gatherings, coffee conversations, and moments that turn colleagues into friends. We celebrate individuality, encourage authenticity, and create an environment where people feel valued, supported, and inspired to grow both personally and professionally.
                </p>
              </div>
              <div className="w-full aspect-[714/400] md:aspect-[714/323] relative">
                <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2046008a-784e-4094-1836-67664786db00/public" alt="Life @ WAE" fill className="object-cover object-top" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-[24px] md:mx-[7.5vw] border-b border-[#333]"></div>

      {/* Join WAE Section */}
      <section className="relative z-10 pt-[40px] pb-[40px] md:pt-[92px] md:pb-[92px]">
        <div className={containerClass}>
          <div className="flex flex-col md:grid md:grid-cols-12 md:gap-0">
            {/* Left Column / Mobile Header */}
            <div className="w-full md:col-span-4 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start pr-0 md:pr-8 mb-[28px] md:mb-0">
              <div>
                <h2 className="font-['Inter_Tight'] font-normal text-[20px] md:text-[36px] leading-[1.1] text-white">Join WAE</h2>
                <p className="font-['Inter_Tight'] font-normal text-[12px] md:text-[14px] leading-none text-[#AEAEAE] mt-[4px] md:mt-[22px]">Explore current Job Openings</p>
              </div>

              <HoverButton href="/join-wae" className="mt-0 md:mt-[68px] px-[16px] py-[8px] md:py-[10.5px] w-fit">
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

            {/* Right Column / Content */}
            <div className="w-full md:col-span-8 border-l-0 md:border-l border-[#333] pl-0 md:pl-[3.47vw]">
              <h2 className="font-['Inter_Tight'] font-normal text-[22px] md:text-[38px] leading-[1.15] md:leading-[1.05] text-white mb-[20px] md:mb-[62px]">
                Some careers fill your time.<br className="hidden md:block" /> The right one can shape your life.
              </h2>
              <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-[3.47vw] font-['Manrope'] font-normal text-[12px] md:text-[14px] leading-[140%] md:leading-[1.3] text-[#AEAEAE] mb-[28px] md:mb-[60px]">
                <p className="flex-1">
                  The people you work with often matter more than the work itself. They challenge you when you need courage, support you when you need strength, and celebrate you when you succeed. Here, you'll find a community of passionate individuals who believe that great things are built together.
                </p>
                <p className="flex-1">
                  Every person brings a different story, perspective, and dream. That's what makes the journey meaningful. You'll be surrounded by people who inspire growth, spark new ideas, and genuinely care about one another. If you're looking for purpose, belonging, and friendships that last beyond the workplace, this is where your next chapter begins.
                </p>
              </div>
              <div className="w-full aspect-[714/400] md:aspect-[714/323] relative">
                <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b801b465-2033-4b22-9c44-c9504923f500/public" alt="Join WAE" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-[24px] md:mx-[7.5vw] border-b border-[#333]"></div>

      {/* Great Place to Work Section */}
      <section className="relative z-10 pt-[40px] pb-[60px] md:pt-[92px] md:pb-[100px]">
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

