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

export async function writeNewsEventsDB(state: NewsEventsDBState): Promise<boolean> {
  cachedState = state;
  const content = JSON.stringify(state, null, 2);

  const isVercel = !!process.env.VERCEL;
  const isProd = process.env.NODE_ENV === 'production' || isVercel;
  const token = process.env.GITHUB_ACCESS_TOKEN;

  // 1. Local Development Write
  if (!isProd) {
    try {
      fs.writeFileSync(NEWS_EVENTS_FILE_PATH, content, 'utf-8');
      return true;
    } catch (error) {
      console.error('Error writing to news-events.json:', error);
      return false;
    }
  }

  if (!token) {
    console.error('GITHUB_ACCESS_TOKEN environment variable is not configured on Vercel.');
    return false;
  }

  // 2. Production Git-backed Write via GitHub API
  try {
    const owner = process.env.GITHUB_OWNER || 'Harshit004';
    const repo = process.env.GITHUB_REPO || 'wae-defiant-inspired';
    const branch = process.env.GITHUB_BRANCH || 'main';
    const filePath = 'data/news-events.json';

    // Get current file sha
    const getFileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`;
    const getRes = await fetch(getFileUrl, {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!getRes.ok) {
      const errorText = await getRes.text();
      console.error(`Failed to retrieve file metadata from GitHub (status: ${getRes.status}): ${errorText}`);
      return false;
    }

    const fileData = await getRes.json();
    const sha = fileData.sha;

    // Put updated file
    const putFileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
    const putRes = await fetch(putFileUrl, {
      method: 'PUT',
      headers: {
        Authorization: `token ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.v3+json',
      },
      body: JSON.stringify({
        message: 'cms: update news-events database',
        content: Buffer.from(content).toString('base64'),
        sha,
        branch,
      }),
    });

    if (!putRes.ok) {
      const errorText = await putRes.text();
      console.error(`GitHub API upload failed (status: ${putRes.status}): ${errorText}`);
      return false;
    }
    
    return true;
  } catch (error: any) {
    console.error('Failed committing to GitHub:', error);
    return false;
  }
}
