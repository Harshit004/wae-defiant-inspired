import sys

with open("components/footer.tsx", "r") as f:
    content = f.read()

# We will wrap the existing main content in a `hidden md:block` div,
# and add a `block md:hidden` div for the mobile layout.

# Find the start of the main content
start_idx = content.find('{/* ── Main content ── */}')
if start_idx == -1:
    print("Main content not found")
    sys.exit(1)

# We will insert the mobile layout right before the desktop layout.
desktop_content = content[start_idx:]

desktop_content = desktop_content.replace('{/* ── Main content ── */}', '{/* ── DESKTOP LAYOUT ── */}\n      <div className="hidden md:block">')

# We need to close the `hidden md:block` div at the very end before `</footer>`
desktop_content = desktop_content.replace('</footer>', '</div>\n    </footer>')

mobile_layout = """
      {/* ── MOBILE LAYOUT ── */}
      <div className="block md:hidden w-full px-[6.1vw] pt-[12vw] pb-[6vw]">
        
        {/* Top Row: Logo & Coordinates */}
        <div className="flex justify-between items-start w-full">
          {/* Logo */}
          <div className="w-[40%]">
            <Link href="/" passHref>
              <Image
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/96af99a6-327c-4bd1-2407-662d05acc500/public"
                alt="WAE Logo"
                width={120}
                height={40}
                className="w-full h-auto"
              />
            </Link>
          </div>
          
          {/* Coordinates */}
          <div className="w-[50%] flex flex-col">
            <h4 className="font-[Inter_Tight] font-medium text-[3vw] text-white mb-2">
              Co-ordinates
            </h4>
            <p className="font-[Inter_Tight] font-normal text-[2.5vw] text-white leading-relaxed mb-2">
              H-18, H block, Sector 63, Noida, Uttar Pradesh, India, 201301
            </p>
            <p className="font-[Inter_Tight] font-normal text-[2.5vw] text-white">
              +120 4069800
            </p>
          </div>
        </div>

        {/* Newsletter Form */}
        <div className="mt-8 w-full">
          <form
            onSubmit={handleSubscribe}
            className="flex flex-row w-full"
            style={{ height: "45px" }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address to sign up for newsletter"
              className="flex-1 h-full outline-none bg-transparent"
              style={{
                border: "1px solid #FFFFFF",
                padding: "0 15px",
                fontFamily: "Manrope",
                fontWeight: 400,
                fontSize: "12px",
                color: "#FFFFFF",
              }}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                height: "100%",
                fontFamily: "Manrope",
                fontWeight: 400,
                fontSize: "14px",
                color: "#000000",
                backgroundColor: "#FFFFFF",
                border: "1px solid #FFFFFF",
                borderLeft: "none",
                padding: "0 25px",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {isSubmitting ? "..." : "JOIN"}
            </button>
          </form>
        </div>

        {/* Footer Links Grid */}
        <div className="mt-12 w-full">
          <div className="grid grid-cols-4 gap-2 w-full">
            <h3 className="font-[Inter_Tight] font-semibold text-[2.2vw] uppercase text-white pb-2 whitespace-nowrap">
              INSIDE WAE
            </h3>
            <h3 className="font-[Inter_Tight] font-semibold text-[2.2vw] uppercase text-white pb-2 whitespace-nowrap">
              RESPONSIBILITY
            </h3>
            <h3 className="font-[Inter_Tight] font-semibold text-[2.2vw] uppercase text-white pb-2 whitespace-nowrap">
              ETCETERA
            </h3>
            <h3 className="font-[Inter_Tight] font-semibold text-[2.2vw] uppercase text-white pb-2 whitespace-nowrap">
              POLICIES
            </h3>

            {/* Divider */}
            <div className="col-span-4 w-full h-[1px] bg-[#FFFFFF4D] mb-4" />

            <ul className="space-y-3 font-[Inter_Tight] font-normal text-[2.5vw] text-white">
              <li><Link href="/profile">Profile</Link></li>
              <li><Link href="/portfolio">Portfolio</Link></li>
              <li><Link href="/careers">Reimagine Work</Link></li>
            </ul>

            <ul className="space-y-3 font-[Inter_Tight] font-normal text-[2.5vw] text-white">
              <li><Link href="/sustainability">Sustainability</Link></li>
              <li><Link href="/activism">Activism</Link></li>
              <li><Link href="/compliance">Compliances</Link></li>
            </ul>

            <ul className="space-y-3 font-[Inter_Tight] font-normal text-[2.5vw] text-white">
              <li><Link href="/perspectives">Perspectives</Link></li>
              <li><Link href="/news-and-updates">Mentioned</Link></li>
              <li><Link href="/contact-us">Contact</Link></li>
            </ul>

            <ul className="space-y-3 font-[Inter_Tight] font-normal text-[2.5vw] text-white break-words pr-1">
              <li><Link href="/terms-of-use">Terms of Use</Link></li>
              <li><Link href="/cookie-policy">Cookie Policy</Link></li>
              <li><Link href="/data-privacy-policy">Data Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Icons & Scroll to Top */}
        <div className="mt-12 flex justify-between items-center w-full">
          <div className="flex gap-4 items-center">
            <Link href="https://in.linkedin.com/company/wae-limited">
              <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/f944e769-4d53-4737-1415-e379403c6900/public" alt="LinkedIn" width={20} height={20} className="brightness-0 invert" />
            </Link>
            <Link href="https://www.instagram.com/wae.limited">
              <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/1c0755e5-5c07-4e1c-31f7-066dde50cb00/public" alt="Instagram" width={20} height={20} className="brightness-0 invert" />
            </Link>
            <Link href="https://www.facebook.com/waeltd">
              <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/3f100468-318f-4c5c-b006-b304966d4100/public" alt="Facebook" width={10} height={18} className="brightness-0 invert" />
            </Link>
            <Link href="https://www.x.com/WAE_LTD">
              <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/abb4c68a-3cf5-425e-f2d9-62cb73630100/public" alt="X" width={16} height={16} className="brightness-0 invert" />
            </Link>
            <Link href="https://www.youtube.com/@wae-limited">
              <Image src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/5e07270e-f6f2-466a-0a14-316b9a397000/public" alt="YouTube" width={18} height={14} className="brightness-0 invert" />
            </Link>
          </div>
          
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-[#FFFFFF4D] mt-8 mb-6" />

        {/* Bottom Bar: Copyright & WhatsApp */}
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2 font-[Manrope] text-[3vw] text-white">
            <span>&copy;</span>
            <span>Copy Right WAE 2026</span>
          </div>
          <Link href="https://wa.me/911204069800" target="_blank" className="relative w-12 h-12">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-white">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </Link>
        </div>
      </div>
"""

new_content = content[:start_idx] + mobile_layout + desktop_content

with open("components/footer.tsx", "w") as f:
    f.write(new_content)

print("Footer modified with mobile version.")
