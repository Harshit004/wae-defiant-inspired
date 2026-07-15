"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

const containerClass = "mx-auto w-full max-w-[1440px] px-[7.5vw]";

const sitemapData = [
  {
    title: "1. Home",
    links: [
      { text: "Hero", href: "/" },
      { text: "The Activist Co.", href: "/the-activist-co" },
      { text: "This is Us", href: "/this-is-us" },
      { text: "Our Portfolio", href: "/our-portfolio" },
      { text: "Sustainability", href: "/sustainability" },
      { text: "Reimagine Work", href: "/careers" },
      { text: "News & Updates", href: "/news-and-updates" },
      { text: "Blogs", href: "/perspectives" },
      { text: "Awards & Recognition", href: "/awards-and-recognitions" },
      { text: "Contact Us", href: "/contact-us" },
    ]
  },
  {
    title: "2. Inside WAE",
    links: [
      { text: "This is Us", href: "/this-is-us" },
      { text: "Our Portfolio", href: "/our-portfolio" },
      { text: "Reimagine work", href: "/careers" },
    ]
  },
  {
    title: "3. Responsibility",
    links: [
      { text: "Sustainability", href: "/sustainability" },
      { text: "The Activist Co.", href: "/the-activist-co" },
      { text: "Blog", href: "/perspectives" },
    ]
  },
  {
    title: "4. Portfolio",
    links: [
      { text: "Bottle Filling Stations", href: "/our-portfolio?category=bottle-filling-stations" },
      { text: "Drinking Water Fountains", href: "/our-portfolio?category=drinking-water-fountains" },
      { text: "Drinking Water Dispensers & Coolers", href: "/our-portfolio?category=drinking-water-dispensers" },
      { text: "Drinking Water Stations", href: "/our-portfolio?category=drinking-water-stations" },
      { text: "Drinking Water Faucets", href: "/our-portfolio?category=drinking-water-faucets" },
      { text: "Under The Counter RO", href: "/our-portfolio?category=under-the-counter-ro" },
    ]
  },
  {
    title: "5. GBS",
    links: [
      { text: "PRIMUS", href: "/product-description-page?product=primus" },
      { text: "AQUARIUS Series", href: "/product-description-page?product=aquarius" },
      { text: "QUANTIM", href: "/product-description-page?product=quantim" },
    ]
  },
  {
    title: "6. Sustainability",
    links: [
      { text: "Plastic Free Hydration", href: "/sustainability#plastic-free-hydration" },
      { text: "Scope 3 Reduction", href: "/sustainability#scope-3-reduction" },
      { text: "Carbon Neutral Water", href: "/sustainability#carbon-neutral-water" },
      { text: "Circular Economy", href: "/sustainability#circular-economy" },
      { text: "SDG Alignment", href: "/sustainability#sdg-alignment" },
      { text: "WAE Foundation", href: "/sustainability#wae-foundation" },
    ]
  },
  {
    title: "7. The activist Co.",
    links: [
      { text: "Climate Change & Water", href: "/the-activist-co" },
      { text: "1% For Water", href: "/the-activist-co" },
      { text: "Circular Economy", href: "/the-activist-co" },
      { text: "Sustainable Development Goals", href: "/the-activist-co" },
      { text: "Vision 2030", href: "/the-activist-co" },
      { text: "Water Conservation", href: "/the-activist-co" },
    ]
  },
  {
    title: "8. Reimagine work",
    links: [
      { text: "Why WAE", href: "/careers" },
      { text: "Life at WAE", href: "/life-at-wae" },
      { text: "Join WAE", href: "/join-wae" },
      { text: "Open Positions", href: "/join-wae" },
      { text: "Campus Hiring", href: "/life-at-wae" },
      { text: "Internships", href: "/life-at-wae" },
    ]
  },
  {
    title: "9. News & Media",
    links: [
      { text: "News & Updates", href: "/news-and-updates" },
      { text: "Press Releases", href: "/news-and-updates" },
      { text: "Awards & Honours", href: "/awards-and-recognitions" },
      { text: "Events", href: "/news-and-updates" },
    ]
  },
  {
    title: "10. Contact",
    links: [
      { text: "Contact Us", href: "/contact-us" },
      { text: "Service & Support", href: "/contact-us" },
      { text: "Find Us", href: "/contact-us" },
      { text: "Request a Quote", href: "/contact-us" },
    ]
  },
  {
    title: "11. Legal",
    links: [
      { text: "Data Privacy Policy", href: "/data-privacy-policy" },
      { text: "Cookie Policy", href: "/cookie-policy" },
      { text: "Terms of Use", href: "/terms-of-use" },
    ]
  },
  {
    title: "12. Footer",
    links: [
      { text: "About WAE", href: "/this-is-us" },
      { text: "Portfolio", href: "/our-portfolio" },
      { text: "Reimagine Work", href: "/careers" },
      { text: "Sustainability", href: "/sustainability" },
      { text: "The Activist Co.", href: "/the-activist-co" },
      { text: "Contact", href: "/contact-us" },
      { text: "Legal", href: "/data-privacy-policy" },
      { text: "Social Media", href: "#" },
      { text: "Newsletter Subscription", href: "#" },
    ]
  },
];

