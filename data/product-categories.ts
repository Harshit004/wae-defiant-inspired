export interface ProductCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string[];
  features: {
    headline: string;
    subtext: string;
  }[];
  mountingTypes: {
    id: string;
    name: string;
    image: string;
  }[];
  // Added hero and overlay image properties
  heroImage?: string; // Made optional with '?' in case some categories don't have them
  overlayImage?: string; // Made optional
}

export const productCategories: Record<string, ProductCategory> = {
  "drinking-water-stations": {
    id: "drinking-water-stations",
    title: "DRINKING WATER STATIONS",
    subtitle: "DRINKING WATER STATIONS - BLUWAE Series",
    description: [
      "Our Drinking Water Stations aren't just another water dispenser—they're a smarter way to hydrate. Powered by advanced RO technology, they deliver 99.99% pure, great-tasting water while cutting down on single-use plastics. Designed with sustainability at the core, these stations are energy-efficient, reliable, and built to minimize your environmental footprint. It's hydration, but better for the planet.",
      "Innovation drives everything we do. Our stations don't just quench your thirst—they align with your values. By choosing our RO-powered dispensers, you're making a conscious choice for a greener future. It's more than just water; it's a commitment to sustainability that doesn't compromise on convenience or quality."
    ],
    features: [
      {
        headline: "Touch-Free Dispensing",
        subtext: "Enjoy effortless, hygienic water access with sensor-based, touchless technology."
      },
      {
        headline: "Effortless Integration",
        subtext: "Seamlessly connects with carbonated beverage dispensers and coffee/tea vending machines for a versatile, all-in-one solution."
      },
      {
        headline: "Built Tough, Made to Last",
        subtext: "Crafted from premium Stainless Steel (SS-304) and corrosion-resistant GI, this unit is food-grade approved and built for enduring performance."
      },
      {
        headline: "No Mess, No Stress",
        subtext: "An efficient drip tray with generous capacity catches spills, keeping the space clean and orderly."
      }
    ],
    mountingTypes: [
      {
        id: "free-standing",
        name: "Free Standing",
        image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/708253cf-b3b1-4b4c-e9ed-73f9c05aa400/public"
      },
      {
        id: "counter-top",
        name: "Counter Top",
        image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/989b9ed7-8668-4a62-7bf6-f32a540d2f00/public"
      }
    ],
    // Added image URLs for this category
    heroImage: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/cad8ebce-9713-4fa1-bf99-25684ba4cb00/public",
    overlayImage: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c238dd1f-ef2b-4894-740e-0214c726b400/public"
  },
  "water-dispenser": {
    id: "water-dispenser",
    title: "WATER DISPENSER",
    subtitle: "WATER DISPENSER (W/O RO) - TRUBLU Series",
    description: [
      "Our TRUBLU Series Water Dispensers offer a perfect blend of functionality and style. Designed for spaces where RO purification isn't required, these dispensers provide instant access to refreshing water while maintaining a sleek, modern aesthetic.",
      "With energy-efficient operation and durable construction, the TRUBLU Series is built to last. Whether in offices, schools, or public spaces, these dispensers deliver reliable performance with minimal environmental impact."
    ],
    features: [
      {
        headline: "Instant Refreshment",
        subtext: "Quick and easy access to chilled and hot water with intuitive controls."
      },
      {
        headline: "Energy Efficient",
        subtext: "Advanced insulation and smart power management reduce energy consumption."
      },
      {
        headline: "Durable Design",
        subtext: "Built with high-quality materials to withstand daily use in high-traffic areas."
      },
      {
        headline: "Easy Maintenance",
        subtext: "Simple cleaning and maintenance procedures ensure long-lasting performance."
      }
    ],
    mountingTypes: [
      {
        id: "free-standing",
        name: "Free Standing",
        image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/708253cf-b3b1-4b4c-e9ed-73f9c05aa400/public"
      },
      {
        id: "counter-top",
        name: "Counter Top",
        image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/989b9ed7-8668-4a62-7bf6-f32a540d2f00/public"
      }
    ],
    // Added image URLs for this category (using placeholders)
    heroImage: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/cad8ebce-9713-4fa1-bf99-25684ba4cb00/public",
    overlayImage: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c238dd1f-ef2b-4894-740e-0214c726b400/public"
  },
  "drinking-water-faucets": {
    id: "drinking-water-faucets",
    title: "DRINKING WATER FAUCETS",
    subtitle: "DRINKING WATER FAUCETS - WATERMATIC Series",
    description: [
      "The WATERMATIC Series brings innovation to your tap. These advanced drinking water faucets combine cutting-edge technology with elegant design, delivering purified water directly from your sink.",
      "Perfect for modern kitchens and commercial spaces, our faucets provide a seamless integration of style and functionality, ensuring clean water is always within reach."
    ],
    features: [
      {
        headline: "Direct Purification",
        subtext: "Built-in filtration system delivers clean, great-tasting water on demand."
      },
      {
        headline: "Sleek Design",
        subtext: "Modern aesthetics complement any kitchen or commercial space."
      },
      {
        headline: "Easy Installation",
        subtext: "Simple setup process with standard plumbing connections."
      },
      {
        headline: "Dual Functionality",
        subtext: "Switch between filtered and regular water with a simple lever."
      }
    ],
    mountingTypes: [
      {
        id: "counter-top",
        name: "Counter Top",
        image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/989b9ed7-8668-4a62-7bf6-f32a540d2f00/public"
      }
    ],
     // Added image URLs for this category (using placeholders)
    heroImage: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/cad8ebce-9713-4fa1-bf99-25684ba4cb00/public",
    overlayImage: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c238dd1f-ef2b-4894-740e-0214c726b400/public"
  },
  "water-cooler": {
    id: "water-cooler",
    title: "WATER COOLER & FOUNTAINS",
    subtitle: "WATER COOLER & FOUNTAINS - ZVR Series",
    description: [
      "The ZVR Series redefines water coolers and fountains with its innovative design and superior performance. These units combine the functionality of a water cooler with the elegance of a fountain, creating a centerpiece for any space.",
      "With advanced cooling technology and energy-efficient operation, the ZVR Series provides refreshing water while maintaining a minimal environmental footprint."
    ],
    features: [
      {
        headline: "Advanced Cooling",
        subtext: "Rapid cooling technology ensures water is always refreshingly cold."
      },
      {
        headline: "Elegant Design",
        subtext: "Modern aesthetics with customizable finishes to match any decor."
      },
      {
        headline: "Energy Smart",
        subtext: "Intelligent power management reduces energy consumption."
      },
      {
        headline: "Easy Maintenance",
        subtext: "Simple cleaning procedures and accessible components."
      }
    ],
    mountingTypes: [
      {
        id: "fountains",
        name: "Fountains",
        image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/708253cf-b3b1-4b4c-e9ed-73f9c05aa400/public"
      },
      {
        id: "indoors",
        name: "Indoors",
        image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/989b9ed7-8668-4a62-7bf6-f32a540d2f00/public"
      }
    ],
     // Added image URLs for this category (using placeholders)
    heroImage: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/cad8ebce-9713-4fa1-bf99-25684ba4cb00/public",
    overlayImage: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c238dd1f-ef2b-4894-740e-0214c726b400/public"
  },
  "public-utility-systems": {
    id: "public-utility-systems",
    title: "PUBLIC UTILITY SYSTEMS",
    subtitle: "PUBLIC UTILITY SYSTEMS - PUS Series",
    description: [
      "Our PUS Series is designed for large public spaces, providing clean, accessible water with a focus on durability and eco-friendliness. These systems are built to handle high-volume usage while maintaining consistent water quality.",
      "Perfect for public areas, transportation hubs, and large institutions, our public utility systems ensure reliable water access for everyone."
    ],
    features: [
      {
        headline: "High Capacity",
        subtext: "Designed for high-volume usage in public spaces."
      },
      {
        headline: "Durable Construction",
        subtext: "Built to withstand heavy use and harsh conditions."
      },
      {
        headline: "Eco-Friendly",
        subtext: "Minimizes environmental impact while maximizing efficiency."
      },
      {
        headline: "Easy Maintenance",
        subtext: "Simple cleaning and maintenance procedures for public spaces."
      }
    ],
    mountingTypes: [
      {
        id: "free-standing",
        name: "Free Standing",
        image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/708253cf-b3b1-4b4c-e9ed-73f9c05aa400/public"
      }
    ],
     // Added image URLs for this category (using placeholders)
    heroImage: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/cad8ebce-9713-4fa1-bf99-25684ba4cb00/public",
    overlayImage: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c238dd1f-ef2b-4894-740e-0214c726b400/public"
  },
  "commercial-industrial-plants": {
    id: "commercial-industrial-plants",
    title: "COMMERCIAL/INDUSTRIAL PLANTS",
    subtitle: "COMMERCIAL/INDUSTRIAL PLANTS",
    description: [
      "Our Commercial/Industrial Plants provide large-scale hydration solutions for facilities. These systems are designed to handle high-volume water needs while maintaining efficiency and reliability.",
      "Perfect for industrial facilities, large commercial spaces, and institutions, our plants deliver consistent water quality at scale."
    ],
    features: [
      {
        headline: "High Volume",
        subtext: "Designed for large-scale water production and distribution."
      },
      {
        headline: "Industrial Grade",
        subtext: "Built to meet the demands of commercial and industrial use."
      },
      {
        headline: "Efficient Operation",
        subtext: "Optimized for maximum output with minimal resource use."
      },
      {
        headline: "Scalable Solutions",
        subtext: "Can be customized to meet specific facility requirements."
      }
    ],
    mountingTypes: [
      {
        id: "free-standing",
        name: "Free Standing",
        image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/708253cf-b3b1-4b4c-e9ed-73f9c05aa400/public"
      }
    ],
     // Added image URLs for this category (using placeholders)
    heroImage: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/cad8ebce-9713-4fa1-bf99-25684ba4cb00/public",
    overlayImage: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c238dd1f-ef2b-4894-740e-0214c726b400/public"
  }
};
