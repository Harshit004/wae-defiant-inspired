"use client"

import React, { FC, useState } from "react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"

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
      borderRadius: '0px'
    }}
  >
    {children}
  </button>
)

export default function Home() {
  // Categories row state. Start with index 2 ("Climate Change & Water") to match mockup's default visual.
  const [selectedIndex, setSelectedIndex] = useState<number | null>(2)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const buttonLabels = [
    "Water conservation",
    "Policy",
    "Climate Change & Water",
    "Industry Impact and Solutions",
    "Technology",
  ]

  const blogPosts = [
    {
      imageSrc: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/384e8a97-27a3-4c0f-f02e-348a8a0bfa00/public",
      imageSrcHover: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/bf4fc4f5-cfc3-4eb9-ac32-bac46f834a00/public",
      title: "From Kyoto to COP28, The Epic Journey of Global Climate Agreements and the Fight for Our Planet's Future",
      description: "In the quiet halls of Kyoto in 1997, something monumental began: a collective awakening of the world's conscience towards the mounting crisis of climate change.",
      category: "Climate Change & Water"
    },
    {
      imageSrc: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c1a66615-4c62-4975-d446-cffbf3c92300/public",
      imageSrcHover: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4addca72-6f79-4c23-9c24-c400cd9b6a00/public",
      title: "Climate Change in the Indian Subcontinent: A Historical and Scientific Perspective",
      description: "The Indian subcontinent, a region of remarkable ecological diversity and cultural heritage, has been undergoing a profound transformation in its climate over the past century.",
      category: "Climate Change & Water"
    },
    {
      imageSrc: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/3b5e02f3-da40-4cad-61e2-dd1eb34f8b00/public",
      imageSrcHover: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/0c3eb242-b13a-443c-da32-a78bce6e7a00/public",
      title: "The Ozone Crisis: A Success Story in Environmental Cooperation",
      description: "It began almost invisibly, high above our heads, in the delicate veil of atmosphere that quietly shields every form of life on Earth.",
      category: "Policy"
    },
    {
      imageSrc: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2bcd53b1-c103-4faf-bd00-29a04ff0ee00/public",
      imageSrcHover: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/13245178-9299-4091-ebca-89c63b972600/public",
      title: "Industrial Revolution to the Carbon Age: How We Got There",
      description: "The story begins in the smoky heart of 18th-century England...",
      category: "Industry Impact and Solutions"
    },
    {
      imageSrc: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2e08117e-8553-489e-9837-0a565ca57d00/public",
      imageSrcHover: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/9415d6a5-d78b-40ea-805a-726ed7ad5300/public",
      title: "The link between climate change and water scarcity",
      description: "Exploring the fragile link between rising temperatures, shifts in weather patterns, and the direct impact on global freshwater resources.",
      category: "Water conservation"
    },
    {
      imageSrc: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/61141311-204f-4b43-a860-e47337e84b00/public",
      imageSrcHover: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/123e2424-f87e-44f6-c857-90f9e4553400/public",
      title: "Melting Glacier - Rising Risk: Climate change and fresh water supplies",
      description: "How rapid glacial retreat in major mountain ranges is redefining fresh water security for millions of downstream communities.",
      category: "Water conservation"
    },
    {
      imageSrc: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/7e883368-e898-4dc0-31b8-301fbbcaaf00/public",
      imageSrcHover: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/9abaeabf-b8e5-4fc0-b8f8-46f5df2a4000/public",
      title: "The Great Water Trade: How the Plastic Bottle Industry Exploits India's Groundwater",
      description: "India's hydrological landscape has always been shaped by the monsoon...",
      category: "Water conservation"
    },
    {
      imageSrc: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/1198ff4f-e6f9-4734-77c8-470433cff000/public",
      imageSrcHover: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b9de44cb-3d6b-407c-730a-a15c44bc4c00/public",
      title: "Shifting Monsoons: Transforming India's Climatic and Hydrological Systems",
      description: "For centuries, the monsoon has been more than just a season in India...",
      category: "Climate Change & Water"
    },
    {
      imageSrc: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/e44c37c6-3be1-4f60-27bd-8cbfcb181200/public",
      imageSrcHover: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/7b9cb7b8-1b96-42ca-b73b-4420a8b55800/public",
      title: "The North Star of Progress: A Historical Lens on Climate Change and India's Sustainable Future",
      description: "In an era defined by climate volatility, rising inequalities, and fractured global priorities...",
      category: "Policy"
    },
    {
      imageSrc: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/dd28574f-052d-4cb2-e8a5-3b15ec4d6300/public",
      imageSrcHover: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/5dfb00d6-e403-4101-7e01-6fcdee1b5900/public",
      title: "Envisioning Sustainability: Why the SDGs Are the World's Shared Compass",
      description: "In 2015, the United Nations adopted the 2030 Agenda for Sustainable Development...",
      category: "Policy"
    }
  ]

  const writers = [
    {
      name: "Aditi Sharma",
      role: "Executive - Marketing, WAE",
      bio: "Aditi Sharma explores sustainability and climate change with a focus on climate action and environmental responsibility. With over two years of professional experience, her work connects research, corporate sustainability practices, and strategic communication.",
      image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/471bde63-5514-44fd-67a7-d06a24417100/public",
      link: "/aditi-sharma"
    },
    {
      name: "Rehnuma Ansari",
      role: "Executive - Marketing, WAE",
      bio: "Ms. Rehnuma explores water conservation with a focus on groundwater, agriculture, and sustainability in India. With over 1.5 years of experience, her work connects research, policy context, and on-ground realities to frame water management.",
      image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/9f13e92f-a500-4052-dd61-2bd0951c1900/public",
      link: "https://www.linkedin.com/in/rehnumashakir/"
    },
    {
      name: "Rashi Tarika",
      role: "Executive - Marketing, WAE",
      bio: "Rashi Tarika explores climate policy and water management. Her writing focuses on the intersections of environmental governance, public policy, and corporate sustainable development strategies to drive climate action.",
      image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b6642388-9861-4396-d81f-219b1cd51100/public",
      link: "https://www.linkedin.com/in/rashi-tarika-89727a43/"
    },
    {
      name: "Shambhavi",
      role: "Executive - Marketing, WAE",
      bio: "Ms. Shambhavi Yadav explores sustainability, policy, and governance through a research-led lens. A seasoned professional with over 7 years of experience, she is NET qualified, a graduate from LSR, DU, and is a 3-time KPMG scholar.",
      image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/756f0c58-33ea-496a-5c76-f485ccb09800/public",
      link: "https://in.linkedin.com/in/shambhavi-yadav-61b937276"
    }
  ]

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
              <Image
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/384e8a97-27a3-4c0f-f02e-348a8a0bfa00/public"
                alt="From Kyoto to COP28 Featured Image"
                fill
                className="object-cover transition-transform duration-[800ms] hover:scale-103"
                priority
              />
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
                      lineHeight: "130%",
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
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#ffffff"
                  }}
                >
                  From Kyoto to COP28, The Epic Journey of Global Climate Agreements and the Fight for Our Planet's Future
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
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#AEAEAE"
                  }}
                >
                  In the quiet halls of Kyoto in 1997, something monumental began &nbsp;&nbsp;a collective awakening of the world's conscience towards the mounting crisis of climate change. What followed was a turbulent yet determined journey, a series of historic global agreements that would shape the planet's climate policy for decades to come, culminating (for now) in COP28. This is not just a timeline&nbsp; &nbsp;it's the story of how humanity has tried, failed, and continued to try again in its battle against a warming world.
                </p>
              </div>

              {/* Read More Link (at bottom) */}
              <div className="mt-8 lg:mt-0">
                <Link
                  href="/climate-change-&-water-v3"
                  className="inline-flex items-center hover:opacity-85 transition-opacity"
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 500,
                    fontSize: "12px",
                    lineHeight: "130%",
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
              // Map links based on title keywords
              let linkUrl = "#"
              if (post.title.includes("From Kyoto to COP28")) {
                linkUrl = "/climate-change-&-water-v3"
              } else if (post.title.includes("Industrial Revolution to the Carbon Age")) {
                linkUrl = "/industrial-revolution-to-carbon"
              } else if (post.title.includes("Climate Change in the Indian Subcontinent")) {
                linkUrl = "/climate-change-&-water-v2"
              } else if (post.title.includes("The Ozone Crisis")) {
                linkUrl = "/climate-change-&-water"
              } else if (post.title.includes("The Great Water Trade")) {
                linkUrl = "/plastic-bottle-industry-exploits-india"
              } else if (post.title.includes("The North Star of Progress")) {
                linkUrl = "/north-star-of-progress"
              }

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
                      {/* Primary Image */}
                      <div
                        className="absolute inset-0 transition-opacity duration-[800ms]"
                        style={{ opacity: hoveredCard === index ? 0 : 1 }}
                      >
                        <Image
                          src={post.imageSrc}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {/* Hover Image */}
                      {post.imageSrcHover && (
                        <div
                          className="absolute inset-0 transition-opacity duration-[800ms]"
                          style={{ opacity: hoveredCard === index ? 1 : 0 }}
                        >
                          <Image
                            src={post.imageSrcHover}
                            alt={`${post.title} hover`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
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
                          lineHeight: "100%",
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
                        lineHeight: "100%",
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
                      fontWeight: 700,
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
                    fontWeight: 400,
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