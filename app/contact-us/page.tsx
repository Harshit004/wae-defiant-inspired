"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

const containerClass = "mx-auto w-full px-[7.5vw]"

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

  const officeLocations = [
    {
      city: "Mumbai",
      address: "31 Springboard Business Hub Godrej & Boyce, Gate No. 2,LBS Marg, Vikhroli Mumbai – 400079",
      image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/fac96cd3-ad63-42ff-23df-0d795cc52000/public",
    },
    {
      city: "Bengaluru",
      address: "31 Springboard George Thangaiah Complex 13, 80 Feet Road, Near Sir CV Raman Hospital Indiranagar, Bengaluru – 560038",
      image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/31701d9e-a471-46ff-4bb7-dac1ec8aac00/public",
    },
    {
      city: "Hyderabad",
      address: "31 Springboard Business Hub Pvt. Ltd. Mytri Square, 3-4/1 HYTD Gachiowali – Miyapur Road, Kondapur, Hyderabad – 500084",
      image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/50e6b6b0-4629-4ab6-0710-9ecc16700e00/public",
    },
    {
      city: "Pune",
      address: "We are right here located at Unit 1, 2! 8th–10th Floor, Saideenesh Business Centre Nr. 43 Garware Road, Baner Pune, Maharashtra – 411045",
      image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/371f4ccb-4672-4c8e-2fba-a3a7ffe05900/public",
    },
  ]

  const supportTypes = [
    {
      title: "Commercial Support",
      desc: "Product enquiries, quotations, and post-sales assistance.",
    },
    {
      title: "Logistics Support",
      desc: "Order processing, delivery status, and product availability.",
    },
    {
      title: "Technical Support",
      desc: "Product selection, technical guidance, and application support.",
    },
    {
      title: "Service Support",
      desc: "Installation, maintenance, and service intervention requests.",
    },
  ]

  return (
    <main className="bg-black text-white min-h-screen">
      <Header />

      {/* ── HERO + FORM SECTION ── */}
      <section
        className="w-full bg-black"
        style={{ paddingTop: "160px", paddingBottom: "120px" }}
      >
        <div className={containerClass}>
          <div className="flex flex-col md:flex-row gap-16 md:gap-0 justify-between items-start w-full">

            {/* Left: Contact Info */}
            <div className="w-full md:w-[42%] flex flex-col">
              {/* Questions label */}
              <p
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "11px",
                  lineHeight: "100%",
                  letterSpacing: "0.1em",
                  color: "#AEAEAE",
                  textTransform: "uppercase",
                  marginBottom: "20px",
                }}
              >
                Questions or Ease?
              </p>

              {/* Heading */}
              <h1
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(52px, 6vw, 88px)",
                  lineHeight: "105%",
                  color: "#FFFFFF",
                  marginBottom: "60px",
                }}
              >
                Let's Connect.
              </h1>

              {/* Corporate Office */}
              <div style={{ marginBottom: "32px" }}>
                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 600,
                    fontSize: "11px",
                    color: "#FFFFFF",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "8px",
                  }}
                >
                  Corporate Office
                </p>
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 400,
                    fontSize: "13px",
                    lineHeight: "160%",
                    color: "#AEAEAE",
                  }}
                >
                  H-18, H Block, Sector 63, Noida, Uttar Pradesh – 201301
                </p>
              </div>

              {/* Innovation Centre */}
              <div style={{ marginBottom: "32px" }}>
                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 600,
                    fontSize: "11px",
                    color: "#FFFFFF",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "8px",
                  }}
                >
                  Innovation Centre
                </p>
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 400,
                    fontSize: "13px",
                    lineHeight: "160%",
                    color: "#AEAEAE",
                  }}
                >
                  C-24/12, D Block, Sector 63,<br />
                  Noida, Uttar Pradesh – 201301
                </p>
              </div>

              {/* Email */}
              <div>
                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 600,
                    fontSize: "11px",
                    color: "#FFFFFF",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "8px",
                  }}
                >
                  Email
                </p>
                <a
                  href="mailto:marketing@waecorp.com"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 400,
                    fontSize: "13px",
                    lineHeight: "180%",
                    color: "#AEAEAE",
                    display: "block",
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                  }}
                >
                  marketing@waecorp.com
                </a>
                <a
                  href="mailto:info@waecorp.com"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 400,
                    fontSize: "13px",
                    lineHeight: "180%",
                    color: "#AEAEAE",
                    display: "block",
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                  }}
                >
                  info@waecorp.com
                </a>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="w-full md:w-[52%]">
              {formStatus === "success" ? (
                <div
                  className="flex flex-col items-start justify-center"
                  style={{ minHeight: "400px" }}
                >
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
                    className="mt-8 underline underline-offset-4 text-white/60 hover:text-white transition-colors"
                    style={{ fontFamily: "'Manrope', sans-serif", fontSize: "13px" }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-0">
                  {/* Field styles via inline CSS since styled-jsx not available here */}
                  <style>{`
                    .contact-input {
                      width: 100%;
                      background: transparent;
                      border: none;
                      border-bottom: 1px solid rgba(255,255,255,0.25);
                      padding: 18px 0;
                      color: #FFFFFF;
                      font-family: 'Manrope', sans-serif;
                      font-size: 13px;
                      outline: none;
                      transition: border-color 0.3s;
                    }
                    .contact-input::placeholder {
                      color: rgba(255,255,255,0.45);
                    }
                    .contact-input:focus {
                      border-bottom-color: rgba(255,255,255,0.8);
                    }
                  `}</style>

                  <input className="contact-input" type="text" name="name" placeholder="Name*" required />
                  <input className="contact-input" type="text" name="companyName" placeholder="Company Name*" required />
                  <input className="contact-input" type="tel" name="contact" placeholder="Contact No.*" required />
                  <input className="contact-input" type="email" name="email" placeholder="Official Email*" required />
                  <input className="contact-input" type="text" name="city" placeholder="City*" />
                  <textarea
                    className="contact-input"
                    name="message"
                    placeholder="Your Message"
                    rows={3}
                    style={{ resize: "none" }}
                  />

                  {/* reCAPTCHA placeholder */}
                  <div
                    style={{
                      marginTop: "24px",
                      marginBottom: "24px",
                      padding: "12px 16px",
                      border: "1px solid rgba(255,255,255,0.15)",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      width: "fit-content",
                    }}
                  >
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        border: "1.5px solid rgba(255,255,255,0.4)",
                        borderRadius: "3px",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: "12px",
                        color: "#AEAEAE",
                      }}
                    >
                      I&apos;m not a robot
                    </span>
                  </div>

                  {formStatus === "error" && (
                    <p
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: "12px",
                        color: "#ef4444",
                        marginBottom: "16px",
                      }}
                    >
                      {formMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="w-full flex items-center justify-center gap-4 bg-white text-black hover:bg-white/90 transition-all duration-300 disabled:opacity-60"
                    style={{
                      height: "72px",
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 400,
                      fontSize: "16px",
                    }}
                  >
                    {formStatus === "submitting" ? "Submitting..." : "Submit"}
                    {formStatus !== "submitting" && (
                      <svg width="40" height="20" viewBox="0 0 40 24" fill="none">
                        <path d="M2 12H38M38 12L28 2M38 12L28 22" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="w-full h-px bg-white/15" />

      {/* ── SUPPORT SECTION ── */}
      <section
        className="w-full bg-black"
        style={{ paddingTop: "100px", paddingBottom: "100px" }}
      >
        <div className={containerClass}>
          <div className="flex flex-col md:flex-row gap-16 md:gap-0 justify-between items-start">

            {/* Left */}
            <div className="w-full md:w-[38%] flex flex-col">
              <h2
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(36px, 4vw, 56px)",
                  lineHeight: "110%",
                  color: "#FFFFFF",
                  marginBottom: "24px",
                }}
              >
                Support That Stays<br />With You
              </h2>
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "13px",
                  lineHeight: "160%",
                  color: "#AEAEAE",
                  maxWidth: "340px",
                  marginBottom: "40px",
                }}
              >
                Need assistance? Our Customer Care team is available to ensure you receive timely support wherever you need it.
              </p>
              <div style={{ marginTop: "auto" }}>
                <p
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 600,
                    fontSize: "11px",
                    color: "#FFFFFF",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "6px",
                  }}
                >
                  24×7 Customer Care
                </p>
                <a
                  href="tel:+911204086800"
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: "22px",
                    color: "#FFFFFF",
                    textDecoration: "none",
                    letterSpacing: "-0.01em",
                  }}
                >
                  +91-120-408-6800
                </a>
              </div>
            </div>

            {/* Right: Support types */}
            <div className="w-full md:w-[52%] flex flex-col divide-y divide-white/15">
              <div style={{ paddingBottom: "32px" }}>
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 400,
                    fontSize: "13px",
                    lineHeight: "160%",
                    color: "#AEAEAE",
                    maxWidth: "480px",
                  }}
                >
                  From technical guidance to service requests, we&apos;re committed to providing responsive and reliable assistance throughout your journey with WAE.
                </p>
              </div>
              {supportTypes.map((s) => (
                <div key={s.title} style={{ paddingTop: "28px", paddingBottom: "28px" }}>
                  <p
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 600,
                      fontSize: "13px",
                      color: "#FFFFFF",
                      marginBottom: "6px",
                    }}
                  >
                    {s.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 400,
                      fontSize: "13px",
                      lineHeight: "160%",
                      color: "#AEAEAE",
                    }}
                  >
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="w-full h-px bg-white/15" />

      {/* ── OUR PRESENCE SECTION ── */}
      <section
        className="w-full bg-black"
        style={{ paddingTop: "100px", paddingBottom: "120px" }}
      >
        <div className={containerClass}>
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-12">
            <div>
              <h2
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(36px, 4vw, 56px)",
                  lineHeight: "110%",
                  color: "#FFFFFF",
                  marginBottom: "16px",
                }}
              >
                Our Presence
              </h2>
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: "13px",
                  lineHeight: "160%",
                  color: "#AEAEAE",
                  maxWidth: "320px",
                }}
              >
                With offices across India, our teams are always within reach to support customers, partners, and projects nationwide.
              </p>
            </div>
          </div>

          {/* City Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {officeLocations.map((loc) => (
              <div key={loc.city} className="flex flex-col group">
                {/* Image */}
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "16/9" }}
                >
                  <Image
                    src={loc.image}
                    alt={loc.city}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                {/* Info */}
                <div style={{ paddingTop: "16px" }}>
                  <p
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 500,
                      fontSize: "15px",
                      color: "#FFFFFF",
                      marginBottom: "6px",
                    }}
                  >
                    {loc.city}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 400,
                      fontSize: "12px",
                      lineHeight: "160%",
                      color: "#AEAEAE",
                    }}
                  >
                    {loc.address}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
