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
  imageUrls: string[]; // Changed from image to imageUrls
  category: MainCategory;
  subcategory: string;
  brand: string;
  color: string;
  size: string;
  quantity: number;
}