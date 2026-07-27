import sys

with open("app/page.tsx", "r") as f:
    content = f.read()

old_class = 'className="absolute top-0 right-0 md:h-full h-[104.97vw] w-auto opacity-70 object-cover object-right pointer-events-none select-none z-0"'
new_class = 'className="absolute md:top-0 top-1/2 right-0 md:translate-y-0 -translate-y-1/2 md:h-full h-[104.97vw] w-auto opacity-70 object-cover object-right pointer-events-none select-none z-0"'

if old_class in content:
    content = content.replace(old_class, new_class)
    with open("app/page.tsx", "w") as f:
        f.write(content)
    print("Image perfectly centered on mobile!")
else:
    print("Class not found. Checking current class...")
    # Just to debug if it was already changed or something
    start_idx = content.find('alt="Impact Background"')
    if start_idx != -1:
        print(content[start_idx:start_idx+300])

