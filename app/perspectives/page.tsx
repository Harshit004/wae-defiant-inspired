"use client"

import React, { FC, useState } from "react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { BLOGS, WRITERS } from "@/data/blogs"

// Center layout container matching standard padding & max-width
const containerClass = "mx-auto w-full max-w-[1440px] px-[24px] md:px-[7.5vw]"

interface SelectButtonProps {
  children: React.ReactNode
  selected: boolean
  onClick: () => void
}

/**
 * Custom styled button with outline and active state for category filtering
 */
const SelectButton: FC<SelectButtonProps> = ({ children, selected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="transition-all duration-300 ease-in-out border border-white/20 hover:bg-white/10 w-full h-full"
    style={{
      padding: '14px 16px',
      backgroundColor: selected ? '#ffffff' : 'transparent',
      color: selected ? '#000000' : '#ffffff',
      fontFamily: "'Inter Tight', sans-serif",
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '12px',
      letterSpacing: '0%',
      textAlign: 'center',
      verticalAlign: 'middle',
      textTransform: 'uppercase',
      cursor: 'pointer',
      borderRadius: '0px',
      whiteSpace: 'nowrap'
    }}
  >
    {children}
  </button>
)

export default function Home() {
  // Categories row state. Start with index 0 (the first filter) to match the default selection.
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const buttonLabels = [
    "Climate Change & Water",
    "Policy",
    "Water conservation",
    "Industry Impact and Solutions",
    "Technology",
  ]

  const blogPosts = Object.values(BLOGS).filter(b => b.status === "Live")
  const writers = Object.values(WRITERS)

  const featuredPost = blogPosts.find(b => b.id === "from-kyoto-to-cop28") || blogPosts[0]
  const featuredCategorySlug = featuredPost?.category.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  const featuredLinkUrl = featuredPost ? `/perspectives/${featuredCategorySlug}/${featuredPost.id}` : '#'

  const getFilteredBlogs = () => {
    if (selectedIndex === null) {
      return blogPosts
    }
    const selectedCategory = buttonLabels[selectedIndex]
    return blogPosts.filter(
      blog => blog.category.toLowerCase() === selectedCategory.toLowerCase()
    )
  }

  return (
    <main
      className="relative bg-[#0F0F0F] text-white min-h-screen overflow-x-hidden selection:bg-[#004063] selection:text-white"
    >
      {/* Top wrapper with hero gradient background */}
      <div
        className="w-full relative"
        style={{
          background: "linear-gradient(146.59deg, #004063 4.52%, #0F0F0F 49.04%)"
        }}
      >
        {/* HEADER */}
        <Header transparentBg />

        {/* spacer to prevent overlay under absolute header */}
        <div className="h-[120px] lg:h-[220px]" />

        {/* ================= FEATURED HERO SECTION ================= */}
        <section className={`${containerClass} pb-[40px] lg:pb-[112px]`}>
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-[24px] lg:gap-[80px] items-stretch">
            
            {/* WAE LTD. Subtitle (Mobile Only - positioned above image) */}
            <div className="block lg:hidden w-fit border-b border-[#808080] pb-[4px]">
              <span className="font-inter-tight font-bold text-[12px] leading-[100%] text-white">
                WAE LTD.
              </span>
            </div>

            {/* Left Side: Large Photo */}
            <div className="lg:col-span-6 w-full relative aspect-[1.1] overflow-hidden">
              {featuredPost && (
                <Image
                  src={featuredPost.heroImage}
                  alt={featuredPost.title}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-[800ms] hover:scale-103"
                  priority
                />
              )}
            </div>

            {/* Right Side: Featured Info */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full text-left">
              <div>
                {/* WAE LTD. Subtitle (Desktop Only) */}
                <div className="hidden lg:block w-fit border-b border-[#808080] pb-[4px]">
                  <span className="font-inter-tight font-bold text-[12px] leading-[100%] text-white">
                    WAE LTD.
                  </span>
                </div>

                <div className="hidden lg:block h-[40px]" />

                {/* Title */}
                <h1 className="font-inter-tight font-normal text-[28px] lg:text-[40px] leading-[120%] lg:leading-[110%] text-white mb-[16px] lg:mb-[40px]">
                  {featuredPost?.title}
                </h1>

                {/* Description */}
                <p className="font-manrope font-normal text-[12px] lg:text-[14px] leading-[130%] lg:leading-[1.5] text-[#AEAEAE] mb-[24px] lg:mb-0">
                  {featuredPost?.description}
                </p>
              </div>

              {/* Read More Link (at bottom) */}
              <div className="mt-0 lg:mt-8">
                <Link
                  href={featuredLinkUrl}
                  className="inline-flex items-center hover:opacity-85 transition-opacity font-inter-tight font-medium text-[12px] leading-[100%] text-white border-b border-[#808080] pb-[4px]"
                >
                  Read More
                </Link>
              </div>
            </div>
            
            {/* Mobile divider after Read More */}
            <div className="block lg:hidden w-full h-px bg-white/20 mt-[16px]" />
          </div>
        </section>
      </div>

      {/* ================= CATEGORY FILTER TABS ROW ================= */}
      <section className="mb-[40px] lg:mb-[62px]">
        <div className={containerClass}>
          {/* 
            Horizontal scroll on mobile, flex-wrap on desktop.
            Hide scrollbar class for clean mobile view.
          */}
          <style>{`
            .hide-scroll::-webkit-scrollbar { display: none; }
            .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>
          
          <div className="grid grid-flow-col auto-cols-[minmax(220px,1fr)] lg:grid-flow-row lg:grid-cols-5 gap-[12px] md:gap-[1.5vw] w-full overflow-x-auto hide-scroll pb-[4px]">
            {buttonLabels.map((label, index) => (
              <SelectButton
                key={label}
                selected={selectedIndex === index}
                onClick={() => setSelectedIndex(index === selectedIndex ? null : index)}
              >
                {label}
              </SelectButton>
            ))}
          </div>

          {/* Pagination dots indicator (Mobile Only matching screenshot) */}
          <div className="flex lg:hidden justify-center items-center gap-[6px] mt-[30px]">
            <div className="w-[18px] h-[4px] rounded-full bg-white" />
            <div className="w-[4px] h-[4px] rounded-full bg-white/50" />
            <div className="w-[4px] h-[4px] rounded-full bg-white/50" />
          </div>
        </div>
      </section>

      {/* ================= BLOG CARDS GRID SECTION ================= */}
      <section className="mb-[40px] lg:mb-[123px]">
        <div className={containerClass}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-[4.166%] lg:gap-y-[130px]">
            {getFilteredBlogs().map((post, index) => {
              const categorySlug = post.category.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
              const linkUrl = `/perspectives/${categorySlug}/${post.id}`

              return (
                <div key={index} className="flex flex-col">
                  <div
                    className="group flex items-stretch transition-all duration-300"
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Vertical divider line before every card (Desktop only) */}
                    <div className="hidden lg:block w-px bg-white/20 self-stretch shrink-0" />
                    {/* Between every line and card, there is 22/1440 vw gap (Desktop only) */}
                    <div className="hidden lg:block shrink-0" style={{ width: "calc(22 / 1440 * 100vw)" }} />

                    {/* Card Content wrapper */}
                    <div className="flex flex-col flex-grow text-left">
                      <Link href={linkUrl} className="block relative aspect-[364/270] w-full overflow-hidden">
                        <Image
                          src={post.heroImage}
                          alt={post.title}
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[800ms] ease-in-out"
                        />
                      </Link>

                      <div className="h-[20px]" />

                      <Link href={linkUrl}>
                        <h3 className="hover:opacity-80 transition-opacity m-0 font-inter-tight font-normal text-[18px] leading-[130%] text-white">
                          {post.title}
                        </h3>
                      </Link>

                      <div className="h-[12px]" />

                      <p className="m-0 font-manrope font-normal text-[12px] lg:text-[14px] leading-[130%] lg:leading-[1.5] text-[#AEAEAE]">
                        {post.description}
                      </p>

                      <div className="h-[24px] lg:h-[52px]" />

                      <Link
                        href={linkUrl}
                        className="inline-flex items-center hover:opacity-80 transition-opacity mt-auto font-manrope font-normal text-[12px] leading-[110%] text-white"
                      >
                        Read Article
                      </Link>
                    </div>
                  </div>
                  
                  {/* Horizontal divider after every card on mobile (except the last one) */}
                  {index !== getFilteredBlogs().length - 1 && (
                    <div className="block lg:hidden w-full h-px bg-white/20 mt-[32px] mb-[32px]" />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ================= "OUR WRITERS" SECTION ================= */}
      <section className="mb-[80px] lg:mb-[149px]">
        <div className={containerClass}>
          {/* Horizontal rule with solid color */}
          <hr className="border-none border-t border-[#FFFFFF4D] mb-[40px] lg:mb-[86px]" />

          <h2 className="text-left font-inter-tight font-medium text-[24px] lg:text-[40px] leading-[110%] text-white mb-[32px] lg:mb-[76.5px]">
            Our Writers
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-[32px] md:gap-x-[40px] gap-y-[40px] lg:gap-y-[60px] justify-between">
            {writers.map((writer, idx) => (
              <div key={idx} className="flex flex-col text-left h-full">
                <Link
                  href={writer.link}
                  className="block relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-[600ms] rounded-full aspect-square w-full max-w-[222px]"
                >
                  <Image
                    src={writer.image}
                    alt={writer.name}
                    fill
                    className="object-cover"
                  />
                </Link>

                <div className="h-[16px] lg:h-[38px]" />

                <Link href={writer.link}>
                  <h3 className="hover:opacity-80 transition-opacity m-0 font-inter-tight font-medium text-[14px] lg:text-[18px] leading-[140%] text-white capitalize">
                    {writer.name}
                  </h3>
                </Link>

                <div className="h-[4px] lg:h-[8px]" />

                <span className="font-manrope font-normal text-[10px] lg:text-[14px] leading-[120%] text-white block">
                  {writer.role}
                </span>

                <div className="h-[8px] lg:h-[16px]" />

                <p className="m-0 flex-grow font-manrope font-normal text-[10px] lg:text-[12px] leading-[120%] text-[#AEAEAE]">
                  {writer.bio}
                </p>

                <div className="h-[16px] lg:h-[40px]" />

                <Link
                  href={writer.link}
                  className="inline-flex items-center hover:opacity-80 transition-opacity mt-auto font-inter-tight font-medium lg:font-light text-[10px] lg:text-[16px] leading-[120%] text-white"
                >
                  <span style={{ textDecoration: "underline solid #ffffff" }}>View Profile</span>
                  <span className="ml-[6px] lg:ml-[10px]">↗</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <Footer />
    </main>
  )
}