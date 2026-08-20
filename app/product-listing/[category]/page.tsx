import { redirect } from "next/navigation"

export default async function LegacyProductListingPage({ params }: { params: Promise<{ category: string }> }) {
    const resolvedParams = await params
    const category = resolvedParams?.category || "bluwae"
    redirect(`/portfolio/${category}`)
}
