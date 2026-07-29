"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"

const containerClass = "mx-auto w-full px-[24px] md:px-[7.5vw]"

const officeLocations = [
  {
    city: "Mumbai",
    address: "91 Springboard Business Hub Godrej & Boyce, Gate No. 2 LBS Marg, Vikhroli Mumbai – 400079",
    image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/276d7855-303e-4c7e-83ee-ed42b2e70c00/public",
  },
  {
    city: "Bengaluru",
    address: "91 Springboard George Thangaiah Complex 13, 80 Feet Road, Near Sir CV Raman Hospital Indiranagar, Bengaluru – 560038",
    image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/65f6c99a-b24b-4aec-b68a-435663b14800/public",
  },
  {
    city: "Hyderabad",
    address: "91 Springboard Business Hub Pvt. Ltd. Mytri Square, 2-41/11/6/2 Gachibowli-Miyapur Road, Kondapur, Hyderabad – 500084",
    image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/7b27b04d-7e33-48ed-6b0b-bb1f2e85af00/public",
  },
  {
    city: "Pune",
    address: "91 Springboard Business Hub Pvt. Ltd. 9th–12th Floor, Sadanand Business Centre NH-48 Service Road, Baner Pune, Maharashtra – 411045",
    image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ffc4c3b1-125a-4fcd-3b60-6a4632cf0000/public",
  },
]

const supportItems = [
  { title: "Commercial Support", desc: "Product enquiries, quotations, and post-sales assistance." },
  { title: "Logistics Support", desc: "Order processing, delivery status, and product availability." },
  { title: "Technical Support", desc: "Product selection, technical guidance, and application support." },
  { title: "Service Support", desc: "Installation, maintenance, and service intervention requests." },
]

