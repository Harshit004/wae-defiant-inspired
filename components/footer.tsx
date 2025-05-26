import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#f2f2f2] w-full">
      <div className="mx-auto w-full max-w-[1440px] px-[8%] pt-0 md:px-[8.75rem] md:pt-[11.25rem] pb-6 md:py-6">

        {/* Overall horizontal rule at the top - Hidden on mobile, visible on desktop */}
        <div className="w-full h-px bg-[#D9D9DC] mb-4 hidden md:block" />

        {/* Desktop: 4 columns as before, Mobile: Adjusted structure */}
        {/* On mobile, this will act as a flex container, and its direct children will stack.
            We'll manage specific internal grids for mobile where needed. */}
        <div className="md:grid md:grid-cols-4 md:gap-0 md:items-start md:pb-[2.935rem]">

          {/* Logo - Hidden on mobile, visible on desktop */}
          <div className="hidden md:flex flex-col justify-center">
            <Link href="/homepage3" passHref>
              <Image
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/9626af87-4cf5-4192-397c-3f4284787400/public"
                alt="WAE Logo"
                width={173}
                height={184}
              />
            </Link>
          </div>

          {/* Mobile Specific Grouping for Inside WAE & Etcetera Titles + HR */}
          <div className="block md:hidden"> {/* Only visible on mobile */}
            <div className="grid grid-cols-2 gap-x-4">
              {/* Column 1: INSIDE WAE - Mobile Title */}
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
              </div>
              {/* Column 2: ETCETERA - Mobile Title */}
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
                  ETCETERA
                </h3>
              </div>
            </div>
            {/* Single Continuous HR for Mobile Below Titles */}
            <hr
              style={{
                width: "100%",
                borderTop: "1px solid #D9D9DC",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            />
          </div>

          {/* --- Adjusted Mobile Layout for Inside WAE & Etcetera Lists --- */}
          {/* This div will control the side-by-side layout for lists on mobile */}
          <div className="grid grid-cols-2 gap-x-4 md:contents"> {/* `md:contents` makes its children participate in the parent grid on desktop */}

            {/* INSIDE WAE Column - Mobile and Desktop versions combined using visibility */}
            <div className="flex flex-col">
              <h3
                className="hidden md:block" // Desktop title only
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
                className="hidden md:block" // Desktop HR only
                style={{
                  width: "100%",
                  borderTop: "1px solid #D9D9DC",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                }}
              />
              <ul
                className="space-y-2 mb-0 md:mb-[5rem] block" // Ensure visibility on both, adjust bottom margin for desktop
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: "13px",
                  lineHeight: "100%",
                  letterSpacing: "0px",
                }}
              >
                <li>
                  <Link href="/inside-wae">This is Us</Link>
                </li>
                <li>
                  <Link href="/our-portfolio">Our Portfolio</Link>
                </li>
                <li>
                  <Link href="/careers">Reimagine Work</Link>
                </li>
              </ul>
              {/* Extra HR and Coordinates for Desktop - Hidden on mobile */}
              <hr
                className="hidden md:block"
                style={{
                  width: "100%",
                  borderTop: "1px solid #D9D9DC",
                  marginTop: "1rem",
                  marginBottom: "1.25rem",
                }}
              />
              <div
                className="hidden md:block"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "0.56rem",
                  lineHeight: "100%",
                  letterSpacing: "0px",
                }}
              >
                Coordinates
              </div>
            </div>

            {/* ETCETERA Column - Mobile and Desktop versions combined using visibility */}
            <div className="flex flex-col md:ml-[-3rem]"> {/* Removed ml-[-3rem] on mobile by making it `md:ml-[-3rem]` */}
              <h3
                className="hidden md:block" // Desktop title only
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
                className="hidden md:block" // Desktop HR only
                style={{
                  width: "100%",
                  borderTop: "1px solid #D9D9DC",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                }}
              />
              <ul
                className="space-y-2 mb-0 md:mb-[5rem] block" // Ensure visibility on both, adjust bottom margin for desktop
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: "13px",
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
              {/* Extra HR, Address, and Phone for Desktop - Hidden on mobile */}
              <hr
                className="hidden md:block"
                style={{
                  width: "66%",
                  borderTop: "1px solid #D9D9DC",
                  marginTop: "1rem",
                  marginBottom: "1.25rem",
                }}
              />
              <div className="hidden md:flex align-centre"> {/* Use flex for horizontal alignment on desktop */}
                <div
                  style={{
                    width: "11.3rem",
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: "0.56rem",
                    lineHeight: "100%",
                    letterSpacing: "0px",
                    color: "#00000099",
                    flexShrink: 0,
                  }}
                >
                  H-18, H block, Sector 63, Noida, Uttar Pradesh, India, 201301
                </div>
                <div
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: "0.56rem",
                    lineHeight: "100%",
                    letterSpacing: "0px",
                    color: "#00000099",
                    marginLeft: '7.7rem',
                    flexShrink: 0,
                  }}
                >
                  +120 4069800
                </div>
              </div>
            </div>
          </div> {/* End of grid for list items */}


          {/* POLICY Column - Mobile and Desktop versions combined using visibility */}
          {/* Added mt-[40px] for mobile only, and md:mt-0 to remove it on desktop */}
          <div className="flex flex-col mt-[40px] md:mt-0">
            <h3
              className="block" // Visible on both mobile and desktop now
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
              className="block" // Always block for full width
              style={{
                width: "100%",
                borderTop: "1px solid #D9D9DC",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            />
            <div className="flex flex-row items-start md:mr-[7.875rem]">
              <ul
                className="space-y-2 mb-0 flex-grow block" // Visible on both mobile and desktop
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
              {/* Logo below HR, beside policy menu items on mobile */}
              <div className="ml-4 flex-shrink-0 md:hidden"> {/* Margin left for spacing, hidden on desktop */}
                <Link href="/homepage3" passHref>
                  <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/9626af87-4cf5-4192-397c-3f4284787400/public"
                    alt="WAE Logo"
                    width={53}
                    height={53}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Corporate Office, Address, Phone (ONLY mobile version now, desktop is integrated above) */}
        <div className="mt-[40px] md:hidden flex flex-col md:flex-row md:justify-between md:items-start md:space-x-4">
            <div className="flex w-full justify-between items-start md:w-auto md:space-x-0">
                {/* Corporate Office */}
                <div
                    style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 500,
                        fontSize: "0.56rem",
                        lineHeight: "100%",
                        letterSpacing: "0px",
                        width: "11.38%",
                    }}
                    className="flex-shrink-0"
                >
                    Corporate Office
                </div>

                {/* Address text */}
                <div
                    style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 400,
                        fontSize: "0.56rem",
                        lineHeight: "100%",
                        letterSpacing: "0px",
                        color: "#00000099",
                        width: "41%",
                    }}
                    className="flex-grow-0 flex-shrink-0"
                >
                    H-18, H block, Sector 63, Noida, Uttar Pradesh, India, 201301
                </div>

                {/* Phone number text */}
                <div
                    style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 400,
                        fontSize: "0.56rem",
                        lineHeight: "100%",
                        letterSpacing: "0px",
                        color: "#00000099",
                    }}
                    className="flex-shrink-0"
                >
                    +120 4069800
                </div>
            </div>
        </div>

      </div>
    </footer>
  )
}