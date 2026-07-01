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
    "shortDescription": "We're looking for a strategic procurement professional to drive sourcing, vendor partnerships, and cost optimization across manufacturing and project operations. This role requires strong commercial acumen, ownership, and the ability to build an efficient, resilient, and future-ready supply chain.",
    "status": "Live",
    "createdAt": "2026-07-01T05:53:44.692Z",
    "summaryParagraphs": [
      "We are committed to delivering cutting-edge solutions in water purification and\nsustainable technologies. We’re looking for a Purchase Manager who can drive our procurement function with agility, smart negotiation, and a sharp eye for quality and cost optimization. If you have  a passion for sourcing the best materials, building strong supplier relationships, and ensuring smooth manufacturing operations, this could be the perfect opportunity for you."
    ],
    "whatYouWillDo": [
      "Lead strategic sourcing and procurement for manufacturing, projects, and engineering operations.",
      "Identify, evaluate, negotiate, and onboard reliable domestic and international suppliers.",
      "Manage end-to-end procurement, including purchase orders, vendor coordination, and import purchases.",
      "Collaborate with Production, PPC, Projects, Quality, Stores, Design, and Finance to ensure timely material availability.",
      "Drive cost optimization through strategic sourcing, alternate vendor development, and value engineering.",
      "Monitor supplier performance, delivery schedules, quality, and commercial commitments.",
      "Coordinate import logistics, customs documentation, freight forwarders, and regulatory compliance.",
      "Ensure procurement activities comply with company policies, statutory regulations, and documentation standards.",
      "Prepare procurement MIS, vendor performance reports, cost analyses, and leadership dashboards."
    ],
    "whatYouWillOwn": [
      "Procurement planning and sourcing across multiple product categories.",
      "Vendor development, commercial negotiations, and supplier relationships.",
      "Material availability aligned with production and project schedules.",
      "End-to-end domestic and international procurement operations.",
      "Cost-saving initiatives and procurement process improvements.",
      "Procurement documentation, ERP transactions, and statutory compliance.",
      "Inventory planning support in collaboration with Stores and PPC.",
      "Building a reliable, efficient, and scalable procurement ecosystem."
    ],
    "whoWeAreLookingFor": [
      "Bachelor's degree in Engineering, Supply Chain, Operations, or a related field.",
      "MBA/PGDM in Supply Chain, Operations, or Materials Management preferred.",
      "5–8 years of experience in procurement within manufacturing, engineering, industrial equipment, or water treatment industries.",
      "Strong understanding of sourcing mechanical, electrical, fabrication, filtration, and industrial components.",
      "Hands-on experience with ERP systems such as SAP or equivalent.",
      "Knowledge of import procurement, customs processes, DGFT, GST, and commercial documentation.",
      "Excellent negotiation, analytical, communication, and stakeholder management skills.",
      "A proactive, detail-oriented professional who takes ownership and thrives in a fast-paced manufacturing environment."
    ]
  }
};
