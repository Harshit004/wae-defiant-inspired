export interface Subscriber {
  id: string;
  email: string;
  date: string;
  time: string;
  pageLink: string;
}

export const SUBSCRIBERS: Subscriber[] = [
  {
    "id": "aa36bc36-1a75-4ed7-a7ae-c0a0e6b492d8",
    "email": "test@testmail.com",
    "date": "2026-06-25",
    "time": "10:43:12",
    "pageLink": "/join-wae/product-designer"
  },
  {
    "id": "07db40c9-9523-4ed7-99b0-e8090b8eade6",
    "email": "testmail@tseting.com",
    "date": "2026-06-25",
    "time": "16:57:27",
    "pageLink": "/"
  }
];
