import sys

with open("components/scroll-to-top.tsx", "r") as f:
    content = f.read()

# Replace the className
old_class = 'className="fixed bottom-[85px] right-5 md:bottom-[100px] md:right-6 z-[9999] hover:opacity-80 transition-opacity flex items-center justify-center w-[41px] h-[41px] md:w-[49px] md:h-[49px]"'
new_class = 'className="fixed bottom-[86px] right-5 md:bottom-[98px] md:right-6 z-[9999] hover:opacity-80 transition-opacity flex items-center justify-center w-[41px] h-[41px] md:w-[49px] md:h-[49px]"'

if old_class in content:
    content = content.replace(old_class, new_class)
    with open("components/scroll-to-top.tsx", "w") as f:
        f.write(content)
    print("Fixed scroll-to-top.tsx")
else:
    print("Block not found in scroll-to-top.tsx")
