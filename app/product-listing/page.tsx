import type { Metadata } from "next"
import ProductListingClient from "./ClientPage"

const productSEO = {
    bluwae: {
        title: "BLUWAE Advanced Hydration & Water Station Solutions",
        description: "Designed for discerning workplaces, BLUWAE water stations unite intelligent purification, premium design, and responsible hydration.",
        keywords: "Hydration & Drinking water solutions, BLUWAE water stations & Purification"
    },
    trublu: {
        title: "TRUBLU Advanced Water Coolers & Premium Dispensers",
        description: "Crafted for modern workplaces, TRUBLU combines intelligent cooling, clean water access, and sophisticated design in one seamless solution.",
        keywords: "Water Cooler & Premium Dispenser"
    },
    zvr: {
        title: "ZVR Bottle Filling Stations & Water Fountain Solutions",
        description: "Support sustainable hydration with ZVR bottle filling stations and drinking fountains that reduce plastic waste and enhance user experience.",
        keywords: "Drinking water fountain , Bottle filling station "
    },
    watermatic: {
        title: "WaterMatic Intelligent Drinking Water Faucets & Systems",
        description: "Experience elegant hydration with WaterMatic smart faucets featuring touchless operation, superior hygiene, and sustainable performance.",
        keywords: "Touchless Operation, Smart Faucets"
    },
    waeau: {
        title: "Public Utility Systems | Hydration Infrastructure",
        description: "Discover premium public hydration systems designed for institutions, workplaces, and high-footfall environments.",
        keywords: "Workplaces, Football Environment"
    }
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }): Promise<Metadata> {
    const params = await searchParams;
    const category = params.category as string;
    
    if (category && typeof category === 'string' && productSEO[category.toLowerCase() as keyof typeof productSEO]) {
        const seo = productSEO[category.toLowerCase() as keyof typeof productSEO];
        return {
            title: seo.title,
            description: seo.description,
            keywords: seo.keywords,
        }
    }

    return {
        title: "Products | WAE",
        description: "Explore WAE's purpose-led products and solutions.",
        keywords: "Products, WAE"
    }
}

export default function ProductListingPage() {
    return <ProductListingClient />
}
