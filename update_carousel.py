with open("app/page.tsx", "r") as f:
    content = f.read()

# We need to replace the styles in the 3 columns inside MobileCarousel
# The mobile carousel starts at `<MobileCarousel>`
mobile_carousel_start = content.find("<MobileCarousel>")
mobile_carousel_end = content.find("</MobileCarousel>", mobile_carousel_start)

mobile_content = content[mobile_carousel_start:mobile_carousel_end]

# Updates to make in the mobile_content string:
# py-[21.1vw] px-[18vw]
mobile_content = mobile_content.replace('py-16', 'py-[21.1vw]')
mobile_content = mobile_content.replace('px-[7.5vw]', 'px-[18.06vw]')

# font-size: '40px' -> '7.12vw' (Purpose, Philosophy, Principle)
mobile_content = mobile_content.replace("fontSize: '40px'", "fontSize: '7.12vw'")

# height: '32px' -> '6.1vw'
mobile_content = mobile_content.replace("height: '32px'", "height: '6.1vw'")

# fontSize: '12px' -> '3.05vw' (Multiple occurrences)
mobile_content = mobile_content.replace("fontSize: '12px'", "fontSize: '3.05vw'")

# height: '12px' -> '3.05vw'
mobile_content = mobile_content.replace("height: '12px'", "height: '3.05vw'")

# lineHeight: '140%' -> '120%' (For the paragraphs)
mobile_content = mobile_content.replace("lineHeight: '140%'", "lineHeight: '120%'")

# Button wrapper gap -> we can use a span inside HoverButton for text size.
mobile_content = mobile_content.replace("Know More", "<span style={{ fontSize: '2.54vw', lineHeight: '100%', fontWeight: 500 }}>Know More</span>")

# Also need to fix the HoverButton in HoverButton.tsx? 
# Wait, HoverButton forces inline fontSize: "10px". 
# But inline styles on the child span will override it.
# What about the icon size?
# The icon has width={16} height={16}, which is 4.07vw
mobile_content = mobile_content.replace("w-4 h-4", "w-[4.07vw] h-[4.07vw]")

content = content[:mobile_carousel_start] + mobile_content + content[mobile_carousel_end:]

with open("app/page.tsx", "w") as f:
    f.write(content)

print("done")
