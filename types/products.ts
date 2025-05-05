export type ProductType = 'free-standing' | 'counter-top' | 'fountain' | 'indoor';

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  productTypes: ProductType[];
}

export interface Categories {
  [key: string]: Category;
}

export interface ProductCatalog {
  categories: Categories;
} 