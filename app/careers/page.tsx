"use client";

import { FC, useState } from "react";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";

const containerClass = "mx-auto w-full max-w-[1440px] px-[7.5vw]";

interface HoverButtonProps {
  children: (hovered: boolean) => React.ReactNode;
}

const HoverButton: FC<HoverButtonProps> = ({ children }) => {
  const [hovered, setHovered] = useState<boolean>(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-fit px-5 py-3 transition-all duration-300 ease flex items-center gap-2 border border-[#333] text-white text-[11px] uppercase font-medium mt-auto"
      style={{
        backgroundColor: hovered ? "#fff" : "transparent",
        color: hovered ? "#000" : "#fff",
      }}
    >
      {children(hovered)}
    </button>
  );
};

export default function CareersPage() {
  return (
    <main className="bg-[#0f1115] min-h-screen text-white font-sans selection:bg-white selection:text-black relative overflow-x-hidden">
      {/* Dark background gradient to emulate the image */}
      <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-br from-[#102436] via-[#0f1115] to-[#0f1115] opacity-60 pointer-events-none" />
      
      <Header />

      <section className="pt-[220px] pb-[100px] relative z-10">
        <div className={containerClass}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="text-[#888] mb-4 text-[18px] font-medium" style={{ fontFamily: 'Inter Tight, sans-serif' }}>Join WAE</h3>
              <h1 className="text-white text-[48px] md:text-[56px] leading-[1.1] font-medium tracking-tight pr-10" style={{ fontFamily: 'Inter Tight, sans-serif' }}>
                Ready to challenge the<br />status quo?
              </h1>
            </div>
            <div className="text-[#aaa] text-[15px] leading-relaxed pr-[10%]" style={{ fontFamily: 'Inter Tight, sans-serif' }}>
              <p className="mb-6">
                We don't hire people to fit into a culture. We build a culture around people who dare to think differently. Here, engineers collaborate with storytellers, designers learn from scientists, and every perspective adds a new dimension to innovation. We celebrate individuality, nurture curiosity, and lead with empathy because the best solutions are born when diverse minds feel empowered to contribute.
              </p>
              <p>
                Mistakes become lessons, ideas become movements, and work becomes purpose. If you're looking for a place where your voice matters, your growth is intentional, and your work leaves a lasting impact on people and the planet, you'll feel at home at WAE.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className={containerClass}>
        <div className="w-full h-px bg-[#222] my-[60px]" />
      </div>

      {/* Why WAE Section */}
      <div className={containerClass}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-stretch">
          <div className="md:col-span-4 flex flex-col justify-between py-2 pr-8 mb-8 md:mb-0">
            <div>
              <h2 className="text-white text-[28px] font-medium mb-2" style={{ fontFamily: 'Inter Tight, sans-serif' }}>Why WAE</h2>
              <p className="text-[#888] text-[13px]" style={{ fontFamily: 'Inter Tight, sans-serif' }}>Think Different</p>
            </div>
            <HoverButton>
              {(hovered) => (
                <>
                  Know More
                  <div className="relative inline-block w-3 h-3 ml-1 overflow-hidden">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-300 ${hovered ? 'translate-x-full -translate-y-full' : 'translate-x-0 translate-y-0'}`}>
                      <line x1="5" y1="19" x2="19" y2="5" />
                      <polyline points="12 5 19 5 19 12" />
                    </svg>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`absolute top-0 left-0 transition-transform duration-300 ${hovered ? 'translate-x-0 translate-y-0' : '-translate-x-full translate-y-full'}`}>
                      <line x1="5" y1="19" x2="19" y2="5" />
                      <polyline points="12 5 19 5 19 12" />
                    </svg>
                  </div>
                </>
              )}
            </HoverButton>
          </div>
          
          <div className="md:col-span-8 md:border-l border-[#222] md:pl-[5vw] py-2">
            <h2 className="text-white text-[30px] md:text-[34px] font-medium leading-[1.2] mb-12" style={{ fontFamily: 'Inter Tight, sans-serif' }}>
              Why spend your career following change<br className="hidden md:block" />when you can create it?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[#aaa] text-[14px] leading-relaxed mb-12 md:pr-[10%]" style={{ fontFamily: 'Inter Tight, sans-serif' }}>
              <p>
                At WAE, we believe the best work happens when people care deeply about what they do and who they do it with. You'll work alongside passionate minds from different backgrounds, united by a shared desire to solve meaningful challenges and create solutions that make a real difference.
              </p>
              <p>
                What makes WAE special isn't just the work, it's the people. We celebrate individuality, encourage fresh thinking, and lead with empathy. Here, you'll find the freedom to explore ideas, the support to grow, and a culture that values collaboration over hierarchy, making every contribution count.
              </p>
            </div>
            <div className="w-full relative h-[300px] md:h-[450px]">
              <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2a452293-dc8e-4666-c735-79acdcb92300/public" alt="Why WAE" fill className="object-cover" />
            </div>
          </div>
        </div>
        
        <div className="w-full h-px bg-[#222] my-[80px]" />
      </div>

      {/* Life @ WAE Section */}
      <div className={containerClass}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-stretch">
          <div className="md:col-span-4 flex flex-col justify-between py-2 pr-8 mb-8 md:mb-0">
            <div>
              <h2 className="text-white text-[28px] font-medium mb-2" style={{ fontFamily: 'Inter Tight, sans-serif' }}>Life @ WAE</h2>
              <p className="text-[#888] text-[13px]" style={{ fontFamily: 'Inter Tight, sans-serif' }}>People first</p>
            </div>
            <HoverButton>
              {(hovered) => (
                <>
                  Know More
                  <div className="relative inline-block w-3 h-3 ml-1 overflow-hidden">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-300 ${hovered ? 'translate-x-full -translate-y-full' : 'translate-x-0 translate-y-0'}`}>
                      <line x1="5" y1="19" x2="19" y2="5" />
                      <polyline points="12 5 19 5 19 12" />
                    </svg>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`absolute top-0 left-0 transition-transform duration-300 ${hovered ? 'translate-x-0 translate-y-0' : '-translate-x-full translate-y-full'}`}>
                      <line x1="5" y1="19" x2="19" y2="5" />
                      <polyline points="12 5 19 5 19 12" />
                    </svg>
                  </div>
                </>
              )}
            </HoverButton>
          </div>
          
          <div className="md:col-span-8 md:border-l border-[#222] md:pl-[5vw] py-2">
            <h2 className="text-white text-[30px] md:text-[34px] font-medium leading-[1.2] mb-12" style={{ fontFamily: 'Inter Tight, sans-serif' }}>
              Life at WAE is where meaningful work<br className="hidden md:block" />meets people, purpose, and joy.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[#aaa] text-[14px] leading-relaxed mb-12 md:pr-[10%]" style={{ fontFamily: 'Inter Tight, sans-serif' }}>
              <p>
                The best part of any workplace is the people, and that's what makes life here special. A diverse community of thinkers, creators, engineers, dreamers, and doers come together with different stories, experiences, and perspectives. Every day brings fresh ideas, shared laughter, continuous learning, and the opportunity to build something meaningful together.
              </p>
              <p>
                Life here extends beyond meetings, projects, and deadlines. It lives in celebrations, team outings, festive gatherings, coffee conversations, and moments that turn colleagues into friends. We celebrate individuality, encourage authenticity, and create an environment where people feel valued, supported, and inspired to grow both personally and professionally.
              </p>
            </div>
            <div className="w-full relative h-[300px] md:h-[450px]">
              <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ee795b42-a4d9-467f-22db-4bfbfedcc600/public" alt="Life @ WAE" fill className="object-cover object-top" />
            </div>
          </div>
        </div>
        
        <div className="w-full h-px bg-[#222] my-[80px]" />
      </div>

      {/* Join WAE Section */}
      <div className={containerClass}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-stretch">
          <div className="md:col-span-4 flex flex-col justify-between py-2 pr-8 mb-8 md:mb-0">
            <div>
              <h2 className="text-white text-[28px] font-medium mb-2" style={{ fontFamily: 'Inter Tight, sans-serif' }}>Join WAE</h2>
              <p className="text-[#888] text-[13px]" style={{ fontFamily: 'Inter Tight, sans-serif' }}>Explore current job openings</p>
            </div>
            <HoverButton>
              {(hovered) => (
                <>
                  Know More
                  <div className="relative inline-block w-3 h-3 ml-1 overflow-hidden">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-300 ${hovered ? 'translate-x-full -translate-y-full' : 'translate-x-0 translate-y-0'}`}>
                      <line x1="5" y1="19" x2="19" y2="5" />
                      <polyline points="12 5 19 5 19 12" />
                    </svg>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`absolute top-0 left-0 transition-transform duration-300 ${hovered ? 'translate-x-0 translate-y-0' : '-translate-x-full translate-y-full'}`}>
                      <line x1="5" y1="19" x2="19" y2="5" />
                      <polyline points="12 5 19 5 19 12" />
                    </svg>
                  </div>
                </>
              )}
            </HoverButton>
          </div>
          
          <div className="md:col-span-8 md:border-l border-[#222] md:pl-[5vw] py-2">
            <h2 className="text-white text-[30px] md:text-[34px] font-medium leading-[1.2] mb-12" style={{ fontFamily: 'Inter Tight, sans-serif' }}>
              Some careers fill your time.<br className="hidden md:block" />The right one can shape your life.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[#aaa] text-[14px] leading-relaxed mb-12 md:pr-[10%]" style={{ fontFamily: 'Inter Tight, sans-serif' }}>
              <p>
                The people you work with often matter more than the work itself. They challenge you when you need courage, support you when you need strength, and celebrate you when you succeed. Here, you'll find a community of passionate individuals who believe that great things are built together.
              </p>
              <p>
                Every person brings a different story, perspective, and dream. That's what makes the journey meaningful. You'll be surrounded by people who inspire growth, spark new ideas, and genuinely care about one another. If you're looking for purpose, belonging, and friendships that last beyond the workplace, this is where your next chapter begins.
              </p>
            </div>
            <div className="w-full relative h-[300px] md:h-[450px]">
              <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/bbdfa982-ca17-42af-5d71-29d91614b100/public" alt="Join WAE" fill className="object-cover" />
            </div>
          </div>
        </div>
        
        <div className="w-full h-px bg-[#222] my-[80px]" />
      </div>

      {/* Great Place to Work Section */}
      <div className={containerClass}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-[140px]">
          <div className="md:col-span-4 mb-8 md:mb-0">
            <h2 className="text-white text-[48px] md:text-[56px] leading-[1.1] font-medium tracking-tight" style={{ fontFamily: 'Inter Tight, sans-serif' }}>
              Great Place<br className="hidden md:block" />to Work
            </h2>
          </div>
          <div className="md:col-span-8 md:pl-[5vw] pt-2">
            <p className="text-[#aaa] text-[14px] leading-relaxed mb-10 w-full md:w-[70%]" style={{ fontFamily: 'Inter Tight, sans-serif' }}>
              More than a certification, it's a reflection of our people. Built on respect, inclusivity, and shared success, our workplace continues to be recognized among the best.
            </p>
            <div className="w-full relative h-[100px] md:h-[140px] max-w-[400px]">
              <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/dbd80a00-9a7f-4fdc-e4ef-8aa766ad7100/public" alt="Great Place to Work Badges" fill className="object-contain object-left" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
