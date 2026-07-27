import sys

with open("app/page.tsx", "r") as f:
    content = f.read()

# 1. Insert MobileProductCarousel
carousel_code = """
const MobileProductCarousel = ({ children }: { children: React.ReactNode }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (!containerRef.current) return
    const scrollLeft = containerRef.current.scrollLeft
    const item = containerRef.current.children[0] as HTMLElement
    if(item) {
      const width = item.offsetWidth + window.innerWidth * 0.0101
      setActiveIndex(Math.round(scrollLeft / width))
    }
  }

  const numItems = React.Children.count(children)

  return (
    <div className="w-full md:hidden flex flex-col">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar px-[6.1vw]"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', gap: '1.01vw' }}
      >
        {React.Children.map(children, child => (
          <div className="min-w-[86.25vw] w-[86.25vw] snap-center snap-always box-border">
            {child}
          </div>
        ))}
      </div>
      <div style={{ height: '5.59vw' }} />
      <div className="w-full flex justify-center items-center gap-[6px] mb-[5.59vw]">
        {Array.from({ length: numItems }).map((_, i) => (
          <div key={i} className={`h-[6px] rounded-full transition-all duration-300 bg-[#D9D9D9] ${i === activeIndex ? 'w-[24px]' : 'w-[6px] opacity-30'}`} />
        ))}
      </div>
      <div className="w-full border-t border-[#FFFFFF4D]" />
    </div>
  )
}
"""

if "MobileProductCarousel" not in content:
    content = content.replace("export default function Home() {", carousel_code + "\nexport default function Home() {")

# 2. Extract section content
section_start = content.find('<section', content.find('{/* Our Products Section */}'))
section_end = content.find('</section>', section_start) + len('</section>')
old_section = content[section_start:section_end]

mobile_carousel_start = old_section.find('<MobileCarousel>')
mobile_carousel_end = old_section.find('</MobileCarousel>', mobile_carousel_start) + len('</MobileCarousel>')
mobile_carousel = old_section[mobile_carousel_start:mobile_carousel_end]

new_mobile_carousel = mobile_carousel.replace("h-[400px]", "h-[128.75vw]")
new_mobile_carousel = new_mobile_carousel.replace('href="/portfolio" className="bg-[#004063]', 'href="/portfolio" className="h-[128.75vw] bg-[#004063]')
new_mobile_carousel = new_mobile_carousel.replace("MobileCarousel>", "MobileProductCarousel>")
new_mobile_carousel = new_mobile_carousel.replace("width: '150px'", "width: '38.16vw'")
new_mobile_carousel = new_mobile_carousel.replace("height: '150px'", "height: '38.16vw'")
new_mobile_carousel = new_mobile_carousel.replace("fontSize: '18px'", "fontSize: '4.58vw'")

# Desktop header should include the closing div of the grid!
desktop_header = old_section[:mobile_carousel_start]
# But wait, desktop_header has `<div className="w-full">` which we need to close!
desktop_header = desktop_header.replace('<div className="w-full">', '<div className="w-full hidden md:block border-b border-[#FFFFFF4D]" style={{ paddingBottom: \'124px\', paddingLeft: \'2.5vw\', paddingRight: \'2.5vw\' }}>')

# We append `</div>` to close the desktop_header correctly.
desktop_header += "</div>\n"

new_section = f"""<section id="products" className="bg-black text-white md:border-b-0">
{desktop_header[desktop_header.find(">")+1:]}
        {{/* Mobile Layout */}}
        <div className="w-full md:hidden flex flex-col pt-[15.77vw]">
          <div className="px-[6.1vw]">
            <h3
              style={{{{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: '4.58vw',
                lineHeight: '115%',
              }}}}
            >
              Product Portfolio
            </h3>
            <div style={{{{ height: '8.14vw' }}}} />
            <h2
              style={{{{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: '9.16vw',
                lineHeight: '105%',
              }}}}
            >
              Every product is designed to replace plastic and reduce operational carbon footprint.
            </h2>
            <div style={{{{ height: '16.79vw' }}}} />
            <p
              style={{{{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 400,
                fontSize: '3.05vw',
                lineHeight: '100%',
              }}}}
            >
              WAE's range of water systems is engineered for every environment - commercial, institutional, and industrial.
            </p>
            <div style={{{{ height: '7.12vw' }}}} />
          </div>

          {new_mobile_carousel}
        </div>
      </section>"""

content = content.replace(old_section, new_section)

with open("app/page.tsx", "w") as f:
    f.write(content)
print("Done")
