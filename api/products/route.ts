import { NextResponse } from 'next/server';
import { seed, sql } from '../../lib/db';
import { Product } from '../../types';

export async function GET() {
  try {
    // Ensure the database is seeded before fetching
    await seed();
    const { rows } = await sql<Product>`SELECT * FROM products ORDER BY id ASC;`;
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('API Error fetching products:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
