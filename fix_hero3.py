with open("app/page.tsx", "r") as f:
    content = f.read()

hero_start = content.find('{/* HERO SECTION */}')
hero_end = content.find('</section>', hero_start) + len('</section>')

new_hero = """{/* HERO SECTION */}
      <section
        id="hero"
        className="w-full relative bg-[#0D0D0D] md:pt-[130px] md:pb-[30px] h-[691px] md:h-auto flex flex-col"
      >
        {/* Background Image determining the height of the section naturally */}
        <div className="md:hidden absolute inset-0 w-full h-full opacity-95">
          <LightweightRipple imageUrl="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531d62fc-56b7-4172-cc36-79a46cada200/public" />
        </div>
        <div className="hidden md:block absolute md:relative inset-0 md:inset-auto w-full h-full opacity-95 md:aspect-[1440/691]">
          <LightweightRipple imageUrl="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/5de3d44a-e3d5-415c-eed0-41108c90c900/public" />
        </div>

        {/* Hero Content Text (Topmost) */}
        <div className="absolute inset-0 w-full h-full z-[3] pointer-events-none flex flex-col justify-center pt-[100px] md:pt-[30px] pb-[30px]">
          <div className={`${containerClass} flex-1 flex flex-col justify-center`}>
            <div
              className="w-[85vw] md:w-[clamp(280px,34.79vw,600px)]"
              style={{
                color: "#FFFFFF",
                fontFamily: "'Inter Tight', sans-serif",
              }}
            >
              <h1
                className="text-[12.5vw] md:text-[clamp(36px,5.9vw,85px)] leading-[105%] font-medium"
                style={{
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  margin: 0,
                }}
              >
                We're here<br />to disrupt the<br />status quo!
              </h1>
              <div className="h-[2vw] md:h-[clamp(12px,1.5vw,22px)]" />
              <p
                className="text-[6vw] md:text-[30px] leading-[115%] font-normal text-[#AEAEAE]"
                style={{
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  margin: 0,
                }}
              >
                Our Green is Blue
              </p>
            </div>
          </div>
          
        </div>
      </section>"""

if hero_start != -1:
    content = content[:hero_start] + new_hero + content[hero_end:]
    with open("app/page.tsx", "w") as f:
        f.write(content)
    print("done")
else:
    print("hero start not found")
