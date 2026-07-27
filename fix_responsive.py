with open("app/page.tsx", "r") as f:
    content = f.read()

# Replace px-12 with px-[7.5vw] only inside the MobileCarousel for Purpose
purpose_mobile_start = content.find('<MobileCarousel>\n            {/* Column 1: Purpose */}')
purpose_mobile_end = content.find('</MobileCarousel>', purpose_mobile_start)

if purpose_mobile_start != -1:
    purpose_inner = content[purpose_mobile_start:purpose_mobile_end]
    purpose_inner = purpose_inner.replace('px-12', 'px-[7.5vw]')
    content = content[:purpose_mobile_start] + purpose_inner + content[purpose_mobile_end:]

with open("app/page.tsx", "w") as f:
    f.write(content)
print("done")
