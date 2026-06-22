import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#004063] text-white w-full m-0 p-0" style={{ marginBottom: 0 }}>

      {/* ── Main content ── */}
      <div
        style={{
          paddingLeft: "7.5vw",
          paddingRight: "7.5vw",
          paddingTop: "66px",
          paddingBottom: "48px",
        }}
      >
        {/* Two equal halves — mirrors the contact section layout for email input alignment */}
        <div className="flex flex-row items-start w-full">

          {/* ── LEFT HALF (50 vw - 7.5 vw = 42.5 vw): Logo + Coordinates + Social ── */}
          <div className="w-[50%] flex flex-row gap-6 items-start">

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" passHref>
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ee8763d3-899e-45e6-10b2-d3da584da400/public"
                  alt="WAE Logo"
                  width={77}
                  height={82}
                />
              </Link>
            </div>

            {/* Coordinates & Social */}
            <div className="flex flex-col justify-between min-h-[221px] ml-[7.5vw]">
              <div>
                <h4 className="font-[Inter_Tight] font-medium text-[10px] uppercase text-white tracking-wider mb-3">
                  Co-ordinates
                </h4>
                <p className="font-[Inter_Tight] font-normal text-[10px] text-white leading-relaxed mb-[10px]">
                  H-18, H block, Sector 63, Noida, Uttar Pradesh,<br />
                  India, 201301
                </p>
                <p className="font-[Inter_Tight] font-normal text-[10px] text-white">
                  +120 4069800
                </p>
              </div>

              {/* Social Media Icons */}
              <div className="flex gap-4 items-center mt-7">
                <Link href="in.linkedin.com/company/wae-limited" className="hover:opacity-80 transition-opacity">
                  <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/f944e769-4d53-4737-1415-e379403c6900/public"
                    alt="LinkedIn"
                    width={24}
                    height={24}
                    className="brightness-0 invert"
                  />
                </Link>
                <Link href="instagram.com/wae.limited" className="hover:opacity-80 transition-opacity">
                  <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/1c0755e5-5c07-4e1c-31f7-066dde50cb00/public"
                    alt="Instagram"
                    width={24}
                    height={24}
                    className="brightness-0 invert"
                  />
                </Link>
                <Link href="facebook.com/waeltd" className="hover:opacity-80 transition-opacity">
                  <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/3f100468-318f-4c5c-b006-b304966d4100/public"
                    alt="Facebook"
                    width={11.5}
                    height={18.5}
                    className="brightness-0 invert"
                  />
                </Link>
                <Link href="x.com/WAE_LTD" className="hover:opacity-80 transition-opacity">
                  <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/abb4c68a-3cf5-425e-f2d9-62cb73630100/public"
                    alt="X"
                    width={18}
                    height={18}
                    className="brightness-0 invert"
                  />
                </Link>
                <Link href="https://www.youtube.com/@wae-limited" className="hover:opacity-80 transition-opacity">
                  <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/5e07270e-f6f2-466a-0a14-316b9a397000/public"
                    alt="YouTube"
                    width={20}
                    height={16}
                    className="brightness-0 invert"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* ── RIGHT HALF (exactly matches the contact section's right 50%) ── */}
          <div className="w-[50%] flex flex-col">

            {/* Newsletter form — full width so right edge aligns with "Get in Touch" button */}
            <form
              className="flex flex-row w-full mb-12"
              style={{ height: "54px" }}
            >
              <input
                type="email"
                placeholder="Enter email address to sign up for newsletter."
                className="flex-1 h-full outline-none bg-transparent"
                style={{
                  border: "1px solid #FFFFFF",
                  padding: "0 24px",
                  fontFamily: "Helvetica Neue",
                  fontWeight: 400,
                  fontSize: "14px",
                  color: "#FFFFFF",
                }}
              />
              <button
                type="submit"
                style={{
                  height: "100%",
                  fontFamily: "Helvetica Neue",
                  fontWeight: 400,
                  fontSize: "14px",
                  color: "#000000",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #FFFFFF",
                  borderLeft: "none",
                  padding: "0 40px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "background-color 0.3s, color 0.3s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#FFFFFF";
                  (e.currentTarget as HTMLButtonElement).style.color = "#000000";
                }}
              >
                JOIN
              </button>
            </form>

            {/* Navigation link columns */}
            <div className="w-full">
              {/* Column headings */}
              <div className="grid grid-cols-3 gap-4">
                <h3 className="font-[Inter_Tight] font-semibold text-[10px] uppercase text-white tracking-wider">
                  INSIDE WAE
                </h3>
                <h3 className="font-[Inter_Tight] font-semibold text-[10px] uppercase text-white tracking-wider">
                  ETCETERA
                </h3>
                <h3 className="font-[Inter_Tight] font-semibold text-[10px] uppercase text-white tracking-wider">
                  POLICY
                </h3>
              </div>

              {/* Single continuous horizontal rule */}
              <hr
                style={{
                  border: "none",
                  borderTop: "0.67px solid #FFFFFF",
                  width: "100%",
                  margin: "12px 0",
                }}
              />

              {/* Link lists */}
              <div className="grid grid-cols-3 gap-4">
                {/* INSIDE WAE */}
                <ul className="space-y-2 font-[Inter_Tight] font-normal text-[13px] text-white">
                  <li><Link href="/this-is-us" className="hover:opacity-80 transition-opacity">This is Us</Link></li>
                  <li><Link href="/our-portfolio" className="hover:opacity-80 transition-opacity">Our Portfolio</Link></li>
                  <li><Link href="/careers3" className="hover:opacity-80 transition-opacity">Reimagine Work</Link></li>
                </ul>

                {/* ETCETERA */}
                <ul className="space-y-2 font-[Inter_Tight] font-normal text-[13px] text-white">
                  <li><Link href="/sustainability" className="hover:opacity-80 transition-opacity">Sustainability</Link></li>
                  <li><Link href="/the-activist" className="hover:opacity-80 transition-opacity">The Activist</Link></li>
                  <li><Link href="/blogs" className="hover:opacity-80 transition-opacity">Blogs</Link></li>
                </ul>

                {/* POLICY */}
                <ul className="space-y-2 font-[Inter_Tight] font-normal text-[13px] text-white">
                  <li><Link href="/terms-of-use" className="hover:opacity-80 transition-opacity">Terms of Use</Link></li>
                  <li><Link href="/privacy-policy" className="hover:opacity-80 transition-opacity">Privacy Policy</Link></li>
                  <li><Link href="/data-privacy-policy" className="hover:opacity-80 transition-opacity">Data Privacy Policy</Link></li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Full-screen-width copyright rule + text ── */}
      <hr
        style={{
          border: "none",
          borderTop: "1px solid #FFFFFF",
          width: "100%",
          margin: 0,
        }}
      />
      <div
        style={{
          paddingLeft: "7.5vw",
          paddingRight: "7.5vw",
          paddingTop: "23px",
          paddingBottom: "27px",
        }}
        className="flex justify-between items-center font-[Manrope] text-[10px] text-white"
      >
        <span>&copy; Copy Right WAE 2026</span>
      </div>
    </footer>
  );
}