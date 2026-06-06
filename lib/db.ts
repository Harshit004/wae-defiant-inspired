import fs from 'fs';
import path from 'path';
import { CategoryData, ProductDetails } from '@/data/products';

const PRODUCTS_FILE_PATH = path.join(process.cwd(), 'data', 'products.ts');

export interface DBState {
  categories: Record<string, CategoryData>;
  products: Record<string, ProductDetails>;
}

// Memory cache for active state to prevent redundant parses
let cachedState: DBState | null = null;

/**
 * Reads and parses the CATEGORIES and PRODUCTS structures from data/products.ts
 */
export function readDB(): DBState {
  if (cachedState && process.env.NODE_ENV === 'production') {
    return cachedState;
  }

  try {
    const fileContent = fs.readFileSync(PRODUCTS_FILE_PATH, 'utf-8');

    // Extract CATEGORIES block
    const categoriesRegex = /export const CATEGORIES:\s*Record<string,\s*CategoryData>\s*=\s*([\s\S]*?);\s*export const PRODUCTS/;
    const categoriesMatch = fileContent.match(categoriesRegex);

    // Extract PRODUCTS block
    const productsRegex = /export const PRODUCTS:\s*Record<string,\s*ProductDetails>\s*=\s*([\s\S]*?);?\s*$/;
    const productsMatch = fileContent.match(productsRegex);

    if (!categoriesMatch || !productsMatch) {
      throw new Error('Failed to locate CATEGORIES or PRODUCTS blocks in products.ts');
    }

    const categories = JSON.parse(categoriesMatch[1].trim());
    const products = JSON.parse(productsMatch[1].trim());

    cachedState = { categories, products };
    return cachedState;
  } catch (error) {
    console.error('Error reading products.ts DB:', error);
    // Return empty state or throw fallback
    return { categories: {}, products: {} };
  }
}

/**
 * Formats and writes the CATEGORIES and PRODUCTS state back to data/products.ts
 */
export async function writeDB(state: DBState): Promise<void> {
  cachedState = state;

  const content = `export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
}

export interface CategoryData {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  paragraphs: string[];
  products: Product[];
}

export interface SpecRow {
  variant: string;
  hot: string;
  cold: string;
  ambient: string;
}

export interface DimensionRow {
  variant: string;
  weight: string;
  height: string;
  width: string;
  depth: string;
}

export interface ProductDetails {
  id: string;
  name: string;
  categoryName: string;
  heroSubtitle: string;
  images: string[];
  featuresList: Array<{ title: string; description: string }>;
  specifications: {
    storageCapacity: SpecRow[];
    waterTemp: {
      cold: string;
      hot: string;
    };
    greenCertification: string;
    dripTray: string;
    refrigerant: string;
    dimensions: DimensionRow[];
    powerRequirement: string;
    purificationSystem: string;
    pointOfUseSterilization: string;
  };
  status?: 'Live' | 'Draft';
}

export const CATEGORIES: Record<string, CategoryData> = ${JSON.stringify(state.categories, null, 2)};

export const PRODUCTS: Record<string, ProductDetails> = ${JSON.stringify(state.products, null, 2)};
`;

  // 1. Local Development Write
  if (process.env.NODE_ENV === 'development' || !process.env.GITHUB_ACCESS_TOKEN) {
    fs.writeFileSync(PRODUCTS_FILE_PATH, content, 'utf-8');
    return;
  }

  // 2. Production Git-backed Write via GitHub API
  try {
    const owner = process.env.GITHUB_OWNER || 'Harshit004';
    const repo = process.env.GITHUB_REPO || 'wae-defiant-inspired';
    const branch = process.env.GITHUB_BRANCH || 'main';
    const filePath = 'data/products.ts';
    const token = process.env.GITHUB_ACCESS_TOKEN;

    // Get current file sha
    const getFileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`;
    const getRes = await fetch(getFileUrl, {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    let sha = '';
    if (getRes.ok) {
      const fileData = await getRes.json();
      sha = fileData.sha;
    }

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
        message: 'cms: update products database',
        content: Buffer.from(content).toString('base64'),
        sha,
        branch,
      }),
    });

    if (!putRes.ok) {
      const errorText = await putRes.text();
      throw new Error(`GitHub API upload failed: ${errorText}`);
    }
  } catch (error) {
    console.error('Failed committing to GitHub:', error);
    // Fallback to local write in case of API issues
    fs.writeFileSync(PRODUCTS_FILE_PATH, content, 'utf-8');
  }
}
