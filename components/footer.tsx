import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#f2f2f2] w-full">
      <div className="mx-auto w-full max-w-[1440px] px-[4.44%] pt-0 md:px-[8.75rem] md:pt-[5rem] pb-6 md:py-6">

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
            <div className="grid grid-cols-2 gap-x-4"> {/* Keep this specific grid for mobile titles */}
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
          {/* CHANGE STARTS HERE: This div will control the side-by-side layout for lists on mobile */}
          {/* We'll use flexbox for mobile here to easily push "Etcetera" to the right */}
          <div className="flex justify-between md:grid md:grid-cols-2 md:gap-0 md:contents">
            {/* The `md:contents` effectively "removes" this div on desktop,
                making its children directly participate in the parent's desktop grid.
                On mobile, it acts as a flex container. */}

            {/* INSIDE WAE Column - Mobile and Desktop versions combined using visibility */}
            <div className="flex flex-col">
              <h3
                className="hidden md:block font-[Inter_Tight] font-semibold text-[9px] leading-[100%] tracking-[0px] uppercase text-[#00000066]" // Desktop title only
              >
                INSIDE WAE
              </h3>
              <hr
                className="hidden md:block w-full border-t border-[#D9D9DC] mt-4 mb-4" // Desktop HR only
              />
              <ul
                className="space-y-2 mb-0 md:mb-[5rem] block font-[Inter_Tight] font-normal text-[12px] leading-[100%] tracking-[0px]" // Ensure visibility on both, adjust bottom margin for desktop
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
                className="hidden md:block w-full border-t border-[#D9D9DC] mt-4 mb-[1.25rem]"
              />
              <div
                className="hidden md:block font-[Inter_Tight] font-medium text-[0.56rem] leading-[100%] tracking-[0px]"
              >
                Coordinates
              </div>
            </div>

            {/* ETCETERA Column - Mobile and Desktop versions combined using visibility */}
            {/* Removed ml-[-3rem] on mobile by making it `md:ml-[-3rem]` and adding flex-shrink-0 for mobile */}
            <div className="flex flex-col flex-shrink-0 md:ml-[-3rem]">
              <h3
                className="hidden md:block font-[Inter_Tight] font-semibold text-[9px] leading-[100%] tracking-[0px] uppercase text-[#00000066]" // Desktop title only
              >
                ETCETERA
              </h3>
              <hr
                className="hidden md:block w-full border-t border-[#D9D9DC] mt-4 mb-4" // Desktop HR only
              />
              <ul
                className="space-y-2 ml-[-6%] mb-0 md:mb-[5rem] block font-[Inter_Tight] font-normal text-[12px] leading-[100%] tracking-[0px]" // Ensure visibility on both, adjust bottom margin for desktop
              >
                <li>
                  <Link href="/sustainability">Sustainability</Link>
                </li>
                <li>
                  <Link href="/the-activist-co">The Activist Co.</Link>
                </li>
                <li>
                  <Link href="/blogs2">Blogs</Link>
                </li>
              </ul>
              {/* Extra HR, Address, and Phone for Desktop - Hidden on mobile */}
              <hr
                className="hidden md:block w-[66%] border-t border-[#D9D9DC] mt-4 mb-[1.25rem]"
              />
              <div className="hidden md:flex align-centre"> {/* Use flex for horizontal alignment on desktop */}
                <div
                  className="w-[11.3rem] font-[Inter_Tight] font-normal text-[0.56rem] leading-[100%] tracking-[0px] text-[#00000099] flex-shrink-0"
                >
                  H-18, H block, Sector 63, Noida, Uttar Pradesh, India, 201301
                </div>
                <div
                  className="font-[Inter_Tight] font-normal text-[0.56rem] leading-[100%] tracking-[0px] text-[#00000099] ml-[7.7rem] flex-shrink-0"
                >
                  +120 4069800
                </div>
              </div>
            </div>
          </div> {/* End of grid/flex for list items */}


          {/* POLICY Column - Mobile and Desktop versions combined using visibility */}
          {/* Added mt-[40px] for mobile only, and md:mt-0 to remove it on desktop */}
          <div className="flex flex-col mt-[40px] md:mt-0">
            <h3
              className="block font-[Inter_Tight] font-semibold text-[9px] leading-[100%] tracking-[0px] uppercase text-[#00000066]" // Visible on both mobile and desktop now
            >
              POLICY
            </h3>
            <hr
              className="block w-full border-t border-[#D9D9DC] mt-4 mb-4" // Always block for full width
            />
            <div className="flex flex-row items-start md:mr-[7.875rem]">
              <ul
                className="space-y-2 mb-0 flex-grow block font-[Inter_Tight] font-normal text-[12px] leading-[100%] tracking-[0px]" // Visible on both mobile and desktop
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
              <div className="mr-[15%] flex-shrink-0 md:hidden"> {/* Margin left for spacing, hidden on desktop */}
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