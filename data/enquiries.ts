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
  },
  "83dd4fa0-c816-4c5c-98b1-cc951e6b4b5f": {
    "id": "83dd4fa0-c816-4c5c-98b1-cc951e6b4b5f",
    "fullName": "Siddheshwar Jokare",
    "companyName": "Jayraj Construction",
    "email": "jairajflora@yahoo.in",
    "phone": "09325654835",
    "city": "",
    "pageLink": "https://www.waecorp.com/product-description-page?product=s-wasser-mini",
    "type": "product",
    "createdAt": "2026-07-05T04:25:00.674Z"
  },
  "67146115-41ff-4b46-8327-76fb8a36d09e": {
    "id": "67146115-41ff-4b46-8327-76fb8a36d09e",
    "fullName": "manan lamba",
    "companyName": "aes",
    "email": "arcticprojects2@gmail.com",
    "phone": "7011227677",
    "city": "delhi",
    "pageLink": "https://www.waecorp.com/contact-us",
    "message": "need prices for 150 lph 100 lph and 500 lph ro system",
    "type": "contact-us",
    "createdAt": "2026-07-06T12:08:47.039Z"
  },
  "8ffb8d1a-c033-46b4-b617-1add712d35c7": {
    "id": "8ffb8d1a-c033-46b4-b617-1add712d35c7",
    "fullName": "Manish",
    "companyName": "ION Trading India Private Limited",
    "email": "manish.yadav@iongroup.com",
    "phone": "9311203328",
    "city": "Hyderabad",
    "pageLink": "https://www.waecorp.com/contact-us",
    "message": "Issue with the services",
    "type": "contact-us",
    "createdAt": "2026-07-08T05:47:54.045Z"
  },
  "4cfbbb91-d6a5-440d-bd07-6edba6e3f7c2": {
    "id": "4cfbbb91-d6a5-440d-bd07-6edba6e3f7c2",
    "fullName": "Rahul Ambekar",
    "companyName": "ISS Facility ",
    "email": "rahul.ambekar@in.issworld.com",
    "phone": "8623006306",
    "city": "Mumbai",
    "pageLink": "https://www.waecorp.com/contact-us",
    "message": "Requirement: RO Water Dispenser – Direct Connection Type. (Hot + Cold + Normal water required)\n please share contact details.  ",
    "type": "contact-us",
    "createdAt": "2026-07-08T06:57:28.939Z"
  },
  "3dbfde07-e2a8-44ad-b35d-602984c6ab40": {
    "id": "3dbfde07-e2a8-44ad-b35d-602984c6ab40",
    "fullName": "Tarun George",
    "companyName": "Studio Chintala",
    "email": "tarun@studiochintala.com",
    "phone": "9400862460",
    "city": "",
    "pageLink": "https://www.waecorp.com/product-description-page?product=nt01",
    "type": "product",
    "createdAt": "2026-07-09T04:57:45.140Z"
  },
  "86d52290-cb6d-4c5b-a956-271277e76bfa": {
    "id": "86d52290-cb6d-4c5b-a956-271277e76bfa",
    "fullName": "asads",
    "companyName": "asdasda",
    "email": "asdasd@dasdasd.com",
    "phone": "asdsadsa",
    "city": "asdsad",
    "pageLink": "https://www.waecorp.com/contact-us",
    "message": "asdsadsa",
    "type": "contact-us",
    "createdAt": "2026-07-10T11:16:20.755Z"
  }
};
