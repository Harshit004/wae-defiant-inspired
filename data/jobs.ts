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
  "purchase-manager": {
    "id": "purchase-manager",
    "title": "Manager - Purchase",
    "category": "OPERATION",
    "type": "On-site",
    "time": "Full time",
    "shortDescription": "We're looking for a strategic procurement professional to drive sourcing,... ",
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
