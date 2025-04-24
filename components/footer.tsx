import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#f2f2f2] w-full" style={{ marginTop: 0 }}>
      <div className="mx-auto w-full max-w-[1440px] px-[8.75rem] pt-[11.25rem] py-6">
        {/* Overall horizontal rule at the top */}
        <div className="w-full h-px bg-[#D9D9DC] mb-[1rem]" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 items-start pb-[2.935rem]">
          {/* Logo on the left */}
          <div className="flex flex-col mr-[2rem] sm:mb-[5rem]">
            <Image
              src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/34074342-7005-4a25-9763-86933d6e7700/public"
              alt="WAE Logo"
              width={173}
              height={184}
            />
          </div>

          {/* Column 1 */}
          <div className="flex flex-col">
            <h3
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 600,
                fontSize: "9px",
                lineHeight: "100%",
                letterSpacing: "0px",
                textTransform: "uppercase",
                color: "#00000066",
              }}
            >
              INSIDE WAE
            </h3>
            <hr
              style={{
                width: "100%",
                borderTop: "1px solid #D9D9DC",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            />
            <ul
              className="space-y-2 mb-[5rem]"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "18px",
                lineHeight: "100%",
                letterSpacing: "0px",
              }}
            >
              <li>
                <Link href="/inside-wae">This is Us</Link>
              </li>
              <li>
                <Link href="/our-portfolio">Our Protfolio</Link>
              </li>
              <li>
                <Link href="/careers">Reimagine Work</Link>
              </li>
            </ul>
            {/* Extra horizontal rule below list items */}
            <hr
              style={{
                width: "100%",
                borderTop: "1px solid #D9D9DC",
                marginTop: "1rem",
                marginBottom: "1.25rem",
              }}
            />
            {/* "Corporate office" text */}
            <div
              style={{
                width: "2.6rem",      // Approx 41px
                height: "1.4rem",     // Approx 22px
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "0.56rem",  // Approx 9px
                lineHeight: "100%",
                letterSpacing: "0px",
              }}
            >
              Corporate office
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col md:ml-[-3rem]">
            <h3
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 600,
                fontSize: "9px",
                lineHeight: "100%",
                letterSpacing: "0px",
                textTransform: "uppercase",
                color: "#00000066",
              }}
            >
              ETCETERA
            </h3>
            <hr
              style={{
                width: "100%",
                borderTop: "1px solid #D9D9DC",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            />
            <ul
              className="space-y-2 mb-[5rem]"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "18px",
                lineHeight: "100%",
                letterSpacing: "0px",
              }}
            >
              <li>
                <Link href="#">Sustainability</Link>
              </li>
              <li>
                <Link href="#">The Activist Co.</Link>
              </li>
              <li>
                <Link href="/blogs2">Blogs</Link>
              </li>
            </ul>
            {/* Extra horizontal rule below list items */}
            <hr
              style={{
                width: "100%",
                borderTop: "1px solid #D9D9DC",
                marginTop: "1rem",
                marginBottom: "1.25rem",
              }}
            />
            {/* Address text */}
            <div
              style={{
                width: "11.3rem",     // Approx 181px (181/16 ≈ 11.3rem)
                height: "1.4rem",     // Approx 22px
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "0.56rem",  // Approx 9px
                lineHeight: "100%",
                letterSpacing: "0px",
                color: "#00000099",
              }}
            >
              H-18, H block, Sector 63, Noida, Uttar Pradesh, India, 201301
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col md:mr-[7.875rem]">
            <h3
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 600,
                fontSize: "9px",
                lineHeight: "100%",
                letterSpacing: "0px",
                textTransform: "uppercase",
                color: "#00000066",
              }}
            >
              POLICY
            </h3>
            <hr
              style={{
                width: "100%",
                borderTop: "1px solid #D9D9DC",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            />
            <ul
              className="space-y-2 mb-[5rem]"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "100%",
                letterSpacing: "0px",
              }}
            >
              <li>
                <Link href="/terms-of-use">Terms of Use</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/data-privacy-policy">Data Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}