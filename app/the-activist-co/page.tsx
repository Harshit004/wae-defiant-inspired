"use client"

import type { FC } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"

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
      {/* paddingTop: 212px -> clamp(120px, 14.7vw, 212px) */}
      <div className="relative z-10 w-full" style={{ paddingTop: "clamp(120px, 14.7vw, 212px)" }}>

        {/* HERO SECTION */}
        <section className={containerClass}>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-0">
            {/* Left Text */}
            <div className="flex flex-col pt-0 w-full lg:w-[28.19vw] lg:max-w-[406px]">
              <h1
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(36px, 4.16vw, 60px)",
                  lineHeight: "100%",
                  textTransform: "capitalize",
                  margin: 0,
                }}
              >
                WAELCHEMY
              </h1>
              <div style={{ height: "clamp(30px, 4.16vw, 60px)" }} />
              <h2
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(24px, 2.5vw, 36px)",
                  lineHeight: "100%",
                  margin: 0,
                }}
              >
                The Purity of Water.<br />
                The Discipline of Activism.
              </h2>
              <div style={{ height: "clamp(16px, 1.66vw, 24px)" }} />
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(12px, 0.97vw, 14px)",
                  lineHeight: "130%",
                  color: "#AEAEAE",
                  maxWidth: "480px",
                  margin: 0,
                }}
              >
                Water has always carried meanings far greater than mere utility. Across philosophy, science, and spiritual thought, it stands as the ultimate symbol of origin, transformation, renewal, and life itself. Civilizations have revered it not simply because it sustains our physical bodies, but because it reveals the exact conditions under which life can endure.
              </p>
            </div>

            {/* Right Video - Cropped to 707x541 relative */}
            <div className="w-full lg:w-[55%] max-w-[707px]">
              <div
                className="w-full relative overflow-hidden"
                style={{
                  aspectRatio: "707 / 541",
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

        {/* Divider 1 */}
        <div className={containerClass}>
          <div style={{ height: "clamp(40px, 6.38vw, 92px)" }} />
          <div className="w-full h-px bg-white/20" />
          <div style={{ height: "clamp(40px, 6.38vw, 92px)" }} />
        </div>

        {/* SECTION 2: We begin there. */}
        <section className={containerClass}>
          <div className="flex flex-col lg:flex-row items-start lg:items-stretch overflow-x-hidden pb-8 lg:pb-0">
            <h2
              className="shrink-0 mb-8 lg:mb-0"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(28px, 2.77vw, 40px)",
                lineHeight: "120%",
              }}
            >
              We begin there.
            </h2>
            <div className="hidden lg:block shrink-0" style={{ width: "clamp(40px, 11.04vw, 159px)" }} />
            <div className="hidden lg:block w-px bg-white/20 shrink-0" />
            <div className="hidden lg:block shrink-0" style={{ width: "clamp(20px, 3.47vw, 50px)" }} />
            <p
              className="w-full shrink-0 mb-8 lg:mb-0 lg:w-[23.75vw] lg:max-w-[342px]"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(12px, 0.97vw, 14px)",
                lineHeight: "130%",
                color: "#AEAEAE",
              }}
            >
              We choose to see water not as a commodity to be packaged and consumed without thought, but as a foundational principle. A principle of balance. Of continuity. Of interdependence. Water teaches us that nothing truly exists in isolation—every drop is connected to a source, every source to a system, every system to a community, and every community to a shared future.
            </p>
            <div className="hidden lg:block shrink-0" style={{ width: "clamp(20px, 2.77vw, 40px)" }} />
            <div className="hidden lg:block w-px bg-white/20 shrink-0" />
            <div className="hidden lg:block shrink-0" style={{ width: "clamp(20px, 3.54vw, 51px)" }} />
            <p
              className="flex-1 min-w-[300px]"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(12px, 0.97vw, 14px)",
                lineHeight: "100%",
                color: "#AEAEAE",
              }}
            >
              WAELCHEMY is the expression of that belief. It is the precise point where reverence becomes responsibility. Where purity is understood not as a marketing aesthetic, but as uncompromised integrity—of source, of system, and of intention. This is where true activism begins.
            </p>
          </div>
        </section>

        {/* Divider 2 */}
        <div className={containerClass}>
          <div style={{ height: "clamp(40px, 6.38vw, 92px)" }} />
          <div className="w-full h-px bg-white/20" />
          <div style={{ height: "clamp(40px, 6.38vw, 92px)" }} />
        </div>

        {/* SECTION 3: The Discipline of Refusal */}
        <section className={containerClass}>
          <div className="flex flex-col lg:flex-row items-start lg:items-stretch">
            <h2
              className="w-full shrink-0 mb-8 lg:mb-0 lg:w-[19.65vw] lg:max-w-[283px]"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(24px, 2.5vw, 36px)",
                lineHeight: "110.00000000000001%",
              }}
            >
              The Discipline of Refusal
            </h2>
            <div className="hidden lg:block shrink-0" style={{ width: "clamp(20px, 3.12vw, 45px)" }} />
            <div className="hidden lg:block w-px bg-white/20 shrink-0" />
            <div className="hidden lg:block shrink-0" style={{ width: "clamp(20px, 3.47vw, 50px)" }} />
            <div className="flex-1 flex flex-col w-full">
              <div className="w-full max-w-[846px] relative overflow-hidden" style={{ aspectRatio: "846 / 410" }}>
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/5dd07625-6ab3-4be6-1401-93e241a6aa00/public"
                  alt="The Discipline of Refusal"
                  fill
                  className="object-cover"
                />
              </div>
              <div style={{ height: "clamp(20px, 2.43vw, 35px)" }} />
              <div
                className="flex flex-col gap-1"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(12px, 0.97vw, 14px)",
                  lineHeight: "130%",
                }}
              >
                <ul className="list-disc pl-5">
                  <li>A refusal to accept plastic waste as an inevitable norm.</li>
                  <li>A refusal to reduce a life-giving resource to a disposable transaction.</li>
                  <li>A refusal to build modern convenience on the back of ecological decline.</li>
                </ul>
              </div>
              <div style={{ height: "clamp(10px, 1.04vw, 15px)" }} />
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(12px, 0.97vw, 14px)",
                  lineHeight: "130%",
                  color: "#aeaeae",
                }}
              >
                To honor water is to defend it from the systems that diminish it. The mission is to protect what is essential by radically redesigning what is excessive. The historical search for alchemy ends with water because water already contains the ultimate lesson: life is sustained not by extraction, but by balance; not by possession, but by stewardship.
              </p>
              <div style={{ height: "clamp(10px, 1.04vw, 15px)" }} />
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(12px, 0.97vw, 14px)",
                  lineHeight: "130%",
                  color: "#aeaeae",
                }}
              >
                <span style={{ color: "#AEAEAE" }}>WAELCHEMY</span> is that principle, made operational.
              </p>
            </div>
          </div>
        </section>

        {/* Divider 3 */}
        <div className={containerClass}>
          <div style={{ height: "clamp(40px, 6.38vw, 92px)" }} />
          <div className="w-full h-px bg-white/20" />
          <div style={{ height: "clamp(40px, 6.38vw, 92px)" }} />
        </div>

        {/* SECTION 4: Carbon Neutral Water */}
        <section className={containerClass}>
          <div className="flex flex-col lg:flex-row items-start lg:items-stretch">
            <h2
              className="w-full shrink-0 mb-8 lg:mb-0 lg:w-[19.65vw] lg:max-w-[283px]"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(24px, 2.5vw, 36px)",
                lineHeight: "110.00000000000001%",
              }}
            >
              Carbon Neutral Water : Hydration, Redesigned
            </h2>
            <div className="hidden lg:block shrink-0" style={{ width: "clamp(20px, 3.12vw, 45px)" }} />
            <div className="hidden lg:block w-px bg-white/20 shrink-0" />
            <div className="hidden lg:block shrink-0" style={{ width: "clamp(20px, 3.47vw, 50px)" }} />
            <div className="flex-1 flex flex-col w-full">
              <div className="w-full max-w-[846px] relative overflow-hidden" style={{ aspectRatio: "846 / 410" }}>
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/5dd07625-6ab3-4be6-1401-93e241a6aa00/public"
                  alt="Carbon Neutral Water"
                  fill
                  className="object-cover"
                />
              </div>
              <div style={{ height: "clamp(20px, 2.43vw, 35px)" }} />
              <div
                className="flex flex-col gap-1"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(12px, 0.97vw, 14px)",
                  lineHeight: "130%",
                }}
              >
                <ul className="list-disc pl-5">
                  <li>A refusal to accept plastic waste as an inevitable norm.</li>
                  <li>A refusal to reduce a life-giving resource to a disposable transaction.</li>
                  <li>A refusal to build modern convenience on the back of ecological decline.</li>
                </ul>

              </div>
              <div style={{ height: "clamp(10px, 1.04vw, 15px)" }} />
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(12px, 0.97vw, 14px)",
                  lineHeight: "130%",
                  color: "#aeaeae",
                }}
              >
                To honor water is to defend it from the systems that diminish it. The mission is to protect what is essential by radically redesigning what is excessive. The historical search for alchemy ends with water because water already contains the ultimate lesson: life is sustained not by extraction, but by balance; not by possession, but by stewardship.
              </p>
              <div style={{ height: "clamp(10px, 1.04vw, 15px)" }} />
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(12px, 0.97vw, 14px)",
                  lineHeight: "130%",
                  color: "#aeaeae",
                }}
              >
                <span style={{ color: "#AEAEAE" }}>WAELCHEMY</span> is that principle, made operational.
              </p>
            </div>
          </div>
        </section>

        {/* Divider 4 */}
        <div className={containerClass}>
          <div style={{ height: "clamp(40px, 6.38vw, 92px)" }} />
          <div className="w-full h-px bg-white/20" />
          <div style={{ height: "clamp(40px, 6.38vw, 92px)" }} />
        </div>

        {/* SECTION 5: The Three Pillars */}
        <section className={containerClass}>
          <div className="flex flex-col lg:flex-row items-start lg:items-stretch">
            <div className="w-full flex flex-col shrink-0 mb-12 lg:mb-0 lg:pr-[3.12vw] lg:w-[31.94vw] lg:max-w-[460px]">
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

            <div className="hidden lg:block w-px bg-white/20 shrink-0" />
            <div className="hidden lg:block shrink-0" style={{ width: "clamp(30px, 4.16vw, 60px)" }} />

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
        </section>

        {/* Divider 5 */}
        <div className={containerClass}>
          <div style={{ height: "clamp(40px, 6.38vw, 92px)" }} />
          <div className="w-full h-px bg-white/20" />
          <div style={{ height: "clamp(40px, 6.38vw, 92px)" }} />
        </div>

        {/* SECTION 6: Our Green Is Blue */}
        <section className={containerClass}>
          <div className="flex flex-col items-start">
            <h2
              className="w-full shrink-0"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(28px, 2.77vw, 40px)",
                lineHeight: "100%",
              }}
            >
              Our Green Is Blue
            </h2>
            <div style={{ height: "clamp(30px, 4.3vw, 62px)" }} />

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:w-[40.97vw] lg:max-w-[590px]">
              <div className="flex flex-col">
                <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "clamp(12px, 0.97vw, 14px)", lineHeight: "130%", color: "#AEAEAE" }}>
                  <span style={{ fontWeight: 700, color: "#FFF" }}>"Our Green Is Blue"</span> is more than a statement of belief; it is the foundation of an entire worldview.
                </p>
                <div style={{ height: "clamp(24px, 3.4vw, 49px)" }} />
                <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "clamp(12px, 0.97vw, 14px)", lineHeight: "130%", color: "#AEAEAE" }}>
                  The baseline ecological truth is absolute: without water, there is no life. Forests fail, food systems fracture, and human futures fade. Water shapes our climate, our communities, our commerce, and our civilizations. It determines the resilience of landscapes and the continuity of global economies.
                </p>
              </div>
              <div className="flex flex-col">
                <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "clamp(12px, 0.97vw, 14px)", lineHeight: "130%", color: "#AEAEAE" }}>
                  That is why the planet cannot be treated as a mere stakeholder in business. Instead, business must be treated as a <span style={{ fontWeight: 700, color: "#FFF", lineHeight: "100%" }}>proud steward of the planet.</span>
                </p>
                <div style={{ height: "clamp(24px, 3.4vw, 49px)" }} />
                <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: "clamp(12px, 0.97vw, 14px)", lineHeight: "130%", color: "#AEAEAE" }}>
                  Welcome to WAELCHEMY. Where we honor water, design with discipline, and create systems where progress serves the earth—not the other way around.
                </p>
              </div>
            </div>
          </div>
          <div style={{ height: "clamp(30px, 3.61vw, 52px)" }} />
          <div className="w-full max-w-[1224px] relative overflow-hidden" style={{ aspectRatio: "1224 / 502" }}>
            <Image
              src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/006890d0-cec2-4d1e-4c70-ec21dfc8b700/public"
              alt="Our Green Is Blue"
              fill
              className="object-cover"
            />
          </div>
        </section>

        {/* Divider 6 */}
        <div className={containerClass}>
          <div style={{ height: "clamp(40px, 6.38vw, 92px)" }} />
          <div className="w-full h-px bg-white/20" />
          <div style={{ height: "clamp(40px, 6.38vw, 92px)" }} />
        </div>

        {/* SECTION 7: Rethinking the Circular Economy */}
        <section className={containerClass}>
          <div className="flex flex-col lg:flex-row items-start">
            <h2
              className="flex-1 mb-8 lg:mb-0"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(28px, 2.77vw, 40px)",
                lineHeight: "130%",
              }}
            >
              Rethinking the<br className="hidden lg:block" />
              Circular Economy
            </h2>
            <div className="w-full flex flex-col shrink-0 lg:w-[36.45vw] lg:max-w-[525px]">
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(12px, 0.97vw, 14px)",
                  lineHeight: "130%",
                  color: "#AEAEAE",
                }}
              >
                The circular economy is, at its core, an ethical correction. It asks a demanding question: Why are we still designing waste into systems we know must endure?
              </p>
              <div style={{ height: "clamp(10px, 1.04vw, 15px)" }} />
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(12px, 0.97vw, 14px)",
                  lineHeight: "130%",
                  color: "#AEAEAE",
                }}
              >
                The answer is to design differently. We reject the linear logic of "extract, make, waste," and choose to treat materials as permanent assets, infrastructure as a long-term investment, and waste as a fundamental failure of design.
              </p>
              <div style={{ height: "clamp(10px, 1.04vw, 15px)" }} />
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(12px, 0.97vw, 14px)",
                  lineHeight: "130%",
                  color: "#AEAEAE",
                }}
              >
                Water stewardship, responsible consumption, climate action, and institutional accountability are not parallel, separate concerns. They are deeply interdependent. A circular water system advances them all simultaneously. This activism does not stop at critique it builds the functional alternative.
              </p>
            </div>
          </div>
        </section>

        {/* 124px Gap Before Footer */}
        <div style={{ height: "clamp(60px, 8.61vw, 124px)" }} />
      </div>

      <Footer />
    </main>
  )
}