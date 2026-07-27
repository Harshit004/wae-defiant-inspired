import sys

with open("components/scroll-to-top.tsx", "r") as f:
    content = f.read()

# Make it explicit, maybe `animate-in fade-in` is buggy on mobile?
old_class = 'className="fixed bottom-[100px] right-6 z-[9999] hover:opacity-80 transition-opacity animate-in fade-in duration-300"'
new_class = 'className="fixed bottom-[100px] right-6 z-[9999] hover:opacity-80 transition-opacity"'

if old_class in content:
    content = content.replace(old_class, new_class)
    with open("components/scroll-to-top.tsx", "w") as f:
        f.write(content)
    print("Fixed scroll-to-top.tsx")
else:
    print("Class not found.")

