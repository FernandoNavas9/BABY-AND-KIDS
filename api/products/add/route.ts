import { NextResponse } from 'next/server';
import { sql } from '../../../lib/db';
import { Product } from '../../../types';

export async function POST(request: Request) {
  try {
    const newProduct: Omit<Product, 'id'> = await request.json();
    const { name, price, description, imageUrls, category, subcategory, brand, color, size, quantity } = newProduct;
    
    await sql`
      INSERT INTO products (name, price, description, "imageUrls", category, subcategory, brand, color, size, quantity)
      VALUES (${name}, ${price}, ${description}, ${JSON.stringify(imageUrls)}, ${category}, ${subcategory}, ${brand}, ${color}, ${size}, ${quantity})
    `;
    
    return NextResponse.json({ message: 'Product added successfully' }, { status: 201 });
  } catch (error) {
    console.error('API Error adding product:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
