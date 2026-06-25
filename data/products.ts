export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
}

export interface CategoryData {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
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
  status?: 'Live' | 'Draft';
  // CMS Customization Fields
  description?: string;
  heroImage?: string;
  heroTagline?: string;
  heroSubtext?: string;
  heroCtaText?: string;
  heroCtaLink?: string;
  showcaseCtaText?: string;
  showcaseCtaLink?: string;
  brochurePdf?: string;
  datasheetPdf?: string;
  variants?: {
    hot: boolean;
    cold: boolean;
    ambient: boolean;
  };
  displayImageIndex?: number;
}

export const CATEGORIES: Record<string, CategoryData> = {
  "bluwae": {
    "id": "bluwae",
    "title": "Drinking water station - BLUWAE",
    "description": "A sophisticated drinking water solution engineered with advanced purification technologies to provide reliable hydration, enhanced hygiene, and long-term sustainability.",
    "paragraphs": [
      "BLUWAE™ Series is a next-generation Drinking Water Station designed to deliver safe, accessible, and sustainable hydration across workplaces and public environments. Combining advanced Reverse Osmosis (RO) purification with intelligent dispensing technology, it provides Purified Drinking Water directly at the point of consumption, reducing dependence on packaged bottled water.",
      "Ideal for offices, educational institutions, healthcare facilities, manufacturing units, and public spaces, BLUWAE™ functions as a reliable Commercial Hydration Solution. Available as a standalone unit or as part of Centralized Water Infrastructure, it supports ambient, chilled, and hot water dispensing, touch-free operation, and Bottle-Filling Capabilities.",
      "Designed to improve Workplace Hydration, reduce plastic waste, and lower operational costs, BLUWAE™ combines Advanced Filtration, Smart Dispensing, and premium design. More than a water access point, it is a future-ready Hydration System supporting responsible consumption and long-term sustainability goals."
    ],
    "products": [
      {
        "id": "pos",
        "name": "POS",
        "category": "free-standing",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/d750f7b0-5ed6-442f-d370-6c66f6b79700/public"
      },
      {
        "id": "rom-grande",
        "name": "ROM Grande",
        "category": "free-standing",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c81f0436-e3cf-4bb3-ed3f-12d71c529e00/public"
      },
      {
        "id": "var-ct",
        "name": "VAR.CT",
        "category": "counter-top",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/eb19ce92-40b9-42d4-cb63-f3cc053edc00/public"
      },
      {
        "id": "rom-ct",
        "name": "ROM.CT",
        "category": "counter-top",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/067b3edc-d892-48f5-1e63-5e567c0a6d00/public"
      },
      {
        "id": "enki",
        "name": "ENKI",
        "category": "free-standing",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/969cf7aa-9a0c-4e02-c897-8ec75b1b5a00/public"
      },
      {
        "id": "gsp",
        "name": "GSP",
        "category": "free-standing",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/062c00fb-5b0a-4167-2d2b-120af5406e00/public"
      },
      {
        "id": "venus",
        "name": "VENUS",
        "category": "free-standing",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/92e20429-ff63-410f-9494-62ebbb2e0b00/public"
      },
      {
        "id": "eno-ct",
        "name": "ENKI.CT",
        "category": "counter-top",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/fbf516d7-077e-47f3-6aed-895881ab0c00/public"
      },
      {
        "id": "assistflow",
        "name": "ASSISTFLOW",
        "category": "free-standing",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c549c9bc-8af7-41f6-03d5-8c0078e9dd00/public"
      },
      {
        "id": "reva",
        "name": "REVA",
        "category": "free-standing",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/3d6c1acd-771b-412e-25c8-64a908da5100/public"
      },
      {
        "id": "var-series",
        "name": "VAR",
        "category": "free-standing",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4aca6071-c05f-46cd-f8ba-1238aae87400/public"
      }
    ],
    "imageUrl": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/9dac2dbe-676f-4f2b-b09f-cc64cd253700/public"
  },
  "trublu": {
    "id": "trublu",
    "title": "Water dispenser & cooler - TRUBLU",
    "description": "Crafted for contemporary environments, TRUBLU combines touchless convenience, stainless steel aesthetics, and purified hot, cold, and ambient hydration.",
    "paragraphs": [
      "TRUBLU™ Series offers advanced and reliable Point-of-Use water dispensers designed to meet the highest standards of safety, quality, and style. Ideal for active corporate and commercial environments.",
      "Engineered with WAE's premium components, including medical-grade filtration and high-performance cooling/heating capacities to serve high-volume demand smoothly.",
      "With eco-friendly refrigerants and smart automation features, TRUBLU™ is a modern hydration classic designed to replace bottled coolers sustainably."
    ],
    "products": [
      {
        "id": "aenon",
        "name": "TRUBLU AENON",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ba89e9ca-9003-4c4b-2775-d4a5a11e9600/public",
        "category": "free-standing"
      },
      {
        "id": "alfa-100",
        "name": "TRUBLU ALFA 100",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/793725fe-6912-4073-982d-dcb813491f00/public",
        "category": "free-standing"
      },
      {
        "id": "alfa-bl",
        "name": "TRUBLU ALFA BL",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ba89e9ca-9003-4c4b-2775-d4a5a11e9600/public",
        "category": "free-standing"
      },
      {
        "id": "alfa-ct",
        "name": "TRUBLU ALFA CT",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c274a381-1fe3-48ce-37e1-296ff4719900/public",
        "category": "counter-top"
      },
      {
        "id": "alfa-tl",
        "name": "TRUBLU ALFA TL",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2b501f50-e174-490b-1ea4-526449d56800/public",
        "category": "counter-top"
      },
      {
        "id": "delta",
        "name": "TRUBLU DELTA",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ba89e9ca-9003-4c4b-2775-d4a5a11e9600/public",
        "category": "free-standing"
      },
      {
        "id": "gamma",
        "name": "TRUBLU GAMMA",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2906d7ca-fcf2-48a0-99d8-7f584fce1600/public",
        "category": "free-standing"
      },
      {
        "id": "lagoon",
        "name": "TRUBLU LAGOON",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/793725fe-6912-4073-982d-dcb813491f00/public",
        "category": "counter-top"
      }
    ],
    "imageUrl": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/3b41a398-ca3b-4c5e-a03d-3178d72a2a00/public"
  },
  "zvr": {
    "id": "zvr",
    "title": "Drinking water fountain - ZVR",
    "description": "Engineered for modern public spaces, ZVR combines touchless convenience, inclusive ADA-compliant design, and refined wall-mounted drinking water solutions.",
    "imageUrl": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/74579c8e-a7e1-4b0a-a14b-f83ab6e5d800/public",
    "paragraphs": [
      "Surface-mounted drinking water fountains with integrated bottle filling stations offer a sustainable and hygienic solution for modern hydration needs.",
      "Designed for high-traffic environments like offices, schools, and public facilities, these units encourage refill culture by supporting reusable bottles, helping reduce plastic waste."
    ],
    "products": [
      {
        "id": "yami",
        "name": "YAMI",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4617ef86-d822-4f26-a0e8-d81be539da00/public",
        "category": "fountains"
      },
      {
        "id": "plusultra",
        "name": "PLUSULTRA",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/0aced016-3f7d-4d41-7cf5-41b6930eac00/public",
        "category": "fountains"
      }
    ]
  },
  "watermatic": {
    "id": "watermatic",
    "title": "Drinking water faucets - WATERMATIC",
    "description": "Drinking water taps featuring sensor touch or push operation for hygienic dispensing, effortless usability, and seamless modern hydration experiences.",
    "imageUrl": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2b501f50-e174-490b-1ea4-526449d56800/public",
    "paragraphs": [
      "Drinking water taps featuring sensor touch or push operation for hygienic dispensing, effortless usability, and seamless modern hydration experiences.",
      "The Watermatic Drinking Water Faucet is a next-gen hydration solution designed for modern workspaces, hotels, and high-end dining spaces."
    ],
    "products": [
      {
        "id": "piper",
        "name": "Piper",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/f1d3b640-01ba-420a-bf17-b3145d223d00/public",
        "category": "counter-top"
      },
      {
        "id": "watermatic",
        "name": "Watermatic",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/5e3fd671-62bf-461f-f624-94099f554500/public",
        "category": "counter-top"
      },
      {
        "id": "aquatap",
        "name": "Aquatap",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/374ef4c2-7b68-4f33-3fc9-7d4d3fc1ca00/public",
        "category": "counter-top"
      },
      {
        "id": "moses",
        "name": "Moses",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/e1ab0b09-5a47-41c8-eca8-f74bb2ab8b00/public",
        "category": "counter-top"
      },
      {
        "id": "trx.tl",
        "name": "TRX.TL",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/e84e2022-b6ea-4f34-bb4d-3deb20d69700/public",
        "category": "counter-top"
      },
      {
        "id": "hkn",
        "name": "HKN",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/528c39ab-e15a-4b6e-8f1e-a9f7f09ef100/public",
        "category": "counter-top"
      }
    ]
  },
  "pus": {
    "id": "pus",
    "title": "Compact purification units - WAEAU",
    "description": "Robust, research-backed water systems engineered for public infrastructure—ensuring continuous access to safe, purified drinking water in all conditions.",
    "imageUrl": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ba89e9ca-9003-4c4b-2775-d4a5a11e9600/public",
    "paragraphs": [
      "Robust, research-backed water systems engineered for public infrastructure—ensuring continuous access to safe, purified drinking water in all conditions."
    ],
    "products": [
      {
        "id": "aqua",
        "name": "AQUA",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/20abb608-f632-4157-ce38-12646a5c8a00/public",
        "category": "free-standing"
      },
      {
        "id": "hydrobankseries",
        "name": "HYDROBANKSERIES",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/822535eb-d4c2-472f-254f-8b4685410400/public",
        "category": "free-standing"
      }
    ]
  },
  "glass-bottling": {
    "id": "glass-bottling",
    "title": "Glass bottling plant",
    "description": "Compact glass bottling plants enabling sustainable, premium in-house water bottling for hotels, hospitality brands, and luxury environments.",
    "imageUrl": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/23411290-087c-4c6c-77c6-9226946aae00/public",
    "paragraphs": [
      "Compact modular glass bottling plants enabling sustainable premium in-house bottled water production for hospitality, corporate, and luxury environments."
    ],
    "products": [
      {
        "id": "watermaker",
        "name": "WATERMAKER",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/fa2654df-e6ca-4b14-34d8-d52f1d4c5800/public",
        "category": "free-standing"
      }
    ]
  }
};

