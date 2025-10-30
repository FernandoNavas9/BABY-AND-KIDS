import { sql } from '../../../lib/db';
import { Product } from '../../../types';

export async function POST(request: Request): Promise<Response> {
  try {
    const newProduct: Omit<Product, 'id'> = await request.json();
    const { name, price, description, imageUrls, category, subcategory, brand, color, size, quantity } = newProduct;
    
    await sql`
      INSERT INTO products (name, price, description, "imageUrls", category, subcategory, brand, color, size, quantity)
      VALUES (${name}, ${price}, ${description}, ${JSON.stringify(imageUrls)}, ${category}, ${subcategory}, ${brand}, ${color}, ${size}, ${quantity})
    `;
    
    return new Response(JSON.stringify({ message: 'Product added successfully' }), { 
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('API Error adding product:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
