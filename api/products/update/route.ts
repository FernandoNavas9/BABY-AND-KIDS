import { NextResponse } from 'next/server';
import { sql } from '../../../lib/db';
import { Product } from '../../../types';

export async function POST(request: Request) {
  try {
    const updatedProduct: Product = await request.json();
    const { id, name, price, description, imageUrls, category, subcategory, brand, color, size, quantity } = updatedProduct;
    
    await sql`
      UPDATE products
      SET name = ${name}, 
          price = ${price}, 
          description = ${description}, 
          "imageUrls" = ${JSON.stringify(imageUrls)}, 
          category = ${category}, 
          subcategory = ${subcategory}, 
          brand = ${brand}, 
          color = ${color}, 
          size = ${size}, 
          quantity = ${quantity}
      WHERE id = ${id}
    `;
    
    return NextResponse.json({ message: 'Product updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('API Error updating product:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
