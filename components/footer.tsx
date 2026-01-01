import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#f2f2f2] w-full">
      <hr style={{ border: "1px solid #00000033" }} />
      <div className="mx-auto w-full max-w-[1440px] px-[4.44%] pt-0 md:px-[8.75rem] md:pt-[24px] pb-6 md:py-6">

        {/* Newsletter Signup Form - Right Aligned */}
        <div className="flex justify-end mb-8 md:mb-[64px]">
          <form className="flex flex-row items-center w-full md:w-[52%]">
            <input
              type="email"
              placeholder="Enter email address to sign up for newsletter."
              className="flex-1 outline-none bg-transparent"
              style={{
                border: "1px solid #00000033",
                padding: "19px 144px 19px 24px",
                backgroundColor: "transparent",
                fontFamily: "Helvetica Neue",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "100%",
                color: "#808080",
              }}
            />
            <button
              type="submit"
              className="
                font-[Helvetica_Neue] 
                font-normal 
                text-[14px] 
                leading-[100%] 
                text-white 
                px-[59px] 
                py-[20.1px] 
                bg-black 
                border border-black 
                border-l-0
                cursor-pointer
                hover:bg-transparent
                hover:text-black
                hover:border-[#00000033]
                transition-colors
                duration-1000
              "
            >
              JOIN
            </button>
          </form>
        </div>


        {/* Desktop: 4 columns as before, Mobile: Adjusted structure */}
        <div className="md:grid md:grid-cols-4 md:gap-0 md:items-start md:pb-[2.935rem]">

          {/* Logo - Hidden on mobile, visible on desktop */}
          <div className="hidden md:flex flex-col justify-center">
            <Link href="/" passHref>
              <Image
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/9626af87-4cf5-4192-397c-3f4284787400/public"
                alt="WAE Logo"
                width={104}
                height={104}
              />
            </Link>
            <div className="h-[52px]"></div>
            {/* Social Media Icons */}
            <div className="flex gap-4">
              <Image
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6d4c9331-9105-4dd3-3e08-10b33ec4c700/public"
                alt="facebook"
                width={20}
                height={20}
              />
              <Image
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/647db12c-b82a-4ee3-89e8-575d4eebe300/public"
                alt="instagram"
                width={20}
                height={20}
              />
              <Image
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/5e2d8ff6-a5ea-418d-f1a5-e4de1f161f00/public"
                alt="X"
                width={20}
                height={20}
              />
              <Image
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/269a212d-e15a-4017-04b0-14309c2e0b00/public"
                alt="youtube"
                width={20}
                height={20}
              />
              <Image
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/619be447-78a2-476d-bd66-722826a97100/public"
                alt="linkedIn"
                width={20}
                height={20}
              />
            </div>
          </div>

          {/* Mobile Specific Grouping for Inside WAE & Etcetera Titles + HR */}
          <div className="block md:hidden">
            <div className="grid grid-cols-2 gap-x-4">
              {/* Column 1: INSIDE WAE - Mobile Title */}
              <div className="flex flex-col">
                <h3
                  className="font-[Inter_Tight] font-semibold text-[9px] leading-[100%] tracking-[0px] uppercase text-[#00000066]"
                >
                  INSIDE WAE
                </h3>
              </div>
              {/* Column 2: ETCETERA - Mobile Title */}
              <div className="flex flex-col">
                <h3
                  className="font-[Inter_Tight] font-semibold text-[9px] leading-[100%] tracking-[0px] uppercase text-[#00000066] ml-[39%]"
                >
                  ETCETERA
                </h3>
              </div>
            </div>
            {/* Single Continuous HR for Mobile Below Titles */}
            <hr
              className="w-full border-t border-[#D9D9DC] mt-4 mb-4"
            />
          </div>

          {/* --- Adjusted Mobile Layout for Inside WAE & Etcetera Lists --- */}
          <div className="flex justify-between md:grid md:grid-cols-2 md:gap-0 md:contents">

            {/* INSIDE WAE Column */}
            <div className="flex flex-col">
              <h3
                className="hidden md:block font-[Inter_Tight] font-semibold text-[9px] leading-[100%] tracking-[0px] uppercase text-[#00000066]"
              >
                INSIDE WAE
              </h3>
              <hr
                className="hidden md:block w-full border-t border-[#D9D9DC] mt-4 mb-4"
              />
              <ul
                className="space-y-2 mb-0 md:mb-[5rem] block font-[Inter_Tight] font-normal text-[12px] leading-[100%] tracking-[0px]"
              >
                <li>
                  <Link href="/inside-wae">This is Us</Link>
                </li>
                <li>
                  <Link href="/our-portfolio">Our Portfolio</Link>
                </li>
                <li>
                  <Link href="/careers3">Reimagine Work</Link>
                </li>
              </ul>
              {/* Extra HR and Coordinates for Desktop */}
              <hr
                className="hidden md:block w-full border-t border-[#D9D9DC] mt-4 mb-[1.25rem]"
              />
              <div
                className="hidden md:block font-[Inter_Tight] font-medium text-[0.56rem] leading-[100%] tracking-[0px]"
              >
                Coordinates
              </div>
            </div>

            {/* ETCETERA Column */}
            <div className="flex flex-col flex-shrink-0 md:ml-[-3rem]">
              <h3
                className="hidden md:block font-[Inter_Tight] font-semibold text-[9px] leading-[100%] tracking-[0px] uppercase text-[#00000066]"
              >
                ETCETERA
              </h3>
              <hr
                className="hidden md:block w-full border-t border-[#D9D9DC] mt-4 mb-4"
              />
              <ul
                className="space-y-2  mb-0 md:mb-[5rem] block font-[Inter_Tight] font-normal text-[12px] leading-[100%] tracking-[0px]"
              >
                <li>
                  <Link href="/the-activist-co">The Activist Co.</Link>
                </li>
                <li>
                  <Link href="/resource-listing">Resources</Link>
                </li>
                <li>
                  <Link href="/blogs2">Blogs</Link>
                </li>
              </ul>
              {/* Extra HR, Address, and Phone for Desktop */}
              <hr
                className="hidden md:block w-[66%] border-t border-[#D9D9DC] mt-4 mb-[1.25rem]"
              />
              <div className="hidden md:flex align-centre">
                <div
                  className="w-[11.3rem] font-[Inter_Tight] font-normal text-[0.56rem] leading-[100%] tracking-[0px] text-[#00000099] flex-shrink-0"
                >
                  H-18, H block, Sector 63, Noida, Uttar Pradesh, India, 201301
                </div>
                <div
                  className="font-[Inter_Tight] font-normal text-[0.56rem] leading-[100%] tracking-[0px] text-[#00000099] ml-[9.7rem] flex-shrink-0"
                >
                  +120 4069800
                </div>
              </div>
            </div>
          </div>

          {/* POLICY Column */}
          <div className="flex flex-col mt-[40px] md:mt-0">
            <h3
              className="block font-[Inter_Tight] font-semibold text-[9px] leading-[100%] tracking-[0px] uppercase text-[#00000066]"
            >
              POLICY
            </h3>
            <hr
              className="block w-full border-t border-[#D9D9DC] mt-4 mb-4"
            />
            <div className="flex flex-row items-start md:mr-[7.875rem]">
              <ul
                className="space-y-2 mb-0 flex-grow block font-[Inter_Tight] font-normal text-[12px] leading-[100%] tracking-[0px]"
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
              <div className="mr-[15%] flex-shrink-0 md:hidden">
                <Link href="/" passHref>
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

        {/* Corporate Office, Address, Phone (Mobile only) */}
        <div className="mt-[40px] md:hidden flex flex-col md:flex-row md:justify-between md:items-start md:space-x-4">
            <div className="flex w-full items-start md:w-auto md:space-x-0">
                {/* Corporate Office */}
                <div
                    className="font-[Inter_Tight] font-medium text-[8px] leading-[100%] tracking-[0px] max-w-[11.38%] flex-shrink-0 mr-[10%]"
                >
                    Corporate Office
                </div>

                {/* Address text */}
                <div
                    className="font-[Inter_Tight] font-normal text-[8px] leading-[100%] tracking-[0px] text-[#00000099] max-w-[41%] flex-grow-0 flex-shrink-0 mr-[6.5%]"
                >
                    H-18, H block, Sector 63, Noida, Uttar Pradesh, India, 201301
                </div>

                {/* Phone number text */}
                <div
                    className="font-[Inter_Tight] font-normal text-[8px] leading-[100%] tracking-[0px] text-[#00000099] max-w-[24.44%] flex-shrink-0 "
                >
                    +120 4069800
                </div>
            </div>
        </div>

      </div>
    </footer>
  )
}