"use client"

import type { FC } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"

const containerClass = "mx-auto w-full max-w-[1440px] px-6 lg:px-[7.5vw]"

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

      <div className="relative z-50">
        <Header transparentBg />
      </div>

      {/* Main Content Area: header is 76px high on mobile + 40px gap = 116px */}
      <div className="relative z-10 w-full pt-[116px] lg:pt-[clamp(120px,14.7vw,212px)]">

        {/* HERO SECTION */}
        <section className={containerClass}>
          <div className="flex flex-col lg:flex-row justify-between items-start">
            {/* Media Video - order-1 on mobile (first), order-2 on desktop (right) */}
            <div className="w-full lg:w-[55%] max-w-[707px] order-1 lg:order-2">
              <div
                className="w-full relative overflow-hidden aspect-[707/541]"
              >
                <video
                  src="/web wae waelchimy.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Left Text Block - order-2 on mobile (after image), order-1 on desktop (left) */}
            <div className="flex flex-col w-full lg:w-[28.19vw] lg:max-w-[406px] order-2 lg:order-1 mt-[30px] lg:mt-0">
              <h1
                className="uppercase align-middle m-0"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(28px, 4.16vw, 60px)",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                }}
              >
                WAELCHEMY
              </h1>

              <div className="h-[21px] lg:h-[clamp(30px,4.16vw,60px)]" />

              <h2
                className="align-middle m-0"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(16px, 2.5vw, 36px)",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                }}
              >
                The Purity of Water.<span className="inline lg:hidden"> </span><br className="hidden lg:inline" />The Discipline of Activism.
              </h2>

              <div className="h-[12px] lg:h-[clamp(16px,1.66vw,24px)]" />

              <p
                className="align-middle m-0"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "120%",
                  letterSpacing: "0%",
                  color: "#AEAEAE",
                  maxWidth: "480px",
                }}
              >
                Water has always carried meanings far greater than mere utility. Across philosophy, science, and spiritual thought, it stands as the ultimate symbol of origin, transformation, renewal, and life itself. Civilizations have revered it not simply because it sustains our physical bodies, but because it reveals the exact conditions under which life can endure.
              </p>
            </div>
          </div>
        </section>

        {/* Divider 1: 40px gap -> hr -> 40px gap */}
        <div className={containerClass}>
          <div className="h-[40px] lg:h-[clamp(40px,6.38vw,92px)]" />
          <div className="w-full h-px bg-white/20" />
          <div className="h-[40px] lg:h-[clamp(40px,6.38vw,92px)]" />
        </div>

        {/* SECTION 2: We begin there. */}
        <section className={containerClass}>
          <div className="flex flex-col lg:flex-row items-start lg:items-stretch overflow-x-hidden">
            <h2
              className="shrink-0 align-middle m-0"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(16px, 2.77vw, 40px)",
                lineHeight: "100%",
                letterSpacing: "0%",
              }}
            >
              We begin there.
            </h2>

            <div className="h-[21px] lg:hidden" />
            <div className="hidden lg:block shrink-0" style={{ width: "clamp(40px, 11.04vw, 159px)" }} />
            <div className="hidden lg:block w-px bg-white/20 shrink-0" />
            <div className="hidden lg:block shrink-0" style={{ width: "clamp(20px, 3.47vw, 50px)" }} />

            <p
              className="w-full shrink-0 lg:w-[23.75vw] lg:max-w-[342px] align-middle m-0"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "120%",
                letterSpacing: "0%",
                color: "#AEAEAE",
              }}
            >
              We choose to see water not as a commodity to be packaged and consumed without thought, but as a foundational principle. A principle of balance. Of continuity. Of interdependence. Water teaches us that nothing truly exists in isolation—every drop is connected to a source, every source to a system, every system to a community, and every community to a shared future.
            </p>

            <div className="h-[24px] lg:hidden" />
            <div className="hidden lg:block shrink-0" style={{ width: "clamp(20px, 2.77vw, 40px)" }} />
            <div className="hidden lg:block w-px bg-white/20 shrink-0" />
            <div className="hidden lg:block shrink-0" style={{ width: "clamp(20px, 3.54vw, 51px)" }} />

            <p
              className="flex-1 min-w-0 lg:min-w-[300px] align-middle m-0"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "120%",
                letterSpacing: "0%",
                color: "#AEAEAE",
              }}
            >
              WAELCHEMY is the expression of that belief. It is the precise point where reverence becomes responsibility. Where purity is understood not as a marketing aesthetic, but as uncompromised integrity—of source, of system, and of intention. This is where true activism begins.
            </p>
          </div>
        </section>

        {/* Divider 2: 40px gap -> hr -> 40px gap */}
        <div className={containerClass}>
          <div className="h-[40px] lg:h-[clamp(40px,6.38vw,92px)]" />
          <div className="w-full h-px bg-white/20" />
          <div className="h-[40px] lg:h-[clamp(40px,6.38vw,92px)]" />
        </div>

        {/* SECTION 3: The Discipline of Refusal */}
        <section className={containerClass}>
          <div className="flex flex-col lg:flex-row items-start lg:items-stretch">
            <h2
              className="w-full shrink-0 align-middle m-0 lg:w-[19.65vw] lg:max-w-[283px]"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "clamp(12px, 2.5vw, 36px)",
                lineHeight: "120%",
                letterSpacing: "0%",
              }}
            >
              The Discipline of Refusal
            </h2>

            <div className="h-[25px] lg:hidden" />
            <div className="hidden lg:block shrink-0" style={{ width: "clamp(20px, 3.12vw, 45px)" }} />
            <div className="hidden lg:block w-px bg-white/20 shrink-0" />
            <div className="hidden lg:block shrink-0" style={{ width: "clamp(20px, 3.47vw, 50px)" }} />

            <div className="flex-1 flex flex-col w-full">
              <div className="w-full max-w-[846px] relative overflow-hidden aspect-[846/410]">
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/fea6035e-276e-4a09-d07a-4ebeeb1eaf00/public"
                  alt="The Discipline of Refusal"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="h-[40px] lg:h-[clamp(20px,2.43vw,35px)]" />

              <div
                className="flex flex-col"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                }}
              >
                <ul className="list-disc pl-5 space-y-2 lg:space-y-1">
                  <li>A refusal to accept plastic waste as an inevitable norm.</li>
                  <li>A refusal to reduce a life-giving resource to a disposable transaction.</li>
                  <li>A refusal to build modern convenience on the back of ecological decline.</li>
                </ul>
              </div>

              <div className="h-[20px] lg:h-[clamp(10px,1.04vw,15px)]" />

              <p
                className="align-middle m-0"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "120%",
                  letterSpacing: "0%",
                  color: "#aeaeae",
                }}
              >
                To honor water is to defend it from the systems that diminish it. The mission is to protect what is essential by radically redesigning what is excessive. The historical search for alchemy ends with water because water already contains the ultimate lesson: life is sustained not by extraction, but by balance; not by possession, but by stewardship.
              </p>

              <div className="h-[12px] lg:h-[clamp(10px,1.04vw,15px)]" />

              <p
                className="align-middle m-0"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "120%",
                  letterSpacing: "0%",
                  color: "#aeaeae",
                }}
              >
                <span style={{ color: "#AEAEAE" }}>WAELCHEMY</span> is that principle, made operational.
              </p>
            </div>
          </div>
        </section>

        {/* Divider 3: 40px gap -> hr -> 40px gap */}
        <div className={containerClass}>
          <div className="h-[40px] lg:h-[clamp(40px,6.38vw,92px)]" />
          <div className="w-full h-px bg-white/20" />
          <div className="h-[40px] lg:h-[clamp(40px,6.38vw,92px)]" />
        </div>

        {/* SECTION 4: Carbon Neutral Water */}
        <section className={containerClass}>
          <div className="flex flex-col lg:flex-row items-start lg:items-stretch">
            <h2
              className="w-full shrink-0 align-middle m-0 lg:w-[19.65vw] lg:max-w-[283px]"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(16px, 2.5vw, 36px)",
                lineHeight: "100%",
                letterSpacing: "0%",
              }}
            >
              Carbon Neutral Water : Hydration, Redesigned
            </h2>

            <div className="h-[40px] lg:hidden" />
            <div className="hidden lg:block shrink-0" style={{ width: "clamp(20px, 3.12vw, 45px)" }} />
            <div className="hidden lg:block w-px bg-white/20 shrink-0" />
            <div className="hidden lg:block shrink-0" style={{ width: "clamp(20px, 3.47vw, 50px)" }} />

            <div className="flex-1 flex flex-col w-full">
              <div className="w-full max-w-[846px] relative overflow-hidden aspect-[846/410]">
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/e2487f07-4628-47db-51cf-5f2fed632900/public"
                  alt="Carbon Neutral Water"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="h-[40px] lg:h-[clamp(20px,2.43vw,35px)]" />

              <p
                className="align-middle m-0"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "120%",
                  letterSpacing: "0%",
                  color: "#aeaeae",
                }}
              >
                A bottle is never just a bottle. It represents a heavy linear chain of extraction, packaging, long-haul transport, short-term use, and permanent waste. What appears convenient at the point of consumption carries an unsustainable ecological cost across its lifecycle.
              </p>

              <div className="h-[16px] lg:h-[clamp(10px,1.04vw,15px)]" />

              <p
                className="align-middle m-0"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "120%",
                  letterSpacing: "0%",
                  color: "#aeaeae",
                }}
              >
                <span style={{ color: "#fff" }}>Carbon Neutral Water </span>is not a tagline. It is a strict design imperative.
              </p>

              <div className="h-[16px] lg:h-[clamp(10px,1.04vw,15px)]" />

              <p
                className="align-middle m-0"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "120%",
                  letterSpacing: "0%",
                  color: "#aeaeae",
                }}
              >
                The approach requires actively replacing carbon-intensive, disposable habits with permanent refill infrastructure, highly efficient purification systems, and durable materials engineered for longevity. To lead responsibly, we must move beyond the bottle and consciously build the infrastructure that comes after it.
              </p>
            </div>
          </div>
        </section>

        {/* Divider 4: 40px gap -> hr -> 54px gap on mobile, clamp on desktop */}
        <div className={containerClass}>
          <div className="h-[40px] lg:h-[clamp(40px,6.38vw,92px)]" />
          <div className="w-full h-px bg-white/20" />
          <div className="h-[54px] lg:h-[clamp(40px,6.38vw,92px)]" />
        </div>

        {/* SECTION 5: The Three Pillars */}
        <section className={containerClass}>
          {/* Desktop Layout */}
          <div className="hidden lg:flex flex-row items-start items-stretch">
            <div className="w-full flex flex-col shrink-0 pr-[3.12vw] w-[31.94vw] max-w-[460px]">
              <div className="flex justify-between items-start">
                <h2
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(24px, 2.5vw, 36px)",
                    lineHeight: "110%",
                  }}
                >
                  The Three Pillars of<br />Blue Innovation
                </h2>
                <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/48b42c14-6d59-40b5-b839-2689e3f4a900/public" alt="Arrow" width={30} height={30} className="mt-2" />
              </div>
              <div style={{ height: "clamp(30px, 4.16vw, 60px)" }} />
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(12px, 0.97vw, 14px)",
                  lineHeight: "130%",
                  color: "#AEAEAE",
                  maxWidth: "350px",
                }}
              >
                Activism must be structured, principled, and engineered to endure. These three pillars define how philosophy is translated into daily practice:
              </p>
            </div>

            <div className="w-px bg-white/20 shrink-0" />
            <div className="shrink-0" style={{ width: "clamp(30px, 4.16vw, 60px)" }} />

            <div className="flex-1 flex flex-col w-full">
              {/* Pillar 1 */}
              <div>
                <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "clamp(18px, 1.66vw, 24px)", lineHeight: "110%", color: "#FFFFFF" }}>
                  Climate & Resource Efficiency
                </h3>
                <div style={{ height: "clamp(12px, 1.38vw, 20px)" }} />
                <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: "clamp(12px, 0.97vw, 14px)", lineHeight: "150%", color: "#AEAEAE" }}>
                  Climate leadership must be operational, not aspirational. Lifecycle emissions are reduced by replacing disposable plastics with durable stainless steel systems built for long-term utility. Energy efficiency, material longevity, and logistical discipline form the core architecture of responsible design. To use less and waste less is a strategic act of environmental intelligence.
                </p>
              </div>
              <div style={{ height: "clamp(20px, 2.77vw, 40px)" }} />
              <div className="w-full h-px bg-white/20" />
              <div style={{ height: "clamp(20px, 2.77vw, 40px)" }} />

              {/* Pillar 2 */}
              <div>
                <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "clamp(18px, 1.66vw, 24px)", lineHeight: "110%", color: "#FFFFFF" }}>
                  Stewardship & Conservation
                </h3>
                <div style={{ height: "clamp(12px, 1.38vw, 20px)" }} />
                <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: "clamp(12px, 0.97vw, 14px)", lineHeight: "150%", color: "#AEAEAE" }}>
                  Water is a finite, shared resource held in trust for future generations. Dedicated purification and refill models are engineered to completely eliminate plastic leakage and drastically lower environmental burdens. By changing the delivery system, responsibility evolves from a ceremonial gesture into an effortless, everyday habit.
                </p>
              </div>
              <div style={{ height: "clamp(20px, 2.77vw, 40px)" }} />
              <div className="w-full h-px bg-white/20" />
              <div style={{ height: "clamp(20px, 2.77vw, 40px)" }} />

              {/* Pillar 3 */}
              <div>
                <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "clamp(18px, 1.66vw, 24px)", lineHeight: "110%", color: "#FFFFFF" }}>
                  Blue Innovation & Governance
                </h3>
                <div style={{ height: "clamp(12px, 1.38vw, 20px)" }} />
                <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: "clamp(12px, 0.97vw, 14px)", lineHeight: "150%", color: "#AEAEAE" }}>
                  Innovation without governance risks becoming performative. Governance without innovation risks total inertia. Progress demands both. Elegant industrial design must be paired with rigorous, measurable accountability—creating systems that are disciplined in their impact and transparent in their intent.
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="flex lg:hidden flex-col">
            <h2
              className="align-middle m-0"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "28px",
                lineHeight: "120%",
                letterSpacing: "0%",
              }}
            >
              The Three Pillars of Blue Innovation
            </h2>

            <div className="h-[20px]" />

            <p
              className="align-middle m-0"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "120%",
                letterSpacing: "0%",
                color: "#AEAEAE",
              }}
            >
              Activism must be structured, principled, and engineered to endure. These three pillars define how philosophy is translated into daily practice:
            </p>

            <div className="h-[45px]" />

            {/* Pillars with left indicator layout: 27x27 px, 65px gap, vertical rule, 31px gap */}
            <div className="flex flex-row items-stretch">
              {/* Left column: 27x27 px icon (no outer border) */}
              <div className="shrink-0 flex flex-col items-start">
                <div className="w-[27px] h-[27px] relative">
                  <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/48b42c14-6d59-40b5-b839-2689e3f4a900/public"
                    alt="Arrow"
                    width={27}
                    height={27}
                    className="w-[27px] h-[27px] object-contain"
                  />
                </div>
              </div>

              {/* 65px gap between 27x27 icon and vertical rule */}
              <div className="w-[65px] shrink-0" />

              {/* Vertical Rule */}
              <div className="w-px bg-white/20 shrink-0 self-stretch" />

              {/* 31px gap between vertical rule and right column */}
              <div className="w-[31px] shrink-0" />

              {/* Right column of pillars */}
              <div className="flex-1 min-w-0 flex flex-col">
                {/* Pillar 1 */}
                <div>
                  <h3
                    className="align-middle m-0 text-white"
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                    }}
                  >
                    Climate & Resource Efficiency
                  </h3>
                  <div className="h-[24px]" />
                  <p
                    className="align-middle m-0"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 400,
                      fontSize: "12px",
                      lineHeight: "120%",
                      letterSpacing: "0%",
                      color: "#AEAEAE",
                    }}
                  >
                    Climate leadership must be operational, not aspirational. Lifecycle emissions are reduced by replacing disposable plastics with durable stainless steel systems built for long-term utility. Energy efficiency, material longevity, and logistical discipline form the core architecture of responsible design. To use less and waste less is a strategic act of environmental intelligence.
                  </p>
                </div>

                <div className="h-[26px]" />
                <div className="w-full h-px bg-white/20" />
                <div className="h-[26px]" />

                {/* Pillar 2 */}
                <div>
                  <h3
                    className="align-middle m-0 text-white"
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                    }}
                  >
                    Stewardship & Conservation
                  </h3>
                  <div className="h-[24px]" />
                  <p
                    className="align-middle m-0"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 400,
                      fontSize: "12px",
                      lineHeight: "120%",
                      letterSpacing: "0%",
                      color: "#AEAEAE",
                    }}
                  >
                    Water is a finite, shared resource held in trust for future generations. Dedicated purification and refill models are engineered to completely eliminate plastic leakage and drastically lower environmental burdens. By changing the delivery system, responsibility evolves from a ceremonial gesture into an effortless, everyday habit.
                  </p>
                </div>

                <div className="h-[26px]" />
                <div className="w-full h-px bg-white/20" />
                <div className="h-[26px]" />

                {/* Pillar 3 */}
                <div>
                  <h3
                    className="align-middle m-0 text-white"
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                    }}
                  >
                    Blue Innovation & Governance
                  </h3>
                  <div className="h-[24px]" />
                  <p
                    className="align-middle m-0"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 400,
                      fontSize: "12px",
                      lineHeight: "120%",
                      letterSpacing: "0%",
                      color: "#AEAEAE",
                    }}
                  >
                    Innovation without governance risks becoming performative. Governance without innovation risks total inertia. Progress demands both. Elegant industrial design must be paired with rigorous, measurable accountability—creating systems that are disciplined in their impact and transparent in their intent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider 5: 40px gap -> hr -> 40px gap */}
        <div className={containerClass}>
          <div className="h-[40px] lg:h-[clamp(40px,6.38vw,92px)]" />
          <div className="w-full h-px bg-white/20" />
          <div className="h-[40px] lg:h-[clamp(40px,6.38vw,92px)]" />
        </div>

        {/* SECTION 6: Our Green Is Blue */}
        <section className={containerClass}>
          {/* Top Image: 40px gap after it on mobile */}
          <div className="w-full relative overflow-hidden aspect-[1224/502] mb-[40px] lg:mb-[72px]">
            <Image
              src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/006890d0-cec2-4d1e-4c70-ec21dfc8b700/public"
              alt="Our Green Is Blue"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col lg:flex-row items-start justify-between">
            <h2
              className="mb-[24px] lg:mb-0 align-middle m-0"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(28px, 2.77vw, 40px)",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#FFF"
              }}
            >
              Our Green Is Blue
            </h2>
            <div className="flex flex-col shrink-0 w-full lg:max-w-[467px] space-y-[16px]">
              <p
                className="align-middle m-0"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "120%",
                  letterSpacing: "0%",
                  color: "#AEAEAE",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 700,
                    fontSize: "12px",
                    lineHeight: "120%",
                    letterSpacing: "0%",
                    color: "#FFFFFF",
                  }}
                >
                  "Our Green Is Blue"
                </span>{" "}
                is more than a statement of belief; it is the foundation of an entire worldview.
              </p>
              <p
                className="align-middle m-0"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "120%",
                  letterSpacing: "0%",
                  color: "#AEAEAE",
                }}
              >
                The baseline ecological truth is absolute: without water, there is no life. Forests fail, food systems fracture, and human futures fade. Water shapes our climate, our communities, our commerce, and our civilizations. It determines the resilience of landscapes and the continuity of global economies.
              </p>
              <p
                className="align-middle m-0"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "120%",
                  letterSpacing: "0%",
                  color: "#AEAEAE",
                }}
              >
                That is why the planet cannot be treated as a mere stakeholder in business. Instead, <span style={{ fontWeight: 700, color: "#AEAEAE" }}>business must be treated as a proud steward of the planet.</span>
              </p>
              <p
                className="align-middle m-0"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "120%",
                  letterSpacing: "0%",
                  color: "#AEAEAE",
                }}
              >
                Welcome to WAELCHEMY. Where we honor water, design with discipline, and create systems where progress serves the earth—not the other way around.
              </p>
            </div>
          </div>
        </section>

        {/* Gap Before Footer */}
        <div className="h-[60px] lg:h-[124px]" />
      </div>

      <Footer />
    </main>
  )
}