export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  hoverImage?: string | null;
  displayOrder?: number;
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
  hoverImageIndex?: number | null;
  displayOrder?: number;
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
        "id": "aurela",
        "name": "AURELLA",
        "category": "free-standing",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/7c50c87e-618b-413b-06b5-afc197db2d00/public"
      },
      {
        "id": "aenon",
        "name": "AENON",
        "category": "free-standing",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/8ea2eecd-b9d8-4a38-399b-12ce2375a200/public"
      },
      {
        "id": "epsilon",
        "name": "EPSILON",
        "category": "free-standing",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/0a374fc3-9953-42c2-6b8a-07dfc01f3400/public"
      },
      {
        "id": "lagoon",
        "name": "LAGOON",
        "category": "free-standing",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b8150df9-f454-4a9c-b016-16beb5b67400/public"
      },
      {
        "id": "yami",
        "name": "YAMI",
        "category": "free-standing",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ffc77af9-3916-4e22-5133-db9d53a5dd00/public"
      },
      {
        "id": "alfa-ct",
        "name": "ALFA CT",
        "category": "counter-top",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/47099ceb-1f3f-403e-cd1c-34beef9f6f00/public"
      },
      {
        "id": "alfa-100",
        "name": "ALFA",
        "category": "free-standing",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/800b2aca-19da-4043-42e8-8d5ad223fb00/public"
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
    "products": []
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
        "id": "hkn",
        "name": "HKN",
        "category": "counter-top",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/e5bc0586-0b79-4993-379a-53eb5a494700/public"
      },
      {
        "id": "indus",
        "name": "INDUS",
        "category": "free-standing",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/a435208b-076d-4a5d-6c93-9c3286214800/public"
      },
      {
        "id": "piper",
        "name": "PIPER",
        "category": "counter-top",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/e9e29753-4917-4d6c-17ce-21f1ae145500/public"
      },
      {
        "id": "touch",
        "name": "TOUCH",
        "category": "counter-top",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/cb10bd85-a816-46df-920e-1def61c6d200/public"
      },
      {
        "id": "led-uv-c",
        "name": "LED UV-C",
        "category": "counter-top",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/80109262-4e0f-4ce4-6295-5c53a9eeff00/public"
      },
      {
        "id": "moses",
        "name": "MOSES",
        "category": "counter-top",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/386b4db5-361c-473a-78b8-51358994ad00/public",
        "hoverImage": null,
        "displayOrder": 6
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
    "heroCtaLink": "",
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
    "name": "ALFA",
    "categoryName": "WATER DISPENSER - TRUBLU Series",
    "heroSubtitle": "",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/800b2aca-19da-4043-42e8-8d5ad223fb00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2bcaa386-2856-46cd-601a-3bf07b932c00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/692cc4f3-a161-48dc-f60d-9131dd90e900/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/fc90dc26-886c-406f-14d6-24462a974500/public"
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
          "hot": "03",
          "cold": "80",
          "ambient": "15"
        },
        {
          "variant": "ALFA 65",
          "hot": "03",
          "cold": "45",
          "ambient": "25"
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
        },
        {
          "variant": "ALFA 65",
          "weight": "70",
          "height": "1508",
          "width": "465",
          "depth": "630"
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
    "heroCtaLink": "",
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
    "heroSubtitle": "",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/47099ceb-1f3f-403e-cd1c-34beef9f6f00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/0e418651-1b75-4ac3-29d5-c043868f3e00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/d4a98c52-a8b9-47db-5fe2-a13c907ba600/public"
    ],
    "featuresList": [
      {
        "title": "Plumbed-In",
        "description": "Can be directly connected to the input water supply\n(Purified).",
        "isDisplayed": true
      },
      {
        "title": "Counter-Top Friendly",
        "description": "Compact design fits perfectly on counters and in tight spaces.",
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
          "variant": "CT ALFA",
          "hot": "1",
          "cold": "6",
          "ambient": "-"
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
          "weight": "31.0",
          "height": "577",
          "width": "370",
          "depth": "440"
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
    "heroCtaLink": "#product-showcas",
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
          "variant": "LAGOON",
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
          "variant": "LAGOON",
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
    "heroCtaLink": "",
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
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2a2e08c9-55ae-4107-6730-4d0a14fe2600/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/53a3fb29-bba0-448d-5040-589291be3000/public"
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
          "variant": "YAMI/YAMI DUO",
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
        },
        {
          "variant": "YAM IDUO",
          "weight": "130.0",
          "height": "1536",
          "width": "475",
          "depth": "452"
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
  "piper": {
    "id": "piper",
    "name": "PIPER",
    "categoryName": "DRINKING WATER FAUCETS - WATERMATIC Series",
    "heroSubtitle": "",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/e9e29753-4917-4d6c-17ce-21f1ae145500/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/468bfac5-bcc4-4510-8520-a512a5348500/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/339bfbc9-12b2-439f-4946-6b3415666500/public"
    ],
    "featuresList": [
      {
        "title": "Push-Button Operation",
        "description": "Enjoy 24*7 pure water with just a button, providing an exceptional hydration experience.",
        "isDisplayed": true
      },
      {
        "title": "American Disabilities Act",
        "description": "Designed to comply with ADA accessability guidelines. Ideal for schools & public utilities.",
        "isDisplayed": true
      },
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration",
        "isDisplayed": true
      },
      {
        "title": "Braille & Color Blind Friendly",
        "description": "Features Braille and high-\ncontrast colors for easy, inclusive use.",
        "isDisplayed": false
      },
      {
        "title": "Built to Last",
        "description": "Premium 100% metal construct with SS-304 stainless steel tank combining sustainability, long term value and zero to landfill.",
        "isDisplayed": false
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "PIPER",
          "hot": "7",
          "cold": "7",
          "ambient": "7"
        }
      ],
      "waterTemp": {
        "cold": "Cold: 5°C - 20° C (default 8°C)",
        "hot": "Hot: 30°C - 65°C (default 55°C)"
      },
      "greenCertification": "Conrms to green product certication, low discharge faucets : 1.5 LPM",
      "dripTray": "1000ml",
      "refrigerant": "R-134a",
      "dimensions": [
        {
          "variant": "PIPER",
          "weight": "-",
          "height": "300mm",
          "width": "-",
          "depth": "-"
        }
      ],
      "powerRequirement": "Hertz 50/Volts 230-240",
      "purificationSystem": "Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization",
      "pointOfUseSterilization": "-"
    },
    "status": "Live",
    "description": "",
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/d79071da-5dea-4d76-dd36-4d27a0e51e00/public",
    "heroTagline": "Amalgamation of Hydration & Sustainability",
    "heroSubtext": "The Next Generation of Hydration Systems",
    "heroCtaText": "Contact Us",
    "heroCtaLink": "#product-showcase",
    "showcaseCtaText": "Enquire Now",
    "showcaseCtaLink": "",
    "brochurePdf": "file:///C:/Users/WAE/Downloads/PIPER.pdf",
    "variants": {
      "hot": true,
      "cold": true,
      "ambient": true
    },
    "displayImageIndex": 0
  },
  "moses": {
    "id": "moses",
    "name": "MOSES",
    "categoryName": "DRINKING WATER FAUCETS - WATERMATIC Series",
    "heroSubtitle": "",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/386b4db5-361c-473a-78b8-51358994ad00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/17d98d5a-8865-49ad-ef19-b98391dd0d00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4e8c2102-be97-48af-0e9a-e6910fe03e00/public"
    ],
    "featuresList": [
      {
        "title": "Push-Button Operation",
        "description": "Enjoy 24*7 pure water with just a button, providing an exceptional hydration experience.",
        "isDisplayed": true
      },
      {
        "title": "American Disabilities Act",
        "description": "Designed to comply with ADA accessability guidelines. Ideal for schools & public utilities.",
        "isDisplayed": true
      },
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration",
        "isDisplayed": true
      },
      {
        "title": "Braille & Color Blind Friendly",
        "description": "Features Braille and high- contrast colors for easy, inclusive use.",
        "isDisplayed": false
      },
      {
        "title": "Built to Last",
        "description": "Premium 100% metal construct with SS-304 stainless steel tank combining sustainability, long term value and zero to landfill.",
        "isDisplayed": false
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "MOSES",
          "hot": "7",
          "cold": "7",
          "ambient": "7"
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
          "variant": "MOSES",
          "weight": "-",
          "height": "300mm",
          "width": "-",
          "depth": "-"
        }
      ],
      "powerRequirement": "Hertz 50/Volts 230-240",
      "purificationSystem": "Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization",
      "pointOfUseSterilization": "-"
    },
    "status": "Live",
    "description": "",
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/d79071da-5dea-4d76-dd36-4d27a0e51e00/public",
    "heroTagline": "Amalgamation of Hydration & Sustainability",
    "heroSubtext": "The Next Generation of Hydration Systems",
    "heroCtaText": "Contact Us",
    "heroCtaLink": "",
    "showcaseCtaText": "Enquire Now",
    "showcaseCtaLink": "",
    "brochurePdf": "file:///C:/Users/WAE/Downloads/MOSES.pdf",
    "variants": {
      "hot": true,
      "cold": true,
      "ambient": true
    },
    "displayImageIndex": 0,
    "hoverImageIndex": null,
    "displayOrder": 6
  },
  "hkn": {
    "id": "hkn",
    "name": "HKN",
    "categoryName": "DRINKING WATER FAUCETS - WATERMATIC Series",
    "heroSubtitle": "",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/e5bc0586-0b79-4993-379a-53eb5a494700/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b6beb7f1-39a8-4e89-c744-55972f9f1900/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/507bd5b2-141e-4c7d-0825-7819dd2aa500/public"
    ],
    "featuresList": [
      {
        "title": "Push/Lever Button Activated",
        "description": "With a simple lever push, water flows — clean, effortless, and precise.",
        "isDisplayed": true
      },
      {
        "title": "American Disabilities Act",
        "description": "Designed to comply with ADA accessability guidelines. Ideal for schools & public utilities.",
        "isDisplayed": true
      },
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration",
        "isDisplayed": true
      },
      {
        "title": "Built to Last",
        "description": "Premium 100% metal construct with SS-304 stainless steel tank combining sustainability, long term value and zero to landfill.",
        "isDisplayed": false
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "HKN",
          "hot": "7",
          "cold": "7",
          "ambient": "7"
        }
      ],
      "waterTemp": {
        "cold": "Cold: 5°C - 20° C (default 8°C)",
        "hot": "Hot: 30°C - 65°C (default 55°C)"
      },
      "greenCertification": "Conrms to green product certication, low discharge faucets : 1.5 LPM",
      "dripTray": "1000ml",
      "refrigerant": "R-134a",
      "dimensions": [
        {
          "variant": "HKN",
          "weight": "-",
          "height": "302mm",
          "width": "-",
          "depth": "-"
        }
      ],
      "powerRequirement": "Hertz 50/Volts 230-240",
      "purificationSystem": "Multigrade filter | CTO | RO | Post carbon filter | Intank LED UV-C sterilization",
      "pointOfUseSterilization": "Germ Guardian™"
    },
    "status": "Live",
    "description": "",
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/d79071da-5dea-4d76-dd36-4d27a0e51e00/public",
    "heroTagline": "Amalgamation of Hydration & Sustainability",
    "heroSubtext": "The Next Generation of Hydration Systems",
    "heroCtaText": "Contact Us",
    "heroCtaLink": "#product-showcase",
    "showcaseCtaText": "Enquire Now",
    "showcaseCtaLink": "",
    "brochurePdf": "file:///C:/Users/WAE/Downloads/HKN.pdf",
    "variants": {
      "hot": true,
      "cold": true,
      "ambient": true
    },
    "displayImageIndex": 0
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
    "name": "AURELLA",
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
    "heroCtaLink": "",
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
    "name": "EPSILON",
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
    "heroCtaLink": "",
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
  "indus": {
    "id": "indus",
    "name": "INDUS",
    "categoryName": "Drinking Water Faucets-WATERMATIC",
    "heroSubtitle": "",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/a435208b-076d-4a5d-6c93-9c3286214800/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/7516291c-c413-4b60-c985-61475fcc2c00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/1a555b1a-09b3-4045-cd43-9d2922a0cc00/public"
    ],
    "featuresList": [
      {
        "title": "Touchless & Touch-Based Operation",
        "description": "Advance IR sensors and touch panels for a superior and flexible hydration experience.",
        "isDisplayed": true
      },
      {
        "title": "Real-Time OLED Display",
        "description": "Sharp display for precise option selection and temperature view.",
        "isDisplayed": true
      },
      {
        "title": "American Disabilities Act",
        "description": "Designed to comply with ADA accessability guidelines. Ideal for schools & public utilities.",
        "isDisplayed": true
      },
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration",
        "isDisplayed": false
      },
      {
        "title": "Braille & Color Blind Friendly",
        "description": "Features Braille and high- contrast colors for easy, inclusive use.",
        "isDisplayed": false
      },
      {
        "title": "Built to Last",
        "description": "Premium 100% metal construct with SS-304 stainless steel tank combining sustainability, long term value and zero to landfill.",
        "isDisplayed": false
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "INDUS",
          "hot": "10",
          "cold": "10",
          "ambient": "10"
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
          "variant": "INDUS",
          "weight": "-",
          "height": "300mm",
          "width": "-",
          "depth": "-"
        }
      ],
      "powerRequirement": "Hertz 50/Volts 230-240",
      "purificationSystem": "-",
      "pointOfUseSterilization": "-"
    },
    "status": "Live",
    "description": "",
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/d79071da-5dea-4d76-dd36-4d27a0e51e00/public",
    "heroTagline": "Amalgamation of Hydration & Sustainability",
    "heroSubtext": "The Next Generation of Hydration Systems",
    "heroCtaText": "Contact Us",
    "heroCtaLink": "#product-showcase",
    "showcaseCtaText": "Enquire Now",
    "showcaseCtaLink": "",
    "brochurePdf": "file:///C:/Users/WAE/Downloads/INDUS.pdf",
    "variants": {
      "hot": true,
      "cold": true,
      "ambient": true
    },
    "displayImageIndex": 0
  },
  "touch": {
    "id": "touch",
    "name": "TOUCH",
    "categoryName": "Drinking Water Faucets-WATERMATIC",
    "heroSubtitle": "",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/cb10bd85-a816-46df-920e-1def61c6d200/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/34e1d987-c265-445d-cfc9-c9cfd2bb4300/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/e5e18de7-1b07-47e2-86e3-1491a51a2b00/public"
    ],
    "featuresList": [
      {
        "title": "Touch-Based Operation",
        "description": "Enjoy 24*7 pure water with just a touch, providing an exceptional hydration experience.",
        "isDisplayed": true
      },
      {
        "title": "American Disabilities Act",
        "description": "Designed to comply with ADA accessability guidelines. Ideal for schools & public utilities.",
        "isDisplayed": true
      },
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Eliminates bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration",
        "isDisplayed": true
      },
      {
        "title": "Braille & Color Blind Friendly",
        "description": "Features Braille and high- contrast colors for easy,\n inclusive use.",
        "isDisplayed": false
      },
      {
        "title": "Built to Last",
        "description": "Premium 100% metal construct with SS-304 stainless steel tank combining sustainability, long term value and zero to landfill.",
        "isDisplayed": false
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "TOUCH",
          "hot": "7",
          "cold": "7",
          "ambient": "7"
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
          "variant": "TOUCH",
          "weight": "-",
          "height": "310/213",
          "width": "-",
          "depth": "-"
        }
      ],
      "powerRequirement": "Hertz 50/Volts 230-240",
      "purificationSystem": "-",
      "pointOfUseSterilization": "-"
    },
    "status": "Live",
    "description": "",
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/d79071da-5dea-4d76-dd36-4d27a0e51e00/public",
    "heroTagline": "Amalgamation of Hydration & Sustainability",
    "heroSubtext": "The Next Generation of Hydration Systems",
    "heroCtaText": "Contact Us",
    "heroCtaLink": "#product-showcase",
    "showcaseCtaText": "Enquire Now",
    "showcaseCtaLink": "",
    "brochurePdf": "file:///C:/Users/WAE/Downloads/TOUCH.pdf",
    "variants": {
      "hot": true,
      "cold": true,
      "ambient": true
    },
    "displayImageIndex": 0
  },
  "led-uv-c": {
    "id": "led-uv-c",
    "name": "LED UV-C",
    "categoryName": "Drinking Water Faucets-WATERMATIC",
    "heroSubtitle": "",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/80109262-4e0f-4ce4-6295-5c53a9eeff00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/77f76b7e-5c0b-4d34-2961-ee630bfe1500/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6cae9f53-9ad9-429b-2fd3-4e8a3ab72200/public"
    ],
    "featuresList": [
      {
        "title": "Lever-Based Dispensing",
        "description": "Dispense pure drinking water effortlessly with a smooth and reliable lever operation.",
        "isDisplayed": true
      },
      {
        "title": "American Disabilities Act",
        "description": "Designed to comply with ADA accessability guidelines. Ideal for schools & public utilities.",
        "isDisplayed": true
      },
      {
        "title": "Powerful LED UV-C Intank Sterilization",
        "description": "Bacteria, viruses and pathogens, ensuring water is purified upto 99.99% for sterilized hydration",
        "isDisplayed": true
      },
      {
        "title": "Built to Last",
        "description": "Premium 100% metal SS 304 construct with long term value and zero to landfill.",
        "isDisplayed": false
      }
    ],
    "specifications": {
      "storageCapacity": [
        {
          "variant": "LED UV-C",
          "hot": "-",
          "cold": "-",
          "ambient": "-"
        }
      ],
      "waterTemp": {
        "cold": "-",
        "hot": "-"
      },
      "greenCertification": "-",
      "dripTray": "-",
      "refrigerant": "-",
      "dimensions": [
        {
          "variant": "LED UV-C",
          "weight": "-",
          "height": "339",
          "width": "210",
          "depth": "320"
        }
      ],
      "powerRequirement": "-",
      "purificationSystem": "-",
      "pointOfUseSterilization": "-"
    },
    "status": "Live",
    "description": "",
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/d79071da-5dea-4d76-dd36-4d27a0e51e00/public",
    "heroTagline": "Amalgamation of Hydration & Sustainability",
    "heroSubtext": "The Next Generation of Hydration Systems",
    "heroCtaText": "Contact Us",
    "heroCtaLink": "#product-showcase",
    "showcaseCtaText": "Enquire Now",
    "showcaseCtaLink": "",
    "brochurePdf": "file:///C:/Users/WAE/Downloads/LED_UVC%20(2).pdf",
    "variants": {
      "hot": false,
      "cold": false,
      "ambient": true
    },
    "displayImageIndex": 0
  }
};
