import sys

with open("app/page.tsx", "r") as f:
    content = f.read()

# Find the start of the sustainability section
idx = content.find('Sustainability')
if idx != -1:
    start_idx = content.rfind('<section', 0, idx)
    print("Found section around index:", start_idx)
    print(content[start_idx:start_idx+300])
else:
    print("Not found")
