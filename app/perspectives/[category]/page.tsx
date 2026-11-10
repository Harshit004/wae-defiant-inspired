import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { BLOGS } from "@/data/blogs"

interface PageProps {
  params: Promise<{
    category: string
  }>
}

const containerClass = "w-full px-[24px] md:px-[7.5vw]"

export const CATEGORY_MAP: Record<string, { name: string; slug: string }> = {
  "climate-change-water": {
    name: "Climate Change & Water",
    slug: "climate-change-water",
  },
  "policy": {
    name: "Policy",
    slug: "policy",
  },
  "water-conservation": {
    name: "Water conservation",
    slug: "water-conservation",
  },
  "industry-impact-and-solutions": {
    name: "Industry Impact and Solutions",
    slug: "industry-impact-and-solutions",
  },
  "technology": {
    name: "Technology",
    slug: "technology",
  },
}

export const CATEGORIES_LIST = [
  { name: "Climate Change & Water", slug: "climate-change-water" },
  { name: "Policy", slug: "policy" },
  { name: "Water conservation", slug: "water-conservation" },
  { name: "Industry Impact and Solutions", slug: "industry-impact-and-solutions" },
  { name: "Technology", slug: "technology" },
]

export async function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map((slug) => ({
    category: slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params
  const cat = CATEGORY_MAP[category]

  if (!cat) {
    return {
      title: "Category Not Found | WAE Insights",
      description: "The requested category could not be found.",
    }
  }

  const canonicalUrl = `https://www.waecorp.com/perspectives/${cat.slug}`

  return {
    title: `${cat.name} Perspectives | WAE Insights`,
    description: `Explore research, insights, and stories on ${cat.name} from WAE Corporation.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${cat.name} Perspectives | WAE Insights`,
      description: `Explore research, insights, and stories on ${cat.name} from WAE Corporation.`,
      url: canonicalUrl,
      siteName: "WAE Corp",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${cat.name} Perspectives | WAE Insights`,
      description: `Explore research, insights, and stories on ${cat.name} from WAE Corporation.`,
    },
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params
  const currentCategory = CATEGORY_MAP[category]

  if (!currentCategory) {
    notFound()
  }

  const allCategoryPosts = Object.values(BLOGS).filter(
    (b) =>
      b.status === "Live" &&
      b.category.toLowerCase().trim() === currentCategory.name.toLowerCase().trim()
  )

  const featuredPost = allCategoryPosts[0]
  const remainingPosts = allCategoryPosts.slice(1)
  const featuredLinkUrl = featuredPost
    ? `/perspectives/${currentCategory.slug}/${featuredPost.id}`
    : "#"

  return (
    <main className="relative bg-[#0F0F0F] text-white min-h-screen overflow-x-hidden selection:bg-[#004063] selection:text-white">
      {/* Top wrapper with hero gradient background */}
      <div
        className="w-full relative"
        style={{
          background: "linear-gradient(146.59deg, #004063 4.52%, #0F0F0F 49.04%)",
        }}
      >
        <Header transparentBg />
        <div className="h-[120px] lg:h-[220px]" />

        {/* ================= FEATURED HERO SECTION ================= */}
        {featuredPost && (
          <section className={`${containerClass} pb-[40px] lg:pb-[112px]`}>
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-[24px] lg:gap-[80px] items-stretch">
              {/* Category pill on mobile */}
              <div className="block lg:hidden w-fit border-b border-[#808080] pb-[4px]">
                <span className="font-inter-tight font-bold text-[12px] leading-[100%] text-white uppercase">
                  {currentCategory.name}
                </span>
              </div>

              {/* Left Side: Photo */}
              <div className="lg:col-span-6 w-full relative aspect-[1.1] overflow-hidden">
                <Link href={featuredLinkUrl} className="block w-full h-full relative">
                  <Image
                    src={featuredPost.heroImage}
                    alt={featuredPost.title}
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all [transition-duration:800ms] hover:scale-103"
                    priority
                  />
                </Link>
              </div>

              {/* Right Side: Featured Info */}
              <div className="lg:col-span-6 flex flex-col justify-between h-full text-left">
                <div>
                  <div className="hidden lg:block w-fit border-b border-[#808080] pb-[4px]">
                    <span className="font-inter-tight font-bold text-[12px] leading-[100%] text-white uppercase">
                      {currentCategory.name}
                    </span>
                  </div>

                  <div className="hidden lg:block h-[40px]" />

                  <Link href={featuredLinkUrl}>
                    <h1 className="hover:opacity-85 transition-opacity font-inter-tight font-normal text-[28px] lg:text-[40px] leading-[120%] lg:leading-[110%] text-white mb-[16px] lg:mb-[40px]">
                      {featuredPost.title}
                    </h1>
                  </Link>

                  <p className="font-manrope font-normal text-[12px] lg:text-[14px] leading-[130%] lg:leading-[1.5] text-[#AEAEAE] mb-[24px] lg:mb-0">
                    {featuredPost.description}
                  </p>
                </div>

                <div className="mt-0 lg:mt-8">
                  <Link
                    href={featuredLinkUrl}
                    className="inline-flex items-center hover:opacity-85 transition-opacity font-inter-tight font-medium text-[12px] leading-[100%] text-white border-b border-[#808080] pb-[4px]"
                  >
                    Read More
                  </Link>
                </div>
              </div>

              <div className="block lg:hidden w-full h-px bg-white/20 mt-[16px]" />
            </div>
          </section>
        )}
      </div>

      {/* ================= CATEGORY FILTER TABS ROW ================= */}
      <section className="mb-[40px] lg:mb-[62px]">
        <div className={containerClass}>
          <style>{`
            .hide-scroll::-webkit-scrollbar { display: none; }
            .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>

          <div className="grid grid-flow-col auto-cols-[minmax(220px,1fr)] lg:grid-flow-row lg:grid-cols-5 gap-[12px] md:gap-[1.5vw] w-full overflow-x-auto hide-scroll pb-[4px]">
            {CATEGORIES_LIST.map((cat) => {
              const isSelected = cat.slug === currentCategory.slug
              return (
                <Link
                  key={cat.slug}
                  href={`/perspectives/${cat.slug}`}
                  className="transition-all duration-300 ease-in-out border border-white/20 hover:bg-white/10 w-full h-full flex items-center justify-center"
                  style={{
                    padding: "14px 16px",
                    backgroundColor: isSelected ? "#ffffff" : "transparent",
                    color: isSelected ? "#000000" : "#ffffff",
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "12px",
                    letterSpacing: "0%",
                    textAlign: "center",
                    textTransform: "uppercase",
                    borderRadius: "0px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {cat.name}
                </Link>
              )
            })}
          </div>

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
          {remainingPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-[4.166%] lg:gap-y-[130px]">
              {remainingPosts.map((post, index) => {
                const linkUrl = `/perspectives/${currentCategory.slug}/${post.id}`

                return (
                  <div key={post.id} className="flex flex-col">
                    <div className="group flex items-stretch transition-all duration-300">
                      <div className="hidden lg:block w-px bg-white/20 self-stretch shrink-0" />
                      <div
                        className="hidden lg:block shrink-0"
                        style={{ width: "calc(22 / 1440 * 100vw)" }}
                      />

                      <div className="flex flex-col flex-grow text-left">
                        <Link
                          href={linkUrl}
                          className="block relative aspect-[364/270] w-full overflow-hidden"
                        >
                          <Image
                            src={post.heroImage}
                            alt={post.title}
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all [transition-duration:800ms] ease-in-out"
                          />
                        </Link>

                        <div className="h-[16px] md:h-[20px]" />

                        <Link href={linkUrl}>
                          <h2 className="hover:opacity-80 transition-opacity m-0 font-inter-tight font-normal text-[18px] leading-[130%] text-white">
                            {post.title}
                          </h2>
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

                    {index !== remainingPosts.length - 1 && (
                      <div className="block lg:hidden w-full h-px bg-white/20 my-[32px]" />
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400 font-manrope text-sm">
              All articles for this category are shown above.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
