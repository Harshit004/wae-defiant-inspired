"use client"

import React, { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { BLOGS, WRITERS, BlogPost, Writer } from "@/data/blogs"

const containerClass = "mx-auto w-full max-w-[1440px]"

export default function DynamicBlogPost() {
  const params = useParams()
  const titleParam = params?.title as string

  const [copied, setCopied] = useState(false)
  const [hoveredRelatedCard, setHoveredRelatedCard] = useState<number | null>(null)
  const [blogData, setBlogData] = useState<BlogPost | null>(null)
  const [writerData, setWriterData] = useState<Writer | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    if (titleParam) {
      const post = BLOGS[titleParam] || Object.values(BLOGS).find(b => b.id === titleParam)
      if (post) {
        setBlogData(post)
        const writer = WRITERS[post.writerId]
        setWriterData(writer || null)

        const sameCategoryRelated = Object.values(BLOGS)
          .filter(b => b.id !== post.id && b.category === post.category && b.status === "Live")

        let related = sameCategoryRelated.slice(0, 3)

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
      <main className="relative bg-[#0F0F0F] text-white min-h-screen">
        <Header transparentBg />
        <div className="h-[220px]" />
        <section className="px-[24px] md:px-[7.5vw] mx-auto w-full max-w-[1440px]">
          <div className="text-center py-20">
            <h1 className="text-2xl font-inter-tight font-normal">
              Article Not Found
            </h1>
            <p className="text-gray-500 mt-4 font-manrope font-normal">
              The article you are looking for does not exist or has been moved.
            </p>
            <Link href="/perspectives" className="text-[#0081C9] hover:underline mt-6 inline-block">
              Back to all blogs
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="relative bg-[#0F0F0F] text-white min-h-screen">
      <Header transparentBg />

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
            <div className="w-full aspect-[16/9] bg-gradient-to-b from-[#004063] to-[#0F0F0F]" />
          )}
          {/* Top Gradient */}
          <div
            className="absolute top-0 left-0 right-0 pointer-events-none z-10 h-[200px] md:h-[430px]"
            style={{
              background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%)',
            }}
          />
          {/* Bottom Gradient */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none z-10 h-[100px] md:h-[270px]"
            style={{
              background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)',
            }}
          />
        </div>
      </section>

      {/* Background Gradient Wrapper */}
      <div className="relative w-full bg-[#0F0F0F]">
        {/* Gradient background with max height of 875px */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none z-0"
          style={{
            height: '875px',
            maxHeight: '875px',
            background: 'linear-gradient(146.59deg, #004063 4.52%, #0F0F0F 49.04%)',
          }}
        />

        {/* Article Section */}
        <section
          className={`relative z-10 w-full pt-[40px] md:pt-[6.319vw] pb-[60px] md:pb-[7.43vw] px-[24px] md:px-[7.5vw] ${containerClass}`}
        >
          <div className="mx-auto">
            {/* Category label */}
            <div className="font-inter-tight font-normal text-[12px] md:text-[14px] leading-[130%] text-white mb-[16px] md:mb-[31px]">
              {blogData.category}
            </div>

            {/* Title */}
            <h1 className="font-inter-tight font-normal text-[24px] md:text-[40px] leading-[120%] md:leading-[100%] text-white mb-[24px] md:mb-[42px]">
              {blogData.title}
            </h1>

            {/* Author and Read Time Metadata Row */}
            <div className="flex justify-between items-center text-white mb-[24px] md:mb-[38px]">
              {writerData ? (
                <Link
                  href={writerData.link || "#"}
                  className="font-inter-tight font-bold text-[12px] md:text-[14px] leading-[130%] text-white underline underline-offset-4"
                >
                  {writerData.name}
                </Link>
              ) : (
                <span className="font-inter-tight text-[12px] md:text-[14px]">
                  WAE Writer
                </span>
              )}

              <div className="flex items-center gap-[12px]">
                <span className="font-inter-tight font-normal text-[12px] leading-[130%] text-white">
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
                    className="w-4 h-4 md:w-6 md:h-6 object-contain"
                  />
                  {copied && (
                    <span className="absolute bottom-full right-0 mb-2 px-2 py-1 text-[10px] bg-black/95 text-white rounded border border-white/20 whitespace-nowrap backdrop-blur-sm shadow-md font-inter-tight">
                      Link Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Horizontal rule */}
            <div className="relative z-10 w-full border-t border-[#FFFFFF4D]" />

            {/* Three column layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] md:gap-[48px] mt-[32px] md:mt-[58px]">
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
                            className={`font-manrope font-normal text-[14px] leading-[1.5] text-[#AEAEAE] ${
                              isFirst ? 'mt-0' : isAfterHeading ? 'mt-[16px] md:mt-[20px]' : 'mt-[12px]'
                            }`}
                          >
                            {block.text}
                          </p>
                        )
                      }

                      if (block.type === 'heading') {
                        return (
                          <h2
                            key={blockIdx}
                            className={`font-inter-tight font-normal text-[18px] leading-[1.3] text-white ${
                              isFirst ? 'mt-0' : 'mt-[32px] md:mt-[46px]'
                            } mb-[16px] md:mb-[20px]`}
                          >
                            {block.text}
                          </h2>
                        )
                      }

                      if (block.type === 'list') {
                        return (
                          <ul
                            key={blockIdx}
                            className={`list-disc pl-5 font-manrope font-normal text-[14px] leading-[1.5] text-[#AEAEAE] ${
                              isFirst ? 'mt-0' : isAfterHeading ? 'mt-[16px] md:mt-[20px]' : 'mt-[12px]'
                            }`}
                          >
                            {block.items?.map((item, itemIdx) => (
                              <li
                                key={itemIdx}
                                className={itemIdx === (block.items?.length || 1) - 1 ? 'mb-0' : 'mb-[8px]'}
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
        <div className="relative z-10 mx-[24px] md:mx-[7.5vw] h-px border-t border-[#FFFFFF4D] mb-[40px] md:mb-[48px]" />

        {/* Writer Card Section */}
        {writerData && (
          <section className={`relative z-10 w-full mb-[40px] md:mb-[76px] px-[24px] md:px-[7.5vw] ${containerClass}`}>
            <div className="mx-auto">
              {/* Writer Profile row */}
              <div className="flex flex-row items-start md:items-stretch gap-[16px] md:gap-[94px]">
                {/* Writer circular image */}
                <div className="flex-shrink-0 w-[40%] max-w-[150px] md:max-w-none md:w-[242px]">
                  <Image
                    src={writerData.image}
                    alt={writerData.name}
                    width={242}
                    height={244}
                    className="rounded-full object-cover grayscale aspect-square w-full"
                  />
                </div>

                {/* Writer bio and details */}
                <div className="flex flex-col justify-between flex-grow md:py-[2px]">
                  <div>
                    <h3 className="font-inter-tight font-medium text-[16px] md:text-[24px] leading-[140%] text-white capitalize mb-[4px] md:mb-[12px]">
                      {writerData.name}
                    </h3>

                    <p className="font-inter-tight font-normal text-[10px] md:text-[16px] leading-[120%] text-white mb-[8px] md:mb-[32px]">
                      {writerData.role}
                    </p>

                    <p className="font-manrope font-normal text-[10px] md:text-[16px] leading-[1.3] text-[#AEAEAE] m-0 max-w-[750px]">
                      {writerData.bio}
                    </p>
                  </div>

                  <div className="mt-[16px] md:mt-[32px] flex items-end">
                    <Link
                      href={writerData.link || "#"}
                      className="inline-flex items-center text-white cursor-pointer font-inter-tight font-medium md:font-normal text-[10px] md:text-[18px] leading-[120%]"
                    >
                      <span className="underline underline-offset-[3px]">
                        View Profile
                      </span>
                      <span className="ml-[6px] md:ml-[10px]">↗</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Horizontal rule */}
        <div className="relative z-10 mx-[24px] md:mx-[7.5vw] h-px bg-[#FFFFFF4D]" />

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section
            className={`relative z-10 w-full pt-[40px] md:pt-[76px] pb-[80px] md:pb-[15.347vw] px-[24px] md:px-[7.5vw] ${containerClass}`}
          >
            <div className="mx-auto">
              <h2 className="font-inter-tight font-medium md:font-normal text-[24px] md:text-[40px] leading-[110%] text-white mb-[32px] md:mb-[60px]">
                Related Articles
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-[4.166%] md:gap-y-[130px]">
                {relatedPosts.map((post, index) => {
                  const rCatSlug = post.category.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                  const linkUrl = `/perspectives/${rCatSlug}/${post.id}`

                  return (
                    <div key={post.id} className="flex flex-col">
                      <div
                        className="group flex items-stretch transition-all duration-300"
                        onMouseEnter={() => setHoveredRelatedCard(index)}
                        onMouseLeave={() => setHoveredRelatedCard(null)}
                      >
                        {/* Divider line before card (Desktop only) */}
                        <div className="hidden md:block w-px bg-white/20 self-stretch shrink-0" />
                        <div className="hidden md:block shrink-0" style={{ width: "calc(22 / 1440 * 100vw)" }} />

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

                          <div className="h-[16px] md:h-[20px]" />

                          <Link href={linkUrl}>
                            <h3 className="hover:opacity-80 transition-opacity m-0 font-inter-tight font-normal text-[18px] leading-[130%] text-white">
                              {post.title}
                            </h3>
                          </Link>

                          <div className="h-[8px] md:h-[12px]" />

                          <p className="m-0 font-manrope font-normal text-[14px] leading-[130%] text-[#AEAEAE]">
                            {post.description}
                          </p>

                          <div className="h-[24px] md:h-[52px]" />

                          <Link
                            href={linkUrl}
                            className="inline-flex items-center hover:opacity-80 transition-opacity mt-auto font-manrope font-normal text-[12px] leading-[110%] text-white"
                          >
                            Read Article
                          </Link>
                        </div>
                      </div>

                      {/* Horizontal divider between cards on mobile */}
                      {index !== relatedPosts.length - 1 && (
                        <div className="block md:hidden w-full h-px bg-white/20 my-[32px]" />
                      )}
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
