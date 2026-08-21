"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";

const containerClass = "mx-auto w-full max-w-[1440px] px-[24px] md:px-[7.5vw]";

const carouselImages = [
  "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/1da0531d-01d8-4af1-d0ab-6eeded2b7300/public",
  "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2560dacd-a093-47d1-c9e5-0d20a7f69700/public",
  "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/47734f9f-4913-4005-2d65-49f93623fd00/public",
  "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b40091a8-28de-4027-03bc-9e843cea7b00/public",
  "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/d1c02612-1e99-4b45-0b2b-8f7c7d355000/public"
];

export default function LifeAtWAEPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setIsAtStart(scrollLeft <= 0);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 2);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  const nextSlide = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const step = clientWidth > 768 ? 483 : 260;

      if (maxScroll - (scrollLeft + step) < 150) {
        scrollRef.current.scrollTo({ left: maxScroll, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: step, behavior: 'smooth' });
      }
    }
  };

  const prevSlide = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const step = clientWidth > 768 ? 483 : 260;

      if (scrollLeft - step < 150) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: -step, behavior: 'smooth' });
      }
    }
  };

  return (
    <main className="bg-[#0F0F0F] min-h-screen text-white font-sans selection:bg-white selection:text-black relative overflow-x-hidden">
      <div className="relative z-20">
        <Header transparentBg />
      </div>

      {/* Hero Section */}
      <section className="pt-[110px] md:pt-[180px] lg:pt-[220px] relative z-10 pb-[40px] md:pb-[90px]">
        <div className={containerClass}>
          <h1 className="font-['Inter_Tight'] font-normal text-[32px] md:text-[60px] leading-[1.1] text-white mb-[24px] md:mb-[52px]">
            Life @ WAE
          </h1>

          <div className="w-full aspect-[1225/444] relative mb-[24px] md:mb-[53px]">
            <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/35d5d6fe-e947-418a-bd85-744314771100/public" alt="Life at WAE" fill className="object-cover" />
          </div>

          <div className="flex justify-start md:justify-end">
            <div className="w-full md:max-w-[509px] font-['Manrope'] font-normal text-[12px] md:text-[14px] leading-[140%] md:leading-[1.3] text-[#AEAEAE]">
              <p>
                Life here is built around people, purpose, and possibility. It is a place where ambitious ideas find room to grow, where collaboration feels natural, and where every contribution creates a visible impact. We celebrate wins together, learn from challenges, and encourage curiosity at every step. Beyond projects and deadlines, it is the energy of passionate minds, meaningful connections, and a shared commitment to making a difference that makes every day rewarding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Background Gradient for Where Talent Begins */}
      <div className="relative">
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            background: 'linear-gradient(160deg, #004063 0%, #0F0F0F 60%)',
            opacity: 0.8
          }}
        />

        {/* Where Talent Begins */}
        <section className="relative z-10 py-[40px] md:py-[90px]">
          <div className={containerClass}>
            <h2 className="font-['Inter_Tight'] font-normal text-[18px] md:text-[40px] leading-[1.1] text-white mb-[24px] md:mb-[50px]">
              Where Talent Begins
            </h2>

            <div className="flex flex-col lg:flex-row justify-between items-start gap-[28px] md:gap-[40px]">
              {/* Left Image */}
              <div className="relative w-full lg:w-[606px] aspect-[606/349] flex-shrink-0">
                <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/1fd9ea94-0f8b-4009-ea7c-9ba8a32fd400/public" alt="Where Talent Begins" fill className="object-cover" />
              </div>

              {/* Right Content */}
              <div className="w-full max-w-[545px] flex flex-col gap-[32px] md:gap-[60px]">
                <div>
                  <div className="font-['Inter_Tight'] font-normal text-[28px] md:text-[40px] leading-[1.1] text-[#AEAEAE] mb-[8px] md:mb-[38px]">01</div>
                  <h3 className="font-['Inter_Tight'] font-normal text-[24px] md:text-[32px] leading-[1.1] text-white mb-[12px] md:mb-[24px]">Internship</h3>
                  <p className="font-['Manrope'] font-normal text-[12px] md:text-[14px] leading-[140%] md:leading-[1.3] text-[#AEAEAE]">
                    Every expert was once a beginner. Our internship program is designed for curious minds eager to learn beyond textbooks and classrooms. Here, interns contribute to real projects, work alongside experienced professionals, and see their ideas come to life. It is a journey of discovery, growth, and confidence-building, where learning happens through doing and every experience becomes a stepping stone toward a meaningful career.
                  </p>
                </div>

                <div>
                  <div className="font-['Inter_Tight'] font-normal text-[28px] md:text-[40px] leading-[1.1] text-[#AEAEAE] mb-[8px] md:mb-[38px]">02</div>
                  <h3 className="font-['Inter_Tight'] font-normal text-[24px] md:text-[32px] leading-[1.1] text-white mb-[12px] md:mb-[24px]">Campus hiring</h3>
                  <p className="font-['Manrope'] font-normal text-[12px] md:text-[14px] leading-[140%] md:leading-[1.3] text-[#AEAEAE]">
                    The next big idea often comes from a fresh perspective. Through campus hiring, we welcome bright young talent ready to question, create, and contribute. We look beyond resumes to find individuals with passion, curiosity, and the courage to think differently. From day one, they become part of a culture that encourages learning, ownership, and the freedom to make an impact.
                  </p>
                </div>

                <div>
                  <div className="font-['Inter_Tight'] font-normal text-[28px] md:text-[40px] leading-[1.1] text-[#AEAEAE] mb-[8px] md:mb-[38px]">03</div>
                  <h3 className="font-['Inter_Tight'] font-normal text-[24px] md:text-[32px] leading-[1.1] text-white mb-[12px] md:mb-[24px]">Internal referral</h3>
                  <p className="font-['Manrope'] font-normal text-[12px] md:text-[14px] leading-[140%] md:leading-[1.3] text-[#AEAEAE]">
                    Some of the best additions to a team come through the people who know us best. Our referral program is built on trust, connection, and shared values. When employees recommend someone from their network, they are introducing more than a candidate—they are bringing in potential, passion, and a cultural fit that helps strengthen our community and shape the future of WAE.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="relative z-10 mx-[24px] md:mx-[7.5vw] border-b border-[#333]"></div>

      {/* Our Happy Faces */}
      <section className="relative z-10 py-[40px]">
        <div className={containerClass}>
          <h2 className="font-['Inter_Tight'] font-normal text-[18px] md:text-[40px] leading-[1.1] text-white mb-[24px] md:mb-[72px]">
            Our happy faces
          </h2>

          <div className="relative w-[100vw] ml-[calc(-50vw+50%)] mb-[24px] md:mb-[40px]">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                scrollBehavior: 'smooth',
              }}
            >
              {/* Left spacer matches standard container margin */}
              <div
                className="flex-shrink-0"
                style={{ width: 'max(24px, calc((100vw - 1440px) / 2 + 7.5vw))' }}
              />

              {carouselImages.map((src, i) => (
                <div
                  key={i}
                  className={`w-[70vw] sm:w-[320px] md:w-[432px] aspect-[432/412] relative flex-shrink-0 ${
                    i !== carouselImages.length - 1 ? 'mr-[16px] md:mr-[51px]' : ''
                  }`}
                >
                  <Image src={src} alt={`Happy face ${i + 1}`} fill className="object-cover" />
                </div>
              ))}

              {/* Right spacer ensures last image aligns properly */}
              <div
                className="flex-shrink-0"
                style={{ width: 'max(24px, calc((100vw - 1440px) / 2 + 7.5vw))' }}
              />
            </div>
          </div>

          <div className="flex justify-end gap-[12px] md:gap-[15px]">
            <button
              onClick={prevSlide}
              disabled={isAtStart}
              className={`w-[36px] h-[36px] md:w-[40px] md:h-[40px] border border-[#333] flex items-center justify-center transition-colors hover:bg-white hover:text-black ${
                isAtStart ? 'opacity-50 cursor-not-allowed hover:bg-transparent hover:text-white' : ''
              }`}
              aria-label="Previous image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              disabled={isAtEnd}
              className={`w-[36px] h-[36px] md:w-[40px] md:h-[40px] border border-[#333] flex items-center justify-center transition-colors hover:bg-white hover:text-black ${
                isAtEnd ? 'opacity-50 cursor-not-allowed hover:bg-transparent hover:text-white' : ''
              }`}
              aria-label="Next image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-[24px] md:mx-[7.5vw] border-b border-[#333]"></div>

      {/* Great Place to Work Section */}
      <section className="relative z-10 pt-[40px] pb-[60px] md:pt-[66px] md:pb-[100px]">
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

