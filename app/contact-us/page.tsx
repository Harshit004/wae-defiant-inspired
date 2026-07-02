"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

const containerClass = "mx-auto w-full px-[7.5vw]"

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
      setFormStatus("success")
      setFormMessage("Thank you! We'll be in touch shortly.")
      form.reset()
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
        <Header />
      </div>
      {/* ── HERO + FORM SECTION ── */}
      {/* 77px gap after header */}
      <section className="relative z-10 w-full" style={{ paddingTop: "clamp(180px, 16.3vw, 235px)", paddingBottom: "0" }}>
        <div className={containerClass}>
          {/* 2-col justify-between */}
          <div className="flex flex-row justify-between items-start">

            {/* LEFT: 393px → ~27.3vw, clamped */}
            <div style={{ width: "clamp(260px, 27.3vw, 393px)", flexShrink: 0 }}>
              {/* Questions or Ideas? */}
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  color: "#FFFFFF",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                Questions or Ideas?
              </p>

              {/* Let's Connect. */}
              <h1
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(40px, 4.17vw, 60px)",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  color: "#FFFFFF",
                  marginBottom: "62px",
                }}
              >
                Let&apos;s Connect.
              </h1>

              {/* Corporate Office */}
              <p
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "200%",
                  letterSpacing: "0%",
                  color: "#FFFFFF",
                }}
              >
                Corporate Office
              </p>
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "200%",
                  letterSpacing: "0%",
                  color: "#AEAEAE",
                }}
              >
                H-18, H Block, Sector 63, Noida, Uttar Pradesh – 201301
              </p>

              <div style={{ height: "19px" }} />

              {/* Innovation Centre */}
              <p
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  color: "#FFFFFF",
                }}
              >
                Innovation Centre
              </p>
              <div style={{ height: "8px" }} />
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "200%",
                  letterSpacing: "0%",
                  color: "#AEAEAE",
                }}
              >
                D 247/2, D Block, Sector 63,<br />Noida, Uttar Pradesh – 201301
              </p>

              <div style={{ height: "19px" }} />

              {/* Email */}
              <p
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  color: "#FFFFFF",
                }}
              >
                Email
              </p>
              <div style={{ height: "8px" }} />
              <div>
                <a
                  href="mailto:marketing@waecorp.com"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "130%",
                    letterSpacing: "0%",
                    color: "#AEAEAE",
                    display: "block",
                    textDecoration: "none",
                  }}
                >
                  marketing@waecorp.com
                </a>
                <a
                  href="mailto:info@waecorp.com"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "130%",
                    letterSpacing: "0%",
                    color: "#AEAEAE",
                    display: "block",
                    textDecoration: "none",
                    marginTop: "4px",
                  }}
                >
                  info@waecorp.com
                </a>
              </div>
            </div>

            {/* RIGHT: 581px → ~40.3vw, clamped */}
            <div style={{ width: "clamp(300px, 40.3vw, 581px)", flexShrink: 0 }}>
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

                  <input className="cu-input" type="text" name="name" placeholder="*Name" required />
                  <input className="cu-input" type="text" name="companyName" placeholder="*Company Name" required />
                  <input className="cu-input" type="tel" name="contact" placeholder="*Contact No." required />
                  <input className="cu-input" type="email" name="email" placeholder="*Official Email" required />
                  <input className="cu-input" type="text" name="city" placeholder="*City" />
                  <textarea className="cu-textarea" name="message" placeholder="Your Message" maxLength={2000} />

                  {/* 62px gap */}
                  <div style={{ height: "62px" }} />

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

        {/* 92px gap + divider + 92px gap */}
        <div style={{ height: "92px" }} />
        <div className={containerClass}>
          <div style={{ height: "1px", background: "rgba(255,255,255,0.2)", width: "100%" }} />
        </div>
        <div style={{ height: "92px" }} />

        {/* ── SUPPORT SECTION ── */}
        <div className={containerClass}>
          <div className="flex flex-row justify-between items-start">

            {/* LEFT support column */}
            <div style={{ width: "clamp(240px, 27.3vw, 393px)", flexShrink: 0 }}>
              <h2
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(28px, 2.78vw, 40px)",
                  lineHeight: "50px",
                  letterSpacing: "0%",
                  color: "#FFFFFF",
                  marginBottom: "24px",
                }}
              >
                Support That Stays<br />With You
              </h2>
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  color: "#AEAEAE",
                  marginBottom: "62px",
                }}
              >
                Need assistance? Our Customer Care team is available to ensure you receive timely support whenever you need it.
              </p>

              <p
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "11px",
                  lineHeight: "100%",
                  color: "#FFFFFF",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: "12px",
                }}
              >
                24×7 Customer Care
              </p>
              <a
                href="tel:+911204069800"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  color: "#FFFFFF",
                  textDecoration: "none",
                }}
              >
                +91-120-406-9800
              </a>
            </div>

            {/* RIGHT support column: vertical divider + content */}
            <div
              style={{
                width: "clamp(300px, 50vw, 720px)",
                flexShrink: 0,
                display: "flex",
                flexDirection: "row",
              }}
            >
              {/* Vertical divider */}
              <div
                style={{
                  width: "1px",
                  background: "rgba(255,255,255,0.2)",
                  flexShrink: 0,
                  alignSelf: "stretch",
                }}
              />

              {/* Gap after divider */}
              <div style={{ width: "50px", flexShrink: 0 }} />

              {/* Content */}
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "130%",
                    letterSpacing: "0%",
                    color: "#AEAEAE",
                    marginBottom: "48px",
                  }}
                >
                  From technical guidance to service requests, we&apos;re committed to providing responsive and reliable assistance throughout your journey with WAE.
                </p>

                {/* Support items */}
                <div className="flex flex-col">
                  {supportItems.map((item, i) => (
                    <div key={item.title}>
                      <p
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontWeight: 500,
                          fontSize: "14px",
                          lineHeight: "100%",
                          letterSpacing: "0%",
                          color: "#FFFFFF",
                          marginBottom: "14px",
                        }}
                      >
                        {item.title}
                      </p>
                      <p
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontWeight: 500,
                          fontSize: "14px",
                          lineHeight: "100%",
                          letterSpacing: "0%",
                          color: "#AEAEAE",
                          marginBottom: i < supportItems.length - 1 ? "14px" : 0,
                        }}
                      >
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
        <div style={{ height: "92px" }} />
        <div className={containerClass}>
          <div style={{ height: "1px", background: "rgba(255,255,255,0.2)", width: "100%" }} />
        </div>
        <div style={{ height: "92px" }} />

        {/* ── OUR PRESENCE SECTION ── */}
        <div className={containerClass} style={{ paddingBottom: "120px" }}>
          <div className="flex flex-row justify-between items-start">

            {/* LEFT: 310px → ~21.5vw */}
            <div style={{ width: "clamp(200px, 21.5vw, 310px)", flexShrink: 0 }}>
              <h2
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(28px, 2.78vw, 40px)",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  color: "#FFFFFF",
                  marginBottom: "24px",
                }}
              >
                Our Presence
              </h2>
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "130%",
                  letterSpacing: "0%",
                  color: "#AEAEAE",
                }}
              >
                With offices across India, our teams are always within reach to support customers, partners, and projects nationwide.
              </p>
            </div>

            {/* RIGHT: 2×2 grid of city cards with vertical dividers */}
            <div
              style={{
                flex: 1,
                marginLeft: "clamp(32px, 4vw, 80px)",
                display: "flex",
                flexDirection: "row",
                gap: "0",
              }}
            >
              {/* Column 1: Mumbai + Hyderabad */}
              <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                {/* Vertical divider */}
                <div style={{ width: "1px", background: "rgba(255,255,255,0.2)", flexShrink: 0, alignSelf: "stretch" }} />
                <div style={{ width: "50px", flexShrink: 0 }} />

                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  {/* Mumbai */}
                  <CityCard city={officeLocations[0]} />
                  {/* 59px gap between rows */}
                  <div style={{ height: "59px" }} />
                  {/* Hyderabad */}
                  <CityCard city={officeLocations[2]} />
                </div>
              </div>

              {/* 62px gap between columns */}
              <div style={{ width: "62px", flexShrink: 0 }} />

              {/* Column 2: Bengaluru + Pune */}
              <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
                {/* Vertical divider */}
                <div style={{ width: "1px", background: "rgba(255,255,255,0.2)", flexShrink: 0, alignSelf: "stretch" }} />
                <div style={{ width: "50px", flexShrink: 0 }} />

                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  {/* Bengaluru */}
                  <CityCard city={officeLocations[1]} />
                  {/* 59px gap */}
                  <div style={{ height: "59px" }} />
                  {/* Pune */}
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
      {/* 315×230 image → responsive via aspect-ratio */}
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

      {/* 35px gap */}
      <div style={{ height: "35px" }} />

      {/* City title */}
      <p
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontWeight: 700,
          fontSize: "14px",
          lineHeight: "100%",
          letterSpacing: "0%",
          color: "#FFFFFF",
          marginBottom: "14px",
        }}
      >
        {city.city}
      </p>

      {/* Address */}
      <p
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "100%",
          letterSpacing: "0%",
          color: "#AEAEAE",
        }}
      >
        {city.address}
      </p>
    </div>
  )
}
