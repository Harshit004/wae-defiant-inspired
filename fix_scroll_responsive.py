import sys

with open("components/scroll-to-top.tsx", "r") as f:
    content = f.read()

# Replace the style width/height with Tailwind classes
content = content.replace('style={{ width: "49px", height: "49px" }}', '')

content = content.replace(
    'className="fixed bottom-[85px] right-5 md:bottom-[100px] md:right-6 z-[9999] hover:opacity-80 transition-opacity flex items-center justify-center"',
    'className="fixed bottom-[85px] right-5 md:bottom-[100px] md:right-6 z-[9999] hover:opacity-80 transition-opacity flex items-center justify-center w-[41px] h-[41px] md:w-[49px] md:h-[49px]"'
)

# Replace the Next.js image explicit sizes with standard 100% sizes, or just give it w-full h-full
if "width={49}" in content:
    content = content.replace('width={49}\n        height={49}', 'fill\n        className="object-contain"')
    # If using fill, the parent needs position relative, which we don't have.
    # Actually, we can just use className="w-full h-full" without fill, but since it's Next.js Image, 
    # it's better to just pass the desktop width/height and let css scale it down if needed, but Next.js might restrict it.
    # Let's fix this properly.

with open("components/scroll-to-top.tsx", "w") as f:
    f.write(content)

