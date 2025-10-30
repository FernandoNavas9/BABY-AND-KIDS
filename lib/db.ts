import { sql as vercelSql, createPool } from '@vercel/postgres';
import { MOCK_PRODUCTS } from '../constants';

// Make the connection logic resilient by checking for the new standard variable first,
// then falling back to the older one.
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

// Throw a clear error if no connection string is found in the environment.
// This is the most likely cause of the "missing_connection_string" error.
if (!connectionString) {
  throw new Error("Database connection string not found. Please ensure DATABASE_URL or POSTGRES_URL is set in your Vercel project settings.");
}

const pool = createPool({
  connectionString
});

export const sql = vercelSql;

export async function seed() {
  const client = await pool.connect();
  try {
    // Check if the 'products' table exists
    const checkTable = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'products'
      );
    `);

    if (!checkTable.rows[0].exists) {
      console.log('Creating "products" table...');
      await client.query(`
        CREATE TABLE products (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          price NUMERIC(10, 2) NOT NULL,
          description TEXT,
          "imageUrls" JSONB,
          category VARCHAR(50),
          subcategory VARCHAR(50),
          brand VARCHAR(100),
          color VARCHAR(50),
          size VARCHAR(50),
          quantity INTEGER
        );
      `);
      console.log('"products" table created.');

      console.log('Seeding initial products...');
      for (const product of MOCK_PRODUCTS) {
        await client.query(`
          INSERT INTO products (name, price, description, "imageUrls", category, subcategory, brand, color, size, quantity)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `, [
          product.name,
          product.price,
          product.description,
          JSON.stringify(product.imageUrls),
          product.category,
          product.subcategory,
          product.brand,
          product.color,
          product.size,
          product.quantity
        ]);
      }
      console.log('Initial products seeded.');
    }
  } catch (error) {
    console.error('Error during database seeding:', error);
    throw error;
  } finally {
    client.release();
  }
}
