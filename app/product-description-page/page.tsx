import type { Metadata } from "next"
import ProductDescriptionPageClient from "./ClientPage"

const productSEO = {
    "var": {
        title: "VAR Series | Premium Drinking Water Station Solutions",
        description: "Advanced drinking water station with smart purification, LED sterilization, and sustainable hydration for workplaces and businesses.",
        keywords: "Sterilization and sustainable solution"
    },
    "enki": {
        title: "ENKI | Smart Commercial Hydration Station Solutions",
        description: "Engineered for modern environments, ENKI delivers advanced purification and premium hydration with enduring performance.",
        keywords: "Advance purification and premium hydration"
    },
    "pos": {
        title: "POS | Advanced Water Purification for Modern Spaces",
        description: "Combining intelligent purification with durable stainless steel construction, POS delivers premium hydration solutions.",
        keywords: "Premium Hydration Solution"
    },
    "rom": {
        title: "ROM Series | Engineered for Pure Water Experience",
        description: "Combining premium craftsmanship with intelligent sterilization, the ROM Series delivers reliable hydration with lasting performance.",
        keywords: "Hydration and purification"
    },
    "reva": {
        title: "REVA | Where Pure Water Meets Timeless Design",
        description: "Crafted for modern spaces, REVA combines intelligent purification, advanced hygiene, and enduring performance.",
        keywords: "Advance hygiene and enduring performancve"
    },
    "assistflow": {
        title: "ASSISTFLOW | Intelligent Hydration Without Compromise",
        description: "From advanced sterilization to enduring construction, ASSISTFLOW ensures a smooth and trusted water experience.",
        keywords: "Intelligent Hydration, ASSISTFLOW"
    },
    "venus": {
        title: "VENUS | Flagship Hydration Engineered for Tomorrow",
        description: "Designed for modern environments, VENUS combines intelligent purification, real-time insights, and sustainable performance.",
        keywords: "Intelligent purifivcation, Sustainable performance"
    },
    "gsp": {
        title: "GRAND SLAM PRO | Touchless Hydration Redefined",
        description: "Experience seamless hydration with sensor-based dispensing and premium protection built for modern workplaces.",
        keywords: "Premium Protection for modern Places"
    },
    "var c.t": {
        title: "VAR Series Countertop Station | Refined Water Purity",
        description: "A premium countertop drinking water station with smart purification and hygienic hydration for modern workplaces.",
        keywords: "smart purification and hygenic hydration"
    },
    "enki c.t": {
        title: "ENKI | Premium Countertop Drinking Water Station",
        description: "Thoughtfully engineered for modern spaces, ENKI is a countertop hydration solution with intelligent purification.",
        keywords: "Countertop Drinking Water Station"
    },
    "rom c.t": {
        title: "ROM Series | Precision Countertop Water Station",
        description: "Crafted for enduring performance, the ROM Series is a countertop hydration system with advanced purification.",
        keywords: "Countertop Water Station"
    },
    "alfa": {
        title: "TRUBLU ALFA | Smart Commercial Water Dispenser",
        description: "Featuring touchless dispensing and premium metal construction, TRUBLU ALFA delivers hygienic hydration with advanced cooling.",
        keywords: "Hygenic , Hydration with advance cooling"
    },
    "alfa c.t": {
        title: "ALFA | Smart Countertop Water Dispenser",
        description: "A premium water cooler with dispenser featuring touchless operation and advanced cooling for modern workplaces.",
        keywords: "Water Cooler with Dispenser, For Modern WEorkplaces"
    },
    "aenon": {
        title: "AENON | Heavy-Duty Smart Water Dispenser",
        description: "Premium water cooler with dispenser offering advanced cooling, touchless hygiene, and high-capacity hydration.",
        keywords: "Touchless, Hygience and High Capacity Hudration"
    },
    "yami": {
        title: "YAMI | Enhanced Hydration for Modern Spaces",
        description: "Premium water cooler with dispenser featuring advanced cooling, water enrichment options, and intelligent hydration.",
        keywords: "water cooler with dispenser, Enrichment Option"
    },
    "aurela": {
        title: "AURELA | Premium Smart Water Dispenser",
        description: "A premium water dispenser engineered with IoT intelligence, hygienic cooling, and enduring craftsmanship.",
        keywords: "Water Dispenser, IoT Engineered, Cooling with dispenseing"
    },
    "lagoon": {
        title: "LAGOON | Sustainable Water Cooler Solutions",
        description: "Premium water cooler with dispenser featuring multi-stage filtration and reliable hydration for modern spaces.",
        keywords: "Sustainable Water Cooler Solutions"
    },
    "epsilon": {
        title: "EPSILON | Advanced Commercial Water Cooler",
        description: "High-capacity water cooler with dispenser featuring UV and RO purification, IoT monitoring, and touchless hydration.",
        keywords: "RO, Purification, Touchless Hydration"
    },
    "plusultra": {
        title: "PLUSULTRA | Stainless Steel Bottle Filling Station",
        description: "An ADA-compliant drinking water fountain with bottle filler engineered for schools and public utilities.",
        keywords: "Drinking water fountain with bottle filler"
    },
    "nt01": {
        title: "ZVR NT01 Series | Advanced Public Hydration Solution",
        description: "Heavy-duty bottle filling station with hygienic dispensing and stainless steel construction for modern public environments.",
        keywords: "Bottle filling station for modern public environments"
    },
    "aquallence": {
        title: "AQUALLENCE | Premium Wall-Mount Water Station",
        description: "Luxury wall-mount hydration station with IoT monitoring, UV-C sterilization, and hot, cold, ambient, and sparkling water.",
        keywords: "Wall Mount Station, Cold, hot, Ambient"
    },
    "mosses": {
        title: "WATERMATIC MOSES | Premium Smart Water Faucet",
        description: "Premium smart water faucet with hot, cold, ambient and sparkling options for workplaces, hospitality and modern spaces.",
        keywords: "Drinking water taps for modern workplaces"
    },
    "touch": {
        title: "TOUCH | Refined Water Dispensing",
        description: "Smart water faucet designed for offices, hotels and restaurants with hygienic dispensing and sparkling water options.",
        keywords: "Hygenic Dispensing , Hotels, Restaurants"
    },
    "piper": {
        title: "PIPER | Elegant Smart Water Faucet",
        description: "Smart water faucet for offices, hotels and restaurants with UV-C protection and sustainable stainless steel construction.",
        keywords: "Smart Water Faucet with sustainable stainless steel"
    },
    "trx. tl": {
        title: "TRX.TL | Sensor Water Tap System",
        description: "Commercial water faucet with sensor-based operation, UV-C sterilization and premium stainless steel construction.",
        keywords: "Commercial drinking water Faucets"
    },
    "hkn": {
        title: "HKN | Precision Refined Hydration",
        description: "A premium commercial water faucet delivering hygienic dual dispensing and long-lasting performance.",
        keywords: "Stainless Steel Construction For Offices"
    },
    "led uv.c": {
        title: "LED UV-C | Advanced Water Dispensing",
        description: "A premium water dispensing system with UV-C protection and sustainable design for modern commercial spaces.",
        keywords: "Premium Water Dispensing with UV-C Protection"
    },
    "prism": {
        title: "PRISM Under-Counter Industrial RO Water Treatment Plant",
        description: "PRISM is an advanced Commercial RO Plant and Centralized Water Treatment system featuring invisible under-counter installation, continuous purification, LED UV-C sterilization, and universal compatibility.",
        keywords: "Centralized Water Treatment"
    },
    "numera uno": {
        title: "NUMERO UNO Premium RO Water Plant by WAEAUTO™",
        description: "Invisible in form yet powerful in performance, WAEAUTO™ NUMERO UNO is a next-generation Water Treatment Plant delivering intelligent purification, effortless compatibility, and reliable Centralized Water Treatment.",
        keywords: "Next Generation Treatment Plant"
    },
    "bluebox": {
        title: "BLUEBOX™ Industrial Purification & RO Water System",
        description: "BLUEBOX™ Series is a high-performance Industrial RO Plant engineered for commercial and institutional applications, delivering advanced water treatment, up to 99% contaminant removal, and customized Zero Liquid Discharge solutions.",
        keywords: "Advanced water Treatment, Industrial RO Plant"
    },
    "primus": {
        title: "PRIMUS™ Premium In-House Glass Bottling Plant",
        description: "PRIMUS™ is a fully automatic In-House Glass Bottling Plant engineered for luxury hotels and resorts, delivering branded hydration, sustainable bottling solutions, and complete control over guest experience.",
        keywords: "Sustainable Bottling Solution, Premium Glass Bottling Plants"
    },
    "aquarius": {
        title: "AQUARIUS™ Luxury In-House Water Bottling Plant",
        description: "Crafted for discerning hospitality brands, AQUARIUS™ is a Premium Water Bottling Plant that enables hotels and resorts to create branded, fully traceable glass bottles through intelligent and sustainable in-house production.",
        keywords: "Premium Glass Bottling Plant, Sustainable In House Production"
    },
    "quantm": {
        title: "QuantM™ | Compact Premium Glass Bottling Plant",
        description: "QuantM™ is a compact Glass Bottling Plant designed for boutique hotels, luxury resorts, and cloud kitchens. This premium In-House Glass Bottling Plant delivers efficient rinsing, filling, and capping.",
        keywords: "In House Glass Bottling Plant, Automatic Glass Bottling Plant"
    },
    "spuilmeister": {
        title: "SpülMeister™ | Advanced Bottle Washing System for Hospitality",
        description: "Built for hospitality and engineered for perfection, SpülMeister™ is a high-performance bottle washing system delivering scalable, hygienic, and precision cleaning for premium bottle operations.",
        keywords: "Moduler Bottle Cleaning Soluition, Satinless Steel Bottle Washer"
    },
    "subwasser": {
        title: "MEISTERSTÜCK SÜẞWASSER MINI™ | Luxury Hospitality Water Station",
        description: "Architecturally refined and engineered for performance, MEISTERSTÜCK SÜẞWASSER MINI™ combines dual-output dispensing, intelligent display, ambient lighting, and point-of-dispense purity.",
        keywords: "Smart Water Station, Floor Standing Water Station"
    },
    "aquasmith": {
        title: "AQUASMITH™ Atmospheric Water Generator | Premium Water From Air System",
        description: "Engineered to create water from air, AQUASMITH™ combines atmospheric harvesting, intelligent purification, and elegant design to deliver exceptional hydration.",
        keywords: "Atmospheric water generator, Waterv From Air System,Smart Water Technology"
    }
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }): Promise<Metadata> {
    const params = await searchParams;
    const product = params.product as string;
    
    if (product && typeof product === 'string') {
        const key = product.toLowerCase();
        // Exact match
        if (productSEO[key as keyof typeof productSEO]) {
            const seo = productSEO[key as keyof typeof productSEO];
            return {
                title: seo.title,
                description: seo.description,
                keywords: seo.keywords,
            }
        }
        
        // Partial match (e.g., if URL has "var-c-t", "alfa-ct")
        const normalizedProduct = key.replace(/-/g, ' ');
        const foundKey = Object.keys(productSEO).find(k => 
            normalizedProduct.includes(k) || k.includes(normalizedProduct)
        );
        
        if (foundKey) {
            const seo = productSEO[foundKey as keyof typeof productSEO];
            return {
                title: seo.title,
                description: seo.description,
                keywords: seo.keywords,
            }
        }
    }

    return {
        title: "Product Details | WAE",
        description: "Explore detailed specifications and features of WAE products.",
        keywords: "Product Details, WAE"
    }
}

export default function ProductDescriptionPage() {
    return <ProductDescriptionPageClient />
}
