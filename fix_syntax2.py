import sys

with open("app/page.tsx", "r") as f:
    content = f.read()

content = content.replace("}}}", "}}")

with open("app/page.tsx", "w") as f:
    f.write(content)
print("Syntax fixed")
