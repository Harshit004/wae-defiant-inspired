import sys

with open("components/footer.tsx", "r") as f:
    content = f.read()

# Replace straight up arrow with top-right arrow
content = content.replace(
    '<path d="M12 19V5M5 12l7-7 7 7" />',
    '<path d="M7 17L17 7M7 7h10v10" />'
)

# Replace phone icon with WhatsApp icon
old_whatsapp = '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />'
new_whatsapp = '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/><path d="M16.5 14.5s-1.5-1.5-1.5-1.5a1.88 1.88 0 0 0-2.6 0l-1.3 1.3a1.88 1.88 0 0 1-2.6-2.6l1.3-1.3a1.88 1.88 0 0 0 0-2.6s-1.5-1.5-1.5-1.5a1.88 1.88 0 0 0-2.6 0 3.32 3.32 0 0 0-.6 2.8c.8 3.5 3.3 6 6.8 6.8a3.32 3.32 0 0 0 2.8-.6 1.88 1.88 0 0 0 0-2.6z"/>'

content = content.replace(old_whatsapp, new_whatsapp)

with open("components/footer.tsx", "w") as f:
    f.write(content)
print("Fixed SVGs.")
