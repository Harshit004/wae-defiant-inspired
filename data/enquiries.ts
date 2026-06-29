export interface Enquiry {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  city?: string;
  pageLink: string;
  createdAt: string;
  message?: string;
  type?: 'product' | 'general' | 'contact-us';
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
  },
  "0c598ddb-f637-45c9-a7cb-aa519313f3d8": {
    "id": "0c598ddb-f637-45c9-a7cb-aa519313f3d8",
    "fullName": "John",
    "companyName": "ABC Company",
    "email": "abc@xyz.com",
    "phone": "9999999990",
    "pageLink": "https://wae-ltd.vercel.app/",
    "message": "Hi, i want to write up a bigger chunk of text and test out how the data is being stored in the CMS. It is an attempt to test its visual entry",
    "type": "general",
    "createdAt": "2026-06-28T19:37:51.592Z"
  },
  "82db0382-606a-4af5-9717-3fa32b2ea700": {
    "id": "82db0382-606a-4af5-9717-3fa32b2ea700",
    "fullName": "Test user",
    "companyName": "Test company",
    "email": "testenquiry@testmail.com",
    "phone": "12345 67890",
    "pageLink": "https://wae-ltd.vercel.app/product-description-page?product=plusultra",
    "type": "product",
    "createdAt": "2026-06-28T21:52:12.970Z"
  },
  "4214c77a-0267-4a33-918d-423bf5010874": {
    "id": "4214c77a-0267-4a33-918d-423bf5010874",
    "fullName": "Test",
    "companyName": "Test company",
    "email": "test@mail.com",
    "phone": "9999999990",
    "city": "MX-CY",
    "pageLink": "https://wae-ltd.vercel.app/contact-us",
    "message": "Hi, this is a test message. I will keep repeating this text to test its visual feasibility in the CMS. Hi, this is a test message. I will keep repeating this text to test its visual feasibility in the CMS. Hi, this is a test message. I will keep repeating this text to test its visual feasibility in the CMS. Hi, this is a test message. I will keep repeating this text to test its visual feasibility in the CMS. Hi, this is a test message. I will keep repeating this text to test its visual feasibility in the CMS. Hi, this is a test message. I will keep repeating this text to test its visual feasibility in the CMS.",
    "type": "contact-us",
    "createdAt": "2026-06-29T23:01:50.742Z"
  }
};
