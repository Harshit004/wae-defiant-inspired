import sys

with open("app/page.tsx", "r") as f:
    content = f.read()

old_section = """      {/* CONTACT SECTION */}
      <section
        className="bg-black text-white"
        style={{
          paddingTop: '123px',
          paddingBottom: '123px',
          paddingLeft: '7.5vw',
          paddingRight: '7.5vw',
          borderTop: '1px solid #FFFFFF4D'
        }}
      >
        <ContactSectionDark />
      </section>"""

new_section = """      {/* CONTACT SECTION */}
      <section
        className="bg-black text-white px-[6.1vw] pt-[16.53vw] pb-[21.11vw] md:px-[7.5vw] md:py-[123px] border-t border-[#FFFFFF4D]"
      >
        <ContactSectionDark />
      </section>"""

if old_section in content:
    content = content.replace(old_section, new_section)
    with open("app/page.tsx", "w") as f:
        f.write(content)
    print("Updated form padding in page.tsx")
else:
    print("Could not find the exact contact section string to replace.")

