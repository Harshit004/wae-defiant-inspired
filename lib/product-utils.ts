import { CATEGORIES, PRODUCTS } from "@/data/products";

/**
 * Resolves the category ID (e.g. 'bluwae', 'trublu', etc.) for a given product ID.
 */
export function getProductCategory(productId: string): string {
  if (!productId) return "bluwae";
  const normalizedId = productId.toLowerCase();

  for (const [catKey, category] of Object.entries(CATEGORIES)) {
    if (category.products && category.products.some((p) => p.id.toLowerCase() === normalizedId)) {
      return catKey;
    }
  }

  // Fallback: check if product exists in PRODUCTS with matching categoryName
  const product = PRODUCTS[normalizedId];
  if (product && product.categoryName) {
    const catNameLower = product.categoryName.toLowerCase();
    for (const catKey of Object.keys(CATEGORIES)) {
      if (catNameLower.includes(catKey)) {
        return catKey;
      }
    }
  }

  return "bluwae";
}

/**
 * Generates the canonical URL for a product: /portfolio/[category]/[product]
 */
export function getProductUrl(productId: string, categoryId?: string): string {
  const category = categoryId || getProductCategory(productId);
  return `/portfolio/${category}/${productId}`;
}

/**
 * Generates the canonical URL for a category: /portfolio/[category]
 */
export function getCategoryUrl(categoryId: string): string {
  return `/portfolio/${categoryId}`;
}
