import { seed, sql } from '../../lib/db';
import { Product } from '../../types';

export async function GET(): Promise<Response> {
  try {
    // Ensure the database is seeded before fetching
    await seed();
    const { rows } = await sql<Product>`SELECT * FROM products ORDER BY id ASC;`;
    return new Response(JSON.stringify(rows), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('API Error fetching products:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
