import { redirect } from "next/navigation"
import { getProductCategory } from "@/lib/product-utils"

export default async function LegacyProductDescriptionPage({ params }: { params: Promise<{ product: string }> }) {
    const resolvedParams = await params
    const product = resolvedParams?.product || "var-series"
    let normalizedProduct = product.toLowerCase()
    if (normalizedProduct === "aquarius") normalizedProduct = "aquarius-series"
    if (normalizedProduct === "quantim") normalizedProduct = "quantm"

    const category = getProductCategory(normalizedProduct)
    redirect(`/portfolio/${category}/${normalizedProduct}`)
}
