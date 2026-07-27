import sys

with open("components/scroll-to-top.tsx", "r") as f:
    content = f.read()

content = content.replace('style={{ width: "54px", height: "54px" }}', 'style={{ width: "49px", height: "49px" }}')
content = content.replace('width={54}', 'width={49}')
content = content.replace('height={54}', 'height={49}')

with open("components/scroll-to-top.tsx", "w") as f:
    f.write(content)

print("Updated components/scroll-to-top.tsx")
