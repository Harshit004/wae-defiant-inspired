import sys

with open("app/page.tsx", "r") as f:
    content = f.read()

# Fix the broken styles
content = content.replace("style={\n                fontFamily", "style={{\n                fontFamily")
content = content.replace("lineHeight: '115%',\n              }", "lineHeight: '115%',\n              }}")
content = content.replace("lineHeight: '105%',\n              }", "lineHeight: '105%',\n              }}")
content = content.replace("lineHeight: '100%',\n              }", "lineHeight: '100%',\n              }}")
content = content.replace("style={ height: '8.14vw' }", "style={{ height: '8.14vw' }}")
content = content.replace("style={ height: '16.79vw' }", "style={{ height: '16.79vw' }}")
content = content.replace("style={ height: '7.12vw' }", "style={{ height: '7.12vw' }}")

with open("app/page.tsx", "w") as f:
    f.write(content)
print("Styles Fixed")
