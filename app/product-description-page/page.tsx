import { permanentRedirect, redirect } from "next/navigation"
import { getProductCategory } from "@/lib/product-utils"

interface PageProps {
  searchParams: Promise<{ product?: string }>
}

export default async function LegacyProductDescriptionQueryPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams
  const product = resolvedSearchParams?.product

  if (!product) {
    redirect("/portfolio")
  }

  let normalizedProduct = product.toLowerCase().trim()
  if (normalizedProduct === "aquarius") normalizedProduct = "aquarius-series"
  if (normalizedProduct === "quantim") normalizedProduct = "quantm"

  const category = getProductCategory(normalizedProduct)
  permanentRedirect(`/portfolio/${category}/${normalizedProduct}`)
}
