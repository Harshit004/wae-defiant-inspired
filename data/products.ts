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
  featuresList: Array<{ title: string; description: string; isDisplayed?: boolean }>;
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
        "id": "venus",
        "name": "VENUS",
        "category": "free-standing",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/92e20429-ff63-410f-9494-62ebbb2e0b00/public"
      },
      {
        "id": "rom-grande",
        "name": "ROM Grande",
        "category": "free-standing",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c81f0436-e3cf-4bb3-ed3f-12d71c529e00/public"
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
        "id": "enki",
        "name": "ENKI",
        "category": "free-standing",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/969cf7aa-9a0c-4e02-c897-8ec75b1b5a00/public"
      },
      {
        "id": "pos",
        "name": "POS",
        "category": "free-standing",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/d750f7b0-5ed6-442f-d370-6c66f6b79700/public"
      },
      {
        "id": "rom-ct",
        "name": "ROM.CT",
        "category": "counter-top",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/067b3edc-d892-48f5-1e63-5e567c0a6d00/public"
      },
      {
        "id": "var-series",
        "name": "VAR",
        "category": "free-standing",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4aca6071-c05f-46cd-f8ba-1238aae87400/public"
      },
      {
        "id": "gsp",
        "name": "GSP",
        "category": "free-standing",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/062c00fb-5b0a-4167-2d2b-120af5406e00/public"
      },
      {
        "id": "var-ct",
        "name": "VAR.CT",
        "category": "counter-top",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/eb19ce92-40b9-42d4-cb63-f3cc053edc00/public"
      },
      {
        "id": "eno-ct",
        "name": "ENKI.CT",
        "category": "counter-top",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/fbf516d7-077e-47f3-6aed-895881ab0c00/public"
      },
      {
        "id": "alfa-65",
        "name": "ALFA 65",
        "category": "free-standing",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/88dff65b-42f2-4ce4-a37e-8586a6120700/public"
      }
    ],
    "imageUrl": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/9dac2dbe-676f-4f2b-b09f-cc64cd253700/public"
  },
  "trublu": {
    "id": "trublu",
    "title": "Water dispenser & cooler - TRUBLU",
    "description": "Crafted for contemporary environments, bottleless dispensers combines touchless convenience, stainless steel aesthetics, and purified hot, cold, and ambient hydration.",
    "paragraphs": [
      "TRUBLU™ Series offers advanced and reliable Point-of-Use water dispensers designed to meet the highest standards of safety, quality, and style. Ideal for active corporate and commercial environments.",
      "Engineered with WAE's premium components, including medical-grade filtration and high-performance cooling/heating capacities to serve high-volume demand smoothly.",
      "With eco-friendly refrigerants and smart automation features, TRUBLU™ is a modern hydration classic designed to replace bottled coolers sustainably."
    ],
    "products": [
      {
        "id": "alfa-ct",
        "name": "TRUBLU ALFA CT",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c274a381-1fe3-48ce-37e1-296ff4719900/public",
        "category": "counter-top"
      },
      {
        "id": "aenon",
        "name": "AENON",
        "category": "free-standing",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/8ea2eecd-b9d8-4a38-399b-12ce2375a200/public"
      },
      {
        "id": "lagoon",
        "name": "LAGOON",
        "category": "free-standing",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b8150df9-f454-4a9c-b016-16beb5b67400/public"
      },
      {
        "id": "aurela",
        "name": "Aurella",
        "category": "free-standing",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/7c50c87e-618b-413b-06b5-afc197db2d00/public"
      },
      {
        "id": "epsilon",
        "name": "Epsilon",
        "category": "free-standing",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/0a374fc3-9953-42c2-6b8a-07dfc01f3400/public"
      },
      {
        "id": "alfa-100",
        "name": "ALFA 100",
        "category": "free-standing",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/800b2aca-19da-4043-42e8-8d5ad223fb00/public"
      },
      {
        "id": "yami",
        "name": "YAMI",
        "category": "fountains",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ffc77af9-3916-4e22-5133-db9d53a5dd00/public"
      },
      {
        "id": "yami-duo",
        "name": "YAMI DUO",
        "category": "free-standing",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/0650b8d5-1bb3-4ac5-eece-e9245a242200/public"
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
    "heroSubtitle": "",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4aca6071-c05f-46cd-f8ba-1238aae87400/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/7d1aa69a-f330-42cb-02ea-1e8fdf93a600/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/e574b038-c765-4fb0-7e75-0d4b94c81d00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6a645ebd-b768-47e1-e7ea-eb9ba395f700/public"
    ],
    "featuresList": [
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration",
        "isDisplayed": true
      },
      {
        "title": "Built Tough, Made to Last",
        "description": "Crafted from premium Stainless Steel (SS-304) and corrosion-resistant GI, this unit is food-grade approved and built for enduring performance.",
        "isDisplayed": true
      },
      {
        "title": "Touch-Free Dispensing",
        "description": "Enjoy effortless, hygienic water access with sensor-based, touchless technology.",
        "isDisplayed": true
      },
      {
        "title": "No Mess, No Stress",
        "description": "An efficient drip tray with generous capacity catches spills, keeping the space clean and orderly.",
        "isDisplayed": false
      },
      {
        "title": "Effortless Integration",
        "description": "Seamlessly connects with carbonated beverage dispensers and coffee/tea vending machines for a versatile, all-in-one solution.",
        "isDisplayed": false
      },
      {
        "title": "Water Enrichments (Optional)",
        "description": "Mineralization Alkaline",
        "isDisplayed": false
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
    "description": "TESTING 2",
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/61c42426-6a67-4edf-2bf9-e45a4b8cad00/public",
    "heroTagline": "Plastic is passe, Landfilling is zero.\nSustainability is the future.",
    "heroSubtext": "Sustainability at Core",
    "heroCtaText": "Contact Us",
    "heroCtaLink": "#product-showcase",
    "showcaseCtaText": "Enquire Now",
    "showcaseCtaLink": "",
    "brochurePdf": "file:///C:/Users/WAE/Downloads/VAR.pdf",
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
    "heroSubtitle": "",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/969cf7aa-9a0c-4e02-c897-8ec75b1b5a00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4994f73a-a0d9-40d5-5224-b058dbcca400/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6b7c46f4-29e5-482a-f6fd-dae1d944c700/public"
    ],
    "featuresList": [
      {
        "title": "Touch-Free Operation",
        "description": "Enjoy sensor-based, hygienic water dispensing that’s quick, easy, and completely touchless.",
        "isDisplayed": true
      },
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration",
        "isDisplayed": true
      },
      {
        "title": "Clean Flow, Minimal Splash",
        "description": "Engineered for a smooth, laminar flow that minimizes spillage, complemented by an efficient drainage system.",
        "isDisplayed": true
      },
      {
        "title": "Effortless Integration",
        "description": "Easily connects with carbonated beverage dispensers and coffee/tea vending machines, offering a versatile hydration solution.",
        "isDisplayed": false
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
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/61c42426-6a67-4edf-2bf9-e45a4b8cad00/public",
    "heroTagline": "Plastic in passe, Landfilling is Zero.\nSustainability is the Future.",
    "heroSubtext": "Sustainability at Core",
    "heroCtaText": "Contact Us",
    "heroCtaLink": "",
    "showcaseCtaText": "Enquire Now",
    "showcaseCtaLink": "",
    "brochurePdf": "file:///C:/Users/WAE/Downloads/ENKI.pdf",
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
    "heroSubtitle": "",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/d750f7b0-5ed6-442f-d370-6c66f6b79700/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/7fb71cd5-561b-4185-722f-57a910512d00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/77bfbe22-5122-407c-5b71-8415a1ca3500/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/f56d1bb2-8196-4815-7449-5a9481526600/public"
    ],
    "featuresList": [
      {
        "title": "Touch-Free Dispensing",
        "description": "Experience seamless, sensor-based water dispensing that’s hygienic and completely touchless.",
        "isDisplayed": true
      },
      {
        "title": "Smooth, Splash-Free Flow",
        "description": "Designed for a clean, laminar water flow that minimizes spillage, paired with an efficient drainage system.",
        "isDisplayed": true
      },
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration",
        "isDisplayed": false
      },
      {
        "title": "Versatile Integration",
        "description": "Effortlessly integrates with carbonated beverage dispensers and coffee/tea vending machines, providing a flexible, all-in-one hydration solution.",
        "isDisplayed": true
      },
      {
        "title": "Water Enrichments (Optional)",
        "description": "Mineralization/Alkaline",
        "isDisplayed": false
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
      "greenCertification": "Confirms to green product certification, low discharge faucets : 1.5 LPM",
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
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/61c42426-6a67-4edf-2bf9-e45a4b8cad00/public",
    "heroTagline": "Plastic is passe, Landfilling is zero.\nSustainability is the future.",
    "heroSubtext": "Sustainability at Core",
    "heroCtaText": "Contact Us",
    "heroCtaLink": "",
    "showcaseCtaText": "Enquire Now",
    "showcaseCtaLink": "",
    "brochurePdf": "file:///C:/Users/WAE/Downloads/POS.pdf",
    "variants": {
      "hot": true,
      "cold": true,
      "ambient": true
    },
    "displayImageIndex": 0
  },
  "rom-grande": {
    "id": "rom-grande",
    "name": "ROM Grande",
    "categoryName": "DRINKING WATER STATION - BLUWAE Series",
    "heroSubtitle": "",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c81f0436-e3cf-4bb3-ed3f-12d71c529e00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/e6c61b0f-8960-4358-8648-2cd4d0a96600/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/51f60770-5595-4de7-151a-2dcac9d1f500/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/faeed699-00e6-425b-91bb-84e4b7c85c00/public"
    ],
    "featuresList": [
      {
        "title": "Sensor-Based Operation:",
        "description": "Touchless and hygienic dispensing ensures a seamless and safe user experience.",
        "isDisplayed": true
      },
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration",
        "isDisplayed": true
      },
      {
        "title": "Efficient Drainage",
        "description": "Equipped with a generous drip tray to efficiently collect accidental spillage, maintaining cleanliness.",
        "isDisplayed": true
      },
      {
        "title": "Water Enrichments (Optional)",
        "description": "Mineralization Alkaline",
        "isDisplayed": false
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
    "heroImage": "",
    "heroTagline": "Plastic is passe, Landfilling is zero.\nSustainability is the future.",
    "heroSubtext": "Sustainability at Core",
    "heroCtaText": "Contact Us",
    "heroCtaLink": "",
    "showcaseCtaText": "Enquire Now",
    "showcaseCtaLink": "",
    "brochurePdf": "file:///C:/Users/WAE/Downloads/ROM.pdf",
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
    "heroSubtitle": "",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/978c8961-cf7f-4570-2b9b-e6e5838ed100/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c642f7b0-c3a5-4ff6-84ca-4c6da2805a00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/fbbd3628-de41-48ea-6ab9-329d11aa9d00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/3d6c1acd-771b-412e-25c8-64a908da5100/public"
    ],
    "featuresList": [
      {
        "title": "Robust & Durable Build",
        "description": "Constructed with premium Stainless Steel (SS-304) and corrosion-resistant GI, ensuring food-grade safety and long-lasting durability.",
        "isDisplayed": true
      },
      {
        "title": "Touchless Dispensing",
        "description": "Experience the convenience of sensor-based technology for hygienic, hands-free water dispensing.",
        "isDisplayed": false
      },
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration",
        "isDisplayed": true
      },
      {
        "title": "Real-Time Monitoring",
        "description": "Stay informed with an intuitive IoT display powered by CIRCLE OF BLUE, showcasing key data and performance metrics in real-time.",
        "isDisplayed": true
      },
      {
        "title": "Effortless Integration",
        "description": "Seamlessly connects with carbonated beverage dispensers and coffee/tea vending machines for a versatile, all-in-one solution.",
        "isDisplayed": false
      },
      {
        "title": "Water Enrichments (Optional)",
        "description": "Mineralization Alkaline",
        "isDisplayed": false
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
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/61c42426-6a67-4edf-2bf9-e45a4b8cad00/public",
    "heroTagline": "Plastic in passe, Landfilling is Zero.\nSustainability is the Future.",
    "heroSubtext": "Sustainability at Core",
    "heroCtaText": "Contact Us",
    "heroCtaLink": "/contactus",
    "showcaseCtaText": "Enquire Now",
    "showcaseCtaLink": "Enquiry",
    "brochurePdf": "file:///C:/Users/WAE/Downloads/REVA.pdf",
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
    "heroSubtitle": "",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/062c00fb-5b0a-4167-2d2b-120af5406e00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/94110d2a-1b49-4225-cd63-a1bb1bcfc300/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/a190aa38-9d3a-4133-40d1-5cac6865f900/public"
    ],
    "featuresList": [
      {
        "title": "Touch-Free Dispensing",
        "description": "Experience seamless, sensor-based water dispensing that’s hygienic and completely touchless.",
        "isDisplayed": true
      },
      {
        "title": "Smooth, Splash-Free Flow",
        "description": "Designed for a clean, laminar water flow that minimizes spillage, paired with an efficient drainage system.",
        "isDisplayed": true
      },
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration",
        "isDisplayed": true
      },
      {
        "title": "Versatile Integration",
        "description": "Effortlessly integrates with carbonated beverage dispensers and coffee/tea vending machines, providing a flexible, all-in-one hydration solution.",
        "isDisplayed": false
      },
      {
        "title": "Water Enrichments (Optional)",
        "description": "Mineralization Alkaline",
        "isDisplayed": false
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "GSP FS",
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
          "variant": "GSP FS",
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
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/61c42426-6a67-4edf-2bf9-e45a4b8cad00/public",
    "heroTagline": "Plastic in passe, Landfilling is Zero.\nSustainability is the Future.",
    "heroSubtext": "Sustainability at Core",
    "heroCtaText": "Contact Us",
    "heroCtaLink": "",
    "showcaseCtaText": "Enquire Now",
    "showcaseCtaLink": "",
    "brochurePdf": "file:///C:/Users/WAE/Downloads/Grand%20Slam%20Pro.pdf",
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
    "categoryName": "Drinking Water Station - BLUWAE",
    "heroSubtitle": "",
    "status": "Live",
    "description": "Information regarding WAE series drinking water dispensers and advanced purification modules.",
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/61c42426-6a67-4edf-2bf9-e45a4b8cad00/public",
    "heroTagline": "Plastic is passe, Landfilling is zero.\nSustainability is the future.",
    "heroSubtext": "Sustainability at Core",
    "heroCtaText": "Contact Us",
    "heroCtaLink": "#product-showcase",
    "showcaseCtaText": "Enquire Now",
    "showcaseCtaLink": "",
    "brochurePdf": "",
    "variants": {
      "hot": true,
      "cold": true,
      "ambient": true
    },
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c549c9bc-8af7-41f6-03d5-8c0078e9dd00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ec016b83-3713-4d25-f896-de54df537900/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/64fe0354-6750-4828-ed39-78cca03f1b00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/524b0f84-727b-49c7-356d-e149a005f400/public"
    ],
    "featuresList": [
      {
        "title": "Powerful led uv-c intank sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration",
        "isDisplayed": true
      },
      {
        "title": "Built to last",
        "description": "Crafted with premium Stainless Steel (SS-304) and corrosion-resistant Galvanized\nIron (GI), ensuring durability and safety with food-grade materials.",
        "isDisplayed": true
      },
      {
        "title": "Effortless integration",
        "description": "Seamlessly connects with carbonated beverage dispensers\nand coffee/tea vending machines for a versatile, all-in-one solution.",
        "isDisplayed": false
      },
      {
        "title": "Touch-free convenience",
        "description": "Experience the ease of sensor-based dispensing, delivering clean and safe water without the need for touch.",
        "isDisplayed": false
      },
      {
        "title": "American disabilities act",
        "description": "Designed to comply with ADA accessability guidelines. Ideal for schools & public utilities.",
        "isDisplayed": true
      },
      {
        "title": "Designed for everyone",
        "description": "Thoughtfully engineered to be accessible for seniors, kids, and\nthose with special needs, making hydration easy for all.",
        "isDisplayed": false
      },
      {
        "title": "Water enrichments (optional)",
        "description": "Mineralization Alkaline",
        "isDisplayed": false
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
    "heroSubtitle": "",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/92e20429-ff63-410f-9494-62ebbb2e0b00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c3ed7a14-37db-4d33-e6c7-3d0c61905700/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/eb143bac-b20b-46ce-ff64-3dfd59dde000/public"
    ],
    "featuresList": [
      {
        "title": "Robust & Durable Build",
        "description": "Constructed with premium Stainless Steel (SS-304) and corrosion-resistant GI, ensuring food-grade safety and long-lasting durability.",
        "isDisplayed": true
      },
      {
        "title": "Instant Hydration",
        "description": "Experience pure, safe water — delivered instantly at the push of a button or from a bubbler.",
        "isDisplayed": true
      },
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration",
        "isDisplayed": false
      },
      {
        "title": "Real-Time Monitoring",
        "description": "Stay informed with an intuitive IoT display powered by CIRCLE OF BLUE, showcasing key data and performance metrics in real-time.",
        "isDisplayed": true
      },
      {
        "title": "Effortless Integration",
        "description": "Seamlessly connects with carbonated beverage dispensers and coffee/tea vending machines for a versatile, all-in-one solution.",
        "isDisplayed": false
      },
      {
        "title": "Water Enrichments (Optional)",
        "description": "Mineralization Alkaline",
        "isDisplayed": false
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
    "heroImage": "",
    "heroTagline": "Plastic is passe, Landfilling is zero.\nSustainability is the future.",
    "heroSubtext": "Sustainability at Core",
    "heroCtaText": "Contact Us",
    "heroCtaLink": "",
    "showcaseCtaText": "Enquire Now",
    "showcaseCtaLink": "",
    "brochurePdf": "file:///C:/Users/WAE/Downloads/VENUS.pdf",
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
    "heroSubtitle": "",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/fbf516d7-077e-47f3-6aed-895881ab0c00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/836e8089-a92c-4171-9060-f61c95591700/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2078a46d-8819-4840-a853-96abb0409400/public"
    ],
    "featuresList": [
      {
        "title": "Touch-Free Operation",
        "description": "Enjoy sensor-based, hygienic water dispensing that’s quick, easy, and completely touchless.",
        "isDisplayed": true
      },
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration",
        "isDisplayed": true
      },
      {
        "title": "Clean Flow, Minimal Splash",
        "description": "Engineered for a smooth, laminar flow that minimizes spillage, complemented by an efficient drainage system.",
        "isDisplayed": true
      },
      {
        "title": "Effortless Integration",
        "description": "Easily connects with carbonated beverage dispensers and coffee/tea\nmachines, offering a versatile hydration solution.",
        "isDisplayed": false
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
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/61c42426-6a67-4edf-2bf9-e45a4b8cad00/public",
    "heroTagline": "Plastic is passe, Landfilling is zero.\nSustainability is the future.",
    "heroSubtext": "Sustainability at Core",
    "heroCtaText": "Contact Us",
    "heroCtaLink": "",
    "showcaseCtaText": "Enquire Now",
    "showcaseCtaLink": "",
    "brochurePdf": "file:///C:/Users/WAE/Downloads/ENKI.pdf",
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
    "heroSubtitle": "",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/eb19ce92-40b9-42d4-cb63-f3cc053edc00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/d2c031df-53ff-4428-dcd8-7d42382d4c00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/1c713c0f-30bc-45c8-6435-84cc43d6f000/public"
    ],
    "featuresList": [
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration",
        "isDisplayed": true
      },
      {
        "title": "Built Tough, Made to Last",
        "description": "Crafted from premium Stainless Steel (SS-304) and corrosion -resistant GI, this unit is food-grade approved and built for enduring performance.",
        "isDisplayed": true
      },
      {
        "title": "Touch-Free Dispensing",
        "description": "Enjoy effortless, hygienic water access with sensor-based, touchless technology.",
        "isDisplayed": true
      },
      {
        "title": "No Mess, No Stress",
        "description": "An efficient drip tray with generous capacity catches spills, keeping the space clean and orderly.",
        "isDisplayed": false
      },
      {
        "title": "Effortless Integration",
        "description": "Seamlessly connects with carbonated beverage dispensers and coffee/tea vending machines for a versatile, all-in-one solution.",
        "isDisplayed": false
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "FS VAR 25/50",
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
          "variant": "FS VAR 25/50",
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
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/61c42426-6a67-4edf-2bf9-e45a4b8cad00/public",
    "heroTagline": "Plastic in passe, Landfilling is Zero.\nSustainability is the Future.",
    "heroSubtext": "Sustainability at Core",
    "heroCtaText": "Contact Us",
    "heroCtaLink": "",
    "showcaseCtaText": "Enquire Now",
    "showcaseCtaLink": "",
    "brochurePdf": "file:///C:/Users/WAE/Downloads/VAR.pdf",
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
    "heroSubtitle": "",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/067b3edc-d892-48f5-1e63-5e567c0a6d00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/e29b6648-0a93-46e7-a4a4-499647428100/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/9995e3ec-5a45-429a-1dd4-ce1f6d25e500/public"
    ],
    "featuresList": [
      {
        "title": "Sensor-Based Operation:",
        "description": "Touchless and hygienic dispensing ensures a seamless and safe user experience.",
        "isDisplayed": true
      },
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration",
        "isDisplayed": true
      },
      {
        "title": "Efficient Drainage",
        "description": "Equipped with a generous drip tray to efficiently collect accidental spillage, maintaining cleanliness.",
        "isDisplayed": true
      },
      {
        "title": "Water Enrichments (Optional)",
        "description": "Mineralization Alkaline",
        "isDisplayed": false
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "RO M 25/50",
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
          "variant": "ROM 25/50",
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
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/61c42426-6a67-4edf-2bf9-e45a4b8cad00/public",
    "heroTagline": "Plastic in passe, Landfilling is Zero.\nSustainability is the Future.",
    "heroSubtext": "Sustainability at Core",
    "heroCtaText": "Contact Us",
    "heroCtaLink": "",
    "showcaseCtaText": "Enquire Now",
    "showcaseCtaLink": "",
    "brochurePdf": "file:///C:/Users/WAE/Downloads/ROM.pdf",
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
    "heroSubtitle": "",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/8ea2eecd-b9d8-4a38-399b-12ce2375a200/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/0fc37015-dbe5-4045-c4da-521c32afa500/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/26c9962b-a275-4020-e529-fd045ee6c100/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/d2a8c834-89a8-4c73-69dc-fdd420f94d00/public"
    ],
    "featuresList": [
      {
        "title": "Plumbed-In",
        "description": "Plumbed-in to Purified Water Supply.",
        "isDisplayed": true
      },
      {
        "title": "Built to Last",
        "description": "Premium 100% metal construct with SS-304 stainless steel tank combining sustainability and long term value.\nFull SS 304 version available.",
        "isDisplayed": true
      },
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration",
        "isDisplayed": true
      },
      {
        "title": "Hypergienic Hydration",
        "description": "IR Sensor based touch free dispensing.",
        "isDisplayed": false
      },
      {
        "title": "Green Specs",
        "description": "Certified Green 2 LPM-water flow",
        "isDisplayed": false
      },
      {
        "title": "LED Display (Optional)",
        "description": "Secondary Parameters Consumption analysis Temperature Purification status IOT enabled",
        "isDisplayed": false
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "FS AENON 36, 45,75",
          "hot": "3",
          "cold": "20/40",
          "ambient": "20/30"
        }
      ],
      "waterTemp": {
        "cold": "Cold: 5°C - 20° C (default 8°C)",
        "hot": "Hot: 30°C - 65°C (default 55°C)"
      },
      "greenCertification": "Confirms to green product certification, low discharge faucets : 1.5 LPM",
      "dripTray": "1000ml",
      "refrigerant": "R-134a",
      "dimensions": [
        {
          "variant": "FS AENON 36, 45,75",
          "weight": "100/120",
          "height": "1445/1472",
          "width": "466/535",
          "depth": "580/643"
        }
      ],
      "powerRequirement": "Hertz 50/Volts 230-240",
      "purificationSystem": "CTO I UF | Intank LED UV-C sterilization (Chemical- free and eco-friendly)",
      "pointOfUseSterilization": "Germ Guardian™"
    },
    "status": "Live",
    "description": "",
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/76c51a3d-e466-4a10-0f41-c45ef7537a00/public",
    "heroTagline": "Design for Strength, Purity, Hygiene & Sustainability",
    "heroSubtext": "Sustainable Future Together",
    "heroCtaText": "Contact  Us",
    "heroCtaLink": "#product-showcase",
    "showcaseCtaText": "Enquire Now",
    "showcaseCtaLink": "",
    "brochurePdf": "file:///C:/Users/WAE/Downloads/AENON.pdf",
    "variants": {
      "hot": true,
      "cold": true,
      "ambient": true
    },
    "displayImageIndex": 0
  },
  "alfa-100": {
    "id": "alfa-100",
    "name": "ALFA 100",
    "categoryName": "WATER DISPENSER - TRUBLU Series",
    "heroSubtitle": "",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/800b2aca-19da-4043-42e8-8d5ad223fb00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2bcaa386-2856-46cd-601a-3bf07b932c00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c15db0f5-c9db-4671-b624-63f94e571500/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/91519e41-b732-4eba-ed50-bb8c0205a700/public"
    ],
    "featuresList": [
      {
        "title": "Plumbed-In",
        "description": "Can be directly connected to the input water supply (Purified).\n\nDesigned with bottom-loaded convenience as per the need.",
        "isDisplayed": true
      },
      {
        "title": "Built to Last",
        "description": "Premium 100% metal construct with SS-304 stainless steel tank combining sustainability and long term value.",
        "isDisplayed": true
      },
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration",
        "isDisplayed": true
      },
      {
        "title": "Hypergienic Hydration",
        "description": "IR Sensor based touch free dispensing.",
        "isDisplayed": false
      },
      {
        "title": "Colour (Customizable)",
        "description": "Black, White, Colour of Your Choice",
        "isDisplayed": false
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "ALFA.100",
          "hot": "3",
          "cold": "80",
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
          "variant": "ALFA.100",
          "weight": "110.0",
          "height": "1577",
          "width": "535",
          "depth": "700"
        }
      ],
      "powerRequirement": "220V/50 HZ",
      "purificationSystem": "Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization",
      "pointOfUseSterilization": "Germ Guardian™"
    },
    "status": "Live",
    "description": "",
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/76c51a3d-e466-4a10-0f41-c45ef7537a00/public",
    "heroTagline": "Design for Strength, Purity, Hygiene & Sustainability",
    "heroSubtext": "Sustainable Future Together",
    "heroCtaText": "Contact Us",
    "heroCtaLink": "#product-showcase",
    "showcaseCtaText": "Enquire Now",
    "showcaseCtaLink": "",
    "brochurePdf": "file:///C:/Users/WAE/Downloads/ALFA.pdf",
    "variants": {
      "hot": true,
      "cold": true,
      "ambient": true
    },
    "displayImageIndex": 0
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
        "description": "Compact design fits perfectly on counters and in tight spaces.",
        "isDisplayed": true
      },
      {
        "title": "Top-Load Flexibility",
        "description": "Easily place a jar or bole on top for effortless water collection.",
        "isDisplayed": true
      },
      {
        "title": "Powerful LED  UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration",
        "isDisplayed": true
      },
      {
        "title": "Hypergienic Hydration",
        "description": "IR Sensor based touch free dispensing.",
        "isDisplayed": false
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
  "lagoon": {
    "id": "lagoon",
    "name": "LAGOON",
    "categoryName": "WATER DISPENSER - TRUBLU Series",
    "heroSubtitle": "",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b8150df9-f454-4a9c-b016-16beb5b67400/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/7c8dbe4b-227d-4721-4c75-4bf726a42f00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/36c4943b-b435-4274-1470-a6c2b2521900/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/10cd053e-9886-4481-d631-b1b873810100/public"
    ],
    "featuresList": [
      {
        "title": "Top-Load Ready",
        "description": "Place a jar or bottle on top to easily collect water.",
        "isDisplayed": true
      },
      {
        "title": "SS Storage Tank",
        "description": "High-quality Stainless Steel (SS-304) for corrosion resistance and no bad odors or microbial growth.",
        "isDisplayed": true
      },
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is puried upto 99.99% for sterilized hydration",
        "isDisplayed": true
      },
      {
        "title": "Manual Operation",
        "description": "Manually operated taps for easy and controlled water dispensing",
        "isDisplayed": false
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "FS LAGOON",
          "hot": "1",
          "cold": "5",
          "ambient": "10"
        }
      ],
      "waterTemp": {
        "cold": "Cold: 5°C- 24°C (default Default 8°C)",
        "hot": "Hot: 50°C- 80°C (default Default 55°C)"
      },
      "greenCertification": "Confirms to green product certification, low discharge faucets : 1.5 LPM",
      "dripTray": "750ml",
      "refrigerant": "R-134a",
      "dimensions": [
        {
          "variant": "FS LAGOON",
          "weight": "110",
          "height": "1200",
          "width": "450",
          "depth": "450"
        }
      ],
      "powerRequirement": "Hertz 50/Volts 230-240",
      "purificationSystem": "CTO I UF | Intank LED UV-C sterilization (Chemical- free and eco-friendly)",
      "pointOfUseSterilization": "Germ Guardian™"
    },
    "status": "Live",
    "description": "",
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/76c51a3d-e466-4a10-0f41-c45ef7537a00/public",
    "heroTagline": "Design for Strength, Purity, Hygiene & Sustainability",
    "heroSubtext": "Sustainable Future Together",
    "heroCtaText": "Contact Us",
    "heroCtaLink": "#product-showcase",
    "showcaseCtaText": "Enquire Now",
    "showcaseCtaLink": "",
    "brochurePdf": "file:///C:/Users/WAE/Downloads/Lagoon.pdf",
    "variants": {
      "hot": true,
      "cold": true,
      "ambient": true
    },
    "displayImageIndex": 0
  },
  "yami": {
    "id": "yami",
    "name": "YAMI",
    "categoryName": "Water Dispenser & Cooler-TRUBLU",
    "heroSubtitle": "",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ffc77af9-3916-4e22-5133-db9d53a5dd00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/7c4dec1e-5a23-4fc8-89e6-26f4c4dc9900/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ff2b0042-c346-4d95-60d2-87ed5e093300/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/7d390ac7-be81-492e-d76c-31c6a7800000/public"
    ],
    "featuresList": [
      {
        "title": "Robust & Durable Build",
        "description": "Constructed with premium Stainless Steel (SS-304) and corrosion-resistant GI, ensuring food-grade safety and long-lasting durability.",
        "isDisplayed": true
      },
      {
        "title": "Instant Hydration",
        "description": "Experience pure, safe water — delivered instantly at the push of a button or from a bubbler.",
        "isDisplayed": true
      },
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration",
        "isDisplayed": true
      },
      {
        "title": "Effortless Integration",
        "description": "Seamlessly connects with carbonated beverage dispensers and coffee/tea vending machines for a versatile, all-in-one solution.",
        "isDisplayed": false
      },
      {
        "title": "Water Enrichments (Optional)",
        "description": "Mineralization Alkaline",
        "isDisplayed": false
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "YAMI",
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
          "variant": "YAMI",
          "weight": "110.0",
          "height": "1104",
          "width": "475",
          "depth": "359"
        }
      ],
      "powerRequirement": "Hertz 50/Volts 230-240",
      "purificationSystem": "Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization (Chemical- free and eco-friendly)",
      "pointOfUseSterilization": "Germ Guardian™"
    },
    "status": "Live",
    "description": "",
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/76c51a3d-e466-4a10-0f41-c45ef7537a00/public",
    "heroTagline": "Design for Strength, Purity, Hygiene & Sustainability",
    "heroSubtext": "Sustainable Future Together",
    "heroCtaText": "Contact Us",
    "heroCtaLink": "#product-showcase",
    "showcaseCtaText": "Enquire Now",
    "showcaseCtaLink": "",
    "brochurePdf": "file:///C:/Users/WAE/Downloads/YAMI.pdf",
    "variants": {
      "hot": true,
      "cold": true,
      "ambient": true
    },
    "displayImageIndex": 0
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
        "description": "High-quality SS-304 stainless steel with a vandal-resistant boom plate for superior durability.",
        "isDisplayed": true
      },
      {
        "title": "Optional Purification",
        "description": "Customizable back-end purification available.",
        "isDisplayed": true
      },
      {
        "title": "Efficient Drainage",
        "description": "Designed with a proper drainage system to eliminate standing water.",
        "isDisplayed": true
      },
      {
        "title": "Easy Installation",
        "description": "Quick wall-hanging or wall-mount setup.",
        "isDisplayed": false
      },
      {
        "title": "Bubbler Heads",
        "description": "Polished single or dual bubble heads with a convenient basin.",
        "isDisplayed": false
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
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration",
        "isDisplayed": true
      },
      {
        "title": "Built Tough, Made to Last",
        "description": "Crafted from premium Stainless Steel (SS-304) and corrosion-resistant GI, this unit is food-grade approved and built for enduring performance.",
        "isDisplayed": true
      },
      {
        "title": "Built Tough, Made to Last",
        "description": "Lorem Ipsum dolor",
        "isDisplayed": true
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
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration",
        "isDisplayed": true
      },
      {
        "title": "Built Tough, Made to Last",
        "description": "Crafted from premium Stainless Steel (SS-304) and corrosion-resistant GI, this unit is food-grade approved and built for enduring performance.",
        "isDisplayed": true
      },
      {
        "title": "Built Tough, Made to Last",
        "description": "Lorem Ipsum dolor",
        "isDisplayed": true
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
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration",
        "isDisplayed": true
      },
      {
        "title": "Built Tough, Made to Last",
        "description": "Crafted from premium Stainless Steel (SS-304) and corrosion-resistant GI, this unit is food-grade approved and built for enduring performance.",
        "isDisplayed": true
      },
      {
        "title": "Built Tough, Made to Last",
        "description": "Lorem Ipsum dolor",
        "isDisplayed": true
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
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration",
        "isDisplayed": true
      },
      {
        "title": "Built Tough, Made to Last",
        "description": "Crafted from premium Stainless Steel (SS-304) and corrosion-resistant GI, this unit is food-grade approved and built for enduring performance.",
        "isDisplayed": true
      },
      {
        "title": "Built Tough, Made to Last",
        "description": "Lorem Ipsum dolor",
        "isDisplayed": true
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
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration",
        "isDisplayed": true
      },
      {
        "title": "Built Tough, Made to Last",
        "description": "Crafted from premium Stainless Steel (SS-304) and corrosion-resistant GI, this unit is food-grade approved and built for enduring performance.",
        "isDisplayed": true
      },
      {
        "title": "Built Tough, Made to Last",
        "description": "Lorem Ipsum dolor",
        "isDisplayed": true
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
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration",
        "isDisplayed": true
      },
      {
        "title": "Built Tough, Made to Last",
        "description": "Crafted from premium Stainless Steel (SS-304) and corrosion-resistant GI, this unit is food-grade approved and built for enduring performance.",
        "isDisplayed": true
      },
      {
        "title": "Built Tough, Made to Last",
        "description": "Lorem Ipsum dolor",
        "isDisplayed": true
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
        "description": "Triple-coated galvanized iron with a protective powder finish.",
        "isDisplayed": true
      },
      {
        "title": "Pure & Safe Storage",
        "description": "Stainless steel tank guarantees 99.99% pure, contaminant-free water.",
        "isDisplayed": true
      },
      {
        "title": "Extended Durability",
        "description": "Optional anti-rust treatment and stainless steel 304 overhead protection.",
        "isDisplayed": true
      },
      {
        "title": "Longer Lifespan",
        "description": "Customizable design, easy maintenance, and energy-efficient operation.",
        "isDisplayed": false
      },
      {
        "title": "High Capacity",
        "description": "Designed to handle heavy water demand in busy environments.",
        "isDisplayed": false
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
        "description": "Wall-mounted drinking water dispenser and fountain.",
        "isDisplayed": true
      },
      {
        "title": "Optional Upgrades",
        "description": "Swap the washer and dustbin for a built-in RO unit, ensuring purified water on demand",
        "isDisplayed": true
      },
      {
        "title": "Material & Construction",
        "description": "Durable stainless steel 304 with galvanized iron for long-lasting performance.",
        "isDisplayed": true
      },
      {
        "title": "Customization",
        "description": "The backend unit is fully customizable to any space or design requirements.",
        "isDisplayed": false
      },
      {
        "title": "Operation",
        "description": "Convenient push-tap system for direct drinking (optional swan-neck taps available).",
        "isDisplayed": false
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
        "description": "Heavy duty RO system designed for industrial applications",
        "isDisplayed": true
      },
      {
        "title": "Anti-bacterial",
        "description": "Provides protection against bacteria, mould & fungi",
        "isDisplayed": true
      },
      {
        "title": "Pre-engineered & Pre-assembled",
        "description": "A pre-assembled factory tested units to reduce installation & set up time",
        "isDisplayed": true
      },
      {
        "title": "Application",
        "description": "Commercial kitchens, pantries, washing units & hospitality sector",
        "isDisplayed": false
      },
      {
        "title": "5 - stage purification",
        "description": "Ensures pure water from any raw water source",
        "isDisplayed": false
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
  },
  "aurela": {
    "id": "aurela",
    "name": "Aurella",
    "categoryName": "Water Dispenser & Cooler-TRUBLU",
    "heroSubtitle": "",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/7c50c87e-618b-413b-06b5-afc197db2d00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/d6b83a2f-b8ac-42eb-50a1-31c0e95dba00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/8d6b35d7-cbaa-4a79-461a-3c29cbeded00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/af42a92a-f07f-4fdb-6c46-0e3c6d690d00/public"
    ],
    "featuresList": [
      {
        "title": "Real-Time Monitoring",
        "description": "Stay informed with an intuitive IoT display powered by CIRCLE OF BLUE, showcasing key data and performance metrics in real-time.",
        "isDisplayed": true
      },
      {
        "title": "Robust & Durable Build",
        "description": "Constructed with premium Stainless Steel (SS-304) and corrosion-resistant GI, ensuring food-grade safety and long-lasting durability.",
        "isDisplayed": true
      },
      {
        "title": "LED UV-C",
        "description": "In tank LED UV-C 24X7 sterilized water",
        "isDisplayed": true
      },
      {
        "title": "Splash-Free Experience",
        "description": "Engineered for a clean, controlled flow that minimizes spillage and water waste.",
        "isDisplayed": false
      },
      {
        "title": "Smart Drainage System",
        "description": "Efficient drainage eliminates standing water, keeping the area clean and dry",
        "isDisplayed": false
      },
      {
        "title": "Compliance",
        "description": "Designed to comply with ADA accessability guidelines. Ideal for schools & public utilities.",
        "isDisplayed": false
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "Aurella",
          "hot": "4",
          "cold": "3",
          "ambient": "3.5"
        }
      ],
      "waterTemp": {
        "cold": "Cold: 5°C - 24° C (default 8°C)",
        "hot": "Hot: 50°C - 80°C (default 55°C)"
      },
      "greenCertification": "nfirms to green product certification, low discharge faucets : 1.5 LPM",
      "dripTray": "1000ml",
      "refrigerant": "RZ 134a1/8 HP",
      "dimensions": [
        {
          "variant": "Aurella",
          "weight": "-",
          "height": "1477",
          "width": "516",
          "depth": "392"
        }
      ],
      "powerRequirement": "220 V/50 Hz",
      "purificationSystem": "CTO",
      "pointOfUseSterilization": "Germ Guardian™"
    },
    "status": "Live",
    "description": "",
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/76c51a3d-e466-4a10-0f41-c45ef7537a00/public",
    "heroTagline": "Design for Strength, Purity, Hygiene & Sustainability",
    "heroSubtext": "Sustainable Future Together",
    "heroCtaText": "Contact Us",
    "heroCtaLink": "#product-showcase",
    "showcaseCtaText": "Enquire Now",
    "showcaseCtaLink": "",
    "brochurePdf": "file:///C:/Users/WAE/Downloads/Aurella.pdf",
    "variants": {
      "hot": true,
      "cold": true,
      "ambient": true
    },
    "displayImageIndex": 0
  },
  "epsilon": {
    "id": "epsilon",
    "name": "Epsilon",
    "categoryName": "Water Dispenser & Cooler-TRUBLU",
    "heroSubtitle": "",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/0a374fc3-9953-42c2-6b8a-07dfc01f3400/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/1343b415-b7e2-4283-c443-119fc00c2800/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/fd4e696a-1e6d-4402-dfa4-ec9bc37a4f00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/dc8e8bce-6a27-4a52-5070-d18c54deb800/public"
    ],
    "featuresList": [
      {
        "title": "Plumbed-In",
        "description": "Plumbed-in to Purified Water Supply. RO purification available on demand",
        "isDisplayed": true
      },
      {
        "title": "Built to Last",
        "description": "Premium 100% metal construct with SS-304 stainless steel tank combining sustainability and long term value.\nFull SS 304 version available./ SS316 Contect Parts",
        "isDisplayed": true
      },
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration",
        "isDisplayed": true
      },
      {
        "title": "Hypergienic Hydration",
        "description": "IR Sensor based touch free dispensing.\nManual operation (optional)",
        "isDisplayed": false
      },
      {
        "title": "Green Specs",
        "description": "Certified Green 2 LPM-water flow",
        "isDisplayed": false
      },
      {
        "title": "LED Display (Optional)",
        "description": "Secondary Parameters Consumption analysis Temperature Purification status IOT enabled",
        "isDisplayed": false
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "EPSILON 80",
          "hot": "03",
          "cold": "62",
          "ambient": "15"
        },
        {
          "variant": "EPSILON 120",
          "hot": "-",
          "cold": "80",
          "ambient": "40"
        }
      ],
      "waterTemp": {
        "cold": "Cold: 5°C - 24° C (default 8°C)",
        "hot": "Hot: 50°C - 80°C (default 55°C)"
      },
      "greenCertification": "Confirms to green product certification, low discharge faucets : 1.5 - 2 LPM",
      "dripTray": "1000ml",
      "refrigerant": "R-134a",
      "dimensions": [
        {
          "variant": "EPSILON 80",
          "weight": "85",
          "height": "1700",
          "width": "650",
          "depth": "700"
        }
      ],
      "powerRequirement": "Hertz 50/Volts 230-240 1270W, 100W",
      "purificationSystem": "RO I UV | Intank LED UV-C sterilization (Chemical- free and eco-friendly)",
      "pointOfUseSterilization": "Germ GuardianTM"
    },
    "status": "Live",
    "description": "",
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/76c51a3d-e466-4a10-0f41-c45ef7537a00/public",
    "heroTagline": "Design for Strength, Purity, Hygiene & Sustainability",
    "heroSubtext": "Sustainable Future Together",
    "heroCtaText": "Contact Us",
    "heroCtaLink": "#product-showcase",
    "showcaseCtaText": "Enquire Now",
    "showcaseCtaLink": "",
    "brochurePdf": "file:///C:/Users/WAE/Downloads/Epsilon.pd",
    "variants": {
      "hot": true,
      "cold": true,
      "ambient": true
    },
    "displayImageIndex": 0
  },
  "yami-duo": {
    "id": "yami-duo",
    "name": "YAMI DUO",
    "categoryName": "Water Dispenser & Cooler-TRUBLU",
    "heroSubtitle": "",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/0650b8d5-1bb3-4ac5-eece-e9245a242200/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ddead506-10e5-438b-86d3-1df1a9556300/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c06be19c-515d-4870-4c1b-9383ab696d00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/f6d4be70-85d5-43be-6298-1c59a8299a00/public"
    ],
    "featuresList": [
      {
        "title": "Robust & Durable Build",
        "description": "Constructed with premium Stainless Steel (SS-304) and corrosion-resistant GI, ensuring food-grade safety and long-lasting durability.",
        "isDisplayed": true
      },
      {
        "title": "Instant Hydration",
        "description": "Experience pure, safe water — delivered instantly at the push of a button or from a bubbler.",
        "isDisplayed": true
      },
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration",
        "isDisplayed": true
      },
      {
        "title": "Effortless Integration",
        "description": "Seamlessly connects with carbonated beverage dispensers and coffee/tea vending machines for a versatile, all-in-one solution.",
        "isDisplayed": false
      },
      {
        "title": "Water Enrichments (Optional)",
        "description": "Mineralization Alkaline",
        "isDisplayed": false
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "YAMI DUO",
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
          "variant": "YAMI DUO",
          "weight": "130.0",
          "height": "1536",
          "width": "475",
          "depth": "452"
        }
      ],
      "powerRequirement": "Hertz 50/Volts 230-240",
      "purificationSystem": "Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization (Chemical- free and eco-friendly)",
      "pointOfUseSterilization": "Germ GuardianTM"
    },
    "status": "Live",
    "description": "",
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/76c51a3d-e466-4a10-0f41-c45ef7537a00/public",
    "heroTagline": "Design for Strength, Purity, Hygiene & Sustainability",
    "heroSubtext": "Sustainable Future Together",
    "heroCtaText": "Contact Us",
    "heroCtaLink": "#product-showcase",
    "showcaseCtaText": "Enquire Now",
    "showcaseCtaLink": "",
    "brochurePdf": "file:///C:/Users/WAE/Downloads/YAMI.pdf",
    "variants": {
      "hot": true,
      "cold": true,
      "ambient": true
    },
    "displayImageIndex": 0
  },
  "alfa-65": {
    "id": "alfa-65",
    "name": "ALFA 65",
    "categoryName": "Water Dispenser & Cooler-TRUBLU",
    "heroSubtitle": "",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/88dff65b-42f2-4ce4-a37e-8586a6120700/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2b8ac90d-9c4a-453d-4079-4af0392d8200/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/8cf33dc4-bde9-4904-a53b-e64455ee4a00/public"
    ],
    "featuresList": [
      {
        "title": "Plumbed-In",
        "description": "Can be directly connected to the input water supply (Purified).\nDesigned with bottom-loaded convenience as per the need.",
        "isDisplayed": true
      },
      {
        "title": "Built to Last",
        "description": "Premium 100% metal construct with SS-304 stainless steel tank combining sustainability and long term value.",
        "isDisplayed": true
      },
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration",
        "isDisplayed": true
      },
      {
        "title": "Hypergienic Hydration",
        "description": "IR Sensor based touch free dispensing.",
        "isDisplayed": false
      },
      {
        "title": "Colour (Customizable)",
        "description": "Black, White, Colour of Your Choice",
        "isDisplayed": false
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "ALFA 65",
          "hot": "03",
          "cold": "45",
          "ambient": "15"
        }
      ],
      "waterTemp": {
        "cold": "Cold: 5°C - 24° C (default 8°C)",
        "hot": "Hot: 50°C - 80°C (default 55°C)"
      },
      "greenCertification": "Confirms to green product certification, low discharge faucets : 1.5 LPM",
      "dripTray": "1000ml",
      "refrigerant": "R-134a",
      "dimensions": [
        {
          "variant": "ALFA 65",
          "weight": "70.0",
          "height": "1508",
          "width": "465",
          "depth": "630"
        }
      ],
      "powerRequirement": "Hertz 50/Volts 230-240",
      "purificationSystem": "CTO I UF | Intank LED UV-C sterilization (Chemical- free and eco-friendly)",
      "pointOfUseSterilization": "Germ GuardianTM"
    },
    "status": "Live",
    "description": "",
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/76c51a3d-e466-4a10-0f41-c45ef7537a00/public",
    "heroTagline": "Design for Strength, Purity, Hygiene & Sustainability",
    "heroSubtext": "Sustainable Future Together",
    "heroCtaText": "Contact Us",
    "heroCtaLink": "#product-showcase",
    "showcaseCtaText": "Enquire Now",
    "showcaseCtaLink": "",
    "brochurePdf": "file:///C:/Users/WAE/Downloads/ALFA.pdf",
    "variants": {
      "hot": true,
      "cold": true,
      "ambient": true
    },
    "displayImageIndex": 0
  }
};
