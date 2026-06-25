import fs from 'fs';
import path from 'path';
import { Subscriber } from '@/data/subscribers';

const SUBSCRIBERS_FILE_PATH = path.join(process.cwd(), 'data', 'subscribers.ts');

export interface SubscribersDBState {
  subscribers: Subscriber[];
}

let cachedState: SubscribersDBState | null = null;

export function readSubscribersDB(): SubscribersDBState {
  if (cachedState && process.env.NODE_ENV === 'production') {
    return cachedState;
  }

  try {
    const fileContent = fs.readFileSync(SUBSCRIBERS_FILE_PATH, 'utf-8');
    const match = fileContent.match(/export const SUBSCRIBERS:\s*Subscriber\[\]\s*=\s*([\s\S]*?);?\s*$/);
    if (!match) throw new Error('Failed to locate SUBSCRIBERS block');

    const subscribers = JSON.parse(match[1].trim());
    cachedState = { subscribers };
    return cachedState;
  } catch (error) {
    console.error('Error reading subscribers.ts DB:', error);
    return { subscribers: [] };
  }
}

export async function writeSubscribersDB(state: SubscribersDBState): Promise<void> {
  cachedState = state;

  const content = `export interface Subscriber {
  id: string;
  email: string;
  date: string;
  time: string;
  pageLink: string;
}

export const SUBSCRIBERS: Subscriber[] = ${JSON.stringify(state.subscribers, null, 2)};
`;

  const isVercel = !!process.env.VERCEL;
  const isProd = process.env.NODE_ENV === 'production' || isVercel;
  const token = process.env.GITHUB_ACCESS_TOKEN;

  if (!isProd) {
    fs.writeFileSync(SUBSCRIBERS_FILE_PATH, content, 'utf-8');
    return;
  }

  if (!token) {
    throw new Error('GITHUB_ACCESS_TOKEN environment variable is not configured.');
  }

  try {
    const owner = process.env.GITHUB_OWNER || 'Harshit004';
    const repo = process.env.GITHUB_REPO || 'wae-defiant-inspired';
    const branch = process.env.GITHUB_BRANCH || 'main';
    const filePath = 'data/subscribers.ts';

    const getFileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`;
    const getRes = await fetch(getFileUrl, {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    let sha: string | undefined;
    if (getRes.ok) {
      const fileData = await getRes.json();
      sha = fileData.sha;
    }

    const putFileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
    const putRes = await fetch(putFileUrl, {
      method: 'PUT',
      headers: {
        Authorization: `token ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.v3+json',
      },
      body: JSON.stringify({
        message: 'cms: update subscribers database',
        content: Buffer.from(content).toString('base64'),
        ...(sha && { sha }),
        branch,
      }),
    });

    if (!putRes.ok) {
      const errorText = await putRes.text();
      throw new Error(`GitHub API upload failed (status: ${putRes.status}): ${errorText}`);
    }
  } catch (error: any) {
    console.error('Failed committing to GitHub:', error);
    throw new Error(`Git database write failed: ${error.message || error}`);
  }
}
