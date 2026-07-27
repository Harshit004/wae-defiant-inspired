import sys

with open("components/footer.tsx", "r") as f:
    content = f.read()

# Remove scroll to top button
old_social_scroll = """<div className="flex gap-4 items-center">
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
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </button>"""

new_social_scroll = """<div className="flex gap-4 items-center">
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
          </div>"""

# Remove whatsapp link
old_bottom_bar = """<div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2 font-[Manrope] text-[3vw] text-white">
            <span>&copy;</span>
            <span>Copy Right WAE 2026</span>
          </div>
          <Link href="https://wa.me/911204069800" target="_blank" className="relative w-12 h-12">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-white">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/><path d="M16.5 14.5s-1.5-1.5-1.5-1.5a1.88 1.88 0 0 0-2.6 0l-1.3 1.3a1.88 1.88 0 0 1-2.6-2.6l1.3-1.3a1.88 1.88 0 0 0 0-2.6s-1.5-1.5-1.5-1.5a1.88 1.88 0 0 0-2.6 0 3.32 3.32 0 0 0-.6 2.8c.8 3.5 3.3 6 6.8 6.8a3.32 3.32 0 0 0 2.8-.6 1.88 1.88 0 0 0 0-2.6z"/>
            </svg>
          </Link>
        </div>"""

new_bottom_bar = """<div className="flex justify-start items-center w-full">
          <div className="flex items-center gap-2 font-[Manrope] text-[3vw] text-white">
            <span>&copy;</span>
            <span>Copy Right WAE 2026</span>
          </div>
        </div>"""

content = content.replace(old_social_scroll, new_social_scroll)
content = content.replace(old_bottom_bar, new_bottom_bar)

with open("components/footer.tsx", "w") as f:
    f.write(content)
print("Removed widgets from footer.")
