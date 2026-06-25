export interface Subscriber {
  id: string;
  email: string;
  date: string;
  time: string;
  pageLink: string;
}

export const SUBSCRIBERS: Subscriber[] = [];
