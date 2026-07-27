import sys

with open("app/page.tsx", "r") as f:
    content = f.read()

content = content.replace("          </div>\n\n            \n        {/* Mobile Layout */}", "          </div>\n        </div>\n\n            \n        {/* Mobile Layout */}")

with open("app/page.tsx", "w") as f:
    f.write(content)
print("Added second closing div")
