"use client"

import type { FC } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"

const containerClass = "mx-auto w-full max-w-[1440px] px-[7.5vw]"

export default function TheActivistCoPage() {
  return (
    <main className="relative min-h-screen bg-[#0F0F0F] text-white overflow-x-hidden">
      {/* Top gradient matching dark theme */}
      <div
        className="absolute top-0 left-0 w-full pointer-events-none z-0"
        style={{
          background: "linear-gradient(160deg, #004063 4.52%, #0F0F0F 40%)",
          height: "clamp(500px, 80vh, 875px)",
        }}
      />

      <div className="relative z-10">
        <Header />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full" style={{ paddingTop: "clamp(120px, 15vw, 180px)" }}>
        
        {/* HERO SECTION */}
        <section className={containerClass}>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20">
            {/* Left Text */}
            <div className="w-full lg:w-[45%] flex flex-col pt-8">
              <h1 
                className="uppercase mb-12"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(48px, 6vw, 84px)",
                  lineHeight: "100%",
                  letterSpacing: "-0.02em"
                }}
              >
                WAELCHEMY
              </h1>
              <h2 
                className="mb-8"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(24px, 2.5vw, 36px)",
                  lineHeight: "120%",
                }}
              >
                The purity of water.<br />
                The discipline of activism.
              </h2>
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(14px, 1.11vw, 16px)",
                  lineHeight: "150%",
                  color: "rgba(255, 255, 255, 0.8)",
                  maxWidth: "480px"
                }}
              >
                Water is our absolute truth, our primary obligation. In an era where corporate action is often a compromise, we hold a different standard. We believe that true sustainability requires rigor, not rhetoric. We engineer solutions that strip away inefficiency, leaving only the essential: clean water, preserved ecosystems, and a better future.
              </p>
            </div>

            {/* Right Video - Cropped to 707x541 relative */}
            <div className="w-full lg:w-[55%] flex justify-end">
              <div 
                className="w-full relative overflow-hidden" 
                style={{ 
                  aspectRatio: "707 / 541",
                  maxWidth: "707px"
                }}
              >
                <video
                  src="/the-activist-co-hero.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: We begin there. */}
        <section className={`${containerClass} mt-[120px] lg:mt-[200px]`}>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
            <div className="w-full lg:w-[35%]">
              <h2 
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(32px, 3.33vw, 48px)",
                  lineHeight: "110%",
                }}
              >
                We begin there.
              </h2>
            </div>
            <div className="w-full lg:w-[60%] grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(14px, 1.11vw, 16px)",
                  lineHeight: "150%",
                  color: "rgba(255, 255, 255, 0.8)",
                }}
              >
                When we see water, we see nature's great equalizer. No form of industrial sustainability is valid if it excludes water. It is the foundation of ecosystems, the driver of economies, and the ultimate measure of our relationship with the planet. To engineer solutions for water is to engineer for life. That is our responsibility, our starting point, our promise.
              </p>
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(14px, 1.11vw, 16px)",
                  lineHeight: "150%",
                  color: "rgba(255, 255, 255, 0.8)",
                }}
              >
                Water reflects the conscience of an institution. For 15 years, our work has been driven by one single, unyielding principle: the absolute refusal to accept anything less than the highest standard. We don't just build systems; we build trust, we build resilience, and we build a legacy.
              </p>
            </div>
          </div>
        </section>

        <div className={containerClass}>
          <div className="w-full h-px bg-white/20 mt-[120px] lg:mt-[160px]" />
        </div>

        {/* SECTION 3: The Discipline of Refusal */}
        <section className={`${containerClass} mt-[100px] lg:mt-[140px]`}>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20">
            <div className="w-full lg:w-[35%]">
              <h2 
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(32px, 3.33vw, 48px)",
                  lineHeight: "110%",
                  maxWidth: "300px"
                }}
              >
                The Discipline of Refusal
              </h2>
            </div>
            <div className="w-full lg:w-[65%] flex flex-col">
              <div className="w-full mb-10 relative overflow-hidden" style={{ aspectRatio: "2.14 / 1" }}>
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/5dd07625-6ab3-4be6-1401-93e241a6aa00/public"
                  alt="The Discipline of Refusal"
                  fill
                  className="object-cover"
                />
              </div>
              <ul className="list-disc pl-5 mb-8 space-y-2" style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(14px, 1.11vw, 16px)",
                  lineHeight: "150%",
                  color: "rgba(255, 255, 255, 0.9)",
              }}>
                <li>We refuse to accept plastic when glass and metal exist.</li>
                <li>We refuse to accept dirty energy when solar integration is possible.</li>
                <li>We refuse to build machines that end up in landfills. Our devices are built to endure.</li>
              </ul>
              <p
                className="mb-8"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(14px, 1.11vw, 16px)",
                  lineHeight: "150%",
                  color: "rgba(255, 255, 255, 0.6)",
                  maxWidth: "600px"
                }}
              >
                Refusal requires intense calculation, rigorous engineering and an uncompromising commitment to longevity. We do not manufacture products; we engineer lifecycles. We do not adapt to the standards; we define them. Our refusal is our strength, our innovation, and our defining characteristic.
              </p>
              <Link href="#" className="uppercase tracking-widest text-white/50 hover:text-white transition-colors text-[10px] font-medium" style={{ fontFamily: "'Manrope', sans-serif" }}>
                Read the full principle: The WAE Manifesto
              </Link>
            </div>
          </div>
        </section>

        <div className={containerClass}>
          <div className="w-full h-px bg-white/20 mt-[100px] lg:mt-[140px]" />
        </div>

        {/* SECTION 4: Carbon Neutral Water */}
        <section className={`${containerClass} mt-[100px] lg:mt-[140px]`}>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20">
            <div className="w-full lg:w-[35%]">
              <h2 
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(32px, 3.33vw, 48px)",
                  lineHeight: "110%",
                  maxWidth: "350px"
                }}
              >
                Carbon Neutral Water : Hydration, Redesigned
              </h2>
            </div>
            <div className="w-full lg:w-[65%] flex flex-col">
              <div className="w-full mb-10 relative overflow-hidden" style={{ aspectRatio: "2.14 / 1" }}>
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/5dd07625-6ab3-4be6-1401-93e241a6aa00/public"
                  alt="Carbon Neutral Water"
                  fill
                  className="object-cover"
                />
              </div>
              <ul className="list-disc pl-5 mb-8 space-y-2" style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(14px, 1.11vw, 16px)",
                  lineHeight: "150%",
                  color: "rgba(255, 255, 255, 0.9)",
              }}>
                <li>We refuse to accept plastic when glass and metal exist.</li>
                <li>We refuse to accept dirty energy when solar integration is possible.</li>
                <li>We refuse to build machines that end up in landfills. Our devices are built to endure.</li>
              </ul>
              <p
                className="mb-8"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(14px, 1.11vw, 16px)",
                  lineHeight: "150%",
                  color: "rgba(255, 255, 255, 0.6)",
                  maxWidth: "600px"
                }}
              >
                Refusal requires intense calculation, rigorous engineering and an uncompromising commitment to longevity. We do not manufacture products; we engineer lifecycles. We do not adapt to the standards; we define them. Our refusal is our strength, our innovation, and our defining characteristic.
              </p>
              <Link href="#" className="uppercase tracking-widest text-white/50 hover:text-white transition-colors text-[10px] font-medium" style={{ fontFamily: "'Manrope', sans-serif" }}>
                Read the full principle: The WAE Manifesto
              </Link>
            </div>
          </div>
        </section>

        <div className={containerClass}>
          <div className="w-full h-px bg-white/20 mt-[100px] lg:mt-[140px]" />
        </div>

        {/* SECTION 5: The Three Pillars */}
        <section className={`${containerClass} mt-[100px] lg:mt-[140px]`}>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20">
            <div className="w-full lg:w-[45%] flex flex-col">
              <h2 
                className="mb-8"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(32px, 3.33vw, 48px)",
                  lineHeight: "110%",
                  maxWidth: "400px"
                }}
              >
                The Three Pillars of Blue Innovation
              </h2>
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(12px, 0.97vw, 14px)",
                  lineHeight: "150%",
                  color: "rgba(255, 255, 255, 0.6)",
                  maxWidth: "400px"
                }}
              >
                Innovation is not just a buzzword; it is our foundation. It is the relentless pursuit of solving the unsolvable. In the context of water, this means rethinking every drop, every cycle, every system.
              </p>
            </div>
            <div className="w-full lg:w-[45%] flex flex-col gap-16 relative">
              {/* Connector line graphic from mockup (optional but adds detail) */}
              <div className="absolute left-[-40px] lg:left-[-100px] top-4 w-[20px] lg:w-[40px] h-[40px] border-t border-r border-white/20 hidden md:block"></div>
              
              <div>
                <h3 className="mb-4" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "clamp(20px, 1.66vw, 24px)" }}>
                  Climate & Resource Efficiency
                </h3>
                <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "clamp(14px, 1.11vw, 16px)", color: "rgba(255, 255, 255, 0.7)", lineHeight: "150%" }}>
                  Climate action does not start in a boardroom; it starts in the boiler room. We measure our impact in millions of liters saved, in kilowatt-hours reduced, in plastic bottles displaced. Our systems are engineered to perform, to last, and to protect the resources they utilize.
                </p>
              </div>
              
              <div>
                <h3 className="mb-4" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "clamp(20px, 1.66vw, 24px)" }}>
                  Stewardship & Conservation
                </h3>
                <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "clamp(14px, 1.11vw, 16px)", color: "rgba(255, 255, 255, 0.7)", lineHeight: "150%" }}>
                  Water is a shared resource, not an infinite commodity. We engineer systems that respect the natural water cycle. Conservation is not a feature; it is the core function of our technology. We build to preserve, to protect, and to sustain.
                </p>
              </div>
              
              <div>
                <h3 className="mb-4" style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "clamp(20px, 1.66vw, 24px)" }}>
                  Blue Innovation & Governance
                </h3>
                <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "clamp(14px, 1.11vw, 16px)", color: "rgba(255, 255, 255, 0.7)", lineHeight: "150%" }}>
                  We operate with absolute transparency. Our metrics are verified, our supply chains are audited, and our governance structures are built on ethical discipline. Innovation without governance is just an experiment; we build solutions that scale.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className={containerClass}>
          <div className="w-full h-px bg-white/20 mt-[100px] lg:mt-[140px]" />
        </div>

        {/* SECTION 6: Our Green Is Blue */}
        <section className="mt-[100px] lg:mt-[140px] w-full">
          <div className={`${containerClass} flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20 mb-[60px]`}>
            <div className="w-full lg:w-[35%]">
              <h2 
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(32px, 3.33vw, 48px)",
                  lineHeight: "110%",
                }}
              >
                Our Green Is Blue
              </h2>
            </div>
            <div className="w-full lg:w-[65%] grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(14px, 1.11vw, 16px)",
                  lineHeight: "150%",
                  color: "rgba(255, 255, 255, 0.8)",
                }}
              >
                The word ‘green’ has been commoditized, hollowed out by corporate convenience. We don’t do ‘green’. We do Blue.
              </p>
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(14px, 1.11vw, 16px)",
                  lineHeight: "150%",
                  color: "rgba(255, 255, 255, 0.8)",
                }}
              >
                Our focus is entirely, unapologetically, obsessively on water. Water is the metric by which we measure our success.
              </p>
            </div>
          </div>
          {/* Full width image spanning the container width */}
          <div className={containerClass}>
            <div className="w-full relative overflow-hidden" style={{ aspectRatio: "2.7 / 1" }}>
              <Image
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/006890d0-cec2-4d1e-4c70-ec21dfc8b700/public"
                alt="Our Green Is Blue"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <div className={containerClass}>
          <div className="w-full h-px bg-white/20 mt-[100px] lg:mt-[140px]" />
        </div>

        {/* SECTION 7: Rethinking the circular economy */}
        <section className={`${containerClass} mt-[100px] lg:mt-[140px] pb-[120px] lg:pb-[180px]`}>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20">
            <div className="w-full lg:w-[35%]">
              <h2 
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(32px, 3.33vw, 48px)",
                  lineHeight: "110%",
                  maxWidth: "350px"
                }}
              >
                Rethinking the circular economy
              </h2>
            </div>
            <div className="w-full lg:w-[65%] flex flex-col gap-8 md:gap-10">
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(14px, 1.11vw, 16px)",
                  lineHeight: "150%",
                  color: "rgba(255, 255, 255, 0.8)",
                  maxWidth: "700px"
                }}
              >
                The linear model of take-make-dispose is an archaic, environmentally destructive paradigm. We are actively dismantling it.
              </p>
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(14px, 1.11vw, 16px)",
                  lineHeight: "150%",
                  color: "rgba(255, 255, 255, 0.8)",
                  maxWidth: "700px"
                }}
              >
                Our approach to manufacturing is circular by design. We build for repair, for longevity, and for ultimate recyclability. We reject planned obsolescence.
              </p>
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(14px, 1.11vw, 16px)",
                  lineHeight: "150%",
                  color: "rgba(255, 255, 255, 0.8)",
                  maxWidth: "700px"
                }}
              >
                At WAE, sustainability is not an afterthought; it is the core of our business strategy. By embracing the circular economy, we ensure that our products leave a positive legacy, not a permanent footprint.
              </p>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </main>
  )
}