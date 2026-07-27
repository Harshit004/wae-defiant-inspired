import sys

with open("app/page.tsx", "r") as f:
    content = f.read()

old_p = """<p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: '3.05vw', lineHeight: '100%', color: '#AEAEAE' }}>
            Measured outcomes that demonstrate how our systems reduce environmental footprint at scale.
          </p>"""

new_p = """<p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: '3.05vw', lineHeight: '100%', color: '#AEAEAE', maxWidth: '59.29vw' }}>
            Measured outcomes that demonstrate how our systems reduce environmental footprint at scale.
          </p>"""

if old_p in content:
    content = content.replace(old_p, new_p)
    with open("app/page.tsx", "w") as f:
        f.write(content)
    print("Max width applied.")
else:
    print("Not found.")

