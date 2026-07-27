import sys

with open("app/page.tsx", "r") as f:
    content = f.read()

# Replace the style object for the mobile counters
old_style = "style={{ fontSize: '6vw', lineHeight: '100%', marginBottom: '2vw' }}"
new_style = "style={{ fontSize: '6vw', lineHeight: '100%', marginBottom: '2vw', fontWeight: 400 }}"

if old_style in content:
    content = content.replace(old_style, new_style)
    with open("app/page.tsx", "w") as f:
        f.write(content)
    print("Font weight updated for mobile counters.")
else:
    print("Not found.")

