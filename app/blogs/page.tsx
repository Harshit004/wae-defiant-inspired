"use client"

import React, { FC, useState } from "react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { BLOGS, WRITERS } from "@/data/blogs"

// Center layout container matching standard padding & max-width
const containerClass = "mx-auto w-full max-w-[1440px] px-[7.5vw]"

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
    className="transition-all duration-300 ease-in-out border border-white/20 hover:bg-white/10 w-full md:w-[15.764vw]"
    style={{
      maxWidth: "227px",
      padding: '14px 8px',
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
  const featuredLinkUrl = featuredPost ? `/blogs/${featuredCategorySlug}/${featuredPost.id}` : '#'

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
        <Header />

        {/* spacer to prevent overlay under absolute header */}
        <div className="h-[180px] lg:h-[220px]" />

        {/* ================= FEATURED HERO SECTION ================= */}
        <section className={`${containerClass} pb-20 lg:pb-[112px]`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[40px] lg:gap-[80px] items-stretch">
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

            {/* Right Side: Featured Info (Starts and ends on the same height as the image) */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full text-left">
              <div>
                {/* WAE LTD. Subtitle */}
                <div className="w-fit" style={{ borderBottom: "1px solid #808080", paddingBottom: "4px" }}>
                  <span
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 700,
                      fontSize: "12px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      color: "#ffffff",
                      display: "inline-block"
                    }}
                  >
                    WAE LTD.
                  </span>
                </div>

                {/* 40px gap */}
                <div style={{ height: "40px" }} />

                {/* Title */}
                <h1
                  className="m-0"
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: "40px",
                    lineHeight: "110%",
                    letterSpacing: "0%",
                    color: "#ffffff"
                  }}
                >
                  {featuredPost?.title}
                </h1>

                {/* 40px gap */}
                <div style={{ height: "40px" }} />

                {/* Description */}
                <p
                  className="m-0"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "1.5",
                    letterSpacing: "0%",
                    color: "#AEAEAE"
                  }}
                >
                  {featuredPost?.description}
                </p>
              </div>

              {/* Read More Link (at bottom) */}
              <div className="mt-8 lg:mt-0">
                <Link
                  href={featuredLinkUrl}
                  className="inline-flex items-center hover:opacity-85 transition-opacity"
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 500,
                    fontSize: "12px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#ffffff",
                    borderBottom: "1px solid #808080",
                    paddingBottom: "4px"
                  }}
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ================= CATEGORY FILTER TABS ROW ================= */}
      <section style={{ marginBottom: "62px" }}>
        <div className={containerClass}>
          <div className="flex flex-wrap gap-3 md:gap-0 justify-between w-full">
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
        </div>
      </section>

      {/* ================= BLOG CARDS GRID SECTION ================= */}
      <section className="mb-[123px] lg:mb-[123px]">
        <div className={containerClass}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[4.166%] gap-y-[130px]">
            {getFilteredBlogs().map((post, index) => {
              const categorySlug = post.category.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
              const linkUrl = `/blogs/${categorySlug}/${post.id}`

              return (
                <div
                  key={index}
                  className="group flex items-stretch transition-all duration-300"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Vertical divider line before every card */}
                  <div className="w-px bg-white/20 self-stretch shrink-0" />
                  {/* Between every line and card, there is 22/1440 vw gap */}
                  <div style={{ width: "calc(22 / 1440 * 100vw)" }} className="shrink-0" />

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

                    {/* 20px gap */}
                    <div style={{ height: "20px" }} />

                    <Link href={linkUrl}>
                      <h3
                        className="hover:opacity-80 transition-opacity m-0"
                        style={{
                          fontFamily: "'Inter Tight', sans-serif",
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

                    {/* 12px gap */}
                    <div style={{ height: "12px" }} />

                    <p
                      className="m-0"
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "1.5",
                        letterSpacing: "0%",
                        color: "#AEAEAE",
                        verticalAlign: "middle"
                      }}
                    >
                      {post.description}
                    </p>

                    {/* 52px gap */}
                    <div style={{ height: "52px" }} />

                    <Link
                      href={linkUrl}
                      className="inline-flex items-center hover:opacity-80 transition-opacity mt-auto"
                      style={{
                        fontFamily: "'Manrope', sans-serif",
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

      {/* ================= "OUR WRITERS" SECTION ================= */}
      <section className="mb-[149px] lg:mb-[149px]">
        <div className={containerClass}>
          {/* Horizontal rule with solid color and 86px gap */}
          <hr style={{ border: "none", borderTop: "1px solid #FFFFFF4D", marginBottom: "86px" }} />

          <h2
            className="text-left font-normal"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontSize: "40px",
              lineHeight: "110%",
              letterSpacing: "0%",
              color: "#ffffff",
              verticalAlign: "middle",
              marginBottom: "76.5px"
            }}
          >
            Our Writers
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-[40px] gap-y-[60px] justify-between">
            {writers.map((writer, idx) => (
              <div key={idx} className="flex flex-col text-left h-full">
                <Link
                  href={writer.link}
                  className="block relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-[600ms] rounded-full"
                  style={{
                    width: "calc(222 / 1440 * 100vw)",
                    height: "calc(224 / 1440 * 100vw)",
                    maxWidth: "222px",
                    maxHeight: "224px",
                    minWidth: "150px",
                    minHeight: "151px"
                  }}
                >
                  <Image
                    src={writer.image}
                    alt={writer.name}
                    fill
                    className="object-cover"
                  />
                </Link>

                {/* 38px gap */}
                <div style={{ height: "38px" }} />

                <Link href={writer.link}>
                  <h3
                    className="hover:opacity-80 transition-opacity m-0"
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 500,
                      fontSize: "18px",
                      lineHeight: "140%",
                      letterSpacing: "0%",
                      color: "#ffffff",
                      verticalAlign: "middle",
                      textTransform: "capitalize"
                    }}
                  >
                    {writer.name}
                  </h3>
                </Link>

                {/* 8px gap */}
                <div style={{ height: "8px" }} />

                <span
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "120%",
                    letterSpacing: "0%",
                    color: "#ffffff",
                    verticalAlign: "middle",
                    display: "block"
                  }}
                >
                  {writer.role}
                </span>

                {/* 16px gap */}
                <div style={{ height: "16px" }} />

                <p
                  className="m-0 flex-grow"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "120%",
                    letterSpacing: "0%",
                    color: "#AEAEAE",
                    verticalAlign: "middle"
                  }}
                >
                  {writer.bio}
                </p>

                {/* 40px gap */}
                <div style={{ height: "40px" }} />

                <Link
                  href={writer.link}
                  className="inline-flex items-center hover:opacity-80 transition-opacity mt-auto"
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 300,
                    fontSize: "16px",
                    lineHeight: "120%",
                    letterSpacing: "0%",
                    color: "#ffffff",
                    verticalAlign: "middle"
                  }}
                >
                  <span style={{ textDecoration: "underline solid #ffffff" }}>View Profile</span>
                  <span style={{ marginLeft: "10px" }}>↗</span>
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