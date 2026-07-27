import sys

with open("app/page.tsx", "r") as f:
    content = f.read()

section_start = content.find('<section', content.find('{/* Our Products Section */}'))
section_end = content.find('</section>', section_start) + len('</section>')

old_section = content[section_start:section_end]
desktop_start = old_section.find('<div className="w-full">')
mobile_carousel_start = old_section.find('<MobileCarousel>', desktop_start)

print("CODE BETWEEN GRID AND CAROUSEL END:")
print(old_section[mobile_carousel_start-40:mobile_carousel_start+20])
