import fs from 'fs';
import path from 'path';
import { CategoryData, ProductDetails, CATEGORIES as STATIC_CATEGORIES, PRODUCTS as STATIC_PRODUCTS } from '@/data/products';

const PRODUCTS_FILE_PATH = path.join(process.cwd(), 'data', 'products.ts');

export interface DBState {
  categories: Record<string, CategoryData>;
  products: Record<string, ProductDetails>;
}

// Memory cache for active state to prevent redundant parses
let cachedState: DBState | null = null;

/**
 * Extracts a balanced JSON object string from typescript file content
 */
function extractJsonObject(content: string, variableName: string): string | null {
  const marker = variableName + ':';
  const startIdx = content.indexOf(marker);
  if (startIdx === -1) return null;
  const equalsIdx = content.indexOf('=', startIdx);
  if (equalsIdx === -1) return null;
  const firstBrace = content.indexOf('{', equalsIdx);
  if (firstBrace === -1) return null;

  let depth = 0;
  let inString = false;
  let escape = false;

  for (let i = firstBrace; i < content.length; i++) {
    const char = content[i];
    if (escape) {
      escape = false;
      continue;
    }
    if (char === '\\') {
      escape = true;
      continue;
    }
    if (char === '"') {
      inString = !inString;
      continue;
    }
    if (!inString) {
      if (char === '{') depth++;
      else if (char === '}') {
        depth--;
        if (depth === 0) {
          return content.substring(firstBrace, i + 1);
        }
      }
    }
  }
  return null;
}

/**
 * Reads and parses the CATEGORIES and PRODUCTS structures from data/products.ts
 */
export function readDB(): DBState {
  if (cachedState && process.env.NODE_ENV === 'production' && Object.keys(cachedState.categories || {}).length > 0) {
    return cachedState;
  }

  try {
    if (fs.existsSync(PRODUCTS_FILE_PATH)) {
      const fileContent = fs.readFileSync(PRODUCTS_FILE_PATH, 'utf-8');

      // 1. Try balanced-brace JSON extraction
      const categoriesJson = extractJsonObject(fileContent, 'CATEGORIES');
      const productsJson = extractJsonObject(fileContent, 'PRODUCTS');

      if (categoriesJson && productsJson) {
        try {
          const categories = JSON.parse(categoriesJson);
          const products = JSON.parse(productsJson);

          if (Object.keys(categories).length > 0 && Object.keys(products).length > 0) {
            cachedState = { categories, products };
            return cachedState;
          }
        } catch (parseErr) {
          console.warn('extractJsonObject JSON.parse failed, trying regex fallback:', parseErr);
        }
      }

      // 2. Fallback to regex extraction
      const categoriesRegex = /export const CATEGORIES:\s*Record<string,\s*CategoryData>\s*=\s*([\s\S]*?);\s*export const PRODUCTS/;
      const categoriesMatch = fileContent.match(categoriesRegex);

      const productsRegex = /export const PRODUCTS:\s*Record<string,\s*ProductDetails>\s*=\s*([\s\S]*?);?\s*(?:PRODUCTS\[|$)/;
      const productsMatch = fileContent.match(productsRegex);

      if (categoriesMatch && productsMatch) {
        const categories = JSON.parse(categoriesMatch[1].trim());
        const products = JSON.parse(productsMatch[1].trim().replace(/;\s*$/, ''));

        if (Object.keys(categories).length > 0 && Object.keys(products).length > 0) {
          cachedState = { categories, products };
          return cachedState;
        }
      }
    }
  } catch (error) {
    console.error('Error reading products.ts DB from disk, falling back to static dataset:', error);
  }

  // Fallback to static dataset bundled at build time (Guarantees zero data loss!)
  if (STATIC_CATEGORIES && STATIC_PRODUCTS && Object.keys(STATIC_CATEGORIES).length > 0) {
    cachedState = {
      categories: STATIC_CATEGORIES,
      products: STATIC_PRODUCTS,
    };
    return cachedState;
  }

  return { categories: {}, products: {} };
}

/**
 * Formats and writes the CATEGORIES and PRODUCTS state back to data/products.ts
 */
export async function writeDB(state: DBState): Promise<void> {
  // Safety guard: NEVER allow writing empty state if existing state had data
  if (
    !state ||
    !state.categories ||
    Object.keys(state.categories).length === 0 ||
    !state.products ||
    Object.keys(state.products).length === 0
  ) {
    throw new Error('Safety guard: Refusing to overwrite products database with empty state to prevent data loss.');
  }

  cachedState = state;

  const content = `export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  hoverImage?: string | null;
  displayOrder?: number;
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
  featuresList: Array<{ title: string; description: string; isDisplayed?: boolean }>;
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
  // CMS Customization Fields
  description?: string;
  heroImage?: string;
  heroTagline?: string;
  heroSubtext?: string;
  heroCtaText?: string;
  heroCtaLink?: string;
  showcaseCtaText?: string;
  showcaseCtaLink?: string;
  brochurePdf?: string;
  variants?: {
    hot: boolean;
    cold: boolean;
    ambient: boolean;
  };
  displayImageIndex?: number;
  hoverImageIndex?: number | null;
  displayOrder?: number;
}

export const CATEGORIES: Record<string, CategoryData> = ${JSON.stringify(state.categories, null, 2)};

export const PRODUCTS: Record<string, ProductDetails> = ${JSON.stringify(state.products, null, 2)};
`;

  const isVercel = !!process.env.VERCEL;
  const isProd = process.env.NODE_ENV === 'production' || isVercel;
  const token = process.env.GITHUB_ACCESS_TOKEN;

  // 1. Local Development Write
  if (!isProd) {
    if (fs.existsSync(PRODUCTS_FILE_PATH)) {
      try {
        fs.copyFileSync(PRODUCTS_FILE_PATH, PRODUCTS_FILE_PATH + '.bak');
      } catch (e) {
        console.warn('Could not create backup file:', e);
      }
    }
    fs.writeFileSync(PRODUCTS_FILE_PATH, content, 'utf-8');
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
    const filePath = 'data/products.ts';

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
        message: 'cms: update products database',
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
    console.error('Failed committing to GitHub:', error);
    // Do not attempt local write fallback in production (Vercel has read-only filesystem)
    throw new Error(`Git database write failed: ${error.message || error}`);
  }
}

