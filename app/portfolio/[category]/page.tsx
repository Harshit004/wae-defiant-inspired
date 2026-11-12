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
    "glass-bottling": {
        title: "Glass Bottling Plants & Sustainable Hydration | WAE",
        description: "Compact modular glass bottling plants enabling sustainable premium in-house bottled water production for hospitality, corporate, and luxury environments.",
        keywords: "Glass bottling plant, In-House Glass Bottling, Sustainable Hydration"
    },
    pus: {
        title: "Public Utility Systems | Hydration Infrastructure",
        description: "Discover premium public hydration systems designed for institutions, workplaces, and high-footfall environments.",
        keywords: "Workplaces, Public Utilities, Hydration Infrastructure"
    },
    waeau: {
        title: "Public Utility Systems | Hydration Infrastructure",
        description: "Discover premium public hydration systems designed for institutions, workplaces, and high-footfall environments.",
        keywords: "Workplaces, Public Utilities, Hydration Infrastructure"
    }
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const category = resolvedParams.category;
    const canonicalUrl = `https://www.waecorp.com/portfolio/${category}`;
    
    if (category && typeof category === 'string' && productSEO[category.toLowerCase() as keyof typeof productSEO]) {
        const seo = productSEO[category.toLowerCase() as keyof typeof productSEO];
        return {
            title: seo.title,
            description: seo.description,
            keywords: seo.keywords,
            alternates: {
                canonical: canonicalUrl,
            },
        }
    }

    return {
        title: "Portfolio | WAE",
        description: "Explore WAE's purpose-led products and solutions.",
        keywords: "Portfolio, Products, WAE",
        alternates: {
            canonical: canonicalUrl,
        },
    }
}

export default async function PortfolioCategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;
    const categoryTitle = productSEO[category?.toLowerCase() as keyof typeof productSEO]?.title?.split('|')[0]?.trim() || (category ? category.toUpperCase() : 'Category');
    const canonicalUrl = `https://www.waecorp.com/portfolio/${category}`;

    const breadcrumbsSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.waecorp.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Portfolio",
                "item": "https://www.waecorp.com/portfolio"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": categoryTitle,
                "item": canonicalUrl
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
            />
            <ProductListingClient />
        </>
    );
}
