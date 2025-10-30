
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import { Product } from './types';
import { MOCK_PRODUCTS } from './constants';
import { seed, sql } from './lib/db';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        // Seed the database if it's the first run
        await seed();
        const { rows } = await sql<Product>`SELECT * FROM products ORDER BY id ASC;`;
        setProducts(rows);
      } catch (error) {
        console.error("Error fetching products from database:", error);
        // Fallback to mock products if DB fails, though unlikely with Vercel Postgres
        setProducts(MOCK_PRODUCTS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

 const handleAddProduct = async (newProduct: Omit<Product, 'id'>): Promise<boolean> => {
    try {
      const { name, price, description, imageUrls, category, subcategory, brand, color, size, quantity } = newProduct;
      await sql`
        INSERT INTO products (name, price, description, imageUrls, category, subcategory, brand, color, size, quantity)
        VALUES (${name}, ${price}, ${description}, ${JSON.stringify(imageUrls)}, ${category}, ${subcategory}, ${brand}, ${color}, ${size}, ${quantity})
      `;
      // Refetch products to get the new one with its DB-generated ID
      const { rows } = await sql<Product>`SELECT * FROM products ORDER BY id ASC;`;
      setProducts(rows);
      return true;
    } catch (error) {
        console.error("Error adding product to database:", error);
        alert('Hubo un error al agregar el producto.');
        return false;
    }
  };
  
  const handleUpdateProduct = async (updatedProduct: Product): Promise<boolean> => {
     try {
      const { id, name, price, description, imageUrls, category, subcategory, brand, color, size, quantity } = updatedProduct;
      await sql`
        UPDATE products
        SET name = ${name}, 
            price = ${price}, 
            description = ${description}, 
            imageUrls = ${JSON.stringify(imageUrls)}, 
            category = ${category}, 
            subcategory = ${subcategory}, 
            brand = ${brand}, 
            color = ${color}, 
            size = ${size}, 
            quantity = ${quantity}
        WHERE id = ${id}
      `;
      const newProductsList = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
      setProducts(newProductsList);
      return true;
    } catch (error) {
        console.error("Error updating product in database:", error);
        alert('Hubo un error al actualizar el producto.');
        return false;
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
        await sql`DELETE FROM products WHERE id = ${productId}`;
        const newProductsList = products.filter(p => p.id !== productId);
        setProducts(newProductsList);
    } catch (error) {
        console.error("Error deleting product from database:", error);
        alert('Hubo un error al eliminar el producto.');
    }
  };


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="font-sans">
        <Header onMenuClick={toggleSidebar} />
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                products={products} 
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
                isLoading={isLoading}
              />
            } 
          />
          <Route 
            path="/admin" 
            element={
              <AdminPage 
                products={products}
                onAddProduct={handleAddProduct}
                onUpdateProduct={handleUpdateProduct}
                onDeleteProduct={handleDeleteProduct}
              />
            } 
          />
        </Routes>
    </div>
  );
};

export default App;
