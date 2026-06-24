import fs from 'fs';
import path from 'path';
import { JobPost } from '@/data/jobs';

const JOBS_FILE_PATH = path.join(process.cwd(), 'data', 'jobs.ts');

export interface JobsDBState {
  jobs: Record<string, JobPost>;
}

let cachedState: JobsDBState | null = null;

export function readJobsDB(): JobsDBState {
  if (cachedState && process.env.NODE_ENV === 'production') {
    return cachedState;
  }

  try {
    const fileContent = fs.readFileSync(JOBS_FILE_PATH, 'utf-8');

    const jobsRegex = /export const JOBS:\s*Record<string,\s*JobPost>\s*=\s*([\s\S]*?);?\s*$/;
    const jobsMatch = fileContent.match(jobsRegex);

    if (!jobsMatch) {
      throw new Error('Failed to locate JOBS block in jobs.ts');
    }

    const jobs = JSON.parse(jobsMatch[1].trim());

    cachedState = { jobs };
    return cachedState;
  } catch (error) {
    console.error('Error reading jobs.ts DB:', error);
    return { jobs: {} };
  }
}

export async function writeJobsDB(state: JobsDBState): Promise<void> {
  cachedState = state;

  const content = `export interface JobPost {
  id: string;
  title: string;
  category: string;
  type: string;
  time: string;
  shortDescription: string;
  status: 'Live' | 'Draft';
  createdAt: string;
  summaryParagraphs: string[];
  whatYouWillDo: string[];
  whatYouWillOwn: string[];
  whoWeAreLookingFor: string[];
}

export const JOB_CATEGORIES = [
  "VIEW ALL",
  "DEVELOPMENT",
  "DESIGN",
  "MARKETING",
  "CUSTOMER SERVICE",
  "OPERATION",
  "FINANCE",
  "MANAGEMENT"
] as const;

export const JOBS: Record<string, JobPost> = ${JSON.stringify(state.jobs, null, 2)};
`;

  const isVercel = !!process.env.VERCEL;
  const isProd = process.env.NODE_ENV === 'production' || isVercel;
  const token = process.env.GITHUB_ACCESS_TOKEN;

  // 1. Local Development Write
  if (!isProd) {
    fs.writeFileSync(JOBS_FILE_PATH, content, 'utf-8');
    return;
  }

  if (!token) {
    throw new Error('GITHUB_ACCESS_TOKEN environment variable is not configured on Vercel.');
  }

  // 2. Production Git-backed Write via GitHub API
  try {
    const owner = process.env.GITHUB_OWNER || 'Harshit004';
    const repo = process.env.GITHUB_REPO || 'wae-defiant-inspired';
    const branch = process.env.GITHUB_BRANCH || 'main';
    const filePath = 'data/jobs.ts';

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

    const putFileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
    const putRes = await fetch(putFileUrl, {
      method: 'PUT',
      headers: {
        Authorization: `token ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.v3+json',
      },
      body: JSON.stringify({
        message: 'cms: update jobs database',
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
    console.error('Failed committing jobs to GitHub:', error);
    throw new Error(`Git database write failed: ${error.message || error}`);
  }
}
