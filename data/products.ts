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
}

export const CATEGORIES: Record<string, CategoryData> = {
  "bluwae": {
    "id": "bluwae",
    "title": "Drinking water station - BLUWAE",
    "description": "Point-of-Use drinking water stations with in-built 5-stage RO purification, LED UVC protection, and optional Germ Guardian™ hygiene technology.",
    "paragraphs": [
      "BLUWAE™ Series is a next-generation Drinking Water Station designed to deliver safe, accessible, and sustainable hydration across workplaces and public environments. Combining advanced Reverse Osmosis (RO) purification with intelligent dispensing technology, it provides Purified Drinking Water directly at the point of consumption, reducing dependence on packaged bottled water.",
      "Ideal for offices, educational institutions, healthcare facilities, manufacturing units, and public spaces, BLUWAE™ functions as a reliable Commercial Hydration Solution. Available as a standalone unit or as part of Centralized Water Infrastructure, it supports ambient, chilled, and hot water dispensing, touch-free operation, and Bottle-Filling Capabilities.",
      "Designed to improve Workplace Hydration, reduce plastic waste, and lower operational costs, BLUWAE™ combines Advanced Filtration, Smart Dispensing, and premium design. More than a water access point, it is a future-ready Hydration System supporting responsible consumption and long-term sustainability goals."
    ],
    "products": [
      {
        "id": "var-series",
        "name": "BLUWAE VAR Series",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2906d7ca-fcf2-48a0-99d8-7f584fce1600/public",
        "category": "free-standing"
      },
      {
        "id": "enki",
        "name": "BLUWAE ENKI Series",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/793725fe-6912-4073-982d-dcb813491f00/public",
        "category": "free-standing"
      },
      {
        "id": "pos",
        "name": "BLUWAE POS",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c274a381-1fe3-48ce-37e1-296ff4719900/public",
        "category": "counter-top"
      },
      {
        "id": "rom-grande",
        "name": "BLUWAE ROM Grande",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2b501f50-e174-490b-1ea4-526449d56800/public",
        "category": "free-standing"
      },
      {
        "id": "reva",
        "name": "BLUWAE REVA",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ba89e9ca-9003-4c4b-2775-d4a5a11e9600/public",
        "category": "free-standing"
      },
      {
        "id": "gsp",
        "name": "BLUWAE GSP",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/42d01f61-a806-4ec1-9fe4-98b693036f00/public",
        "category": "free-standing"
      },
      {
        "id": "assistflow",
        "name": "BLUWAE ASSISTFLOW",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/1c23ff37-2f1a-4f67-4933-708d60af2000/public",
        "category": "free-standing"
      },
      {
        "id": "venus",
        "name": "BLUWAE VENUS",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/793725fe-6912-4073-982d-dcb813491f00/public",
        "category": "counter-top"
      },
      {
        "id": "eno-ct",
        "name": "BLUWAE ENO.CT",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c274a381-1fe3-48ce-37e1-296ff4719900/public",
        "category": "counter-top"
      },
      {
        "id": "var-ct",
        "name": "BLUWAE VAR.CT",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2b501f50-e174-490b-1ea4-526449d56800/public",
        "category": "counter-top"
      },
      {
        "id": "rom-ct",
        "name": "BLUWAE ROM.CT",
        "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ba89e9ca-9003-4c4b-2775-d4a5a11e9600/public",
        "category": "counter-top"
      }
    ]
  },
  "trublu": {
    "id": "trublu",
    "title": "Water dispenser & cooler - TRUBLU",
    "description": "Plumbed-in water dispensers with in-tank LED-UVC protection, optional bottom-loading configuration, and advanced Germ Guardian™ hygiene technology.",
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
    ]
  }
};

