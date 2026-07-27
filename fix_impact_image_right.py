import sys

with open("app/page.tsx", "r") as f:
    content = f.read()

old_class = 'className="absolute md:top-0 top-1/2 right-0 md:translate-y-0 -translate-y-1/2 md:h-full h-[104.97vw] w-auto opacity-70 object-cover object-right pointer-events-none select-none z-0"'
new_class = 'className="absolute md:top-0 top-1/2 md:right-0 -right-[12.72vw] md:translate-y-0 -translate-y-1/2 md:h-full h-[104.97vw] w-auto opacity-70 object-cover object-right pointer-events-none select-none z-0"'

if old_class in content:
    content = content.replace(old_class, new_class)
    with open("app/page.tsx", "w") as f:
        f.write(content)
    print("Pushed image right")
else:
    print("Class not found.")

