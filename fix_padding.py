import sys

with open("app/page.tsx", "r") as f:
    content = f.read()

# 1. Change section class to include border for mobile
content = content.replace('className="bg-black text-white md:border-b-0"', 'className="bg-black text-white border-b border-[#FFFFFF4D] md:border-b-0"')

# 2. Change pt-[15.77vw] to py-[15.77vw]
content = content.replace('pt-[15.77vw]', 'py-[15.77vw]')

# 3. Remove the explicit border-t from MobileProductCarousel
content = content.replace('<div className="w-full border-t border-[#FFFFFF4D]" />', '')

# 4. Remove mb-[5.59vw] from indicators container so that the bottom padding is exactly the container's pb
content = content.replace('className="w-full flex justify-center items-center gap-[6px] mb-[5.59vw]"', 'className="w-full flex justify-center items-center gap-[6px]"')

with open("app/page.tsx", "w") as f:
    f.write(content)
print("Padding fixed")