export const PRODUCTS: Record<string, ProductDetails> = {
  "var-series": {
    "id": "var-series",
    "name": "VAR",
    "categoryName": "DRINKING WATER STATION - BLUWAE Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4aca6071-c05f-46cd-f8ba-1238aae87400/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/7d1aa69a-f330-42cb-02ea-1e8fdf93a600/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/e574b038-c765-4fb0-7e75-0d4b94c81d00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6a645ebd-b768-47e1-e7ea-eb9ba395f700/public"
    ],
    "featuresList": [
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration"
      },
      {
        "title": "Built Tough, Made to Last",
        "description": "Crafted from premium Stainless Steel (SS-304) and corrosion-resistant GI, this unit is food-grade approved and built for enduring performance."
      },
      {
        "title": "Touch-Free Dispensing",
        "description": "Enjoy effortless, hygienic water access with sensor-based, touchless technology."
      },
      {
        "title": "No Mess, No Stress",
        "description": "An efficient drip tray with generous capacity catches spills, keeping the space clean and orderly."
      },
      {
        "title": "Effortless Integration",
        "description": "Seamlessly connects with carbonated beverage dispensers and coffee/tea vending machines for a versatile, all-in-one solution."
      },
      {
        "title": "Water Enrichments (Optional)",
        "description": "Mineralization Alkaline"
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "FS VAR 150",
          "hot": "3",
          "cold": "130",
          "ambient": "20"
        },
        {
          "variant": "FS VAR 100",
          "hot": "3",
          "cold": "85",
          "ambient": "10"
        },
        {
          "variant": "FS VAR 50",
          "hot": "3",
          "cold": "30",
          "ambient": "15"
        }
      ],
      "waterTemp": {
        "cold": "Cold: 5°C - 20° C (default 8°C)",
        "hot": "Hot: 30°C - 65°C (default 55°C)"
      },
      "greenCertification": "Confirms to green product certification, low discharge faucets : 1.5 LPM",
      "dripTray": "1300 ml",
      "refrigerant": "R-134a",
      "dimensions": [
        {
          "variant": "FS VAR 150",
          "weight": "150",
          "height": "1640",
          "width": "615",
          "depth": "790"
        },
        {
          "variant": "FS VAR 100",
          "weight": "120",
          "height": "1560",
          "width": "535",
          "depth": "710"
        },
        {
          "variant": "FS VAR 50",
          "weight": "70",
          "height": "1420",
          "width": "400",
          "depth": "647"
        }
      ],
      "powerRequirement": "Hertz 50/Volts 230-240",
      "purificationSystem": "Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization (Chemical- free and eco-friendly)",
      "pointOfUseSterilization": "Germ Guardian™"
    },
    "status": "Live",
    "description": "For instance, a 100 LPH machine operating continuously for 8 hours will produce 800 liters of\nwater daily, amounting to 17,600 liters over a month.",
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/1721fb80-1e3a-4d46-604d-681f72314600/public",
    "heroTagline": "Plastic is passe, Landfilling is zero.\nSustainability is the future.",
    "heroSubtext": "Sustainability at Core",
    "heroCtaText": "Contact Us",
    "heroCtaLink": "#product-showcase",
    "showcaseCtaText": "Enquire Now",
    "showcaseCtaLink": "",
    "brochurePdf": "file:///C:/Users/WAE/Downloads/VAR.pdf",
    "datasheetPdf": "",
    "variants": {
      "hot": true,
      "cold": true,
      "ambient": true
    },
    "displayImageIndex": 0
  },
  "enki": {
    "id": "enki",
    "name": "ENKI",
    "categoryName": "DRINKING WATER STATION - BLUWAE Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/969cf7aa-9a0c-4e02-c897-8ec75b1b5a00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4994f73a-a0d9-40d5-5224-b058dbcca400/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6b7c46f4-29e5-482a-f6fd-dae1d944c700/public"
    ],
    "featuresList": [
      {
        "title": "Touch-Free Operation",
        "description": "Enjoy sensor-based, hygienic water dispensing that’s quick, easy, and completely touchless."
      },
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration"
      },
      {
        "title": "Clean Flow, Minimal Splash",
        "description": "Engineered for a smooth, laminar flow that minimizes spillage, complemented by an efficient drainage system."
      },
      {
        "title": "Effortless Integration",
        "description": "Easily connects with carbonated beverage dispensers and coffee/tea vending machines, offering a versatile hydration solution."
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "ENKI 25/50 FS",
          "hot": "4",
          "cold": "5",
          "ambient": "-"
        }
      ],
      "waterTemp": {
        "cold": "Cold: 5°C- 24°C (default Default 8°C)",
        "hot": "Hot: 50°C - 80°C (default 55°C)"
      },
      "greenCertification": "Confirms to green product certification, low discharge faucets : 1.5 LPM",
      "dripTray": "500 ml",
      "refrigerant": "R-134a",
      "dimensions": [
        {
          "variant": "ENKI 25/50 FS",
          "weight": "62",
          "height": "1338",
          "width": "370",
          "depth": "503"
        }
      ],
      "powerRequirement": "Hertz 50/Volts 230-240",
      "purificationSystem": "Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization (Chemical- free and eco-friendly)",
      "pointOfUseSterilization": "Germ Guardian™"
    },
    "status": "Live",
    "description": "For instance, a 50 LPH machine operating continuously for 8 hours will produce 400 liters of\nwater daily, amounting to 8,800 liters over a month.",
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/f548679e-2ba4-4968-e281-2fde42242800/public",
    "heroTagline": "For instance, a 50 LPH machine operating continuously for 8 hours will produce 400 liters of\nwater daily, amounting to 8,800 liters over a month.",
    "heroSubtext": "Sustainability at Core",
    "heroCtaText": "Contact Us",
    "heroCtaLink": "/Contactus",
    "showcaseCtaText": "Enquire Now",
    "showcaseCtaLink": "/enquiry",
    "brochurePdf": "file:///C:/Users/WAE/Downloads/ENKI.pdf",
    "datasheetPdf": "",
    "variants": {
      "hot": true,
      "cold": true,
      "ambient": false
    },
    "displayImageIndex": 0
  },
  "pos": {
    "id": "pos",
    "name": "POS",
    "categoryName": "DRINKING WATER STATION - BLUWAE Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/d750f7b0-5ed6-442f-d370-6c66f6b79700/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/7fb71cd5-561b-4185-722f-57a910512d00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/77bfbe22-5122-407c-5b71-8415a1ca3500/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/f56d1bb2-8196-4815-7449-5a9481526600/public"
    ],
    "featuresList": [
      {
        "title": "Water Options",
        "description": "Hot, Cold, Ambient"
      },
      {
        "title": "Touch-Free Dispensing",
        "description": "Experience seamless, sensor-based water dispensing that’s hygienic and completely touchless."
      },
      {
        "title": "Smooth, Splash-Free Flow",
        "description": "Designed for a clean, laminar water flow that minimizes spillage, paired with an efficient drainage system."
      },
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration"
      },
      {
        "title": "Versatile Integration",
        "description": "Effortlessly integrates with carbonated beverage dispensers and coffee/tea vending machines, providing a flexible, all-in-one hydration solution."
      },
      {
        "title": "Water Enrichments (Optional)",
        "description": "Water Enrichments\n(Optional)"
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "POS 100",
          "hot": "3",
          "cold": "35",
          "ambient": "15"
        },
        {
          "variant": "POS 50",
          "hot": "3",
          "cold": "35",
          "ambient": "15"
        }
      ],
      "waterTemp": {
        "cold": "Cold: 5°C - 20° C (default 8°C)",
        "hot": "Hot: 30°C - 65°C (default 55°C)"
      },
      "greenCertification": " Confirms to green product certification, low discharge faucets : 1.5 LPM",
      "dripTray": "1300 ml",
      "refrigerant": "R-134a",
      "dimensions": [
        {
          "variant": "POS 100",
          "weight": "131",
          "height": "1392",
          "width": "480",
          "depth": "647"
        },
        {
          "variant": "POS 50",
          "weight": "120",
          "height": "1392",
          "width": "480",
          "depth": "647"
        }
      ],
      "powerRequirement": "Hertz 50/Volts 230-240",
      "purificationSystem": "Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization (Chemical- free and eco-friendly)",
      "pointOfUseSterilization": "Germ Guardian™"
    },
    "status": "Live",
    "description": "For instance, a 100 LPH machine operating continuously for 8 hours will produce 800 liters of\nwater daily, amounting to 17,600 liters over a month.",
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/84acd2dc-5215-4649-f50f-27c75c576600/public",
    "heroTagline": "For instance, a 100 LPH machine operating continuously for 8 hours will produce 800 liters of\nwater daily, amounting to 17,600 liters over a month.",
    "heroSubtext": "Sustainability at Core",
    "heroCtaText": "Contact Us",
    "heroCtaLink": "/Comtactus",
    "showcaseCtaText": "Enquire Now",
    "showcaseCtaLink": "/enquiry",
    "brochurePdf": "file:///C:/Users/WAE/Downloads/POS.pdf",
    "datasheetPdf": "file:///C:/Users/WAE/Downloads/POS.pdf",
    "variants": {
      "hot": true,
      "cold": true,
      "ambient": true
    }
  },
  "rom-grande": {
    "id": "rom-grande",
    "name": "ROM Grande",
    "categoryName": "DRINKING WATER STATION - BLUWAE Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c81f0436-e3cf-4bb3-ed3f-12d71c529e00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/e6c61b0f-8960-4358-8648-2cd4d0a96600/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/51f60770-5595-4de7-151a-2dcac9d1f500/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/faeed699-00e6-425b-91bb-84e4b7c85c00/public"
    ],
    "featuresList": [
      {
        "title": "Water options",
        "description": "Chilled,  Hot,  Ambient"
      },
      {
        "title": "Sensor-Based Operation:",
        "description": "Touchless and hygienic dispensing ensures a seamless and safe user experience."
      },
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration"
      },
      {
        "title": "Efficient Drainage",
        "description": "Equipped with a generous drip tray to efficiently collect accidental spillage, maintaining cleanliness."
      },
      {
        "title": "Water Enrichments (Optional)",
        "description": "Mineralization Alkaline"
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "ROM GRANDE 100",
          "hot": "3",
          "cold": "45",
          "ambient": "15"
        },
        {
          "variant": "ROM GRANDE  50 FS",
          "hot": "3",
          "cold": "45",
          "ambient": "15"
        }
      ],
      "waterTemp": {
        "cold": "Cold: 5°C - 24° C (default 8°C)",
        "hot": "Hot: 50°C - 80°C (default 55°C)"
      },
      "greenCertification": "Confirms to green product certification, low discharge faucets : 1.5 LPM",
      "dripTray": "1000 ml",
      "refrigerant": "R-134a",
      "dimensions": [
        {
          "variant": "ROM GRANDE 100",
          "weight": "108.0",
          "height": "1466",
          "width": "440",
          "depth": "644"
        },
        {
          "variant": "ROM GRANDE  50 FS",
          "weight": "86.0",
          "height": "1466",
          "width": "440",
          "depth": "644"
        }
      ],
      "powerRequirement": "Hertz 50/Volts 230-240",
      "purificationSystem": "Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization (Chemical- free and eco-friendly)",
      "pointOfUseSterilization": "Germ Guardian™"
    },
    "status": "Live",
    "description": "For instance, a 100 LPH machine operating continuously for 8 hours will produce 800 liters of\nwater daily, amounting to 17,600 liters over a month.",
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/71fc0976-fdbe-4c80-1984-a6bd612b0500/public",
    "heroTagline": "For instance, a 100 LPH machine operating continuously for 8 hours will produce 800 liters of\nwater daily, amounting to 17,600 liters over a month.",
    "heroSubtext": "Sustainability at Core",
    "heroCtaText": "Contact Us",
    "heroCtaLink": "/contactus",
    "showcaseCtaText": "Enquire Now",
    "showcaseCtaLink": "/enquiry",
    "brochurePdf": "file:///C:/Users/WAE/Downloads/ROM.pdf",
    "datasheetPdf": "file:///C:/Users/WAE/Downloads/ROM.pdf",
    "variants": {
      "hot": true,
      "cold": true,
      "ambient": true
    },
    "displayImageIndex": 0
  },
  "reva": {
    "id": "reva",
    "name": "REVA",
    "categoryName": "DRINKING WATER STATION - BLUWAE Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/978c8961-cf7f-4570-2b9b-e6e5838ed100/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c642f7b0-c3a5-4ff6-84ca-4c6da2805a00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/fbbd3628-de41-48ea-6ab9-329d11aa9d00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/3d6c1acd-771b-412e-25c8-64a908da5100/public"
    ],
    "featuresList": [
      {
        "title": "Robust & Durable Build",
        "description": "Constructed with premium Stainless Steel (SS-304) and corrosion-resistant GI, ensuring food-grade safety and long-lasting durability."
      },
      {
        "title": "Touchless Dispensing",
        "description": "Experience the convenience of sensor-based technology for hygienic, hands-free water dispensing."
      },
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration"
      },
      {
        "title": "Real-Time Monitoring",
        "description": "Stay informed with an intuitive IoT display powered by CIRCLE OF BLUE, showcasing key data and performance metrics in real-time."
      },
      {
        "title": "Effortless Integration",
        "description": "Seamlessly connects with carbonated beverage dispensers and coffee/tea vending machines for a versatile, all-in-one solution."
      },
      {
        "title": "Water Enrichments (Optional)",
        "description": "Mineralization Alkaline"
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "REVA 100/50",
          "hot": "3",
          "cold": "35",
          "ambient": "15"
        }
      ],
      "waterTemp": {
        "cold": "Cold: 5°C - 20° C (default 8°C)",
        "hot": "Hot: 30°C - 65°C (default 55°C)"
      },
      "greenCertification": "Confirms to green product certification, low discharge faucets : 1.5 LPM",
      "dripTray": "800 ml",
      "refrigerant": "R-134a",
      "dimensions": [
        {
          "variant": "REVA 100/50",
          "weight": "150.0",
          "height": "150.0",
          "width": "535",
          "depth": "690"
        }
      ],
      "powerRequirement": "Hertz 50/Volts 230-240",
      "purificationSystem": "Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization (Chemical- free and eco-friendly)",
      "pointOfUseSterilization": "Germ Guardian™"
    },
    "status": "Live",
    "description": "For instance, a 100 LPH machine operating continuously for 8 hours will produce 800 liters of\nwater daily, amounting to 17,600 liters over a month.",
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/506794c8-ff87-4b3d-d775-a3c50d753000/public",
    "heroTagline": "For instance, a 100 LPH machine operating continuously for 8 hours will produce 800 liters of\nwater daily, amounting to 17,600 liters over a month.",
    "heroSubtext": "Sustainability at Core",
    "heroCtaText": "Contact Us",
    "heroCtaLink": "/contactus",
    "showcaseCtaText": "Enquire Now",
    "showcaseCtaLink": "Enquiry",
    "brochurePdf": "file:///C:/Users/WAE/Downloads/REVA.pdf",
    "datasheetPdf": "",
    "variants": {
      "hot": true,
      "cold": true,
      "ambient": true
    },
    "displayImageIndex": 3
  },
  "gsp": {
    "id": "gsp",
    "name": "GSP",
    "categoryName": "DRINKING WATER STATION - BLUWAE Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/062c00fb-5b0a-4167-2d2b-120af5406e00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/94110d2a-1b49-4225-cd63-a1bb1bcfc300/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/a190aa38-9d3a-4133-40d1-5cac6865f900/public"
    ],
    "featuresList": [
      {
        "title": "Touch-Free Dispensing",
        "description": "Experience seamless, sensor-based water dispensing that’s hygienic and completely touchless."
      },
      {
        "title": "Smooth, Splash-Free Flow",
        "description": "Designed for a clean, laminar water flow that minimizes spillage, paired with an efficient drainage system."
      },
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration"
      },
      {
        "title": "Versatile Integration",
        "description": "Effortlessly integrates with carbonated beverage dispensers and coffee/tea vending machines, providing a flexible, all-in-one hydration solution."
      },
      {
        "title": "Water Enrichments (Optional)",
        "description": "Mineralization Alkaline"
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "GSP HC",
          "hot": "1",
          "cold": "16",
          "ambient": "-"
        }
      ],
      "waterTemp": {
        "cold": "Cold: 5°C - 20° C (default 8°C)",
        "hot": "Hot: 30°C - 65°C (default 55°C)"
      },
      "greenCertification": "Confirms to green product certification, low discharge faucets : 1.5 LPM",
      "dripTray": "1300 ml",
      "refrigerant": "R-134a",
      "dimensions": [
        {
          "variant": "GSP HC",
          "weight": "131.0",
          "height": "1155",
          "width": "300",
          "depth": "410"
        }
      ],
      "powerRequirement": "Hertz 50/Volts 230-240",
      "purificationSystem": "Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization (Chemical- free and eco-friendly)",
      "pointOfUseSterilization": "Germ Guardian™"
    },
    "status": "Live",
    "description": "For instance, a 50 LPH machine operating continuously for 8 hours will produce 400 liters of\nwater daily, amounting to 8,800 liters over a month.",
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ad026cb7-dac1-4188-a839-a2062c712d00/public",
    "heroTagline": "For instance, a 50 LPH machine operating continuously for 8 hours will produce 400 liters of\nwater daily, amounting to 8,800 liters over a month.",
    "heroSubtext": "Sustainability at Core",
    "heroCtaText": "Contact Us",
    "heroCtaLink": "/contactus",
    "showcaseCtaText": "Enquire Now",
    "showcaseCtaLink": "/enqyiry",
    "brochurePdf": "file:///C:/Users/WAE/Downloads/Grand%20Slam%20Pro.pdf",
    "datasheetPdf": "",
    "variants": {
      "hot": true,
      "cold": true,
      "ambient": false
    },
    "displayImageIndex": 0
  },
  "assistflow": {
    "id": "assistflow",
    "name": "ASSISTFLOW",
    "categoryName": "Drinking water station - BLUWAE",
    "heroSubtitle": "Powerful LED sterilization",
    "status": "Live",
    "description": "Information regarding WAE series drinking water dispensers and advanced purification modules.",
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/78cde953-1b2b-48db-0aaa-eaf393a09d00/public",
    "heroTagline": "Plastic is passe, Landfilling is zero.\nSustainability is the future.",
    "heroSubtext": "Experience on-demand",
    "heroCtaText": "Contact Us",
    "heroCtaLink": "#product-showcase",
    "showcaseCtaText": "Enquire Now",
    "showcaseCtaLink": "#",
    "brochurePdf": "/brochure-download.pdf",
    "datasheetPdf": "",
    "variants": {
      "hot": true,
      "cold": true,
      "ambient": true
    },
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c549c9bc-8af7-41f6-03d5-8c0078e9dd00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ec016b83-3713-4d25-f896-de54df537900/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/64fe0354-6750-4828-ed39-78cca03f1b00/public"
    ],
    "featuresList": [
      {
        "title": "Powerful led uv-c intank sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration"
      },
      {
        "title": "Built to last",
        "description": "Crafted with premium Stainless Steel (SS-304) and corrosion-resistant Galvanized\nIron (GI), ensuring durability and safety with food-grade materials."
      },
      {
        "title": "Effortless integration",
        "description": "Seamlessly connects with carbonated beverage dispensers\nand coffee/tea vending machines for a versatile, all-in-one solution."
      },
      {
        "title": "Touch-free convenience",
        "description": "Experience the ease of sensor-based dispensing, delivering clean and safe water without the need for touch."
      },
      {
        "title": "American disabilities act",
        "description": "Designed to comply with ADA accessability guidelines. Ideal for schools & public utilities."
      },
      {
        "title": "Designed for everyone",
        "description": "Thoughtfully engineered to be accessible for seniors, kids, and\nthose with special needs, making hydration easy for all."
      },
      {
        "title": "Water enrichments (optional)",
        "description": "Mineralization Alkaline"
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "Assistflow 100",
          "hot": "3",
          "cold": "40",
          "ambient": "15"
        },
        {
          "variant": "Assistflow 50",
          "hot": "3",
          "cold": "40",
          "ambient": "15"
        }
      ],
      "waterTemp": {
        "cold": "Cold: 5°C- 24°C (default Default 8°C)",
        "hot": "Hot: 30°C- 80°C (default Default 50°C)"
      },
      "greenCertification": "Confirms to green product certification, low discharge faucets : 1.5 LPM",
      "dripTray": "1000ml",
      "refrigerant": "R-134a",
      "dimensions": [
        {
          "variant": "Assistflow 100",
          "weight": "150.0",
          "height": "1631",
          "width": "535",
          "depth": "654"
        },
        {
          "variant": "Assistflow 50",
          "weight": "120.0",
          "height": "1631",
          "width": "535",
          "depth": "654"
        }
      ],
      "powerRequirement": "Hertz 50/Volts 230-240",
      "purificationSystem": "Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization (Chemical- free and eco-friendly)",
      "pointOfUseSterilization": "Germ Guardian™"
    },
    "displayImageIndex": 0
  },
  "venus": {
    "id": "venus",
    "name": "VENUS",
    "categoryName": "DRINKING WATER STATION - BLUWAE Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/92e20429-ff63-410f-9494-62ebbb2e0b00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c3ed7a14-37db-4d33-e6c7-3d0c61905700/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/eb143bac-b20b-46ce-ff64-3dfd59dde000/public"
    ],
    "featuresList": [
      {
        "title": "Water Options",
        "description": "Chilled , Hot , Ambient"
      },
      {
        "title": "Robust & Durable Build",
        "description": "Constructed with premium Stainless Steel (SS-304) and corrosion-resistant GI, ensuring food-grade safety and long-lasting durability."
      },
      {
        "title": "Instant Hydration",
        "description": "Experience pure, safe water — delivered instantly at the push of a button or from a bubbler."
      },
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration"
      },
      {
        "title": "Real-Time Monitoring",
        "description": "Stay informed with an intuitive IoT display powered by CIRCLE OF BLUE, showcasing key data and performance metrics in real-time."
      },
      {
        "title": "Effortless Integration",
        "description": "Seamlessly connects with carbonated beverage dispensers and coffee/tea vending machines for a versatile, all-in-one solution."
      },
      {
        "title": "Water Enrichments (Optional)",
        "description": "Mineralization Alkaline"
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "VENUS 100/50",
          "hot": "2",
          "cold": "2",
          "ambient": "2"
        }
      ],
      "waterTemp": {
        "cold": "Cold: 5°C - 20° C (default 8°C)",
        "hot": "Hot: 30°C - 65°C (default 55°C)"
      },
      "greenCertification": "Confirms to green product certification, low discharge faucets : 1.5 LPM",
      "dripTray": "800 ml",
      "refrigerant": "R-134a",
      "dimensions": [
        {
          "variant": "VENUS 100/50",
          "weight": "150.0/130.0",
          "height": "1656",
          "width": "483",
          "depth": "605"
        }
      ],
      "powerRequirement": "Hertz 50/Volts 230-240",
      "purificationSystem": "Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization (Chemical- free and eco-friendly)",
      "pointOfUseSterilization": "Germ Guardian™"
    },
    "status": "Live",
    "description": "For instance, a 100 LPH machine operating continuously for 8 hours will produce 800 liters of\nwater daily, amounting to 17,600 liters over a month.",
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/da3ee01b-9749-4587-03b0-491d3b236100/public",
    "heroTagline": "For instance, a 100 LPH machine operating continuously for 8 hours will produce 800 liters of\nwater daily, amounting to 17,600 liters over a month.",
    "heroSubtext": "Sustainability at Core",
    "heroCtaText": "Contact Us",
    "heroCtaLink": "/cobtactus",
    "showcaseCtaText": "Enquire Now",
    "showcaseCtaLink": "/enquiry",
    "brochurePdf": "file:///C:/Users/WAE/Downloads/VENUS.pdf",
    "datasheetPdf": "file:///C:/Users/WAE/Downloads/VENUS.pdf",
    "variants": {
      "hot": true,
      "cold": true,
      "ambient": true
    },
    "displayImageIndex": 0
  },
  "eno-ct": {
    "id": "eno-ct",
    "name": "ENKI.CT",
    "categoryName": "DRINKING WATER STATION - BLUWAE Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/fbf516d7-077e-47f3-6aed-895881ab0c00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/836e8089-a92c-4171-9060-f61c95591700/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2078a46d-8819-4840-a853-96abb0409400/public"
    ],
    "featuresList": [
      {
        "title": "Touch-Free Operation",
        "description": "Enjoy sensor-based, hygienic water dispensing that’s quick, easy, and completely touchless."
      },
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration"
      },
      {
        "title": "Clean Flow, Minimal Splash",
        "description": "Engineered for a smooth, laminar flow that minimizes spillage, complemented by an efficient drainage system."
      },
      {
        "title": "Effortless Integration",
        "description": "Easily connects with carbonated beverage dispensers and coffee/tea\nmachines, offering a versatile hydration solution."
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "ENKI 50 CT",
          "hot": "1",
          "cold": "1 5",
          "ambient": "-"
        },
        {
          "variant": "ENKI 25 CT",
          "hot": "1",
          "cold": "9",
          "ambient": "-"
        }
      ],
      "waterTemp": {
        "cold": "Cold: 5°C - 24° C (default 8°C)",
        "hot": "Hot: 50°C - 80°C (default 55°C)"
      },
      "greenCertification": "Confirms to green product certification, low discharge faucets : 1.5 LPM",
      "dripTray": "500 ml",
      "refrigerant": "R-134a",
      "dimensions": [
        {
          "variant": "ENKI 50 CT",
          "weight": "43.0",
          "height": "677",
          "width": "370",
          "depth": "590"
        },
        {
          "variant": "ENKI 25 CT",
          "weight": "37.0",
          "height": "677",
          "width": "370",
          "depth": "440"
        }
      ],
      "powerRequirement": "220V/50 HZ RZ 134a1/8 HP",
      "purificationSystem": "Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization (Chemical- free and eco-friendly)",
      "pointOfUseSterilization": "Germ Guardian™"
    },
    "status": "Live",
    "description": "For instance, a 50 LPH machine operating continuously for 8 hours will produce 400 liters of\nwater daily, amounting to 8,800 liters over a month.",
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/9165c682-a912-4247-c5f9-ce3ffaed8700/public",
    "heroTagline": "For instance, a 50 LPH machine operating continuously for 8 hours will produce 400 liters of\nwater daily, amounting to 8,800 liters over a month.",
    "heroSubtext": "Sustainability at Core",
    "heroCtaText": "Contact Us",
    "heroCtaLink": "/contactus",
    "showcaseCtaText": "Enquire Now",
    "showcaseCtaLink": "/enquiry",
    "brochurePdf": "file:///C:/Users/WAE/Downloads/ENKI.pdf",
    "datasheetPdf": "",
    "variants": {
      "hot": true,
      "cold": true,
      "ambient": false
    },
    "displayImageIndex": 0
  },
  "var-ct": {
    "id": "var-ct",
    "name": "VAR.CT",
    "categoryName": "DRINKING WATER STATION - BLUWAE Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/eb19ce92-40b9-42d4-cb63-f3cc053edc00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/d2c031df-53ff-4428-dcd8-7d42382d4c00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/1c713c0f-30bc-45c8-6435-84cc43d6f000/public"
    ],
    "featuresList": [
      {
        "title": "Water Options",
        "description": "Chilled  Hot  Ambient"
      },
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration"
      },
      {
        "title": "Built Tough, Made to Last",
        "description": "Crafted from premium Stainless Steel (SS-304) and corrosion -resistant GI, this unit is food-grade approved and built for enduring performance."
      },
      {
        "title": "Touch-Free Dispensing",
        "description": "Enjoy effortless, hygienic water access with sensor-based, touchless technology."
      },
      {
        "title": "No Mess, No Stress",
        "description": "An efficient drip tray with generous capacity catches spills, keeping the space clean and orderly."
      },
      {
        "title": "Effortless Integration",
        "description": "Seamlessly connects with carbonated beverage dispensers and coffee/tea vending machines for a versatile, all-in-one solution."
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "FS VAR 50/25",
          "hot": "3",
          "cold": "20",
          "ambient": "15"
        }
      ],
      "waterTemp": {
        "cold": "Cold: 5°C - 20° C (default 8°C)",
        "hot": "Hot: 30°C - 65°C (default 55°C)"
      },
      "greenCertification": "Confirms to green product certification, low discharge faucets : 1.5 LPM",
      "dripTray": "1300 ml",
      "refrigerant": "R-134a",
      "dimensions": [
        {
          "variant": "FS VAR 50/25",
          "weight": "70",
          "height": "805",
          "width": "470",
          "depth": "713"
        }
      ],
      "powerRequirement": "220V/50 HZ RZ 134a1/8 HP",
      "purificationSystem": "Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization (Chemical- free and eco-friendly)",
      "pointOfUseSterilization": "Germ Guardian™"
    },
    "status": "Live",
    "description": "For instance, a 100 LPH machine operating continuously for 8 hours will produce 800 liters of\nwater daily, amounting to 17,600 liters over a month.",
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/0e4b7bf2-c341-4b7e-bd2a-0610d4571100/public",
    "heroTagline": "For instance, a 100 LPH machine operating continuously for 8 hours will produce 800 liters of\nwater daily, amounting to 17,600 liters over a month.",
    "heroSubtext": "Sustainability at Core",
    "heroCtaText": "Contact Us",
    "heroCtaLink": "/contactus",
    "showcaseCtaText": "Enquire Now",
    "showcaseCtaLink": "/enquiry",
    "brochurePdf": "file:///C:/Users/WAE/Downloads/VAR.pdf",
    "datasheetPdf": "file:///C:/Users/WAE/Downloads/VAR.pdf",
    "variants": {
      "hot": true,
      "cold": true,
      "ambient": true
    },
    "displayImageIndex": 0
  },
  "rom-ct": {
    "id": "rom-ct",
    "name": "ROM.CT",
    "categoryName": "DRINKING WATER STATION - BLUWAE Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/067b3edc-d892-48f5-1e63-5e567c0a6d00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/e29b6648-0a93-46e7-a4a4-499647428100/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/9995e3ec-5a45-429a-1dd4-ce1f6d25e500/public"
    ],
    "featuresList": [
      {
        "title": "Water options",
        "description": "Chilled Hot Ambient"
      },
      {
        "title": "Sensor-Based Operation:",
        "description": "Touchless and hygienic dispensing ensures a seamless and safe user experience."
      },
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration"
      },
      {
        "title": "Efficient Drainage",
        "description": "Equipped with a generous drip tray to efficiently collect accidental spillage, maintaining cleanliness."
      },
      {
        "title": "Water Enrichments (Optional)",
        "description": "Mineralization Alkaline"
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "RO M 50/25",
          "hot": "01",
          "cold": "10",
          "ambient": "05"
        }
      ],
      "waterTemp": {
        "cold": "Cold: 5°C - 24° C (default 8°C)",
        "hot": "Hot: 50°C - 80°C (default 55°C)"
      },
      "greenCertification": "Confirms to green product certification, low discharge faucets : 1.5 LPM",
      "dripTray": "1000ml/500ml",
      "refrigerant": "R-134a",
      "dimensions": [
        {
          "variant": "ROM 50/25",
          "weight": "45.0/37.0",
          "height": "677",
          "width": "370",
          "depth": "590"
        }
      ],
      "powerRequirement": "Hertz 50/Volts 230-240",
      "purificationSystem": "Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization (Chemical- free and eco-friendly)",
      "pointOfUseSterilization": "Germ Guardian™"
    },
    "status": "Live",
    "description": "for instance, a 100 LPH machine operating continuously for 8 hours will produce 800 liters of \nwater daily, amounting to 17,600 liters over a month.",
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/7ae27dc7-c6aa-4981-7ba2-99753e304f00/public",
    "heroTagline": "for instance, a 100 LPH machine operating continuously for 8 hours will produce 800 liters of \nwater daily, amounting to 17,600 liters over a month.",
    "heroSubtext": "Sustainability at Core",
    "heroCtaText": "Contact Us",
    "heroCtaLink": "/contactus",
    "showcaseCtaText": "Enquire Now",
    "showcaseCtaLink": "/enquiry",
    "brochurePdf": "file:///C:/Users/WAE/Downloads/ROM.pdf",
    "datasheetPdf": "file:///C:/Users/WAE/Downloads/ROM.pdf",
    "variants": {
      "hot": true,
      "cold": true,
      "ambient": true
    },
    "displayImageIndex": 0
  },
  "aenon": {
    "id": "aenon",
    "name": "AENON",
    "categoryName": "WATER DISPENSER - TRUBLU Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/9a539ab1-e7f5-48ea-dff3-0c8071dcf300/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/25531713-c7e1-40c9-eb1b-44c3c9127400/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/a814e21b-b816-4241-14e5-2fb4e5bf4f00/public"
    ],
    "featuresList": [
      {
        "title": "Plumbed-In/ Top Loading (Optional)",
        "description": "Plumbed-in to Purified Water Supply. Direct Jar Fill: Direct Tank Fill Optional"
      },
      {
        "title": "Built to Last",
        "description": "Premium 100% metal construct with SS-304 stainless steel tank combining sustainability and long term value. Full SS 304 version available."
      },
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration"
      },
      {
        "title": "Hypergienic Hydration",
        "description": "IR Sensor based touch free dispensing."
      },
      {
        "title": "Green Specs",
        "description": "Certified Green 2 LPM-water flow"
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "FS AENON 36, 45,75",
          "hot": "3",
          "cold": "40",
          "ambient": "15"
        }
      ],
      "waterTemp": {
        "cold": "Cold: 5°C- 24°C (default Default 8°C)",
        "hot": "Hot: 30°C- 80°C (default Default 50°C)"
      },
      "greenCertification": "Confirms to green product certification, low discharge faucets : 1.5 LPM",
      "dripTray": "1000ml",
      "refrigerant": "R-134a",
      "dimensions": [
        {
          "variant": "FS AENON 36, 45,75",
          "weight": "-",
          "height": "1631",
          "width": "535",
          "depth": "654"
        }
      ],
      "powerRequirement": "220V/50 HZ RZ 134a 1/8 HP",
      "purificationSystem": "Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization",
      "pointOfUseSterilization": "Germ Guardian™"
    }
  },
  "alfa-100": {
    "id": "alfa-100",
    "name": "ALFA 100",
    "categoryName": "WATER DISPENSER - TRUBLU Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/beff5c3b-301a-466d-8b0f-e9fe77bcd200/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/a850b11e-b4e6-4413-1035-e76da3736100/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c9e2f1ea-74ff-48fc-c0d7-cb5f23c1ea00/public"
    ],
    "featuresList": [
      {
        "title": "Plumbed-In",
        "description": "Can be directly connected to the input water supply (purified)"
      },
      {
        "title": "Built to Last",
        "description": "Premium 100% metal construct with SS-304 stainless steel tank combining sustainability and long term value."
      },
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration"
      },
      {
        "title": "Hypergienic Hydration",
        "description": "IR Sensor based touch free dispensing."
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "FS ALFA 65",
          "hot": "3",
          "cold": "40",
          "ambient": "15"
        }
      ],
      "waterTemp": {
        "cold": "Cold: 5°C - 24° C",
        "hot": "Hot: 30°C - 80° C"
      },
      "greenCertification": "Confirms to green product certification, low discharge faucets : 1.5 LPM",
      "dripTray": "1000 ml",
      "refrigerant": "R-134a",
      "dimensions": [
        {
          "variant": "FS ALFA 65",
          "weight": "-",
          "height": "1631",
          "width": "535",
          "depth": "654"
        }
      ],
      "powerRequirement": "220V/50 HZ",
      "purificationSystem": "Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization",
      "pointOfUseSterilization": "Germ Guardian™"
    }
  },
  "alfa-bl": {
    "id": "alfa-bl",
    "name": "ALFA BL",
    "categoryName": "WATER DISPENSER - TRUBLU Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/7dee6e9b-96e0-4236-49ee-b9e36ffedf00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b9b68bc5-70be-4303-fb96-b90fbbf77c00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6f56ccc0-e0b5-4fa1-467d-db93eb6b3b00/public"
    ],
    "featuresList": [
      {
        "title": "Bottom-Load Ease",
        "description": "Place jars or bottles below for easy water collection and reduced lifting."
      },
      {
        "title": "Hypergienic Hydration",
        "description": "IR Sensor based touch free dispensing."
      },
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration"
      },
      {
        "title": "Touch-Free Dispense",
        "description": "Enjoy hassle-free, hygienic dispensing with a simple touch."
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "CT ALFA BL",
          "hot": "3",
          "cold": "40",
          "ambient": "15"
        }
      ],
      "waterTemp": {
        "cold": "Cold: 5°C - 24° C",
        "hot": "Hot: 30°C - 80° C"
      },
      "greenCertification": "Confirms to green product certification, low discharge faucets : 1.5 LPM",
      "dripTray": "1000 ml",
      "refrigerant": "R-134a",
      "dimensions": [
        {
          "variant": "CT ALFA BL",
          "weight": "-",
          "height": "1631",
          "width": "535",
          "depth": "654"
        }
      ],
      "powerRequirement": "220V/50 HZ",
      "purificationSystem": "Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization",
      "pointOfUseSterilization": "Germ Guardian™"
    }
  },
  "alfa-ct": {
    "id": "alfa-ct",
    "name": "ALFA CT",
    "categoryName": "WATER DISPENSER - TRUBLU Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/d64a8674-1e83-4cdf-b733-9881bb65da00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6e759543-fba1-46e0-1171-9ca6f9d6d200/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/21128a4c-a5ff-4368-3a5b-12bd72c06b00/public"
    ],
    "featuresList": [
      {
        "title": "Counter-Top Friendly",
        "description": "Compact design fits perfectly on counters and in tight spaces."
      },
      {
        "title": "Top-Load Flexibility",
        "description": "Easily place a jar or bole on top for effortless water collection."
      },
      {
        "title": "Powerful LED  UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration"
      },
      {
        "title": "Hypergienic Hydration",
        "description": "IR Sensor based touch free dispensing."
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "CT ALFA",
          "hot": "3",
          "cold": "40",
          "ambient": "15"
        }
      ],
      "waterTemp": {
        "cold": "Cold: 5°C - 24° C",
        "hot": "Hot: 30°C - 80° C"
      },
      "greenCertification": "Confirms to green product certification, low discharge faucets : 1.5 LPM",
      "dripTray": "1000 ml",
      "refrigerant": "R-134a",
      "dimensions": [
        {
          "variant": "CT ALFA",
          "weight": "-",
          "height": "1631",
          "width": "535",
          "depth": "654"
        }
      ],
      "powerRequirement": "220V/50 HZ",
      "purificationSystem": "Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization",
      "pointOfUseSterilization": "Germ Guardian™"
    }
  },
  "alfa-tl": {
    "id": "alfa-tl",
    "name": "ALFA TL",
    "categoryName": "WATER DISPENSER - TRUBLU Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/3b80e936-57ba-457d-a11b-85833225c200/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/8a7824d7-7f82-49fd-10cf-aaae8610e100/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/f2a3cb85-9bb6-42ce-54c5-35f6bd266000/public"
    ],
    "featuresList": [
      {
        "title": "Top-Load Ready",
        "description": "Place a jar or bole on top to easily collect water."
      },
      {
        "title": "Hypergienic Hydration",
        "description": "IR Sensor based touch free dispensing."
      },
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration"
      },
      {
        "title": "Sleek Design",
        "description": "Modern, space-saving design that ts perfectly in any seing."
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "TL ALFA",
          "hot": "3",
          "cold": "40",
          "ambient": "15"
        }
      ],
      "waterTemp": {
        "cold": "Cold: 5°C - 24° C",
        "hot": "Hot: 30°C - 80° C"
      },
      "greenCertification": "Confirms to green product certification, low discharge faucets : 1.5 LPM",
      "dripTray": "1000 ml",
      "refrigerant": "R-134a",
      "dimensions": [
        {
          "variant": "TL ALFA",
          "weight": "-",
          "height": "1631",
          "width": "535",
          "depth": "654"
        }
      ],
      "powerRequirement": "220V/50 HZ",
      "purificationSystem": "Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization",
      "pointOfUseSterilization": "Germ Guardian™"
    }
  },
  "delta": {
    "id": "delta",
    "name": "DELTA",
    "categoryName": "WATER DISPENSER - TRUBLU Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/267d6f4b-afd7-42d1-c948-02c0cc588b00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/30dcf033-c808-4aba-1f0c-fa72e4022300/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/774bf3ad-1dc7-4ad2-5779-ab2d15f20700/public"
    ],
    "featuresList": [
      {
        "title": "Pure Water flow",
        "description": "Lead-free, bacteria-resistant tubings for safe, clean water."
      },
      {
        "title": "Energy Efficient",
        "description": "Uses 25% less power, saving on energy costs."
      },
      {
        "title": "fast TOUCHLESS DISPENSING",
        "description": "Delivers ice-cold and hot water twice as fast."
      },
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is puried upto 99.99% for sterilized hydration"
      },
      {
        "title": "Seamless Integration",
        "description": "Connects easily with coffee, tea, and beverage machines."
      },
      {
        "title": "Easy Maintenance",
        "description": "Spill-resistant, dishwasher-safe drip tray for hassle-free upkeep."
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "FS DELTA",
          "hot": "3",
          "cold": "40",
          "ambient": "15"
        }
      ],
      "waterTemp": {
        "cold": "Cold: 5°C - 24° C",
        "hot": "Hot: 30°C - 80° C"
      },
      "greenCertification": "Confirms to green product certification, low discharge faucets : 1.5 LPM",
      "dripTray": "1000 ml",
      "refrigerant": "R-134a",
      "dimensions": [
        {
          "variant": "FS DELTA",
          "weight": "-",
          "height": "1631",
          "width": "535",
          "depth": "654"
        }
      ],
      "powerRequirement": "220V/50 HZ",
      "purificationSystem": "Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization",
      "pointOfUseSterilization": "Germ Guardian™"
    }
  },
  "gamma": {
    "id": "gamma",
    "name": "GAMMA",
    "categoryName": "WATER DISPENSER - TRUBLU Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/79ce8da9-daaa-4bad-c80a-5a5f47af3c00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4eb27063-2310-4888-4f1c-9f4b02493d00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c96d8adb-e99f-4181-f45f-1bbd40918c00/public"
    ],
    "featuresList": [
      {
        "title": "Clean and Safe Water",
        "description": "Lead-free, bacteria-resistant tubing ensures pure and contaminant-free hydration."
      },
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is puried upto 99.99% for sterilized hydration"
      },
      {
        "title": "Rapid Touchless Dispensing",
        "description": "Provides ice-cold and hot water at twice the speed of standard models."
      },
      {
        "title": "Build to Use Made to Last",
        "description": "Tripple Coated GI with FRP Colour Customized Front"
      },
      {
        "title": "Green Specs",
        "description": "Griha Green Certified"
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "FS DELTA",
          "hot": "3",
          "cold": "40",
          "ambient": "15"
        }
      ],
      "waterTemp": {
        "cold": "Cold: 5°C - 24° C",
        "hot": "Hot: 30°C - 80° C"
      },
      "greenCertification": "Confirms to green product certification, low discharge faucets : 1.5 LPM",
      "dripTray": "1000 ml",
      "refrigerant": "R-134a",
      "dimensions": [
        {
          "variant": "FS DELTA",
          "weight": "-",
          "height": "1631",
          "width": "535",
          "depth": "654"
        }
      ],
      "powerRequirement": "220V/50 HZ",
      "purificationSystem": "Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization",
      "pointOfUseSterilization": "Germ Guardian™"
    }
  },
  "lagoon": {
    "id": "lagoon",
    "name": "LAGOON",
    "categoryName": "WATER DISPENSER - TRUBLU Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/70fa9ba1-f0e8-490b-fe4a-4ca531a63700/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/89fe9111-df3e-44fd-146b-913905054100/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/f6efba25-b43c-449d-d14d-a785f6e61b00/public"
    ],
    "featuresList": [
      {
        "title": "Top-Load Ready",
        "description": "Place a jar or bottle on top to easily collect water."
      },
      {
        "title": "SS Storage Tank",
        "description": "High-quality Stainless Steel (SS-304) for corrosion resistance and no bad odors or microbial growth."
      },
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is puried upto 99.99% for sterilized hydration"
      },
      {
        "title": "Manual Operation",
        "description": "Manually operated taps for easy and controlled water dispensing"
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "FS LAGOON",
          "hot": "3",
          "cold": "40",
          "ambient": "15"
        }
      ],
      "waterTemp": {
        "cold": "Cold: 5°C- 24°C (default Default 8°C)",
        "hot": "Hot: 30°C- 80°C (default Default 50°C)"
      },
      "greenCertification": "Confirms to green product certification, low discharge faucets : 1.5 LPM",
      "dripTray": "750ml",
      "refrigerant": "R-134a",
      "dimensions": [
        {
          "variant": "FS LAGOON",
          "weight": "-",
          "height": "1631",
          "width": "535",
          "depth": "654"
        }
      ],
      "powerRequirement": "220V/50 HZ RZ 134a 1/8 HP",
      "purificationSystem": "Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization",
      "pointOfUseSterilization": "Germ Guardian™"
    }
  },
  "yami": {
    "id": "yami",
    "name": "YAMI",
    "categoryName": "WATER COOLER & FOUNTAINS - ZVR Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4617ef86-d822-4f26-a0e8-d81be539da00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/85bdf8ae-9a9c-4e51-262c-3086fce40d00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/916a4dbf-24a7-4130-00bf-c35c5693ce00/public"
    ],
    "featuresList": [
      {
        "title": "Sleek Bubbler Head At a glance",
        "description": "Chrome-plated brass head with a polished nish for a rened look and smooth water flow."
      },
      {
        "title": "Hygienic Tubing",
        "description": "100% lead-free, anti-bacterial tubes eliminate cross-contamination risks, ensuring pure, safe water."
      },
      {
        "title": "Splash-Free Experience",
        "description": "Engineered for a clean, controlled ow that minimizes spillage and water waste."
      },
      {
        "title": "Smart Drainage System",
        "description": "Ecient drainage eliminates standing water, keeping the area clean and dry."
      },
      {
        "title": "Fully Accessible",
        "description": "ADA-compliant design ensures effortless use for everyone."
      },
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is puried upto 99.99% for sterilized hydration"
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "1000ml Hydropac Classic TL",
          "hot": "3",
          "cold": "40",
          "ambient": "15"
        }
      ],
      "waterTemp": {
        "cold": "Cold: 5°C - 24° C",
        "hot": "Hot: 30°C - 80° C"
      },
      "greenCertification": "Confirms to green product certification, low discharge faucets : 1.5 LPM",
      "dripTray": "1000 ml",
      "refrigerant": "R-134a",
      "dimensions": [
        {
          "variant": "1000ml Hydropac Classic TL",
          "weight": "-",
          "height": "1631",
          "width": "535",
          "depth": "654"
        }
      ],
      "powerRequirement": "220V/50 HZ RZ 134a1/8 HP",
      "purificationSystem": "Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization",
      "pointOfUseSterilization": "Germ Guardian™"
    },
    "status": "Live"
  },
  "plusultra": {
    "id": "plusultra",
    "name": "PLUSULTRA",
    "categoryName": "WATER COOLER & FOUNTAINS - ZVR Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/9db14c02-30db-4131-3b6d-7c5b2fa3fb00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c274a381-1fe3-48ce-37e1-296ff4719900/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/5fcb76d0-46a1-4f0e-37f0-a1b53c6b3600/public"
    ],
    "featuresList": [
      {
        "title": "Heavy-Duty Build",
        "description": "High-quality SS-304 stainless steel with a vandal-resistant boom plate for superior durability."
      },
      {
        "title": "Optional Purification",
        "description": "Customizable back-end purification available."
      },
      {
        "title": "Efficient Drainage",
        "description": "Designed with a proper drainage system to eliminate standing water."
      },
      {
        "title": "Easy Installation",
        "description": "Quick wall-hanging or wall-mount setup."
      },
      {
        "title": "Bubbler Heads",
        "description": "Polished single or dual bubble heads with a convenient basin."
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "1000ml Hydropac Classic TL",
          "hot": "3",
          "cold": "40",
          "ambient": "15"
        }
      ],
      "waterTemp": {
        "cold": "Cold: 5°C - 24° C",
        "hot": "Hot: 30°C - 80° C"
      },
      "greenCertification": "Confirms to green product certification, low discharge faucets : 1.5 LPM",
      "dripTray": "1000 ml",
      "refrigerant": "R-134a",
      "dimensions": [
        {
          "variant": "1000ml Hydropac Classic TL",
          "weight": "-",
          "height": "1631",
          "width": "535",
          "depth": "654"
        }
      ],
      "powerRequirement": "220V/50 HZ RZ 134a1/8 HP",
      "purificationSystem": "Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization",
      "pointOfUseSterilization": "Germ Guardian™"
    },
    "status": "Live"
  },
  "piper": {
    "id": "piper",
    "name": "Piper",
    "categoryName": "DRINKING WATER FAUCETS - WATERMATIC Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/e4aee070-6aa9-430d-5009-f51a13b48800/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/55199965-30ce-4ef8-abf9-78a654bd3b00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/576c6473-9649-4eee-e31c-0e4ee5cc0d00/public"
    ],
    "featuresList": [
      {
        "title": "Powerful LED Powerful LED Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration"
      },
      {
        "title": "Built Tough, Made to Last",
        "description": "Crafted from premium Stainless Steel (SS-304) and corrosion-resistant GI, this unit is food-grade approved and built for enduring performance."
      },
      {
        "title": "Built Tough, Made to Last",
        "description": "Lorem Ipsum dolor"
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "FS VAR 150/ 100/ 50",
          "hot": "3",
          "cold": "40",
          "ambient": "15"
        }
      ],
      "waterTemp": {
        "cold": "Cold: 5°C- 24°C (default Default 8°C)",
        "hot": "Hot: 30°C- 80°C (default Default 50°C)"
      },
      "greenCertification": "Confirms to green product certification, low discharge faucets : 1.5 LPM",
      "dripTray": "1000ml",
      "refrigerant": "R-134a",
      "dimensions": [
        {
          "variant": "FS VAR 150/ 100/ 50",
          "weight": "-",
          "height": "1631",
          "width": "535",
          "depth": "654"
        }
      ],
      "powerRequirement": "220V/50 HZ RZ 134a1/8 HP",
      "purificationSystem": "Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization",
      "pointOfUseSterilization": "Germ Guardian™"
    },
    "status": "Live"
  },
  "watermatic": {
    "id": "watermatic",
    "name": "Watermatic",
    "categoryName": "DRINKING WATER FAUCETS - WATERMATIC Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/0a63f294-a33c-470e-8aba-f6bef589a600/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/5a89b2db-4c37-4e75-40cc-0d5afa2fac00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/e0460e14-5904-4c18-9dc4-1cf913d7da00/public"
    ],
    "featuresList": [
      {
        "title": "Powerful LED Powerful LED Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration"
      },
      {
        "title": "Built Tough, Made to Last",
        "description": "Crafted from premium Stainless Steel (SS-304) and corrosion-resistant GI, this unit is food-grade approved and built for enduring performance."
      },
      {
        "title": "Built Tough, Made to Last",
        "description": "Lorem Ipsum dolor"
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "FS VAR 150/ 100/ 50",
          "hot": "3",
          "cold": "40",
          "ambient": "15"
        }
      ],
      "waterTemp": {
        "cold": "Cold: 5°C- 24°C (default Default 8°C)",
        "hot": "Hot: 30°C- 80°C (default Default 50°C)"
      },
      "greenCertification": "Confirms to green product certification, low discharge faucets : 1.5 LPM",
      "dripTray": "1000ml",
      "refrigerant": "R-134a",
      "dimensions": [
        {
          "variant": "FS VAR 150/ 100/ 50",
          "weight": "-",
          "height": "1631",
          "width": "535",
          "depth": "654"
        }
      ],
      "powerRequirement": "220V/50 HZ RZ 134a1/8 HP",
      "purificationSystem": "Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization",
      "pointOfUseSterilization": "Germ Guardian™"
    },
    "status": "Live"
  },
  "aquatap": {
    "id": "aquatap",
    "name": "Aquatap",
    "categoryName": "DRINKING WATER FAUCETS - WATERMATIC Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/0b994225-97de-4679-daf1-8e5008e73500/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/a1a596c2-4a97-4da4-72a4-577ccb20a900/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/3b24c06b-1752-47a0-4499-be61a2497800/public"
    ],
    "featuresList": [
      {
        "title": "Powerful LED Powerful LED Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration"
      },
      {
        "title": "Built Tough, Made to Last",
        "description": "Crafted from premium Stainless Steel (SS-304) and corrosion-resistant GI, this unit is food-grade approved and built for enduring performance."
      },
      {
        "title": "Built Tough, Made to Last",
        "description": "Lorem Ipsum dolor"
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "FS VAR 150/ 100/ 50",
          "hot": "3",
          "cold": "40",
          "ambient": "15"
        }
      ],
      "waterTemp": {
        "cold": "Cold: 5°C- 24°C (default Default 8°C)",
        "hot": "Hot: 30°C- 80°C (default Default 50°C)"
      },
      "greenCertification": "Confirms to green product certification, low discharge faucets : 1.5 LPM",
      "dripTray": "1000ml",
      "refrigerant": "R-134a",
      "dimensions": [
        {
          "variant": "FS VAR 150/ 100/ 50",
          "weight": "-",
          "height": "1631",
          "width": "535",
          "depth": "654"
        }
      ],
      "powerRequirement": "220V/50 HZ RZ 134a1/8 HP",
      "purificationSystem": "Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization",
      "pointOfUseSterilization": "Germ Guardian™"
    },
    "status": "Live"
  },
  "moses": {
    "id": "moses",
    "name": "Moses",
    "categoryName": "DRINKING WATER FAUCETS - WATERMATIC Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/8440a366-f65d-40b0-7b2c-582ad7f8cc00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/47b3d27b-b65b-4e94-26d1-ac8bb35afd00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/0a6c1075-ac97-4c46-d1b9-42d3b6d82900/public"
    ],
    "featuresList": [
      {
        "title": "Powerful LED Powerful LED Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration"
      },
      {
        "title": "Built Tough, Made to Last",
        "description": "Crafted from premium Stainless Steel (SS-304) and corrosion-resistant GI, this unit is food-grade approved and built for enduring performance."
      },
      {
        "title": "Built Tough, Made to Last",
        "description": "Lorem Ipsum dolor"
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "FS VAR 150/ 100/ 50",
          "hot": "3",
          "cold": "40",
          "ambient": "15"
        }
      ],
      "waterTemp": {
        "cold": "Cold: 5°C- 24°C (default Default 8°C)",
        "hot": "Hot: 30°C- 80°C (default Default 50°C)"
      },
      "greenCertification": "Confirms to green product certification, low discharge faucets : 1.5 LPM",
      "dripTray": "1000ml",
      "refrigerant": "R-134a",
      "dimensions": [
        {
          "variant": "FS VAR 150/ 100/ 50",
          "weight": "-",
          "height": "1631",
          "width": "535",
          "depth": "654"
        }
      ],
      "powerRequirement": "220V/50 HZ RZ 134a1/8 HP",
      "purificationSystem": "Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization",
      "pointOfUseSterilization": "Germ Guardian™"
    },
    "status": "Live"
  },
  "trx.tl": {
    "id": "trx.tl",
    "name": "TRX.TL",
    "categoryName": "DRINKING WATER FAUCETS - WATERMATIC Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/0a63f294-a33c-470e-8aba-f6bef589a600/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/5a89b2db-4c37-4e75-40cc-0d5afa2fac00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/e0460e14-5904-4c18-9dc4-1cf913d7da00/public"
    ],
    "featuresList": [
      {
        "title": "Powerful LED Powerful LED Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration"
      },
      {
        "title": "Built Tough, Made to Last",
        "description": "Crafted from premium Stainless Steel (SS-304) and corrosion-resistant GI, this unit is food-grade approved and built for enduring performance."
      },
      {
        "title": "Built Tough, Made to Last",
        "description": "Lorem Ipsum dolor"
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "FS VAR 150/ 100/ 50",
          "hot": "3",
          "cold": "40",
          "ambient": "15"
        }
      ],
      "waterTemp": {
        "cold": "Cold: 5°C- 24°C (default Default 8°C)",
        "hot": "Hot: 30°C- 80°C (default Default 50°C)"
      },
      "greenCertification": "Confirms to green product certification, low discharge faucets : 1.5 LPM",
      "dripTray": "1000ml",
      "refrigerant": "R-134a",
      "dimensions": [
        {
          "variant": "FS VAR 150/ 100/ 50",
          "weight": "-",
          "height": "1631",
          "width": "535",
          "depth": "654"
        }
      ],
      "powerRequirement": "220V/50 HZ RZ 134a1/8 HP",
      "purificationSystem": "Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization",
      "pointOfUseSterilization": "Germ Guardian™"
    },
    "status": "Live"
  },
  "hkn": {
    "id": "hkn",
    "name": "HKN",
    "categoryName": "DRINKING WATER FAUCETS - WATERMATIC Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2e897fea-6219-4096-1989-ac1855719800/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/76de532d-a762-4789-d348-ffa6ddab9700/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2e897fea-6219-4096-1989-ac1855719800/public"
    ],
    "featuresList": [
      {
        "title": "Powerful LED Powerful LED Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration"
      },
      {
        "title": "Built Tough, Made to Last",
        "description": "Crafted from premium Stainless Steel (SS-304) and corrosion-resistant GI, this unit is food-grade approved and built for enduring performance."
      },
      {
        "title": "Built Tough, Made to Last",
        "description": "Lorem Ipsum dolor"
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "FS VAR 150/ 100/ 50",
          "hot": "3",
          "cold": "40",
          "ambient": "15"
        }
      ],
      "waterTemp": {
        "cold": "Cold: 5°C- 24°C (default Default 8°C)",
        "hot": "Hot: 30°C- 80°C (default Default 50°C)"
      },
      "greenCertification": "Confirms to green product certification, low discharge faucets : 1.5 LPM",
      "dripTray": "1000ml",
      "refrigerant": "R-134a",
      "dimensions": [
        {
          "variant": "FS VAR 150/ 100/ 50",
          "weight": "-",
          "height": "1631",
          "width": "535",
          "depth": "654"
        }
      ],
      "powerRequirement": "220V/50 HZ RZ 134a1/8 HP",
      "purificationSystem": "Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization",
      "pointOfUseSterilization": "Germ Guardian™"
    },
    "status": "Live"
  },
  "aqua": {
    "id": "aqua",
    "name": "AQUA",
    "categoryName": "PUBLIC UTILITY SYSTEMS - PUS Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/972917c4-f986-4a07-11e3-4f5ad123cb00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/41448980-c47f-4212-9bca-68bfd7c3db00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/11983264-8f58-4311-ec84-225eacf9c000/public"
    ],
    "featuresList": [
      {
        "title": "Built to Endure",
        "description": "Triple-coated galvanized iron with a protective powder finish."
      },
      {
        "title": "Pure & Safe Storage",
        "description": "Stainless steel tank guarantees 99.99% pure, contaminant-free water."
      },
      {
        "title": "Extended Durability",
        "description": "Optional anti-rust treatment and stainless steel 304 overhead protection."
      },
      {
        "title": "Longer Lifespan",
        "description": "Customizable design, easy maintenance, and energy-efficient operation."
      },
      {
        "title": "High Capacity",
        "description": "Designed to handle heavy water demand in busy environments."
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "FS AQUA",
          "hot": "3",
          "cold": "40",
          "ambient": "15"
        }
      ],
      "waterTemp": {
        "cold": "Cold: 5°C- 24°C (default Default 8°C)",
        "hot": "Hot: 30°C- 80°C (default Default 50°C)"
      },
      "greenCertification": "Confirms to green product certification, low discharge faucets : 1.5 LPM",
      "dripTray": "1000ml",
      "refrigerant": "R-134a",
      "dimensions": [
        {
          "variant": "FS AQUA",
          "weight": "-",
          "height": "1631",
          "width": "535",
          "depth": "654"
        }
      ],
      "powerRequirement": "220V/50 HZ RZ 134a 1/8 HP",
      "purificationSystem": "Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization",
      "pointOfUseSterilization": "Germ Guardian™"
    },
    "status": "Live"
  },
  "hydrobankseries": {
    "id": "hydrobankseries",
    "name": "HYDROBANKSERIES",
    "categoryName": "PUBLIC UTILITY SYSTEMS - PUS Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/13d0a907-1c95-4c88-fccc-fbc499c75100/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/fc19edb8-3d0e-475f-7a9c-fad84faa3a00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/e5a12692-239e-45be-fff0-42d2ba8d5100/public"
    ],
    "featuresList": [
      {
        "title": "Installation",
        "description": "Wall-mounted drinking water dispenser and fountain."
      },
      {
        "title": "Optional Upgrades",
        "description": "Swap the washer and dustbin for a built-in RO unit, ensuring purified water on demand"
      },
      {
        "title": "Material & Construction",
        "description": "Durable stainless steel 304 with galvanized iron for long-lasting performance."
      },
      {
        "title": "Customization",
        "description": "The backend unit is fully customizable to any space or design requirements."
      },
      {
        "title": "Operation",
        "description": "Convenient push-tap system for direct drinking (optional swan-neck taps available)."
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "FS AQUA",
          "hot": "3",
          "cold": "40",
          "ambient": "15"
        }
      ],
      "waterTemp": {
        "cold": "Cold: 5°C- 24°C (default Default 8°C)",
        "hot": "Hot: 30°C- 80°C (default Default 50°C)"
      },
      "greenCertification": "Confirms to green product certification, low discharge faucets : 1.5 LPM",
      "dripTray": "1000ml",
      "refrigerant": "R-134a",
      "dimensions": [
        {
          "variant": "FS AQUA",
          "weight": "-",
          "height": "1631",
          "width": "535",
          "depth": "654"
        }
      ],
      "powerRequirement": "220V/50 HZ RZ 134a 1/8 HP",
      "purificationSystem": "Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization",
      "pointOfUseSterilization": "Germ Guardian™"
    },
    "status": "Live"
  },
  "watermaker": {
    "id": "watermaker",
    "name": "WATERMAKER",
    "categoryName": "COMMERCIAL/INDUSTRIAL PLANTS",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/13d0a907-1c95-4c88-fccc-fbc499c75100/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/fc19edb8-3d0e-475f-7a9c-fad84faa3a00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/e5a12692-239e-45be-fff0-42d2ba8d5100/public"
    ],
    "featuresList": [
      {
        "title": "Robust construct",
        "description": "Heavy duty RO system designed for industrial applications"
      },
      {
        "title": "Anti-bacterial",
        "description": "Provides protection against bacteria, mould & fungi"
      },
      {
        "title": "Pre-engineered & Pre-assembled",
        "description": "A pre-assembled factory tested units to reduce installation & set up time"
      },
      {
        "title": "Application",
        "description": "Commercial kitchens, pantries, washing units & hospitality sector"
      },
      {
        "title": "5 - stage purification",
        "description": "Ensures pure water from any raw water source"
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "FS WATERMAKER",
          "hot": "3",
          "cold": "40",
          "ambient": "15"
        }
      ],
      "waterTemp": {
        "cold": "Cold: 5°C - 24° C",
        "hot": "Hot: 30°C - 80° C"
      },
      "greenCertification": "Confirms to green product certification, low discharge faucets : 1.5 LPM",
      "dripTray": "1000 ml",
      "refrigerant": "R-134a",
      "dimensions": [
        {
          "variant": "FS WATERMAKER",
          "weight": "-",
          "height": "1631",
          "width": "535",
          "depth": "654"
        }
      ],
      "powerRequirement": "220V/50 HZ RZ 134a 1/8 HP",
      "purificationSystem": "Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization",
      "pointOfUseSterilization": "Germ Guardian™"
    },
    "status": "Live"
  }
};
