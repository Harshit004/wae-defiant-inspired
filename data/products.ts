export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  productType: "free-standing" | "counter-top";
}

export interface CategoryData {
  id: string;
  title: string;
  description: string;
  paragraphs: string[];
  products: Product[];
}

export interface SpecRow {
  variant: string;
  hot: string;
  cold: string;
  ambient: string;
}

export interface DimensionRow {
  variant: string;
  weight: string;
  height: string;
  width: string;
  depth: string;
}

export interface ProductDetails {
  id: string;
  name: string;
  categoryName: string;
  heroSubtitle: string;
  images: string[];
  featuresList: Array<{ title: string; description: string }>;
  specifications: {
    storageCapacity: SpecRow[];
    waterTemp: {
      cold: string;
      hot: string;
    };
    greenCertification: string;
    dripTray: string;
    refrigerant: string;
    dimensions: DimensionRow[];
    powerRequirement: string;
    purificationSystem: string;
    pointOfUseSterilization: string;
  };
}

export const CATEGORIES: Record<string, CategoryData> = {
  bluwae: {
    id: "bluwae",
    title: "Drinking water station - BLUWAE",
    description: "Point-of-Use drinking water stations with in-built 5-stage RO purification, LED UVC protection, and optional Germ Guardian™ hygiene technology.",
    paragraphs: [
      "BLUWAE™ Series is a next-generation Drinking Water Station designed to deliver safe, accessible, and sustainable hydration across workplaces and public environments. Combining advanced Reverse Osmosis (RO) purification with intelligent dispensing technology, it provides Purified Drinking Water directly at the point of consumption, reducing dependence on packaged bottled water.",
      "Ideal for offices, educational institutions, healthcare facilities, manufacturing units, and public spaces, BLUWAE™ functions as a reliable Commercial Hydration Solution. Available as a standalone unit or as part of Centralized Water Infrastructure, it supports ambient, chilled, and hot water dispensing, touch-free operation, and Bottle-Filling Capabilities.",
      "Designed to improve Workplace Hydration, reduce plastic waste, and lower operational costs, BLUWAE™ combines Advanced Filtration, Smart Dispensing, and premium design. More than a water access point, it is a future-ready Hydration System supporting responsible consumption and long-term sustainability goals."
    ],
    products: [
      { id: "var-series", name: "BLUWAE VAR Series", image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2906d7ca-fcf2-48a0-99d8-7f584fce1600/public", category: "free-standing" },
      { id: "enki", name: "BLUWAE ENKI Series", image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/793725fe-6912-4073-982d-dcb813491f00/public", category: "free-standing" },
      { id: "pos", name: "BLUWAE POS", image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c274a381-1fe3-48ce-37e1-296ff4719900/public", category: "counter-top" },
      { id: "rom-grande", name: "BLUWAE ROM Grande", image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2b501f50-e174-490b-1ea4-526449d56800/public", category: "free-standing" },
      { id: "reva", name: "BLUWAE REVA", image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ba89e9ca-9003-4c4b-2775-d4a5a11e9600/public", category: "free-standing" },
      { id: "gsp", name: "BLUWAE GSP", image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/42d01f61-a806-4ec1-9fe4-98b693036f00/public", category: "free-standing" },
      { id: "assistflow", name: "BLUWAE ASSISTFLOW", image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/1c23ff37-2f1a-4f67-4933-708d60af2000/public", category: "free-standing" },
      { id: "venus", name: "BLUWAE VENUS", image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/793725fe-6912-4073-982d-dcb813491f00/public", category: "counter-top" },
      { id: "eno-ct", name: "BLUWAE ENO.CT", image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c274a381-1fe3-48ce-37e1-296ff4719900/public", category: "counter-top" },
      { id: "var-ct", name: "BLUWAE VAR.CT", image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2b501f50-e174-490b-1ea4-526449d56800/public", category: "counter-top" },
      { id: "rom-ct", name: "BLUWAE ROM.CT", image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ba89e9ca-9003-4c4b-2775-d4a5a11e9600/public", category: "counter-top" }
    ]
  },
  trublu: {
    id: "trublu",
    title: "Water dispenser & cooler - TRUBLU",
    description: "Plumbed-in water dispensers with in-tank LED-UVC protection, optional bottom-loading configuration, and advanced Germ Guardian™ hygiene technology.",
    paragraphs: [
      "TRUBLU™ Series offers advanced and reliable Point-of-Use water dispensers designed to meet the highest standards of safety, quality, and style. Ideal for active corporate and commercial environments.",
      "Engineered with WAE's premium components, including medical-grade filtration and high-performance cooling/heating capacities to serve high-volume demand smoothly.",
      "With eco-friendly refrigerants and smart automation features, TRUBLU™ is a modern hydration classic designed to replace bottled coolers sustainably."
    ],
    products: [
      { id: "aenon", name: "TRUBLU AENON", image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ba89e9ca-9003-4c4b-2775-d4a5a11e9600/public", category: "free-standing" },
      { id: "alfa-100", name: "TRUBLU ALFA 100", image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/793725fe-6912-4073-982d-dcb813491f00/public", category: "free-standing" },
      { id: "alfa-bl", name: "TRUBLU ALFA BL", image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ba89e9ca-9003-4c4b-2775-d4a5a11e9600/public", category: "free-standing" },
      { id: "alfa-ct", name: "TRUBLU ALFA CT", image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c274a381-1fe3-48ce-37e1-296ff4719900/public", category: "counter-top" },
      { id: "alfa-tl", name: "TRUBLU ALFA TL", image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2b501f50-e174-490b-1ea4-526449d56800/public", category: "counter-top" },
      { id: "delta", name: "TRUBLU DELTA", image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ba89e9ca-9003-4c4b-2775-d4a5a11e9600/public", category: "free-standing" },
      { id: "gamma", name: "TRUBLU GAMMA", image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2906d7ca-fcf2-48a0-99d8-7f584fce1600/public", category: "free-standing" },
      { id: "lagoon", name: "TRUBLU LAGOON", image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/793725fe-6912-4073-982d-dcb813491f00/public", category: "counter-top" }
    ]
  }
};

export const PRODUCTS: Record<string, ProductDetails> = {
  assistflow: {
    id: "assistflow",
    name: "ASSISTFLOW",
    categoryName: "DRINKING WATER STATION - BLUWAE Series",
    heroSubtitle: "Powerful LED powerful LED sterilization",
    images: [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/1c23ff37-2f1a-4f67-4933-708d60af2000/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/793725fe-6912-4073-982d-dcb813491f00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c274a381-1fe3-48ce-37e1-296ff4719900/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2b501f50-e174-490b-1ea4-526449d56800/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ba89e9ca-9003-4c4b-2775-d4a5a11e9600/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/42d01f61-a806-4ec1-9fe4-98b693036f00/public"
    ],
    featuresList: [
      { title: "Water Options", description: "Provides direct dispensing of Hot, Cold, and Ambient water options through robust design integrations." },
      { title: "Built to last", description: "Crafted with premium Stainless Steel (SS-304) and corrosion-resistant Galvanized Iron (GI), ensuring durability and safety with food-grade materials." },
      { title: "Touch-free convenience", description: "Experience the ease of sensor-based dispensing, delivering clean and safe water without the need for touch." },
      { title: "Powerful led uv-c intank sterilization", description: "Seamlessly connects with carbonated beverage dispensers and coffee/tea vending machines for a versatile, all-in-one solution." },
      { title: "Effortless integration", description: "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration." },
      { title: "American disabilities act", description: "Designed to comply with ADA accessibility guidelines. Ideal for schools & public utilities." },
      { title: "Designed for everyone", description: "Thoughtfully engineered to be accessible for seniors, kids, and those with special needs, making hydration easy for all." },
      { title: "Water enrichments (optional)", description: "Mineralization Alkaline" }
    ],
    specifications: {
      storageCapacity: [
        { variant: "Assistflow 100", hot: "3", cold: "40", ambient: "15" },
        { variant: "Assistflow 50", hot: "3", cold: "40", ambient: "15" }
      ],
      waterTemp: {
        cold: "Cold: 5°C - 20° C (default 8°C)",
        hot: "Hot: 30°C - 65° C (default 55°C)"
      },
      greenCertification: "Confirms to green product certification, low discharge faucets : 1.5 LPM",
      dripTray: "1300 ml",
      refrigerant: "R-134a",
      dimensions: [
        { variant: "Assistflow 100", weight: "-", height: "1631", width: "535", depth: "654" },
        { variant: "Assistflow 51", weight: "-", height: "1631", width: "535", depth: "654" }
      ],
      powerRequirement: "Hertz 50/Volts 230-240",
      purificationSystem: "Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization (Chemical- free and eco-friendly)",
      pointOfUseSterilization: "Germ Guardian™"
    }
  },
  enki: {
    id: "enki",
    name: "ENKI",
    categoryName: "DRINKING WATER STATION - BLUWAE Series",
    heroSubtitle: "Powerful LED sterilization with advanced bottling capabilities",
    images: [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/a86f6929-a0fb-44d1-f78f-b4d0a7049600/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/1f9571c7-362c-4490-95d3-f9072bbe5500/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/db728b19-a0dd-45a4-812b-e7594a1b6900/public"
    ],
    featuresList: [
      { title: "Water Options", description: "Fully integrated dispensing of Hot, Cold, and Ambient water options." },
      { title: "Built to last", description: "Crafted with premium Stainless Steel (SS-304) and corrosion-resistant Galvanized Iron (GI), ensuring durability and safety with food-grade materials." },
      { title: "Touch-free convenience", description: "Experience the ease of sensor-based dispensing, delivering clean and safe water without the need for touch." },
      { title: "Powerful led uv-c intank sterilization", description: "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration." }
    ],
    specifications: {
      storageCapacity: [
        { variant: "ENKI FS VAR 150", hot: "5", cold: "45", ambient: "20" },
        { variant: "ENKI FS VAR 100", hot: "3", cold: "40", ambient: "15" },
        { variant: "ENKI FS VAR 50", hot: "3", cold: "40", ambient: "15" }
      ],
      waterTemp: {
        cold: "Cold: 5°C - 24° C (default 8°C)",
        hot: "Hot: 30°C - 80° C (default 50°C)"
      },
      greenCertification: "Confirms to green product certification, low discharge faucets : 1.5 LPM",
      dripTray: "1000 ml",
      refrigerant: "R-134a",
      dimensions: [
        { variant: "ENKI FS 150", weight: "-", height: "1631", width: "535", depth: "654" },
        { variant: "ENKI FS 100", weight: "-", height: "1631", width: "535", depth: "654" }
      ],
      powerRequirement: "220V/50 HZ",
      purificationSystem: "Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization (Chemical- free and eco-friendly)",
      pointOfUseSterilization: "Germ Guardian™"
    }
  }
};