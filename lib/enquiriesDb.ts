import fs from 'fs';
import path from 'path';
import { Enquiry } from '@/data/enquiries';

const ENQUIRIES_FILE_PATH = path.join(process.cwd(), 'data', 'enquiries.ts');

export interface EnquiriesDBState {
  enquiries: Record<string, Enquiry>;
}

// Memory cache for active state to prevent redundant parses
let cachedState: EnquiriesDBState | null = null;

/**
 * Reads and parses the ENQUIRIES structure from data/enquiries.ts
 */
export function readEnquiriesDB(): EnquiriesDBState {
  if (cachedState && process.env.NODE_ENV === 'production') {
    return cachedState;
  }

  try {
    const fileContent = fs.readFileSync(ENQUIRIES_FILE_PATH, 'utf-8');

    // Extract ENQUIRIES block
    const enquiriesRegex = /export const ENQUIRIES:\s*Record<string,\s*Enquiry>\s*=\s*([\s\S]*?);?\s*$/;
    const enquiriesMatch = fileContent.match(enquiriesRegex);

    if (!enquiriesMatch) {
      throw new Error('Failed to locate ENQUIRIES block in enquiries.ts');
    }

    const enquiries = JSON.parse(enquiriesMatch[1].trim());

    cachedState = { enquiries };
    return cachedState;
  } catch (error) {
    console.error('Error reading enquiries.ts DB:', error);
    return { enquiries: {} };
  }
}

/**
 * Formats and writes the ENQUIRIES state back to data/enquiries.ts
 */
export async function writeEnquiriesDB(state: EnquiriesDBState): Promise<void> {
  cachedState = state;

  const content = `export interface Enquiry {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  pageLink: string;
  createdAt: string;
}

export const ENQUIRIES: Record<string, Enquiry> = ${JSON.stringify(state.enquiries, null, 2)};
`;

  const isVercel = !!process.env.VERCEL;
  const isProd = process.env.NODE_ENV === 'production' || isVercel;
  const token = process.env.GITHUB_ACCESS_TOKEN;

  // 1. Local Development Write
  if (!isProd) {
    fs.writeFileSync(ENQUIRIES_FILE_PATH, content, 'utf-8');
    return;
  }

  if (!token) {
    throw new Error('GITHUB_ACCESS_TOKEN environment variable is not configured on Vercel. Please add it to your Vercel project settings.');
  }

  // 2. Production Git-backed Write via GitHub API
  try {
    const owner = process.env.GITHUB_OWNER || 'Harshit004';
    const repo = process.env.GITHUB_REPO || 'wae-defiant-inspired';
    const branch = process.env.GITHUB_BRANCH || 'main';
    const filePath = 'data/enquiries.ts';

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
      throw new Error(`Failed to retrieve file metadata from GitHub (status: ${getRes.status}): ${errorText}`);
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
        message: 'cms: update enquiries database',
        content: Buffer.from(content).toString('base64'),
        sha,
        branch,
      }),
    });

    if (!putRes.ok) {
      const errorText = await putRes.text();
      throw new Error(`GitHub API upload failed (status: ${putRes.status}): ${errorText}`);
    }
  } catch (error: any) {
    console.error('Failed committing enquiries to GitHub:', error);
    throw new Error(`Git database write failed: ${error.message || error}`);
  }
}
