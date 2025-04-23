"use client"

import type React, { FC } from "react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import Footer from "@/components/footer"

// Shared container class for consistent margins
const containerClass = "mx-auto w-full max-w-[1440px] px-[140px]"

interface SelectButtonProps {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

/**
 * Reusable button component with selected state.
 */
const SelectButton: FC<SelectButtonProps> = ({ children, selected, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="transition-all duration-300 ease-in-out"
      style={{
        padding: '14px 8px',
        border: '1px solid #000',
        backgroundColor: selected ? '#000' : 'transparent',
        color: selected ? '#fff' : '#000',
        fontFamily: "'Inter Tight', sans-serif",
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '12px',
        letterSpacing: '0%',
        textAlign: 'center',
        textTransform: 'uppercase',
        flex: '1',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
};

export default function Home() {
  // State for exclusive selection among buttons
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // Header scroll state
  const headerRef = useRef<HTMLDivElement>(null)
  const [taglineVisible, setTaglineVisible] = useState(true)
  const prevScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setTaglineVisible(currentScrollY < prevScrollY.current);
      prevScrollY.current = currentScrollY;
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  // Tagline lines split into words
  const taglineWords1 = "To lead the way in sustainability".split(" ")
  const taglineWords2 = "ahead of the rest.".split(" ")

  // Menu items
  const productsItems = ["Identity & Ambition", "Products & Solutions", "Career"]
  const blueprintItems = ["Sustainability", "The Activist Co.", "Blog"]

  // Data definitions
  const buttonLabels = [
    'Water conservation',
    'Policy',
    'Climate Change & Water',
    'Industry Impact and Solutions',
    'Technology'
  ];
  const blogPosts = [
    { imageSrc: 'https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2af7fca1-0f0e-4152-9663-4e4ab29bd700/public', title: 'How to reduce your water foot print : From Shower to shopping', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur efficitur, metus eu pulvinar vestibulum, orci eros vehicula nunc, id scelerisque odio libero vel lorem. Quisque quis tortor a ipsum facilisis maximus. Sed eget massa nulla. Aliquam lobortis.' },
    { imageSrc: 'https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/7cd518f1-b756-48b4-f092-ff201fa8af00/public', title: 'Why every drop count : Understanding the Global Crisis', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur efficitur, metus eu pulvinar vestibulum, orci eros vehicula nunc, id scelerisque odio libero vel lorem. Quisque quis tortor a ipsum facilisis maximus. Sed eget massa nulla. Aliquam lobortis.' },
    { imageSrc: 'https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/eb8715a4-ecf3-4d71-c660-6ae749ecdd00/public', title: 'Who owns water : Water rights and access', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur efficitur, metus eu pulvinar vestibulum, orci eros vehicula nunc, id scelerisque odio libero vel lorem. Quisque quis tortor a ipsum facilisis maximus. Sed eget massa nulla. Aliquam lobortis..' },
    { imageSrc: 'https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/bbd20c7c-81c6-4e56-40fc-e82926f6ba00/public', title: 'Why water should be a human right -and to make it happen. Water inequality', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur efficitur, metus eu pulvinar vestibulum, orci eros vehicula nunc, id scelerisque odio libero vel lorem. Quisque quis tortor a ipsum facilisis maximus. Sed eget massa nulla. Aliquam lobortis.' },
    { imageSrc: 'https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/acf3be78-0a74-4315-e8c7-92a9c5d8d900/public', title: 'The link between climate  change and water scarcity', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur efficitur, metus eu pulvinar vestibulum, orci eros vehicula nunc, id scelerisque odio libero vel lorem. Quisque quis tortor a ipsum facilisis maximus. Sed eget massa nulla. Aliquam lobortis.' },
    { imageSrc: 'https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/947c8083-4964-492f-a8bd-df9f8a972200/public', title: 'Melting Glacier -Rising Risk : Climate change and fresh water supplies', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur efficitur, metus eu pulvinar vestibulum, orci eros vehicula nunc, id scelerisque odio libero vel lorem. Quisque quis tortor a ipsum facilisis maximus. Sed eget massa nulla. Aliquam lobortis.' },
  ];


  return (
    <main className="relative">
      {/* HEADER */}
      <div style={{ top: 0, left: 0, width: "100%" }}>
        <header ref={headerRef} className="w-full relative z-10 mb-[120px]">
          <div className={containerClass}>
            {/* Top Row: Navigation */}
            <div
              className="grid grid-cols-5 items-center pt-[30px] pb-[10px] uppercase"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "12px",
                lineHeight: "100%",
                letterSpacing: "0px",
              }}
            >
              <div>IDENTITY</div>
              <div>ORIGIN</div>
              <div>OBJECTIVE</div>
              <div>INSIDE WAE</div>
              <div>ETCETERA</div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[#D9D9DC] mb-[10px]" />

            {/* Bottom Row: Logo, Tagline and Menu Items */}
            <div className="grid grid-cols-5 items-start">
              {/* Logo */}
              <div className="flex flex-col justify-center">
                <Image
                  src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/34074342-7005-4a25-9763-86933d6e7700/public"
                  alt="WAE Logo"
                  width={78}
                  height={82}
                />
              </div>

              {/* Coordinates */}
              <div
                className="flex flex-col justify-center inline-block mr-1"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  lineHeight: "100%",
                  color: "#00000066",
                }}
              >
                20.5937° N<br />78.9629° E
              </div>

              {/* Tagline Animation */}
              <div
                className="flex flex-col justify-center inline-block mr-1"
              >
                <motion.div
                  initial="hidden"
                  animate={taglineVisible ? "visible" : "hidden"}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.05, ease: "easeInOut" } }
                  }}
                  className="flex flex-col"
                  style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 500, fontSize: "12px", lineHeight: "100%", color: "#00000066" }}
                >
                  <div className="flex space-x-1">
                    {taglineWords1.map((word, i) => (
                      <motion.span key={i} variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeInOut" } } }}>
                        {word}
                      </motion.span>
                    ))}
                  </div>
                  <div className="flex space-x-1">
                    {taglineWords2.map((word, i) => (
                      <motion.span key={i} variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeInOut" } } }}>
                        {word}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Inside WAE Menu Items */}
              <div className="flex flex-col justify-center space-y-2">
                {productsItems.map((item, i) => (
                  <div
                    key={i}
                    className="pb-2 border-b border-[#D9D9DC] last:border-0"
                    style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 500, fontSize: "12px", lineHeight: "100%" }}
                  >
                    <div className="c--anim-btn">
                      <div className="text-container">
                        <span className="c-anim-btn">{item}</span>
                        <span className="block">{item}</span>
                      </div>
                      <span className="menu-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* ETCETERA Menu Items */}
              <div className="flex flex-col justify-center space-y-2">
                {blueprintItems.map((item, i) => (
                  <div
                    key={i}
                    className="pb-2 border-b border-[#D9D9DC] last:border-0"
                    style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 500, fontSize: "12px", lineHeight: "100%" }}
                  >
                    <div className="c--anim-btn">
                      <div className="text-container">
                        <span className="c-anim-btn">{item}</span>
                        <span className="block">{item}</span>
                      </div>
                      <span className="menu-arrow blueprint-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* BUTTONS SECTION */}
      <div style={{ marginTop: '80px' }}>
        <div className={containerClass}>
          <div className="flex space-x-4">
            {buttonLabels.map((label, idx) => (
              <SelectButton
                key={idx}
                selected={selectedIndex === idx}
                onClick={() => setSelectedIndex(idx)}
              >
                {label}
              </SelectButton>
            ))}
          </div>
        </div>

        {/* Gap before divider */}
        <div style={{ height: '16px' }} />

        {/* Divider */}
        <div className={containerClass}>
          <hr className="w-full h-[1px] bg-[#00000088]" />
        </div>
      </div>

      {/* BLOG CARDS SECTION */}
      <div style={{ marginTop: '80px' }}>
        <div className={containerClass}>
          <div className="grid grid-cols-3 gap-x-[4.166%] gap-y-[140px]">
            {blogPosts.map((post, idx) => (
              <div key={idx} className="group">
                <Image src={post.imageSrc} alt={post.title} width={347} height={300} className="grayscale filter transition-filter duration-300 group-hover:grayscale-0" />
                <div style={{ height: '60px' }} />
                <h3 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: '14px', lineHeight: '140%', letterSpacing: '0%', verticalAlign: 'middle', textTransform: 'uppercase' }}>{post.title}</h3>
                <div style={{ height: '12px' }} />
                <p style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 400, fontSize: '12px', lineHeight: '24px', letterSpacing: '0%', verticalAlign: 'middle' }}>{post.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER SECTION */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <Footer />
      </div>

      {/* INLINE CSS for custom animations and bullet styling */}
      <style jsx>{`
        .custom-bullet { margin-left: 2%; list-style-type: disc; }
        .custom-bullet li::marker { color: #00000099; }
        .c--anim-btn { display: flex; align-items: center; gap: 4px; }
        .text-container { height: 12px; overflow: hidden; }
        .c-anim-btn { display: block; margin-top: 0; transition: margin-top 0.5s; }
        .c--anim-btn:hover .c-anim-btn { margin-top: -12px; }
        .menu-arrow { display: inline-block; opacity: 0; transform: translateX(-10px); transition: transform 0.5s ease, opacity 0.5s ease; }
        .c--anim-btn:hover .menu-arrow { transform: translateX(0); opacity: 1; }
        .blueprint-arrow { transform: rotate(-45deg) translateX(-10px); }
        .c--anim-btn:hover .blueprint-arrow { transform: rotate(-45deg) translateX(0); opacity: 1; }
      `}</style>
    </main>
  )
}
