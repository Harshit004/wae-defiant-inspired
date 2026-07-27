import sys

with open("components/scroll-to-top.tsx", "r") as f:
    content = f.read()

# Fix window.scrollY check
old_check = "if (window.scrollY > window.innerHeight * 0.8) {"
new_check = "if (window.scrollY > 300) {"
content = content.replace(old_check, new_check)

# Fix positioning to make sure it's visible on mobile
old_class = 'className="fixed bottom-[100px] right-6 z-[9999] hover:opacity-80 transition-opacity"'
new_class = 'className="fixed bottom-[85px] right-5 md:bottom-[100px] md:right-6 z-[9999] hover:opacity-80 transition-opacity flex items-center justify-center"'
content = content.replace(old_class, new_class)

with open("components/scroll-to-top.tsx", "w") as f:
    f.write(content)
print("Updated scroll to top logic for mobile")

