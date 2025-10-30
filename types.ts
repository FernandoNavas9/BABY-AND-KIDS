export type MainCategory = 'Bebé' | 'Niñas' | 'Niños';

export interface Category {
  name: MainCategory;
  subcategories: string[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  // Vercel Postgres returns json arrays as strings
  imageUrls: string[] | string;
  category: MainCategory;
  subcategory: string;
  brand: string;
  color: string;
  size: string;
  quantity: number;
}