export const PRODUCTS: Record<string, ProductDetails> = {
  "var-series": {
    "id": "var-series",
    "name": "VAR Series",
    "categoryName": "DRINKING WATER STATION - BLUWAE Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/66bec5ad-27db-4683-5feb-30cebbf47f00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/0b375ab3-4888-4377-a0e9-e16c5eb27d00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b359fae2-8c4b-475f-f63e-c60c1fee7e00/public"
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
    }
  },
  "enki": {
    "id": "enki",
    "name": "ENKI",
    "categoryName": "DRINKING WATER STATION - BLUWAE Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/a86f6929-a0fb-44d1-f78f-b4d0a7049600/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/1f9571c7-362c-4490-95d3-f9072bbe5500/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/db728b19-a0dd-45a4-812b-e7594a1b6900/public"
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
    }
  },
  "pos": {
    "id": "pos",
    "name": "POS",
    "categoryName": "DRINKING WATER STATION - BLUWAE Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2e1a6e7f-0b55-4344-4ff9-8dba915a3300/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6b2da797-9d52-40d1-3323-c86ddd384c00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/8fab5f68-c2e5-4ec8-f700-cfcea83f7600/public"
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
    }
  },
  "rom-grande": {
    "id": "rom-grande",
    "name": "ROM Grande",
    "categoryName": "DRINKING WATER STATION - BLUWAE Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/bdfd78c7-de80-4e95-20be-ffea6b5c5c00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/833cb87f-1ba5-45f8-6f61-fa5cf48a7200/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/79ef281c-75c0-416b-1928-023fa3f58300/public"
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
    }
  },
  "reva": {
    "id": "reva",
    "name": "REVA",
    "categoryName": "DRINKING WATER STATION - BLUWAE Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/afee7058-847e-4a58-55d9-ede5da5c6800/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/a8f5a00e-0285-460b-f009-fa5a3a4d8c00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/07be5d57-d7fd-444f-52f5-6062969b5200/public"
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
    }
  },
  "gsp": {
    "id": "gsp",
    "name": "GSP",
    "categoryName": "DRINKING WATER STATION - BLUWAE Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/79ce8da9-daaa-4bad-c80a-5a5f47af3c00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4eb27063-2310-4888-4f1c-9f4b02493d00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c96d8adb-e99f-4181-f45f-1bbd40918c00/public"
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
    }
  },
  "assistflow": {
    "id": "assistflow",
    "name": "ASSISTFLOW",
    "categoryName": "DRINKING WATER STATION - BLUWAE Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/61bed0a3-d40d-46ec-2edd-a3fb53abe400/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6cbe11d1-d684-43fd-b674-e948d745eb00/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/875719ac-2f9e-456b-662f-d437c10dca00/public"
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
    }
  },
  "venus": {
    "id": "venus",
    "name": "VENUS",
    "categoryName": "DRINKING WATER STATION - BLUWAE Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6f18f17d-9a94-494d-c816-0832fd9d2000/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6f18f17d-9a94-494d-c816-0832fd9d2000/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6f18f17d-9a94-494d-c816-0832fd9d2000/public"
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
    }
  },
  "eno-ct": {
    "id": "eno-ct",
    "name": "ENO.CT",
    "categoryName": "DRINKING WATER STATION - BLUWAE Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6f18f17d-9a94-494d-c816-0832fd9d2000/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6f18f17d-9a94-494d-c816-0832fd9d2000/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6f18f17d-9a94-494d-c816-0832fd9d2000/public"
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
    }
  },
  "var-ct": {
    "id": "var-ct",
    "name": "VAR.CT",
    "categoryName": "DRINKING WATER STATION - BLUWAE Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6f18f17d-9a94-494d-c816-0832fd9d2000/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6f18f17d-9a94-494d-c816-0832fd9d2000/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6f18f17d-9a94-494d-c816-0832fd9d2000/public"
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
    }
  },
  "rom-ct": {
    "id": "rom-ct",
    "name": "ROM.CT",
    "categoryName": "DRINKING WATER STATION - BLUWAE Series",
    "heroSubtitle": "Powerful LED sterilization",
    "images": [
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6f18f17d-9a94-494d-c816-0832fd9d2000/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6f18f17d-9a94-494d-c816-0832fd9d2000/public",
      "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6f18f17d-9a94-494d-c816-0832fd9d2000/public"
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
    }
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
  }
};
