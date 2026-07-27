import sys

with open("app/page.tsx", "r") as f:
    content = f.read()

old_divider = """              <div style={{ height: '13.23vw' }} />
              <div className="w-full h-[1px] border-b border-[#FFFFFF4D]" />
              <div style={{ height: '10.43vw' }} />"""

new_divider = """              <div style={{ height: '12vw' }} />"""

if old_divider in content:
    content = content.replace(old_divider, new_divider)
    with open("app/page.tsx", "w") as f:
        f.write(content)
    print("Divider removed successfully")
else:
    print("Divider string not found")