export default function SitemapPage() {
  const rows = [];
  for (let i = 0; i < sitemapData.length; i += 4) {
    rows.push(sitemapData.slice(i, i + 4));
  }

  return (
    <main className="bg-[#0F0F0F] min-h-screen text-white font-sans selection:bg-white selection:text-black relative overflow-x-hidden">
      {/* Background Gradient */}
      <div
        className="absolute top-0 left-0 w-full pointer-events-none"
        style={{
          height: '100vh',
          background: 'linear-gradient(146.59deg, #004063 4.52%, #0F0F0F 49.04%)',
          zIndex: 0
        }}
      />

      <Header transparentBg />

      <section className="relative z-10 pt-[220px]">
        <div className={containerClass}>
          {/* Header Gap (from top/header spacing if needed) */}
          {/* <div style={{ height: "clamp(40px, 6.94vw, 77px)" }} /> */}
          <h1
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(24px, 2.77vw, 40px)",
              lineHeight: "105%",
              letterSpacing: "0%",
              verticalAlign: "middle",
              textTransform: "capitalize",
              color: "#FFFFFF",
              margin: 0
            }}
          >
            Sitemap
          </h1>

          <div style={{ height: "clamp(12px, 1.31vw, 19px)" }} />

          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(10px, 0.83vw, 12px)",
              lineHeight: "100%",
              letterSpacing: "0%",
              verticalAlign: "middle",
              color: "#AEAEAE",
              margin: 0
            }}
          >
            Effective Date: 1 January 2026 &nbsp;&nbsp;|&nbsp;&nbsp; Last Updated: April 2026
          </p>

          <div style={{ height: "clamp(40px, 6.38vw, 92px)" }} />
          <div className="w-full h-px bg-[#333]" />
          <div style={{ height: "clamp(40px, 6.38vw, 92px)" }} />

          {/* Grid Rows */}
          <div className="mb-[clamp(60px,8.61vw,124px)]">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-y-0">
                  {row.map((section, idx) => (
                    <div
                      key={idx}
                      style={{
                        borderLeft: '1px solid #333',
                        paddingLeft: 'clamp(20px, 3.47vw, 50px)'
                      }}
                    >
                      <h2
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontWeight: 400,
                          fontSize: "clamp(18px, 1.66vw, 24px)",
                          lineHeight: "100%",
                          letterSpacing: "0%",
                          verticalAlign: "middle",
                          color: "#FFFFFF",
                          margin: 0
                        }}
                      >
                        {section.title}
                      </h2>

                      <div style={{ height: "clamp(16px, 1.66vw, 24px)" }} />

                      <ul>
                        {section.links.map((link, linkIdx) => (
                          <li key={linkIdx}>
                            <Link
                              href={link.href}
                              className="hover:text-white transition-colors duration-300 block"
                              style={{
                                fontFamily: "'Inter Tight', sans-serif",
                                fontWeight: 400,
                                fontSize: "clamp(12px, 0.97vw, 14px)",
                                lineHeight: "200%",
                                letterSpacing: "0%",
                                verticalAlign: "middle",
                                color: "#AEAEAE",
                              }}
                            >
                              {link.text}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {rowIndex < rows.length - 1 && (
                  <>
                    <div style={{ height: "clamp(40px, 6.38vw, 92px)" }} />
                    <div className="w-full h-px bg-[#333]" />
                    <div style={{ height: "clamp(40px, 6.38vw, 92px)" }} />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
