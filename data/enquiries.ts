export interface Enquiry {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  pageLink: string;
  createdAt: string;
}

export const ENQUIRIES: Record<string, Enquiry> = {};
