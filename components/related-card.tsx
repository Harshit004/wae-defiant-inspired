import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import React, { useState } from "react";

interface RelatedCardProps {
  image: string
  title: string
  description: string
  width: number
  height: number
}

interface HoverButtonProps {
  children: (hovered: boolean) => React.ReactNode;
  href?: string;
  invertedColors?: boolean;
  className?: string;
}
const HoverButton: React.FC<HoverButtonProps> = ({ children, href, invertedColors, className }) => {
  const [hovered, setHovered] = useState<boolean>(false);
  return (
    <button
      type="button"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`px-4 py-3 transition-all duration-650 ease ${className || 'w-fit'}`}
      style={{
        pointerEvents: "auto",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        fontFamily: "'Inter Tight', sans-serif",
        fontWeight: 500,
        fontSize: "12px",
        lineHeight: "100%",
        backgroundColor: hovered
          ? (invertedColors ? "#fff" : "#000")
          : (invertedColors ? "#000" : "#fff"),
        border: "1px solid #00000066",
        cursor: "pointer",
        color: hovered
          ? (invertedColors ? "#000" : "#fff")
          : (invertedColors ? "#fff" : "#000"),
      }}
    >
      {children(hovered)}
    </button>
  );
};

export default function RelatedCard({ image, title, description, width, height }: RelatedCardProps) {
  // Attach a ref for the parallax effect
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  // Map scroll progress to a vertical shift (adjust values as needed)
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <div
      className="group relative block w-full transition-all duration-300 rounded-lg border border-transparent hover:border-white/20 hover:bg-white/10"
    >
      {/* Motion div with a high z-index to force it over the sticky header */}
      <motion.div
        ref={ref}
        className="mb-4 overflow-hidden w-full"
        style={{ position: "relative", zIndex: 9999 }}
      >
        <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={width}
            height={height}
            className="object-cover w-full h-[180px] md:h-[270px] transition-all duration-1000 group-hover:scale-110 md:filter md:grayscale md:group-hover:grayscale-0"
        />
      </motion.div>

      <div className="transition-all duration-300 relative h-auto md:h-[12rem]">
        <h3
          className="block md:hidden mb-[8px] pt-[8px]"
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 700,
            fontSize: "14px",
            lineHeight: "140%",
            letterSpacing: "0%",
            verticalAlign: "middle",
            textTransform: "uppercase",
          }}
        >
          {title}
        </h3>
        {/* Desktop title remains unchanged */}
        <h3 className="hidden md:block font-[Inter Tight] font-[400] text-[22px] leading-[120%] tracking-[0%] align-middle mb-[12px] group-hover:no-underline pt-[12px]">
          {title}
        </h3>
        <p
          className="block md:hidden mb-0"
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 400,
            fontSize: "11px",
            lineHeight: "130%",
            letterSpacing: "0%",
            verticalAlign: "middle",
          }}
        >
          {description}
        </p>
        {/* Desktop description remains unchanged */}
        <p className="hidden md:block font-[Inter Tight] font-[400] text-[10px] leading-[110%] tracking-[-2%] align-middle text-gray-600 mb-0 md:mb-[3rem] max-w-full md:max-w-[272px]">
          {description}
        </p>
        {/* 40px gap and Know More button for mobile only */}
        <div className="block md:hidden" style={{ height: '40px' }} />
        <div className="block md:hidden w-full flex items-start">
          <Link href="#" className="w-[42.77vw] block">
            <HoverButton className="w-full">
              {(hovered: boolean) => (
                <>
                  Know More
                  <div className="relative inline-block w-4 h-4">
                    <Image
                      src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/531927db-f544-4083-04ff-c05ab2bc2600/public"
                      alt="icon default"
                      width={16}
                      height={16}
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
                      />
                    </motion.div>
                  </div>
                </>
              )}
            </HoverButton>
          </Link>
        </div>

        {/* Arrow icon in the bottom-right corner - Hidden on mobile, visible on medium screens and up */}
        <div className="hidden absolute bottom-0 right-0 md:block">
          <Image
            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/0a54bcf4-0434-4919-b1f0-3f34262b1c00/public"
            alt="Arrow Icon"
            width={16}
            height={16}
            className="transition-transform duration-300 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
          />
        </div>                        
      </div>
    </div>
  )
}