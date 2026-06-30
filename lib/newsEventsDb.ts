import fs from 'fs';
import path from 'path';

const NEWS_EVENTS_FILE_PATH = path.join(process.cwd(), 'data', 'news-events.json');

export interface NewsEventItem {
  id: string;
  type: 'news' | 'award';
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  link: string;
  displayOnHomepage: boolean;
  rank: number;
}

export interface NewsEventsDBState {
  heroTextNews: string;
  heroTextAwards: string;
  items: NewsEventItem[];
}

let cachedState: NewsEventsDBState | null = null;

export function readNewsEventsDB(): NewsEventsDBState {
  if (cachedState && process.env.NODE_ENV === 'production') {
    return cachedState;
  }

  try {
    const fileContent = fs.readFileSync(NEWS_EVENTS_FILE_PATH, 'utf-8');
    cachedState = JSON.parse(fileContent);
    return cachedState as NewsEventsDBState;
  } catch (error) {
    console.error('Error reading news-events.json DB:', error);
    return { heroTextNews: '', heroTextAwards: '', items: [] };
  }
}

export function writeNewsEventsDB(state: NewsEventsDBState): boolean {
  try {
    fs.writeFileSync(NEWS_EVENTS_FILE_PATH, JSON.stringify(state, null, 2), 'utf-8');
    cachedState = state;
    return true;
  } catch (error) {
    console.error('Error writing to news-events.json:', error);
    return false;
  }
}
