export interface JobPost {
  id: string;
  title: string;
  category: string;
  type: string;
  time: string;
  shortDescription: string;
  status: 'Live' | 'Draft';
  createdAt: string;
  summaryParagraphs: string[];
  whatYouWillDo: string[];
  whatYouWillOwn: string[];
  whoWeAreLookingFor: string[];
}

export const JOB_CATEGORIES = [
  "VIEW ALL",
  "DEVELOPMENT",
  "DESIGN",
  "MARKETING",
  "CUSTOMER SERVICE",
  "OPERATION",
  "FINANCE",
  "MANAGEMENT"
] as const;

export const JOBS: Record<string, JobPost> = {
  "product-designer": {
    "id": "product-designer",
    "title": "Sr. UI/UX Designer",
    "category": "MARKETING",
    "type": "On-site",
    "time": "Full time",
    "shortDescription": "This role is best suited for someone who enjoys solving problems, pays attention to detail, and takes pride in creating intuitive and meaningful user experiences.\n",
    "status": "Live",
    "createdAt": "2024-01-01T00:00:00Z",
    "summaryParagraphs": [
      "At WAE, we are building products and digital platforms that are transforming the way organizations manage drinking water, sustainability, manufacturing, and service operations. From IoT-enabled systems and customer portals to ERP platforms and websites, design plays a critical role in everything we create.\n",
      "We are looking for a UI/UX Designer who can take complete ownership of projects and contribute beyond just visual design. The ideal candidate should be comfortable understanding business requirements, mapping user journeys, creating wireframes and prototypes, and working closely with developers to ensure seamless execution."
    ],
    "whatYouWillDo": [
      "Take complete ownership of UI/UX projects from requirement gathering to final deployment.",
      "Understand user needs, business goals, and operational workflows to create effective design solutions.",
      "Design websites, web applications, ERP platforms, customer portals, dashboards, and mobile-responsive interfaces.",
      "Create user flows, wireframes, mockups, and high-fidelity prototypes.",
      "Develop interactive prototypes to validate ideas and user journeys before development.",
      "Build and maintain design systems, component libraries, and UI guidelines.\n",
      "Conduct research, competitor benchmarking, and usability analysis to improve product experiences.",
      "Work closely with developers to ensure designs are implemented accurately.\n",
      "Participate in product discussions and contribute ideas that improve functionality and usability.\n",
      "Continuously improve existing products based on user feedback and business requirements"
    ],
    "whatYouWillOwn": [
      "The complete brand domain and related subdomains"
    ],
    "whoWeAreLookingFor": [
      "4–8 years of experience in UI/UX Design.\n",
      "Strong proficiency in Figma and modern design tools.\n",
      "Excellent wireframing, prototyping, and interaction design skills.\n",
      "Strong understanding of information architecture and user-centered design principles.\n",
      "Experience creating responsive designs for desktop, tablet, and mobile platforms.\n",
      "Ability to create clean, intuitive, and scalable design systems.\n",
      "Understanding of front-end development concepts, including HTML, CSS, and responsive frameworks.\n",
      "Strong communication and presentation skills.\n",
      "Ability to manage multiple projects and timelines simultaneously.\n"
    ]
  },
  "purchase-manager": {
    "id": "purchase-manager",
    "title": "Manager - Purchase",
    "category": "OPERATION",
    "type": "On-site",
    "time": "Full time",
    "shortDescription": "We are committed to delivering cutting-edge solutions in water purification and\nsustainable technologies. We’re looking for a Purchase Manager who can drive our procurement\nfunction with agility, smart negotiation, and a sharp eye for quality and cost optimization. If you have  a passion for sourcing the best materials, building strong supplier relationships, and ensuring smooth manufacturing operations, this could be the perfect opportunity for you.\n",
    "status": "Live",
    "createdAt": "2026-07-01T05:53:44.692Z",
    "summaryParagraphs": [
      "We are committed to delivering cutting-edge solutions in water purification and\nsustainable technologies. We’re looking for a Purchase Manager who can drive our procurement\nfunction with agility, smart negotiation, and a sharp eye for quality and cost optimization. If you have  a passion for sourcing the best materials, building strong supplier relationships, and ensuring smooth manufacturing operations, this could be the perfect opportunity for you."
    ],
    "whatYouWillDo": [
      "Lead strategic sourcing and procurement for manufacturing, projects, and engineering operations.\nIdentify, evaluate, negotiate, and onboard reliable domestic and international suppliers.\nManage end-to-end procurement, including purchase orders, vendor coordination, and import purchases.\nCollaborate with Production, PPC, Projects, Quality, Stores, Design, and Finance to ensure timely material availability.\nDrive cost optimization through strategic sourcing, alternate vendor development, and value engineering.\nMonitor supplier performance, delivery schedules, quality, and commercial commitments.\nCoordinate import logistics, customs documentation, freight forwarders, and regulatory compliance.\nEnsure procurement activities comply with company policies, statutory regulations, and documentation standards.\nPrepare procurement MIS, vendor performance reports, cost analyses, and leadership dashboards."
    ],
    "whatYouWillOwn": [
      "Procurement planning and sourcing across multiple product categories.\nVendor development, commercial negotiations, and supplier relationships.\nMaterial availability aligned with production and project schedules.\nEnd-to-end domestic and international procurement operations.\nCost-saving initiatives and procurement process improvements.\nProcurement documentation, ERP transactions, and statutory compliance.\nInventory planning support in collaboration with Stores and PPC.\nBuilding a reliable, efficient, and scalable procurement ecosystem."
    ],
    "whoWeAreLookingFor": []
  }
};
