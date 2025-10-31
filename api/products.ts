import { seed, sql } from '../lib/db';
import { Product } from '../types';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Helper to handle async errors and centralize error logging
const apiHandler = (handler: (req: VercelRequest, res: VercelResponse) => Promise<void>) => 
  async (req: VercelRequest, res: VercelResponse) => {
    try {
      await handler(req, res);
    } catch (error) {
      console.error(`API Error in ${req.method} ${req.url}:`, error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

const handleGet = async (res: VercelResponse) => {
  await seed();
  const { rows } = await sql<Product>`SELECT * FROM products ORDER BY id ASC;`;
  res.status(200).json(rows);
};

const handlePost = async (req: VercelRequest, res: VercelResponse) => {
  const newProduct: Omit<Product, 'id'> = req.body;
  const { name, price, description, imageUrls, category, subcategory, brand, color, size, quantity } = newProduct;
  await sql`
    INSERT INTO products (name, price, description, "imageUrls", category, subcategory, brand, color, size, quantity)
    VALUES (${name}, ${price}, ${description}, ${JSON.stringify(imageUrls)}, ${category}, ${subcategory}, ${brand}, ${color}, ${size}, ${quantity})
  `;
  res.status(201).json({ message: 'Product added successfully' });
};

const handlePatch = async (req: VercelRequest, res: VercelResponse) => {
    const updatedProduct: Product = req.body;
    const { id, name, price, description, imageUrls, category, subcategory, brand, color, size, quantity } = updatedProduct;
    await sql`
      UPDATE products
      SET name = ${name}, price = ${price}, description = ${description}, "imageUrls" = ${JSON.stringify(imageUrls)}, category = ${category}, subcategory = ${subcategory}, brand = ${brand}, color = ${color}, size = ${size}, quantity = ${quantity}
      WHERE id = ${id}
    `;
    res.status(200).json({ message: 'Product updated successfully' });
};

const handleDelete = async (req: VercelRequest, res: VercelResponse) => {
    const { id } = req.body;
    if (!id) {
        // FIX: The `apiHandler` expects a function returning `Promise<void>`.
        // Returning `res.status().json()` created a type mismatch. This now sends the
        // response and returns void to satisfy the type requirement.
        res.status(400).json({ error: 'Product ID is required' });
        return;
    }
    await sql`DELETE FROM products WHERE id = ${id}`;
    res.status(200).json({ message: 'Product deleted successfully' });
};

export default apiHandler(async (req, res) => {
  switch (req.method) {
    case 'GET':
      return handleGet(res);
    case 'POST':
      return handlePost(req, res);
    case 'PATCH':
      return handlePatch(req, res);
    case 'DELETE':
      return handleDelete(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});
