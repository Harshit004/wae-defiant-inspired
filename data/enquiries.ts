export interface Enquiry {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  pageLink: string;
  createdAt: string;
  message?: string;
  type?: 'product' | 'general';
}

export const ENQUIRIES: Record<string, Enquiry> = {
  "3c25a3fd-d4ad-4192-ae72-670f548d050a": {
    "id": "3c25a3fd-d4ad-4192-ae72-670f548d050a",
    "fullName": "hi",
    "companyName": "Test company",
    "email": "test@mail.com",
    "phone": "12345 67890",
    "pageLink": "https://wae-ltd.vercel.app/product-description-page?product=venus",
    "createdAt": "2026-06-28T14:35:20.948Z"
  }
};