export default function ContactUsPage() {
  const router = useRouter()
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [formMessage, setFormMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus("submitting")
    const form = e.currentTarget
    const formData = new FormData(form)

    const payload = {
      fullName: formData.get("name"),
      companyName: formData.get("companyName"),
      phone: formData.get("contact"),
      email: formData.get("email"),
      city: formData.get("city"),
      message: formData.get("message"),
      pageLink: window.location.href,
      type: "contact-us",
    }

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error()
      router.push("/thank-you")
    } catch {
      setFormStatus("error")
      setFormMessage("Something went wrong. Please try again.")
    }
  }

  return (
    <main className="relative min-h-screen bg-[#0F0F0F] text-white overflow-x-hidden">
      {/* ── Top gradient (same as data-privacy-policy) ── */}
      <div
        className="absolute top-0 left-0 w-full pointer-events-none z-0"
        style={{
          background: "linear-gradient(160deg, #004063 4.52%, #0F0F0F 40%)",
          height: "clamp(500px, 80vh, 875px)",
        }}
      />

      <div>
        <Header transparentBg />
      </div>
      {/* ── HERO + FORM SECTION ── */}
      {/* 38px gap after header on mobile, 77px+ on desktop */}
      <section className="relative z-10 w-full pt-[110px] md:pt-[clamp(180px,16.3vw,235px)] pb-0">
        <div className={containerClass}>
          {/* 2-col justify-between on desktop, 1-col on mobile */}
          <div className="flex flex-col md:flex-row justify-between items-start">

            {/* LEFT */}
            <div className="w-full md:w-[clamp(260px,27.3vw,393px)] shrink-0">
              {/* Questions or Ideas? */}
              <p className="font-manrope font-normal text-[12px] md:text-[14px] leading-[100%] uppercase text-white mb-[9px] md:mb-[18px]">
                Questions or Ideas?
              </p>

              {/* Let's Connect. */}
              <h1 className="font-manrope md:font-inter-tight font-medium md:font-normal text-[28px] md:text-[clamp(40px,4.17vw,60px)] leading-[120%] md:leading-[100%] text-white mb-[9px] md:mb-[62px]">
                Let&apos;s Connect.
              </h1>
              
              <p className="font-manrope font-normal text-[12px] leading-[120%] text-[#AEAEAE] mb-[41px] md:mb-[62px]">
                Whether you&apos;re planning a project, exploring our solutions, or simply looking for expert guidance, we&apos;d love to hear from you. Our team is here to help you make informed decisions every step of the way.
              </p>

              {/* Corporate Office */}
              <p className="font-manrope md:font-inter-tight font-bold md:font-medium text-[12px] md:text-[14px] leading-[100%] md:leading-[200%] text-white mb-[24px] md:mb-0">
                Corporate Office
              </p>
              <p className="font-manrope font-medium text-[12px] md:text-[14px] leading-[100%] md:leading-[130%] text-[#AEAEAE] mb-[30px] md:mb-[19px]">
                H-18, H Block, Sector 63, Noida, Uttar Pradesh – 201301
              </p>

              {/* Innovation Centre */}
              <p className="font-manrope md:font-inter-tight font-bold md:font-medium text-[12px] md:text-[14px] leading-[100%] text-white mb-[12px] md:mb-[8px]">
                Noida (Innovation Centre)
              </p>
              <p className="font-manrope font-normal text-[12px] md:text-[14px] leading-[100%] md:leading-[130%] text-[#AEAEAE] mb-[30px] md:mb-[19px]">
                D 247/2 , D Block, Sector 63,<br />Noida, Uttar Pradesh – 201301
              </p>

              {/* Email */}
              <p className="font-manrope md:font-inter-tight font-bold md:font-medium text-[12px] md:text-[14px] leading-[100%] text-white mb-[12px] md:mb-[8px]">
                Email
              </p>
              <div>
                <a
                  href="mailto:marketing@waecorp.com"
                  className="font-manrope font-medium text-[12px] md:text-[14px] leading-[100%] text-[#AEAEAE] block no-underline"
                >
                  marketing@waecorp.com
                </a>
                <a
                  href="mailto:info@waecorp.com"
                  className="font-manrope font-medium text-[12px] md:text-[14px] leading-[100%] text-[#AEAEAE] block no-underline mt-[4px]"
                >
                  info@waecorp.com
                </a>
              </div>
            </div>

            {/* Mobile divider between details and form */}
            <div className="block md:hidden w-full my-[40px]">
              <div className="h-[1px] bg-white/20 w-full" />
            </div>

            {/* RIGHT (Form) */}
            <div className="w-full md:w-[clamp(300px,40.3vw,581px)] shrink-0">
              {formStatus === "success" ? (
                <div style={{ paddingTop: "0" }}>
                  <p
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 400,
                      fontSize: "32px",
                      lineHeight: "110%",
                      color: "#FFFFFF",
                      marginBottom: "16px",
                    }}
                  >
                    Message received.
                  </p>
                  <p
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 400,
                      fontSize: "14px",
                      color: "#AEAEAE",
                    }}
                  >
                    {formMessage}
                  </p>
                  <button
                    onClick={() => setFormStatus("idle")}
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.6)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textDecoration: "underline",
                      textUnderlineOffset: "4px",
                      marginTop: "32px",
                      padding: 0,
                    }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <style>{`
                    .cu-input {
                      display: block;
                      width: 100%;
                      height: 43px;
                      background: transparent;
                      border: none;
                      border-bottom: 1px solid rgba(255,255,255,0.2);
                      color: #FFFFFF;
                      font-family: 'Manrope', sans-serif;
                      font-weight: 400;
                      font-size: 14px;
                      line-height: 100%;
                      letter-spacing: 0%;
                      outline: none;
                      padding: 0;
                      transition: border-color 0.25s;
                      box-sizing: border-box;
                      margin-bottom: 24px;
                    }
                    .cu-input::placeholder {
                      color: #AEAEAE;
                    }
                    .cu-input:focus {
                      border-bottom-color: rgba(255,255,255,0.7);
                    }
                    .cu-textarea {
                      display: block;
                      width: 100%;
                      height: 99px;
                      background: transparent;
                      border: none;
                      border-bottom: 1px solid rgba(255,255,255,0.2);
                      color: #FFFFFF;
                      font-family: 'Manrope', sans-serif;
                      font-weight: 400;
                      font-size: 14px;
                      line-height: 100%;
                      letter-spacing: 0%;
                      outline: none;
                      padding: 0;
                      resize: none;
                      transition: border-color 0.25s;
                      box-sizing: border-box;
                    }
                    .cu-textarea::placeholder {
                      color: #AEAEAE;
                    }
                    .cu-textarea:focus {
                      border-bottom-color: rgba(255,255,255,0.7);
                    }
                  `}</style>

                  <input className="cu-input" type="text" name="name" placeholder="Name*" required />
                  <input className="cu-input" type="text" name="companyName" placeholder="Company Name*" required />
                  <input className="cu-input" type="tel" name="contact" placeholder="Contact No.*" required />
                  <input className="cu-input" type="email" name="email" placeholder="Official Email*" required />
                  <input className="cu-input" type="text" name="city" placeholder="City*" />
                  <textarea className="cu-textarea" name="message" placeholder="Your Message" maxLength={2000} />

                  <div className="h-[40px] md:h-[62px]" />
                  
                  {/* reCAPTCHA placeholder for mobile matching the design */}
                  <div className="mb-[24px] md:mb-[62px]">
                    <div className="bg-white rounded w-[200px] h-[50px] flex items-center justify-between px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border border-gray-300 rounded-sm bg-white" />
                        <span className="text-[#555555] font-roboto text-[12px]">I'm not a robot</span>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <Image src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" width={24} height={24} />
                        <span className="text-[8px] text-[#555555] mt-1">reCAPTCHA</span>
                      </div>
                    </div>
                  </div>

                  {formStatus === "error" && (
                    <p
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: "12px",
                        color: "#ef4444",
                        marginBottom: "12px",
                      }}
                    >
                      {formMessage}
                    </p>
                  )}

                  {/* Submit button — 49px high, no arrow */}
                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    style={{
                      width: "100%",
                      height: "49px",
                      background: "#FFFFFF",
                      color: "#000000",
                      border: "none",
                      cursor: formStatus === "submitting" ? "not-allowed" : "pointer",
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      opacity: formStatus === "submitting" ? 0.6 : 1,
                      transition: "opacity 0.2s, background 0.2s, color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      if (formStatus !== "submitting") {
                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.88)"
                      }
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "#FFFFFF"
                    }}
                  >
                    {formStatus === "submitting" ? "Submitting…" : "Submit"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 92px gap + divider + 92px gap on desktop, 40px on mobile */}
        <div className="h-[40px] md:h-[92px]" />
        <div className={containerClass}>
          <div className="h-[1px] bg-white/20 w-full" />
        </div>
        <div className="h-[40px] md:h-[92px]" />

        {/* ── SUPPORT SECTION ── */}
        <div className={containerClass}>
          <div className="flex flex-col md:flex-row justify-between items-start">

            {/* LEFT support column */}
            <div className="w-full md:w-[clamp(240px,27.3vw,393px)] shrink-0">
              <h2 className="font-manrope font-medium md:font-normal text-[20px] md:text-[clamp(28px,2.78vw,40px)] leading-[50px] text-white mb-[15px] md:mb-[24px]">
                Support That Stays<br className="hidden md:block" /> With You
              </h2>
              <p className="font-manrope font-medium text-[12px] md:text-[14px] leading-[120%] md:leading-[130%] text-[#AEAEAE] mb-[40px] md:mb-[62px]">
                Need assistance? Our Customer Care team is available to ensure you receive timely support whenever you need it.
              </p>

              <p className="font-inter-tight font-medium text-[11px] leading-[100%] text-white uppercase tracking-[0.06em] mb-[12px]">
                24×7 Customer Support
              </p>
              <a
                href="tel:+911204069800"
                className="font-inter-tight font-normal text-[16px] leading-[100%] text-white no-underline"
              >
                +91-120-406-9800
              </a>
            </div>

            {/* RIGHT support column: vertical divider + content */}
            <div className="w-full md:w-[clamp(300px,50vw,720px)] shrink-0 flex flex-col md:flex-row mt-[40px] md:mt-0">
              {/* Divider (horizontal on mobile, vertical on desktop) */}
              <div className="h-[1px] md:h-auto w-full md:w-[1px] bg-white/20 shrink-0 self-stretch mb-[40px] md:mb-0" />

              {/* Gap after divider on desktop */}
              <div className="hidden md:block w-[50px] shrink-0" />

              {/* Content */}
              <div className="flex-1">
                <p className="font-manrope font-normal text-[12px] md:text-[14px] leading-[130%] text-[#AEAEAE] mb-[48px]">
                  From technical guidance to service requests, we&apos;re committed to providing responsive and reliable assistance throughout your journey with WAE.
                </p>

                {/* Support items */}
                <div className="flex flex-col gap-[14px]">
                  {supportItems.map((item, i) => (
                    <div key={item.title}>
                      <p className="font-manrope font-medium text-[12px] md:text-[14px] leading-[100%] text-white mb-[14px]">
                        {item.title}
                      </p>
                      <p className="font-manrope font-medium text-[12px] md:text-[14px] leading-[100%] text-[#AEAEAE]">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 92px gap + divider + 92px gap */}
        <div className="h-[40px] md:h-[92px]" />
        <div className={containerClass}>
          <div className="h-[1px] bg-white/20 w-full" />
        </div>
        <div className="h-[40px] md:h-[92px]" />

        {/* ── OUR PRESENCE SECTION ── */}
        <div className={containerClass} style={{ paddingBottom: "120px" }}>
          <div className="flex flex-col md:flex-row justify-between items-start">

            {/* LEFT: 310px → ~21.5vw */}
            <div className="w-full md:w-[clamp(200px,21.5vw,310px)] shrink-0">
              <h2 className="font-manrope font-normal text-[28px] md:text-[clamp(28px,2.78vw,40px)] leading-[100%] text-white mb-[24px]">
                Our Presence
              </h2>
              <p className="font-manrope font-medium text-[12px] md:text-[14px] leading-[130%] text-[#AEAEAE] mb-[40px] md:mb-0">
                With offices across India, our teams are always within reach to support customers, partners, and projects nationwide.
              </p>
            </div>

            {/* RIGHT: 2×2 grid on desktop, 1-col stack on mobile */}
            <div className="flex-1 ml-0 md:ml-[clamp(32px,4vw,80px)] flex flex-col md:flex-row gap-[40px] md:gap-0 mt-0">
              {/* Column 1 */}
              <div className="flex flex-col md:flex-row flex-1 gap-[40px] md:gap-0">
                {/* Vertical divider (desktop only) */}
                <div className="hidden md:block w-[1px] bg-white/20 shrink-0 self-stretch" />
                <div className="hidden md:block w-[50px] shrink-0" />
                
                <div className="flex-1 flex flex-col gap-[40px] md:gap-[59px]">
                  <CityCard city={officeLocations[0]} />
                  <CityCard city={officeLocations[2]} />
                </div>
              </div>

              {/* gap between columns */}
              <div className="hidden md:block w-[62px] shrink-0" />

              {/* Column 2 */}
              <div className="flex flex-col md:flex-row flex-1 gap-[40px] md:gap-0">
                {/* Vertical divider (desktop only) */}
                <div className="hidden md:block w-[1px] bg-white/20 shrink-0 self-stretch" />
                <div className="hidden md:block w-[50px] shrink-0" />
                
                <div className="flex-1 flex flex-col gap-[40px] md:gap-[59px]">
                  <CityCard city={officeLocations[1]} />
                  <CityCard city={officeLocations[3]} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function CityCard({ city }: { city: typeof officeLocations[0] }) {
  return (
    <div className="group cursor-pointer">
      <style>{`
        .city-img-${city.city.replace(/\s+/g, '-')} {
          filter: grayscale(100%);
          transition: filter 0.7s ease;
        }
        .group:hover .city-img-${city.city.replace(/\s+/g, '-')} {
          filter: grayscale(0%);
        }
      `}</style>
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "315 / 230" }}
      >
        <Image
          src={city.image}
          alt={city.city}
          fill
          className={`object-cover city-img-${city.city.replace(/\s+/g, '-')}`}
        />
      </div>

      <div className="h-[24px] md:h-[35px]" />

      <p className="font-manrope font-bold text-[14px] leading-[100%] text-white mb-[12px] md:mb-[14px]">
        {city.city}
      </p>

      <p className="font-manrope font-normal text-[12px] md:text-[14px] leading-[130%] text-[#AEAEAE]">
        {city.address}
      </p>
    </div>
  )
}
