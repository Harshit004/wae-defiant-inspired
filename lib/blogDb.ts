import fs from 'fs';
import path from 'path';
import { BlogPost, Writer } from '@/data/blogs';

const BLOGS_FILE_PATH = path.join(process.cwd(), 'data', 'blogs.ts');

export interface BlogDBState {
  writers: Record<string, Writer>;
  blogs: Record<string, BlogPost>;
}

// Memory cache for active state to prevent redundant parses
let cachedState: BlogDBState | null = null;

/**
 * Reads and parses the WRITERS and BLOGS structures from data/blogs.ts
 */
export function readBlogDB(): BlogDBState {
  if (cachedState && process.env.NODE_ENV === 'production') {
    return cachedState;
  }

  try {
    const fileContent = fs.readFileSync(BLOGS_FILE_PATH, 'utf-8');

    // Extract WRITERS block
    const writersRegex = /export const WRITERS:\s*Record<string,\s*Writer>\s*=\s*([\s\S]*?);\s*export const BLOGS/;
    const writersMatch = fileContent.match(writersRegex);

    // Extract BLOGS block
    const blogsRegex = /export const BLOGS:\s*Record<string,\s*BlogPost>\s*=\s*([\s\S]*?);?\s*$/;
    const blogsMatch = fileContent.match(blogsRegex);

    if (!writersMatch || !blogsMatch) {
      throw new Error('Failed to locate WRITERS or BLOGS blocks in blogs.ts');
    }

    const writers = JSON.parse(writersMatch[1].trim());
    const blogs = JSON.parse(blogsMatch[1].trim());

    cachedState = { writers, blogs };
    return cachedState;
  } catch (error) {
    console.error('Error reading blogs.ts DB:', error);
    return { writers: {}, blogs: {} };
  }
}

/**
 * Formats and writes the WRITERS and BLOGS state back to data/blogs.ts
 */
export async function writeBlogDB(state: BlogDBState): Promise<void> {
  cachedState = state;

  const content = `export interface Writer {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  link: string;
}

export interface ContentBlock {
  type: 'paragraph' | 'heading' | 'list';
  text?: string;
  items?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  description: string;
  heroImage: string;
  writerId: string;
  readTime: string;
  status: 'Live' | 'Draft';
  createdAt: string;
  contentColumns: [ContentBlock[], ContentBlock[], ContentBlock[]];
}

export const WRITERS: Record<string, Writer> = ${JSON.stringify(state.writers, null, 2)};

export const BLOGS: Record<string, BlogPost> = ${JSON.stringify(state.blogs, null, 2)};
`;

  const isVercel = !!process.env.VERCEL;
  const isProd = process.env.NODE_ENV === 'production' || isVercel;
  const token = process.env.GITHUB_ACCESS_TOKEN;

  // 1. Local Development Write
  if (!isProd) {
    fs.writeFileSync(BLOGS_FILE_PATH, content, 'utf-8');
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
    const filePath = 'data/blogs.ts';

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
        message: 'cms: update blogs database',
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
    console.error('Failed committing blogs to GitHub:', error);
    throw new Error(`Git database write failed: ${error.message || error}`);
  }
}
