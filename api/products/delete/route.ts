import { NextResponse } from 'next/server';
import { sql } from '../../../lib/db';

export async function POST(request: Request) {
  try {
    const { id } = await request.json();
    
    if (!id) {
        return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    await sql`DELETE FROM products WHERE id = ${id}`;
    
    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('API Error deleting product:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
