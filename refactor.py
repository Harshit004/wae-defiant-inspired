import re

with open("app/page.tsx", "r") as f:
    content = f.read()

# 1. Inject MobileCarousel
mobile_carousel = """
const MobileCarousel = ({ children }: { children: React.ReactNode }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (!containerRef.current) return
    const scrollLeft = containerRef.current.scrollLeft
    const width = containerRef.current.offsetWidth
    setActiveIndex(Math.round(scrollLeft / width))
  }

  const numItems = React.Children.count(children)

  return (
    <div className="w-full md:hidden">
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {React.Children.map(children, child => (
          <div className="min-w-[100vw] snap-center snap-always box-border">
            {child}
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-2 mt-8 mb-4">
        {Array.from({ length: numItems }).map((_, i) => (
          <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/30'}`} />
        ))}
      </div>
    </div>
  )
}

"""

content = content.replace("export default function Home() {", mobile_carousel + "export default function Home() {")

# 2. Refactor Purpose Section
purpose_start = content.find('<div className="grid grid-cols-3 h-full border-b border-[#FFFFFF4D]">')
purpose_end = content.find('</div>\n        </div>\n      </section>', purpose_start)

# We want to replace `<div className="grid grid-cols-3 h-full border-b border-[#FFFFFF4D]">` with:
# `<div className="hidden md:grid grid-cols-3 h-full border-b border-[#FFFFFF4D]">`
# And then right before `</div>\n        </div>\n      </section>`, append `<MobileCarousel> [content] </MobileCarousel>`

purpose_inner = content[purpose_start:purpose_end]
purpose_inner = purpose_inner.replace('className="grid grid-cols-3', 'className="hidden md:grid grid-cols-3')

# Now get the children of the grid
col1_start = purpose_inner.find('{/* Column 1: Purpose */}')
col2_start = purpose_inner.find('{/* Column 2: Philosophy */}')
col3_start = purpose_inner.find('{/* Column 3: Principle */}')

col1 = purpose_inner[col1_start:col2_start]
col2 = purpose_inner[col2_start:col3_start]
col3 = purpose_inner[col3_start:]

# Remove the border-r from mobile version and add padding to make it center nicely
def fix_mobile_col(col):
    col = col.replace('border-r border-[#FFFFFF4D]', '')
    col = col.replace('h-full', 'py-16')
    return col

mobile_purpose = f"""
          <MobileCarousel>
            {fix_mobile_col(col1)}
            {fix_mobile_col(col2)}
            {fix_mobile_col(col3)}
          </MobileCarousel>
"""

new_purpose = purpose_inner + mobile_purpose
content = content[:purpose_start] + new_purpose + content[purpose_end:]


# 3. Refactor Product Portfolio Section
products_start = content.find('<div className="grid grid-cols-4 w-full" style={{ height: \'506px\' }}>')
products_end = content.find('</div>\n        </div>\n      </section>', products_start)

products_inner = content[products_start:products_end]
products_inner = products_inner.replace('className="grid grid-cols-4', 'className="hidden md:grid grid-cols-4')

p1_start = products_inner.find('{/* Aurela */}')
p2_start = products_inner.find('{/* Reva */}')
p3_start = products_inner.find('{/* Venus */}')
p4_start = products_inner.find('{/* View All */}')

p1 = products_inner[p1_start:p2_start]
p2 = products_inner[p2_start:p3_start]
p3 = products_inner[p3_start:p4_start]
p4 = products_inner[p4_start:]

def fix_mobile_prod(col):
    col = col.replace('h-full', 'h-[400px]')
    return col

mobile_products = f"""
          <MobileCarousel>
            {fix_mobile_prod(p1)}
            {fix_mobile_prod(p2)}
            {fix_mobile_prod(p3)}
            {fix_mobile_prod(p4)}
          </MobileCarousel>
"""

new_products = products_inner + mobile_products
content = content[:products_start] + new_products + content[products_end:]


# Global css to hide scrollbar
content = content.replace('/* scroll-behavior: smooth; *//* Commented out as per previous discussion */', '/* scroll-behavior: smooth; */\n        .hide-scrollbar::-webkit-scrollbar { display: none; }')

with open("app/page.tsx", "w") as f:
    f.write(content)

print("Done")
