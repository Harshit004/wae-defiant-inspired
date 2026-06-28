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
  },
  "cb6ddd1e-2c6c-49e9-b454-0c88f0fe3848": {
    "id": "cb6ddd1e-2c6c-49e9-b454-0c88f0fe3848",
    "fullName": "TESTER",
    "companyName": "Test company",
    "email": "tester@testing.com",
    "phone": "1234567890",
    "pageLink": "https://wae-ltd.vercel.app/",
    "message": "hi",
    "type": "general",
    "createdAt": "2026-06-28T19:33:30.146Z"
  }
};
