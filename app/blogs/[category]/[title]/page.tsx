"use client"

import React, { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { BLOGS, WRITERS, BlogPost, Writer } from "@/data/blogs"

const containerClass = "mx-auto w-full max-w-[1440px] px-[7.5vw]"

export default function DynamicBlogPost() {
  const params = useParams()
  const categoryParam = params?.category as string
  const titleParam = params?.title as string

  const [copied, setCopied] = useState(false)
  const [hoveredRelatedCard, setHoveredRelatedCard] = useState<number | null>(null)
  const [blogData, setBlogData] = useState<BlogPost | null>(null)
  const [writerData, setWriterData] = useState<Writer | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    // Read the database inside useEffect to capture runtime changes in client development
    if (titleParam) {
      const post = BLOGS[titleParam] || Object.values(BLOGS).find(b => b.id === titleParam)
      if (post) {
        setBlogData(post)
        const writer = WRITERS[post.writerId]
        setWriterData(writer || null)

        // Find up to 3 related posts of the same category (excluding the current one)
        const sameCategoryRelated = Object.values(BLOGS)
          .filter(b => b.id !== post.id && b.category === post.category && b.status === "Live")

        let related = sameCategoryRelated.slice(0, 3)

        // If we don't have 3, fill with other categories
        if (related.length < 3) {
          const otherRelated = Object.values(BLOGS)
            .filter(b => b.id !== post.id && b.category !== post.category && b.status === "Live")
          related = [...related, ...otherRelated].slice(0, 3)
        }

        setRelatedPosts(related)
      }
    }
  }, [titleParam])

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err)
      })
  }

  if (!blogData) {
    return (
      <main className="relative bg-[#0c0c0c] text-white min-h-screen">
        <Header />
        <div className="h-[220px]" />
        <section className={containerClass}>
          <div className="text-center py-20">
            <h1 className="text-2xl font-normal" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Article Not Found
            </h1>
            <p className="text-gray-500 mt-4" style={{ fontFamily: "'Manrope', sans-serif" }}>
              The article you are looking for does not exist or has been moved.
            </p>
            <Link href="/blogs" className="text-[#0081C9] hover:underline mt-6 inline-block">
              Back to all blogs
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  const paragraphStyle = {
    fontFamily: "var(--font-manrope), sans-serif",
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '1.5',
    letterSpacing: '0%',
    color: '#AEAEAE',
  }

  const headingStyle = {
    fontFamily: "var(--font-inter-tight), sans-serif",
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '1.3',
    letterSpacing: '0%',
    color: '#fff',
  }

  return (
    <main className="relative bg-[#0c0c0c] text-white min-h-screen">
      <Header />

      {/* Hero section */}
      <section id="hero" className="relative w-full overflow-hidden pt-0">
        <div className="relative w-full">
          {blogData.heroImage ? (
            <Image
              src={blogData.heroImage}
              alt={blogData.title}
              width={1440}
              height={810}
              priority
              className="w-full h-auto z-0"
            />
          ) : (
            <div className="w-full aspect-[16/9] bg-gradient-to-b from-[#00223d] to-[#0c0c0c]" />
          )}
          {/* Top Gradient */}
          <div
            className="absolute top-0 left-0 right-0 pointer-events-none z-10"
            style={{
              height: '430px',
              background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%)',
            }}
          />
          {/* Bottom Gradient */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
            style={{
              height: '270px',
              background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)',
            }}
          />
        </div>
      </section>

      {/* Background Gradient Wrapper */}
      <div className="relative w-full bg-[#0c0c0c]">
        {/* Gradient background with max height of 875px */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none z-0"
          style={{
            height: '875px',
            maxHeight: '875px',
            background: 'linear-gradient(180deg, #00223d 0px, #0c0c0c 100%) no-repeat',
          }}
        />

        {/* Article Section */}
        <section
          className="relative z-10 w-full"
          style={{
            paddingTop: '6.319vw',
            paddingLeft: '7.5vw',
            paddingRight: '7.5vw',
            paddingBottom: '7.43vw'
          }}
        >
          <div className="mx-auto">
            {/* Category label */}
            <div
              style={{
                fontFamily: "var(--font-inter-tight), sans-serif",
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '130%',
                letterSpacing: '0%',
                verticalAlign: 'middle',
                color: '#fff',
                marginBottom: '31px'
              }}
            >
              {blogData.category}
            </div>

            {/* Title */}
            <h1
              style={{
                fontFamily: "var(--font-inter-tight), sans-serif",
                fontWeight: 400,
                fontSize: '40px',
                lineHeight: '100%',
                letterSpacing: '0%',
                verticalAlign: 'middle',
                color: '#fff',
                marginBottom: '42px'
              }}
            >
              {blogData.title}
            </h1>

            {/* Author and Read Time Metadata Row */}
            <div className="flex justify-between items-center text-white" style={{ marginBottom: '38px' }}>
              {writerData ? (
                <Link
                  href={writerData.link || "#"}
                  style={{
                    fontFamily: "var(--font-inter-tight), sans-serif",
                    fontWeight: 700,
                    fontSize: '14px',
                    lineHeight: '130%',
                    letterSpacing: '0%',
                    verticalAlign: 'middle',
                    textDecoration: 'underline',
                    textUnderlineOffset: '4px',
                    color: '#fff'
                  }}
                >
                  {writerData.name}
                </Link>
              ) : (
                <span style={{ fontFamily: "var(--font-inter-tight), sans-serif", fontSize: '14px' }}>
                  WAE Writer
                </span>
              )}

              <div className="flex items-center gap-[12px]">
                <span
                  style={{
                    fontFamily: "var(--font-inter-tight), sans-serif",
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '130%',
                    letterSpacing: '0%',
                    verticalAlign: 'middle',
                    color: '#fff'
                  }}
                >
                  {blogData.readTime}
                </span>

                <button
                  onClick={handleShare}
                  aria-label="Share article"
                  className="hover:opacity-80 transition-opacity relative flex items-center cursor-pointer"
                >
                  <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/cefe6cc9-95e7-4e11-0008-900d4d407600/public"
                    alt="Share"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-contain"
                  />
                  {copied && (
                    <span
                      className="absolute bottom-full right-0 mb-2 px-2 py-1 text-[10px] bg-black/95 text-white rounded border border-white/20 whitespace-nowrap backdrop-blur-sm shadow-md"
                      style={{ fontFamily: "var(--font-inter-tight), sans-serif" }}
                    >
                      Link Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Horizontal rule */}
            <div className="relative z-10 w-full" style={{ borderTop: '1px solid #FFFFFF4D' }} />

            {/* Three column layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12" style={{ marginTop: '58px' }}>
              {[0, 1, 2].map((colIdx) => {
                const columnBlocks = blogData.contentColumns?.[colIdx] || []
                return (
                  <div key={colIdx} className="flex flex-col">
                    {columnBlocks.map((block, blockIdx) => {
                      const isAfterHeading = blockIdx > 0 && columnBlocks[blockIdx - 1]?.type === 'heading'
                      const isFirst = blockIdx === 0

                      if (block.type === 'paragraph') {
                        return (
                          <p
                            key={blockIdx}
                            style={{
                              ...paragraphStyle,
                              marginTop: isFirst ? '0px' : isAfterHeading ? '20px' : '12px'
                            }}
                          >
                            {block.text}
                          </p>
                        )
                      }

                      if (block.type === 'heading') {
                        return (
                          <h2
                            key={blockIdx}
                            style={{
                              ...headingStyle,
                              marginTop: isFirst ? '0px' : '46px',
                              marginBottom: '20px'
                            }}
                          >
                            {block.text}
                          </h2>
                        )
                      }

                      if (block.type === 'list') {
                        return (
                          <ul
                            key={blockIdx}
                            className="list-disc pl-5"
                            style={{
                              ...paragraphStyle,
                              marginTop: isFirst ? '0px' : isAfterHeading ? '20px' : '12px'
                            }}
                          >
                            {block.items?.map((item, itemIdx) => (
                              <li
                                key={itemIdx}
                                style={{
                                  marginBottom: itemIdx === (block.items?.length || 1) - 1 ? '0px' : '8px'
                                }}
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        )
                      }

                      return null
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Divider above writer info */}
        <div className="relative z-10 mx-[7.5vw] h-px" style={{ borderTop: '1px solid #FFFFFF4D', marginBottom: '48px' }} />

        {/* Writer Card Section */}
        {writerData && (
          <section className="relative z-10 w-full mb-[76px] px-[7.5vw]">
            <div className="mx-auto">
              <div className="flex flex-col md:flex-row items-stretch md:gap-[94px]">
                {/* Writer circular image */}
                <div className="flex-shrink-0 mb-8 md:mb-0">
                  <Image
                    src={writerData.image}
                    alt={writerData.name}
                    width={242}
                    height={244}
                    className="rounded-full object-cover grayscale w-[242px] h-[244px]"
                  />
                </div>

                {/* Writer bio and details */}
                <div className="flex flex-col justify-between flex-grow md:py-[2px]" style={{ minHeight: '244px' }}>
                  <div>
                    <h3 className="text-white" style={{
                      fontFamily: "var(--font-inter-tight), sans-serif",
                      fontWeight: 500,
                      fontSize: '24px',
                      lineHeight: '140%',
                      letterSpacing: '0%',
                      verticalAlign: 'middle',
                      textTransform: 'capitalize',
                      marginBottom: '12px',
                    }}>
                      {writerData.name}
                    </h3>

                    <p style={{
                      fontFamily: "var(--font-inter-tight), sans-serif",
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '120%',
                      letterSpacing: '0%',
                      verticalAlign: 'middle',
                      color: '#ffffff',
                      marginBottom: '32px',
                    }}>
                      {writerData.role}
                    </p>

                    <p style={{
                      fontFamily: "var(--font-manrope), sans-serif",
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '1.3',
                      letterSpacing: '0%',
                      verticalAlign: 'middle',
                      color: '#AEAEAE',
                      margin: 0,
                      maxWidth: '750px'
                    }}>
                      {writerData.bio}
                    </p>
                  </div>

                  <div className="mt-6 md:mt-0 flex items-end">
                    <Link
                      href={writerData.link || "#"}
                      className="inline-flex items-center text-white cursor-pointer"
                      style={{
                        fontFamily: "var(--font-inter-tight), sans-serif",
                        fontWeight: 400,
                        fontSize: '18px',
                        lineHeight: '120%',
                        letterSpacing: '0%',
                        verticalAlign: 'middle',
                      }}
                    >
                      <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                        View Profile
                      </span>
                      <span style={{ marginLeft: '10px' }}>↗</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Horizontal rule */}
        <div className="relative z-10 mx-[7.5vw] h-px bg-white/30" style={{ borderTop: '1px solid #FFFFFF4D' }} />

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section
            className="relative z-10 w-full"
            style={{
              paddingTop: '76px',
              paddingLeft: '7.5vw',
              paddingRight: '7.5vw',
              paddingBottom: '15.347vw'
            }}
          >
            <div className="mx-auto">
              <h2
                style={{
                  fontFamily: "var(--font-inter-tight), sans-serif",
                  fontWeight: 400,
                  fontSize: '40px',
                  lineHeight: '110.00000000000001%',
                  letterSpacing: '0%',
                  verticalAlign: 'middle',
                  color: '#fff',
                  marginBottom: '60px'
                }}
              >
                Related Articles
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[4.166%] gap-y-[130px]">
                {relatedPosts.map((post, index) => {
                  const rCatSlug = post.category.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                  const linkUrl = `/blogs/${rCatSlug}/${post.id}`

                  return (
                    <div
                      key={post.id}
                      className="group flex items-stretch transition-all duration-300"
                      onMouseEnter={() => setHoveredRelatedCard(index)}
                      onMouseLeave={() => setHoveredRelatedCard(null)}
                    >
                      {/* Divider line before card */}
                      <div className="w-px bg-white/20 self-stretch shrink-0" />
                      <div style={{ width: "calc(22 / 1440 * 100vw)" }} className="shrink-0" />

                      {/* Card Content */}
                      <div className="flex flex-col flex-grow text-left">
                        <Link href={linkUrl} className="block relative aspect-[364/270] w-full overflow-hidden">
                          <Image
                            src={post.heroImage}
                            alt={post.title}
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[800ms] ease-in-out"
                          />
                        </Link>

                        <div style={{ height: "20px" }} />

                        <Link href={linkUrl}>
                          <h3
                            className="hover:opacity-80 transition-opacity m-0"
                            style={{
                              fontFamily: "var(--font-inter-tight), sans-serif",
                              fontWeight: 400,
                              fontSize: "18px",
                              lineHeight: "130%",
                              letterSpacing: "0%",
                              color: "#ffffff",
                              verticalAlign: "middle"
                            }}
                          >
                            {post.title}
                          </h3>
                        </Link>

                        <div style={{ height: "12px" }} />

                        <p
                          className="m-0"
                          style={{
                            fontFamily: "var(--font-manrope), sans-serif",
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "130%",
                            letterSpacing: "0%",
                            color: "#AEAEAE",
                            verticalAlign: "middle"
                          }}
                        >
                          {post.description}
                        </p>

                        <div style={{ height: "52px" }} />

                        <Link
                          href={linkUrl}
                          className="inline-flex items-center hover:opacity-80 transition-opacity mt-auto"
                          style={{
                            fontFamily: "var(--font-manrope), sans-serif",
                            fontWeight: 400,
                            fontSize: "12px",
                            lineHeight: "110%",
                            letterSpacing: "0%",
                            color: "#ffffff",
                            verticalAlign: "middle",
                          }}
                        >
                          Read Article
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        )}

      </div>
      <Footer />
    </main>
  )
}
