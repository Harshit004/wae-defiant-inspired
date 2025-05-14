import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

interface RelatedCardProps {
  image: string
  title: string
  description: string
  width: number
  height: number
}

export default function RelatedCard({ image, title, description, width, height }: RelatedCardProps) {
  // Attach a ref for the parallax effect
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  // Map scroll progress to a vertical shift (adjust values as needed)
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <div
      // href="#"
      className="group relative block transition-all duration-300 rounded-lg border border-transparent hover:border-white/20 hover:bg-white/10"
    >
      {/* Motion div with a high z-index to force it over the sticky header */}
      <motion.div
        ref={ref}
        className="mb-4 overflow-hidden"
        style={{ position: "relative", zIndex: 9999 }}
      >
        <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={width}
            height={height}
            className="object-cover transition-all duration-1000 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
        />

      </motion.div>

      <div className="transition-all duration-300 relative h-[12rem]">
        <h3 className="font-[Inter Tight] font-[400] text-[22px] leading-[120%] tracking-[0%] align-middle mb-[12px] group-hover:no-underline pt-[12px]">
          {title}
        </h3>
        <p className="font-[Inter Tight] font-[400] text-[10px] leading-[110%] tracking-[-2%] align-middle text-gray-600 mb-[3rem] max-w-[272px]">
          {description}
        </p>

        {/* Arrow icon in the bottom-right corner */}
        <div className="absolute bottom-0 right-0">
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
