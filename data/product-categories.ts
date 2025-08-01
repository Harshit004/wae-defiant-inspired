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
  heroVideo?: string;
}

export const productCategories: Record<string, ProductCategory> = {
  "drinking-water-stations": {
    id: "drinking-water-stations",
    title: "BLUWAE",
    subtitle: "BLUWAE",
    description: [
      "WAE's drinking water stations are not just dispensers—they are purpose-built hydration systems engineered for **performance**, **sustainability**, and **operational efficiency**. With built-in 5-stage purification and sterilization(UV,UF) options, these stations deliver **99.99% pure and safe water**—on demand and at scale.",
      "Designed to meet the rigorous needs of **corporate campuses**, **manufacturing units**, **institutions**, and **public spaces**, our stations help organizations **reduce their dependency on bottled water**, aligning seamlessly with sustainability mandates and ESG goals. By eliminating single-use plastics and minimizing water wastage, they significantly lower your **carbon and water footprint**."
    ],
    features: [
      {
        headline: "Crafted from premium SS 304 stainless steel",
        subtext: "the entire structure is all-metal—ensuring maximum durability, hygiene, and long-term performance in demanding environments."
      },
      {
        headline: "Modular and ergonomic design",
        subtext: "supports touchless operation and easy integration into existing infrastructure."
      },
      {
        headline: "Energy-efficient and low-maintenance",
        subtext: "designed for seamless integration with coffee, tea, and beverage vending machines—ensuring long-term cost efficiency."
      },
      {
        headline: "Compatible with smart metering and IoT integration",
        subtext: "for real-time monitoring and usage analytics."
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
    heroVideo: "BLUWAE_EXP.mp4",
  },
  "water-dispenser": {
    id: "water-dispenser",
    title: "TRUBLU",
    subtitle: "TRUBLU",
    description: [
      "This premium freestanding range of water dispensers is engineered from **100% recyclable, non-plastic materials**, offering a zero-waste hydration solution for commercial and institutional environments. Designed for organizations prioritizing **sustainability and ESG compliance**, it eliminates single-use plastics while maintaining long-term durability and operational efficiency.",
      "With a **robust metal (SS 304) build**, energy-efficient functionality, and seamless integration into modern interiors, the unit delivers reliable performance with minimal environmental impact—making it an ideal choice for forward-looking, sustainability-driven infrastructure."
    ],
    features: [
      {
        headline: "India's first dispenser engineered for complete sustainability",
        subtext: "aligned with the Zero Waste to Landfill (ZWTL) philosophy—crafted entirely from recyclable materials with zero plastic waste."
      },
      {
        headline: "Features in-tank LED UVC sterilization",
        subtext: "ensuring 99.99% purified water for safe and reliable hydration."
      },
      {
        headline: "Integrated infrared sensor technology",
        subtext: "enables fully touchless operation, promoting hygiene and user convenience."
      },
      {
        headline: "Designed to support ESG objectives",
        subtext: "the dispenser contributes to long-term environmental impact reduction and sustainable infrastructure goals."
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
    heroVideo: "Water dispenser & cooler_EXP.mp4",
  },
  "drinking-water-faucets": {
    id: "drinking-water-faucets",
    title: "WATERMATIC",
    subtitle: "WATERMATIC",
    description: [
      "The Watermatic Drinking Water Faucet is a next-gen hydration solution designed for modern workspaces, hotels, and high-end dining spaces. It offers **hot, cold, ambient, and sparkling water** from a single unit—delivering convenience with a sleek, sustainable design crafted from **100% recyclable, plastic-free materials**. The faucet comes paired with an **under-the-counter storage unit – HYDROPAC**, ensuring compact and efficient utility.",
      "Equipped with **in-tank LED UVC** for **99.99% microbial protection** and **infrared sensor technology** for touchless operation, it ensures safe, hygienic dispensing. Its **modular system**, proudly designed and manufactured in India, allows for seamless integration and scalability across diverse environments."
    ],
    features: [
      {
        headline: "Delivers hot, cold, ambient, and sparkling water",
        subtext: "ideal for modern workspaces, hotels, and restaurants."
      },
      {
        headline: "In-tank LED UVC ensures 99.99% microbial protection",
        subtext: "while infrared sensor technology enables a fully touchless, hygienic experience."
      },
      {
        headline: "Certified green product made from 100% recyclable materials",
        subtext: "completely free from plastic, supporting zero-waste operations."
      },
      {
        headline: "Built on a versatile modular system",
        subtext: "designed and manufactured in India for seamless integration and scalable deployment."
      }
    ],
    mountingTypes: [
      {
        id: "counter-top",
        name: "Counter Top",
        image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/989b9ed7-8668-4a62-7bf6-f32a540d2f00/public"
      }
    ],
    heroVideo: "Faucet_EXP.mp4",
  },
  "water-cooler": {
    id: "water-cooler",
    title: "ZVR",
    subtitle: "ZVR",
    description: [
      "Surface-mounted drinking water fountains with integrated bottle filling stations offer a sustainable and hygienic solution for modern hydration needs. Designed for high-traffic environments like offices, schools, and public facilities, these units encourage **refill culture** by supporting reusable bottles, helping reduce plastic waste and supporting **Zero Waste to Landfill (ZWTL)** initiatives.",
      "Equipped with **touchless sensor technology** and **ADA-compliant accessibility**, they ensure safe, inclusive, and user-friendly operation. Constructed from **recyclable, non-plastic materials**, these systems align with **ESG goals** and green building standards—making them a smart investment in sustainable facility infrastructure."
    ],
    features: [
      {
        headline: "Water dispenser made from 100% recyclable materials",
        subtext: "with no plastic components, supporting sustainable and circular usage models."
      },
      {
        headline: "Integrated in-tank LED UVC technology",
        subtext: "ensures 99.99% pure water, eliminating microbial contaminants at the source."
      },
      {
        headline: "Equipped with sensor-based dispensing",
        subtext: "for a seamless and hygienic user experience in shared environments."
      },
      {
        headline: "Thoughtfully engineered to align with ESG objectives",
        subtext: "contributing to a greener and more responsible future."
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
    heroVideo: "ZVR_EXP.mp4",
  },
  "public-utility-systems": {
    id: "public-utility-systems",
    title: "PUS",
    subtitle: "PUS",
    description: [
      "Public utility water dispensing systems are specially designed for **high-footfall public spaces** such as railway stations, bus terminals, parks, educational institutions, and urban transit hubs. Engineered for **durability, hygiene, and accessibility**, these systems offer **on-demand safe drinking water** to the public while minimizing environmental impact.",
      "Built with **robust materials, touchless operation, and integrated purification (optional) technologies**, they support **sustainable hydration at scale**. Their design encourages the use of refillable containers, helping reduce plastic waste and aligning with **government mandates and ESG goals**. These systems play a vital role in expanding access to clean drinking water in both urban and rural settings."
    ],
    features: [
      {
        headline: "Integrated bank of water outlets",
        subtext: "combining bottle refill points and drinking fountains to efficiently serve high-footfall environments such as transit hubs, campuses, and public institutions."
      },
      {
        headline: "Designed for hygienic dispensing",
        subtext: "featuring low-positioned front buttons and refill nozzles to reduce contact and enhance user safety."
      },
      {
        headline: "Fountains and bottle-filling stations",
        subtext: "are placed at ergonomically optimized heights, ensuring universal accessibility and compliance with inclusive design standards."
      },
      {
        headline: "Represents a new paradigm in public hydration",
        subtext: "infrastructure, promoting sustainable, user-centric, and high-throughput water access in shared spaces."
      }
    ],
    mountingTypes: [
      {
        id: "free-standing",
        name: "Free Standing",
        image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/708253cf-b3b1-4b4c-e9ed-73f9c05aa400/public"
      }
    ],
    heroVideo: "PUS_EXP.mp4",
  },
  "blubox": {
    id: "blubox",
    title: "BLUBOX",
    subtitle: "BLUBOX",
    description: [
      "Our Commercial/Industrial Plants provide large-scale hydration solutions for facilities. These systems are designed to handle high-volume water needs while maintaining efficiency and reliability.",
      "Perfect for industrial facilities, large commercial spaces, and institutions, our plants deliver consistent water quality at scale."
    ],
    features: [
      {
        headline: "Crafted from premium SS 304 stainless steel",
        subtext: "the entire structure is all-metal—ensuring maximum durability, hygiene, and long-term performance in demanding environments."
      },
      {
        headline: "Modular and ergonomic design",
        subtext: "supports touchless operation and easy integration into existing infrastructure."
      },
      {
        headline: "Energy-efficient and low-maintenance",
        subtext: "designed for seamless integration with coffee, tea, and beverage vending machines—ensuring long-term cost efficiency."
      },
      {
        headline: "Compatible with smart metering and IoT integration",
        subtext: "for real-time monitoring and usage analytics."
      }
    ],
    mountingTypes: [
      {
        id: "free-standing",
        name: "Free Standing",
        image: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/708253cf-b3b1-4b4c-e9ed-73f9c05aa400/public"
      }
    ],
    heroVideo: "Bluebox_EXP.mp4",
  }
};