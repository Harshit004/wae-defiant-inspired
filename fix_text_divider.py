import re

with open('app/sustainability/page.tsx', 'r') as f:
    content = f.read()

# 1. Fix the top HERO text alignment (stack them vertically instead of flex row)
hero_old = """            <div className="flex justify-between items-start pt-[60px] pb-[2.63vw]">
                <div className="w-1/2 pr-10">
                    <h1 style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 400,
                        fontSize: "4.16vw",
                        lineHeight: "130%",
                        letterSpacing: "0%",
                        color: "#FFFFFF",
                        margin: 0,
                        verticalAlign: "middle"
                    }}>
                        Our planet,<br />
                        Our responsibility
                    </h1>
                </div>
                <div className="w-[45%] flex flex-col justify-start pt-[1.5vw]">
                    <p style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 400,
                        fontSize: "1.11vw",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                        color: "#FFFFFF",
                        marginBottom: "1.5vw",
                        verticalAlign: "middle"
                    }}>
                        Sustainability is not a choice. It is a responsibility.
                    </p>
                    <p style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 400,
                        fontSize: "1.11vw",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                        color: "#FFFFFF80",
                        verticalAlign: "middle"
                    }}>
                        We help organizations reduce environmental impact, adopt ethical practices, and move towards regenerative business models that are better for business and better for the planet
                    </p>
                </div>
            </div>"""

hero_new = """            <div className="flex flex-col pt-[60px] pb-[2.63vw]">
                <div className="w-1/2 pr-10">
                    <h1 style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 400,
                        fontSize: "4.16vw",
                        lineHeight: "130%",
                        letterSpacing: "0%",
                        color: "#FFFFFF",
                        margin: 0,
                        verticalAlign: "middle"
                    }}>
                        Our planet,<br />
                        Our responsibility
                    </h1>
                </div>
                <div className="w-full flex justify-end">
                    <div className="w-[39.58vw] flex flex-col justify-start">
                        <p style={{
                            fontFamily: "'Manrope', sans-serif",
                            fontWeight: 400,
                            fontSize: "1.11vw",
                            lineHeight: "100%",
                            letterSpacing: "0%",
                            color: "#FFFFFF",
                            marginBottom: "1.5vw",
                            verticalAlign: "middle"
                        }}>
                            Sustainability is not a choice. It is a responsibility.
                        </p>
                        <p style={{
                            fontFamily: "'Manrope', sans-serif",
                            fontWeight: 400,
                            fontSize: "1.11vw",
                            lineHeight: "100%",
                            letterSpacing: "0%",
                            color: "#FFFFFF80",
                            verticalAlign: "middle"
                        }}>
                            We help organizations reduce environmental impact, adopt ethical practices, and move towards regenerative business models that are better for business and better for the planet
                        </p>
                    </div>
                </div>
            </div>"""

content = content.replace(hero_old, hero_new)

# 2. Fix the padding/margin of the horizontal dividers.
# In the HERO section, remove the pb-[60px] so that the gap to the next section is controlled properly.
section_hero_old = """      {/* HERO SECTION */}
      <section
        id="hero"
        className="w-full relative flex flex-col items-center pb-[60px]"
      >"""
section_hero_new = """      {/* HERO SECTION */}
      <section
        id="hero"
        className="w-full relative flex flex-col items-center"
      >"""
content = content.replace(section_hero_old, section_hero_new)


# Change the Responsibility section pt to 68px (4.72vw) so it matches the gap above the marquee.
resp_sec_old = """      {/* RESPONSIBILITY SECTION */}
      <section className="w-full pt-[6.94vw] pb-[6.94vw] border-b border-white/20">"""
resp_sec_new = """      {/* RESPONSIBILITY SECTION */}
      <section className="w-full pt-[4.72vw] pb-[6.94vw] border-b border-white/20">"""
content = content.replace(resp_sec_old, resp_sec_new)

with open('app/sustainability/page.tsx', 'w') as f:
    f.write(content)
