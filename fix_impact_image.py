import sys

with open("app/page.tsx", "r") as f:
    content = f.read()

# Replace the h-full with md:h-full h-[104.97vw]
old_class = 'className="absolute top-0 right-0 h-full w-auto opacity-70 object-cover object-right pointer-events-none select-none z-0"'
new_class = 'className="absolute top-0 right-0 md:h-full h-[104.97vw] w-auto opacity-70 object-cover object-right pointer-events-none select-none z-0"'

if old_class in content:
    content = content.replace(old_class, new_class)
    with open("app/page.tsx", "w") as f:
        f.write(content)
    print("Image height updated.")
else:
    print("Image class not found!")

