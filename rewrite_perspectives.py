import sys
import re

with open("app/page.tsx", "r") as f:
    content = f.read()

start_marker = "{/* BLOGS SECTION */}"
end_marker = "{/* MEDIA & UPDATES SECTION */}"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print("Markers not found")
    sys.exit(1)

desktop_mobile_section = """{/* BLOGS SECTION */}
      {/* DESKTOP LAYOUT */}
      <section
        className="bg-black text-white hidden md:block"
        style={{
          paddingTop: '123px',
          paddingBottom: '123px',
          paddingLeft: '7.5vw',
          paddingRight: '7.5vw'
        }}
      >
        <div className="w-full">
          <div className="flex justify-between items-start w-full">
            <div className="flex-1">
              <h2 style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: '40px',
                lineHeight: '110%',
                color: '#FFFFFF',
                marginBottom: '20px'
              }}>
                Perspectives
              </h2>
              <p style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '140%',
                color: '#AEAEAE',
                maxWidth: '450px',
                marginBottom: '60px'
              }}>
                WAE publishes perspectives on climate, water, and sustainability — because good water companies think beyond the tap.
              </p>
            </div>
            <div className="flex-shrink-0">
              <HoverButton href="/perspectives" theme="transparent-white-black-hover">
                {(hovered) => (
                  <>
                    Know More
                    <div className="relative inline-block w-4 h-4 ml-2">
                      <Image
                        src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                        alt="icon default"
                        width={16}
                        height={16}
                        className={hovered ? "brightness-0" : "brightness-0 invert"}
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
                          className={hovered ? "brightness-0" : "brightness-0 invert"}
                        />
                      </motion.div>
                    </div>
                  </>
                )}
              </HoverButton>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-x-12">
            {blogsLoading ? (
              // Skeleton placeholders
              [0, 1, 2].map((i) => (
                <div key={i} className="border-l border-white/20 pl-8">
                  <div className="relative w-full aspect-square overflow-hidden mb-6 bg-white/5 animate-pulse" />
                  <div className="h-5 bg-white/5 animate-pulse mb-2 w-3/4" />
                  <div className="h-4 bg-white/5 animate-pulse mb-1 w-full" />
                  <div className="h-4 bg-white/5 animate-pulse mb-6 w-2/3" />
                  <div className="h-3 bg-white/5 animate-pulse w-24" />
                </div>
              ))
            ) : homepageBlogs.length > 0 ? (
              homepageBlogs.map((blog) => {
                const categorySlug = blog.category.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                const blogUrl = `/perspectives/${categorySlug}/${blog.id}`
                return (
                  <Link key={blog.id} href={blogUrl} className="contents">
                    <div className="group cursor-pointer border-l border-white/20 pl-8">
                      <div className="relative w-full aspect-square overflow-hidden mb-6">
                        {blog.heroImage ? (
                          <Image
                            src={blog.heroImage}
                            alt={blog.title}
                            fill
                            className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0"
                          />
                        ) : (
                          <div className="w-full h-full bg-white/5 flex items-center justify-center">
                            <span style={{ color: '#AEAEAE', fontSize: '11px' }}>No Image</span>
                          </div>
                        )}
                      </div>
                      <div style={{ minHeight: '80px', marginBottom: '16px' }}>
                        <h3 style={{
                          fontFamily: "'Inter Tight', sans-serif",
                          fontWeight: 400,
                          fontSize: '18px',
                          lineHeight: '130%',
                          color: '#FFFFFF'
                        }}>
                          {blog.title}
                        </h3>
                      </div>
                      <p style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 400,
                        fontSize: '12px',
                        lineHeight: '140%',
                        color: '#AEAEAE',
                        marginBottom: '32px'
                      }}>
                        {blog.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <span style={{
                          fontFamily: "'Inter Tight', sans-serif",
                          fontWeight: 400,
                          fontSize: '12px',
                          color: '#FFFFFF',
                          textDecoration: 'underline',
                          textUnderlineOffset: '4px'
                        }}>Read Article</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                )
              })
            ) : (
              // No featured blogs yet — subtle empty state
              <div className="col-span-3 py-16 text-center border-l border-white/20 pl-8">
                <p style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '13px',
                  color: '#AEAEAE'
                }}>
                  No blogs featured yet. Select up to 3 in the CMS to display them here.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* MOBILE LAYOUT */}
      <section className="bg-black text-white md:hidden px-[6.1vw] py-[12.72vw]">
        <h2 style={{
          fontFamily: "'Inter Tight', sans-serif",
          fontWeight: 400,
          fontSize: '7.12vw',
          lineHeight: '110%',
          color: '#FFFFFF'
        }}>
          Perspectives
        </h2>
        
        <div style={{ height: '4.32vw' }} />
        
        <p style={{
          fontFamily: "'Manrope', sans-serif",
          fontWeight: 400,
          fontSize: '3.05vw',
          lineHeight: '100%',
          color: '#AEAEAE'
        }}>
          WAE publishes perspectives on climate, water, and sustainability — because good water companies think beyond the tap.
        </p>
        
        <div style={{ height: '12.21vw' }} />

        <div className="flex justify-start">
          <Link href="/perspectives" className="contents">
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
          {blogsLoading ? (
            [0, 1, 2].map((i) => (
              <div key={i} className="mb-10 w-full">
                <div className="relative w-full aspect-video overflow-hidden mb-6 bg-white/5 animate-pulse" />
                <div className="h-5 bg-white/5 animate-pulse mb-2 w-3/4" />
                <div className="h-4 bg-white/5 animate-pulse mb-1 w-full" />
              </div>
            ))
          ) : homepageBlogs.length > 0 ? (
            homepageBlogs.map((blog, index) => {
              const categorySlug = blog.category.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
              const blogUrl = `/perspectives/${categorySlug}/${blog.id}`
              return (
                <div key={blog.id} className="w-full flex flex-col">
                  <Link href={blogUrl} className="contents">
                    <div className="group cursor-pointer">
                      <div className="relative w-full h-[68.7vw] overflow-hidden">
                        {blog.heroImage ? (
                          <Image
                            src={blog.heroImage}
                            alt={blog.title}
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
                        {blog.title}
                      </h3>
                      
                      <div style={{ height: '3.05vw' }} />
                      
                      <p style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 400,
                        fontSize: '3.05vw',
                        lineHeight: '100%',
                        color: '#AEAEAE'
                      }}>
                        {blog.description}
                      </p>
                      
                      <div style={{ height: '13.23vw' }} />
                      
                      <span style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 400,
                        fontSize: '3.05vw',
                        lineHeight: '110%',
                        color: '#FFFFFF',
                        textDecoration: 'underline',
                        textUnderlineOffset: '0%',
                        textDecorationThickness: '1px',
                        textDecorationSkipInk: 'auto'
                      }}>
                        Read Article
                      </span>
                    </div>
                  </Link>

                  {index !== homepageBlogs.length - 1 && (
                    <div className="w-full relative mt-[14.5vw] mb-[10.43vw]">
                      <div className="absolute left-[-6.1vw] right-[-6.1vw] border-b border-[#FFFFFF4D]" />
                    </div>
                  )}
                </div>
              )
            })
          ) : (
            <div className="py-8 text-center">
              <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '3.56vw', color: '#AEAEAE' }}>
                No blogs featured yet.
              </p>
            </div>
          )}
        </div>
      </section>
      
      """

new_content = content[:start_idx] + desktop_mobile_section + content[end_idx:]

with open("app/page.tsx", "w") as f:
    f.write(new_content)

print("Perspectives section updated.")
