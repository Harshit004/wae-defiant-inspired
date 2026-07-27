import sys

with open("app/page.tsx", "r") as f:
    content = f.read()

start_idx = content.find('{/* Sustainability Impact Section */}')
end_idx = content.find('</section>', start_idx) + len('</section>')

old_section = content[start_idx:end_idx]

# Desktop parts
desktop_content = content[content.find('<div className="relative z-10 flex flex-col justify-between h-full">', start_idx) : content.find('</section>', start_idx)]

new_section = f"""{{/* Sustainability Impact Section */}}
      <section
        ref={{sectionRef}}
        className="relative text-white w-full"
        style={{{{
          background: 'linear-gradient(146.59deg, #004063 4.52%, #000000 49.04%)',
          overflow: 'hidden'
        }}}}
      >
        {{/* Background SVG with gradient mask for smooth blending */}}
        <img
          src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/374f4710-d942-4059-e39c-b5fc24283700/public"
          alt="Impact Background"
          className="absolute top-0 right-0 h-full w-auto opacity-70 object-cover object-right pointer-events-none select-none z-0"
          style={{{{
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%)',
            maskImage: 'linear-gradient(to right, transparent, black 15%)',
          }}}}
        />

        {{/* Desktop Layout */}}
        <div className="w-full hidden md:block relative z-10" style={{{{ paddingTop: '124px', paddingBottom: '124px', paddingLeft: '7.5vw', paddingRight: '7.5vw' }}}}>
          <div className="flex flex-col justify-between h-full">
            <div className="max-w-[600px]">
              <h2
                style={{{{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: '40px',
                  lineHeight: '110%',
                  color: '#FFFFFF'
                }}}}
              >
                Impact
              </h2>
              <div style={{{{ height: '10px' }}}} />
              <p
                style={{{{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: '20px',
                  lineHeight: '110%',
                  color: '#FFFFFF'
                }}}}
              >
                Real numbers. Real results.
              </p>
              <div style={{{{ height: '32px' }}}} />
              <p
                style={{{{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '130%',
                  color: '#AEAEAE',
                  maxWidth: '32.91vw'
                }}}}
              >
                Measured outcomes that demonstrate how our systems reduce environmental footprint at scale.
              </p>
              <div style={{{{ height: '46px' }}}} />
              <Link href="/sustainability" className="contents">
                <HoverButton theme="transparent-white">
                  {{(hovered) => (
                    <>
                      Know More
                      <div className="relative inline-block w-4 h-4">
                        <Image
                          src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                          alt="icon default"
                          width={{16}}
                          height={{16}}
                          className={{hovered ? "filter-wae-blue" : "brightness-0 invert"}}
                        />
                        <motion.div
                          initial={{{{ opacity: 0 }}}}
                          animate={{{{ opacity: hovered ? 1 : 0 }}}}
                          transition={{{{ delay: hovered ? 0.3 : 0, duration: 0.5 }}}}
                          className="absolute top-0 left-0"
                        >
                          <Image
                            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public"
                            alt="icon hover"
                            width={{16}}
                            height={{16}}
                            className={{hovered ? "filter-wae-blue" : "brightness-0 invert"}}
                          />
                        </motion.div>
                      </div>
                    </>
                  )}}
                </HoverButton>
              </Link>
            </div>

            <div className="mt-[150px]">
              <div className="grid grid-cols-2" style={{{{ maxWidth: '45.55vw', maxHeight: '267px' }}}}>
                {{/* Tonnes CO₂ emissions saved */}}
                <div className="border-r border-white/20 p-8 pl-0">
                  <Counter value={{1012120.45}} suffix="+" trigger={{isInView}} />
                  <p
                    style={{{{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 400,
                      fontSize: '18px',
                      lineHeight: '100%',
                      color: '#AEAEAE',
                    }}}}
                  >
                    Tonnes CO₂ emissions saved
                  </p>
                </div>

                <div className="p-8">
                </div>

                {{/* Million gallons of water saved */}}
                <div className="border-r border-t border-white/20 p-8 pl-0">
                  <Counter value={{12185.45}} suffix="+" trigger={{isInView}} />
                  <p
                    style={{{{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 400,
                      fontSize: '18px',
                      lineHeight: '100%',
                      color: '#AEAEAE',
                    }}}}
                  >
                    Million gallons of water saved
                  </p>
                </div>

                {{/* Tonnes plastic removed */}}
                <div className="border-t border-white/20 p-8">
                  <Counter value={{22253.65}} suffix="+" trigger={{isInView}} />
                  <p
                    style={{{{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 400,
                      fontSize: '18px',
                      lineHeight: '100%',
                      color: '#AEAEAE',
                    }}}}
                  >
                    Tonnes plastic removed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {{/* Mobile Layout */}}
        <div className="w-full md:hidden flex flex-col relative z-10 py-[20.35vw] px-[6.1vw]">
          <h2 style={{{{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: '8.14vw', lineHeight: '110%', color: '#FFFFFF' }}}}>
            Impact
          </h2>
          <div style={{{{ height: '2.54vw' }}}} />
          <p style={{{{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: '4.58vw', lineHeight: '110%', color: '#FFFFFF' }}}}>
            Real numbers. Real results.
          </p>
          <div style={{{{ height: '8.14vw' }}}} />
          <p style={{{{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: '3.56vw', lineHeight: '130%', color: '#AEAEAE' }}}}>
            Measured outcomes that demonstrate how our systems reduce environmental footprint at scale.
          </p>
          <div style={{{{ height: '8.14vw' }}}} />
          
          <Link href="/sustainability" className="contents">
            <HoverButton theme="transparent-white">
              {{(hovered) => (
                <>
                  Know More
                  <div className="relative inline-block w-4 h-4 ml-2">
                    <Image
                      src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                      alt="icon default"
                      width={{16}}
                      height={{16}}
                      className={{hovered ? "filter-wae-blue" : "brightness-0 invert"}}
                    />
                    <motion.div
                      initial={{{{ opacity: 0 }}}}
                      animate={{{{ opacity: hovered ? 1 : 0 }}}}
                      transition={{{{ delay: hovered ? 0.3 : 0, duration: 0.5 }}}}
                      className="absolute top-0 left-0"
                    >
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public"
                        alt="icon hover"
                        width={{16}}
                        height={{16}}
                        className={{hovered ? "filter-wae-blue" : "brightness-0 invert"}}
                      />
                    </motion.div>
                  </div>
                </>
              )}}
            </HoverButton>
          </Link>

          <div style={{{{ height: '100vw' }}}} />

          {{/* Grid of stats */}}
          <div className="grid grid-cols-2 w-full mt-auto">
            {{/* Tonnes CO₂ emissions saved */}}
            <div className="border-r border-b border-white/20 pb-[5vw] pr-[2vw]">
              <Counter value={{1012120.45}} suffix="+" trigger={{isInView}} style={{{{ fontSize: '6vw', lineHeight: '100%', marginBottom: '2vw' }}}} />
              <p style={{{{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: '2.5vw', lineHeight: '110%', color: '#AEAEAE' }}}}>
                Tonnes CO₂ emissions saved
              </p>
            </div>

            {{/* Empty space in grid */}}
            <div className="border-b border-white/20 pb-[5vw] pl-[2vw]">
            </div>

            {{/* Million gallons of water saved */}}
            <div className="border-r border-white/20 pt-[5vw] pr-[2vw]">
              <Counter value={{12185.45}} suffix="+" trigger={{isInView}} style={{{{ fontSize: '6vw', lineHeight: '100%', marginBottom: '2vw' }}}} />
              <p style={{{{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: '2.5vw', lineHeight: '110%', color: '#AEAEAE' }}}}>
                Million Gallons Of Water Saved
              </p>
            </div>

            {{/* Tonnes plastic removed */}}
            <div className="pt-[5vw] pl-[4vw]">
              <Counter value={{22253.65}} suffix="+" trigger={{isInView}} style={{{{ fontSize: '6vw', lineHeight: '100%', marginBottom: '2vw' }}}} />
              <p style={{{{ fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: '2.5vw', lineHeight: '110%', color: '#AEAEAE' }}}}>
                Tonnes Plastic Removed
              </p>
            </div>
          </div>
        </div>
      </section>"""

content = content.replace(old_section, new_section)

with open("app/page.tsx", "w") as f:
    f.write(content)
print("Impact section updated.")
