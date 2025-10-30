import { sql } from '../../../lib/db';

export async function POST(request: Request): Promise<Response> {
  try {
    const { id } = await request.json();
    
    if (!id) {
        return new Response(JSON.stringify({ error: 'Product ID is required' }), { 
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
    }

    await sql`DELETE FROM products WHERE id = ${id}`;
    
    return new Response(JSON.stringify({ message: 'Product deleted successfully' }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('API Error deleting product:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
