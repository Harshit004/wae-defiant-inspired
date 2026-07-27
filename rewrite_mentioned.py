import sys

with open("app/page.tsx", "r") as f:
    content = f.read()

start_marker = "{/* MEDIA & UPDATES SECTION */}"
end_marker = "{/* CONTACT SECTION */}"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print("Markers not found")
    sys.exit(1)

desktop_code = content[start_idx:end_idx]

# Modify desktop code to add 'hidden md:block'
if 'className="bg-black text-white"' in desktop_code:
    desktop_code = desktop_code.replace('className="bg-black text-white"', 'className="bg-black text-white hidden md:block"')

# Let's build the mobile code
mobile_code = """
      {/* MOBILE MEDIA & UPDATES SECTION */}
      <section className="bg-black text-white md:hidden px-[6.1vw] py-[12.72vw] border-t border-[#FFFFFF4D]">
        <h3 style={{
          fontFamily: "'Inter Tight', sans-serif",
          fontWeight: 400,
          fontSize: '3.56vw',
          lineHeight: '110%',
          color: '#FFFFFF'
        }}>
          Mentioned
        </h3>
        
        <div style={{ height: '4.32vw' }} />
        
        <h2 style={{
          fontFamily: "'Inter Tight', sans-serif",
          fontWeight: 400,
          fontSize: '7.12vw',
          lineHeight: '110%',
          color: '#FFFFFF'
        }}>
          Stay informed with our latest media coverage and announcements mentioned
        </h2>
        
        <div style={{ height: '12.21vw' }} />

        <div className="flex justify-start">
          <Link href="/news-and-updates" className="contents">
            <HoverButton theme="transparent-white">
              {(hovered) => (
                <>
                  Know More
                  <div className="relative inline-block w-4 h-4 ml-2">
                    <Image
                      src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                      alt="icon default"
                      width={16}
                      height={16}
                      className={hovered ? "filter-wae-blue" : "brightness-0 invert"}
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hovered ? 1 : 0 }}
                      transition={{ delay: hovered ? 0.3 : 0, duration: 0.5 }}
                      className="absolute top-0 left-0"
                    >
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b65e6ab9-db4f-4c7a-ee12-08b6d540ab00/public"
                        alt="icon hover"
                        width={16}
                        height={16}
                        className={hovered ? "filter-wae-blue" : "brightness-0 invert"}
                      />
                    </motion.div>
                  </div>
                </>
              )}
            </HoverButton>
          </Link>
        </div>

        <div style={{ height: '19.84vw' }} />

        <div className="flex flex-col">
          {homepageNews.slice(0, 2).map((item, index) => (
            <div key={item.id} className="w-full flex flex-col">
              <Link href={item.link} className="contents">
                <div className="group cursor-pointer">
                  <div className="relative w-full h-[68.7vw] overflow-hidden">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0"
                      />
                    ) : (
                      <div className="w-full h-full bg-white/5 flex items-center justify-center">
                        <span style={{ color: '#AEAEAE', fontSize: '11px' }}>No Image</span>
                      </div>
                    )}
                  </div>
                  
                  <div style={{ height: '5.08vw' }} />
                  
                  <h3 style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: '4.07vw',
                    lineHeight: '100%',
                    color: '#FFFFFF'
                  }}>
                    {item.title}
                  </h3>
                  
                  <div style={{ height: '3.05vw' }} />
                  
                  <p style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 400,
                    fontSize: '3.05vw',
                    lineHeight: '130%',
                    color: '#AEAEAE'
                  }}>
                    {item.description}
                  </p>
                </div>
              </Link>
              
              <div style={{ height: '13.23vw' }} />
              <div className="w-full h-[1px] border-b border-[#FFFFFF4D]" />
              <div style={{ height: '10.43vw' }} />
            </div>
          ))}
          
          <div className="flex flex-col gap-6">
            {homepageNews.slice(2, 5).map((item, index) => (
              <div key={item.id} className="w-full">
                <Link href={item.link} className="flex gap-4 items-center group cursor-pointer">
                  <div className="relative w-[29.2vw] aspect-[115/90] overflow-hidden flex-shrink-0">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0"
                      />
                    ) : (
                      <div className="w-full h-full bg-white/5 flex items-center justify-center">
                        <span style={{ color: '#AEAEAE', fontSize: '9px' }}>No Image</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <h3 style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 400,
                      fontSize: '3.56vw',
                      lineHeight: '120%',
                      color: '#FFFFFF'
                    }} className="line-clamp-2">
                      {item.title}
                    </h3>
                    
                    <p style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 400,
                      fontSize: '2.54vw',
                      lineHeight: '130%',
                      color: '#AEAEAE'
                    }} className="line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
"""

new_content = content[:start_idx] + desktop_code + mobile_code + "\n      " + content[end_idx:]

with open("app/page.tsx", "w") as f:
    f.write(new_content)

print("Updated page.tsx with mobile mentioned layout")
