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
    "title": "Product Designer",
    "category": "DESIGN",
    "type": "On-site",
    "time": "Full time",
    "shortDescription": "We're looking for mid-level product designer to join our team.",
    "status": "Live",
    "createdAt": "2024-01-01T00:00:00Z",
    "summaryParagraphs": [
      "We're on the lookout for a Product Designer who can own complex design projects end-to-end, from research & strategy to final delivery, for some of the most ambitious brands across the globe.",
      "In this role, you'll bridge business goals & user needs, lead a team of designers, & deliver experiences that are as thoughtful as they are impactful. If you're ready to lead with craft & strategy, apply now."
    ],
    "whatYouWillDo": [
      "Own & deliver complex UX projects for clients across industries, ensuring high-quality outcomes at every stage",
      "Lead the end-to-end design process across research, ideation, wireframing, prototyping & testing",
      "Drive UX strategy & translate business goals into intuitive, user-centered digital experiences",
      "Bring a sharp aesthetic eye to every project, ensuring design craft & visual quality are never compromised",
      "Collaborate with cross-functional teams, including product managers, developers & stakeholders",
      "Lead & manage a team of designers, distributing work effectively & maintaining delivery standards",
      "Mentor junior designers & contribute to a high-performance design culture"
    ],
    "whatYouWillOwn": [
      "End-to-end delivery of complex design projects for clients, delivered on time & at the highest quality bar",
      "User research initiatives that produce data-driven UX solutions enhancing satisfaction & engagement",
      "High-fidelity wireframes, prototypes & robust design systems that scale across products, platforms & client engagements",
      "User personas, journey maps & information architecture for structured, intuitive experiences",
      "UX documentation standards ensuring clarity & consistency across all projects",
      "Project timelines & deliverables, keeping execution sharp across multiple engagements"
    ],
    "whoWeAreLookingFor": [
      "5+ years of UX design experience, with at least 1 year leading projects or a team",
      "Proven ability to deliver complex design projects independently, ideally in a design agency or UX studio setup",
      "Strong expertise in UX research, wireframing, prototyping & interaction design for web & mobile",
      "Hands-on experience building & maintaining scalable design systems that ensure consistency across products & platforms",
      "A strong aesthetic sensibility with an eye for craft, someone who sweats the details & raises the visual bar on every project",
      "Deep understanding of information architecture, accessibility & usability practices",
      "Proficiency in Figma & other design & prototyping tools",
      "Excellent storytelling & presentation skills to articulate design decisions to clients & stakeholders",
      "Experience managing & mentoring designers in a collaborative studio environment"
    ]
  }
};
