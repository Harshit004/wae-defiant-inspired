import sys

with open("components/related-card.tsx", "r") as f:
    content = f.read()

content = content.replace('className={`px-4 py-3 ', 'className={`px-[16px] py-[10.5px] ')

with open("components/related-card.tsx", "w") as f:
    f.write(content)

print("Updated components/related-card.tsx")

