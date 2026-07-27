with open("app/page.tsx", "r") as f:
    content = f.read()

hero_start = content.find('{/* HERO SECTION */}')
hero_end = content.find('</section>', hero_start) + len('</section>')

new_hero = """{/* HERO SECTION */}
      <section
        id="hero"
        className="w-full relative bg-[#0D0D0D] md:pt-[130px] md:pb-[30px] h-[100svh] md:h-auto flex flex-col"
      >
        {/* Background Image determining the height of the section naturally */}
        <div
          className="absolute md:relative inset-0 md:inset-auto w-full h-full opacity-95 md:aspect-[1440/691]"
        >
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
          
          {/* Mobile Bottom Elements */}
          <div className="md:hidden flex justify-between items-end px-[7.5vw] pb-[20px] pointer-events-auto">
             <div className="flex items-center gap-2 cursor-pointer text-[#AEAEAE]">
               <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: "10px", letterSpacing: "0px" }}>SCROLL FOR MORE</span>
               <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 12L12 12M12 12L12 4M12 12L4 4" stroke="#AEAEAE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
             </div>
             
             <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
               <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.7895 34.0041H19.7816C17.3828 33.9961 15.0487 33.3644 12.9816 32.1706L12.5298 31.9056L7.1518 33.3106L8.5833 28.0934L8.2917 27.6322C6.9859 25.5684 6.2995 23.1979 6.3048 20.7601C6.3155 13.3341 12.3687 7.28882 19.8055 7.28882C23.4079 7.29412 26.8005 8.69892 29.3496 11.248C31.896 13.797 33.2982 17.1896 33.2929 20.7894C33.2822 28.2155 27.2263 34.0041 19.7895 34.0041Z" stroke="white" strokeWidth="2"/>
                  <path d="M26.4868 24.2384C26.121 23.3243 25.5033 23.1097 24.9654 23.0169C24.5968 22.9559 24.1643 22.9559 23.793 22.9559C23.4244 22.9559 22.8256 23.0938 22.3395 23.6212C21.8507 24.1485 20.4735 25.4673 20.4735 28.0436C20.4735 30.6198 22.3983 33.1032 22.6612 33.4561C22.9213 33.8063 26.3117 39 30.7381 40.5402C31.7925 40.906 32.6183 41.1233 33.2716 41.2851C34.3312 41.5451 35.2847 41.5054 36.0336 41.3781C36.8727 41.2376 38.6074 40.3204 38.9705 39.2635C39.3337 38.2066 39.3337 37.2894 39.2142 37.1039C39.0921 36.9157 38.8478 36.8044 38.4819 36.6215" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
             </a>
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
